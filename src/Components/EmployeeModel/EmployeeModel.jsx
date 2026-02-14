import React, { useEffect, useState } from "react";
import "./EmployeeModel.css";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function EmployeeModel({
  initialData = {},
  role = [],
  department = [],
  isEdit = false,
  onSubmit,
}) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    phnum: "",
    username: "",
    password: "",
  });

  const [selecteddept, setSelecteddept] = useState("");
  const [selectedrole, setSelectedrole] = useState("");

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!initialData || !isEdit) return;

    setFormData({
      fullname: initialData.name ?? "",
      phnum: initialData.phone_no ?? "",
      username: initialData.username ?? "",
      password: "",
    });

    setSelecteddept(initialData.department_id ?? "");
    setSelectedrole(initialData.role_id ?? "");
  }, [initialData?.id, isEdit]);

  // Validation
  const validate = () => {
    const e = {};

    if (!formData.fullname.trim()) {
      e.fullname = "Full name is required";
    } else if (formData.fullname.length < 3) {
      e.fullname = "Full name must be at least 3 characters";
    } else if (!/^[a-zA-Z ]+$/.test(formData.fullname.trim())) {
      e.fullname = "Full name can only contain letters and spaces";
    }

    if (!formData.phnum.trim()) {
      e.phnum = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phnum.trim())) {
      e.phnum = "Phone number must be 10 digits";
    }

    if (!formData.username.trim()) {
      e.username = "Username is required";
    } else if (formData.username.length < 3) {
      e.username = "Username must be at least 3 characters";
    } else if (!/^[a-z0-9._]+$/.test(formData.username.trim())) {
      e.username =
        "Username can only contain lowercase letters, numbers, dot, or underscore";
    }

    if (!isEdit) {
      if (!formData.password.trim()) {
        e.password = "Password is required";
      } else if (formData.password.length < 6) {
        e.password = "Password must be at least 6 characters";
      } else if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(
          formData.password,
        )
      ) {
        e.password =
          "Password must include uppercase, lowercase, number, and special character";
      }
    }

    if (!selecteddept) {
      e.department = "Department is required";
    }

    if (!selectedrole) {
      e.role = "Role is required";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Submit
  const handleSubmit = async () => {
    if (!validate()) return;

    // Payload differs for add vs edit
    let payload = {};

    if (isEdit) {
      // For editing: backend expects dept_id, no username/password
      payload = {
        name: formData.fullname,
        phone_no: formData.phnum,
        role_id: Number(selectedrole),
        dept_id: Number(selecteddept),
      };
    } else {
      // For adding: backend expects username/password + department_id
      payload = {
        username: formData.username,
        password: formData.password,
        name: formData.fullname,
        phone_no: formData.phnum,
        role_id: Number(selectedrole),
        department_id: Number(selecteddept),
      };
    }

    const success = await onSubmit(payload);

    if (success) {
      setFormData({ fullname: "", phnum: "", username: "", password: "" });
      setSelecteddept("");
      setSelectedrole("");
      setErrors({});
    }
  };

  return (
    <div className="emp-container">
      <div className="form">
        {/* Full Name */}
        <div className="form-group">
          <label>Full Name</label>
          <p className="error-text">{errors.fullname || " "}</p>
          <input
            value={formData.fullname}
            onChange={(e) => {
              setFormData({ ...formData, fullname: e.target.value });
              setErrors((prev) => ({ ...prev, fullname: "" }));
            }}
          />
        </div>

        {/* Phone */}
        <div className="form-group">
          <label>Phone No</label>
          <p className="error-text">{errors.phnum || " "}</p>
          <input
            value={formData.phnum}
            onChange={(e) => {
              setFormData({ ...formData, phnum: e.target.value });
              setErrors((prev) => ({ ...prev, phnum: "" }));
            }}
          />
        </div>

        {/* Username */}
        <div className="form-group">
          <label>Username</label>
          <p className="error-text">{errors.username || " "}</p>
          <input
            value={formData.username}
            disabled={isEdit}
            onChange={(e) => {
              setFormData({ ...formData, username: e.target.value });
              setErrors((prev) => ({ ...prev, username: "" }));
            }}
          />
        </div>

        {/* Password */}
        {!isEdit && (
          <div className="form-group">
            <label>Password</label>
            <p className="error-text">{errors.password || " "}</p>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  setErrors((prev) => ({ ...prev, password: "" }));
                }}
              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
              </span>
            </div>
          </div>
        )}

        {/* Department */}
        <div className="form-group">
          <label>Department</label>
          <p className="error-text">{errors.department || " "}</p>
          <select
            value={selecteddept}
            onChange={(e) => {
              setSelecteddept(e.target.value);
              setErrors((prev) => ({ ...prev, department: "" }));
            }}
          >
            <option value="">Select Department</option>
            {department.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        {/* Role */}
        <div className="form-group">
          <label>Role</label>
          <p className="error-text">{errors.role || " "}</p>
          <select
            value={selectedrole}
            onChange={(e) => {
              setSelectedrole(e.target.value);
              setErrors((prev) => ({ ...prev, role: "" }));
            }}
          >
            <option value="">Select Role</option>
            {role.map((r) => (
              <option key={r.role_id} value={r.role_id}>
                {r.role_name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <div className="buttoncontainer">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="btn-cancel"
        >
          Cancel
        </button>
        <button className="btn-save" onClick={handleSubmit}>
          {isEdit ? "Update " : "Add "}
        </button>
      </div>
    </div>
  );
}

export default EmployeeModel;
