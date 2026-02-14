import React from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

import Header from "../../../Components/Header/AdminHeader";
import Department from "../../../Components/Department/Department";
import Role from "../../../Components/Role/Role";
import Category from "../../../Components/Category/Category";
import AddButton from "../../../Components/AddButton/AddButton";
import AddEditModal from "../../../Components/AddEditModel/AddEditModal";

import useMasterData from "./useMasterData";
import "./MasterData.css";

function MasterData() {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const md = useMasterData(BASE_URL);

  // ================= SAVE =================
  const handleSave = async () => {
    try {
      // ================= DEPARTMENT =================
      if (md.activetab === "department") {
        if (!md.name || !md.code) return md.swalError("Name and Code required");

        const url = md.editdept
          ? `${BASE_URL}/department/${md.editdept.id}/update`
          : `${BASE_URL}/department/`;

        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: md.name, code: md.code }),
        });

        const data = await res.json();
        console.log("Department:", res.status, data);

        if (!res.ok) {
          throw new Error(data.detail || "Department save failed");
        }

        if (md.editdept) {
          md.setDepartment((prev) =>
            prev.map((d) => (d.id === data.id ? data : d)),
          );
          md.swalSuccess("Department updated");
        } else {
          md.setDepartment((prev) => [...prev, data]);
          md.swalSuccess("Department added");
        }
      }

      // ================= ROLE =================
      else if (md.activetab === "role") {
        if (!md.rname || !md.rcode)
          return md.swalError("Role name & code required");

        const url = md.editRole
          ? `${BASE_URL}/role/${md.editRole.role_id}/update`
          : `${BASE_URL}/role/`;

        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role_name: md.rname, role_code: md.rcode }),
        });

        const data = await res.json();
        console.log("Role:", res.status, data);

        if (!res.ok) {
          throw new Error(data.detail || "Role save failed");
        }

        if (md.editRole) {
          md.setRole((prev) =>
            prev.map((r) => (r.role_id === data.role_id ? data : r)),
          );
          md.swalSuccess("Role updated");
        } else {
          md.setRole((prev) => [...prev, data]);
          md.swalSuccess("Role added");
        }
      }

      // ================= CATEGORY =================
      else if (md.activetab === "category") {
        if (!md.cname) return md.swalError("Category name required");

        let imageUrl = md.editCategory?.image_url || "";

        if (md.imageFile) {
          const fd = new FormData();
          fd.append("upload_file", md.imageFile);
          const up = await fetch(`${BASE_URL}/files/uploadfile`, {
            method: "POST",
            body: fd,
          });
          const upData = await up.json();

          if (!up.ok) {
            throw new Error(upData.detail || "Image upload failed");
          }

          imageUrl = upData.image_url;
        }

        const payload = { category_name: md.cname, image_url: imageUrl };

        const url = md.editCategory
          ? `${BASE_URL}/category/${md.editCategory.category_id}/update`
          : `${BASE_URL}/category/`;

        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        console.log("Category:", res.status, data);

        if (!res.ok) {
          throw new Error(data.detail || "Category save failed");
        }

        if (md.editCategory) {
          md.setCategory((prev) =>
            prev.map((c) => (c.category_id === data.category_id ? data : c)),
          );
          md.swalSuccess("Category updated");
        } else {
          md.setCategory((prev) => [...prev, data]);
          md.swalSuccess("Category added");
        }
      }

      // ================= RESET =================
      md.setShowAddModel(false);
      md.setEditdept(null);
      md.setEditRole(null);
      md.setEditCategory(null);
      md.setName("");
      md.setCode("");
      md.setRname("");
      md.setRcode("");
      md.setCname("");
      md.setImageFile(null);
    } catch (err) {
      console.error("SAVE ERROR:", err);
      md.swalError(err.message || "Save failed");
    }
  };

  // ================= DELETE =================
  const deleteDept = async (id) => {
    const ok = await md.swalConfirm("Delete department?");
    if (!ok.isConfirmed) return;
    try {
      const res = await fetch(`${BASE_URL}/department/${id}/delete`);
      let data = {};
      try {
        data = await res.json();
      } catch {
        data = {};
      }
      if (!res.ok) {
        throw new Error(data.detail || "failed to delete Department");
      }
      md.setDepartment((prev) => prev.filter((d) => d.id !== id));
      md.swalSuccess("Deleted");
    } catch (err) {
      console.error("DELETE ERROR:", err);
      md.swalError(err.message || "Delete failed");
    }
  };

  const deleteRole = async (id) => {
    const ok = await md.swalConfirm("Delete role?");
    if (!ok.isConfirmed) return;
    try {
      const res = await fetch(`${BASE_URL}/role/${id}/delete`);
      let data = {};

      try {
        data = await res.json();
      } catch {
        data = {};
      }
      if (!res.ok) {
        throw new Error(data.detail || "failed to delete Role");
      }

      md.setRole((prev) => prev.filter((r) => r.role_id !== id));
      md.swalSuccess("Deleted");
    } catch (err) {
      console.error("DELETE ERROR:", err);
      md.swalError(err.message || "Delete failed");
    }
  };

  const deleteCategory = async (id) => {
    const ok = await md.swalConfirm("Delete category?");
    if (!ok.isConfirmed) return;
    try {
      const res = await fetch(`${BASE_URL}/category/${id}/delete`);

      let data = {};
      try {
        data = await res.json();
      } catch {
        data = {};
      }
      if (!res.ok) {
        throw new Error(data.detail || "failed to delete category");
      }
      md.setCategory((prev) => prev.filter((c) => c.category_id !== id));
      md.swalSuccess("Deleted");
    } catch (err) {
      console.error("DELETE ERROR:", err);
      md.swalError(err.message || "Delete failed");
    }
  };

  // ================= UI =================
  return (
    <div className="main-page">
      <Header />

      <div className="tabs">
        <IoIosArrowBack
          className="back-icon"
          onClick={() => navigate("/dashboard")}
        />
        <span
          onClick={() => md.setactivetab("department")}
          className={md.activetab === "department" ? "tab-active" : "tab"}
        >
          Department
        </span>
        <span
          onClick={() => md.setactivetab("role")}
          className={md.activetab === "role" ? "tab-active" : "tab"}
        >
          Role
        </span>
        <span
          onClick={() => md.setactivetab("category")}
          className={md.activetab === "category" ? "tab-active" : "tab"}
        >
          Category
        </span>
      </div>

      <AddButton
        onAdd={() => {
          md.setEditdept(null);
          md.setEditRole(null);
          md.setEditCategory(null);

          md.setName("");
          md.setCode("");
          md.setRname("");
          md.setRcode("");
          md.setCname("");
          md.setImageFile(null);

          md.setShowAddModel(true);
        }}
      />

      <div className="main-content">
        {md.loading && <p>Loading...</p>}
        {md.error && <p>{md.error}</p>}

        {md.activetab === "department" && (
          <Department
            dep={md.department}
            onEdit={(d) => {
              md.setEditdept(d);
              md.setName(d.name);
              md.setCode(d.code);
              md.setShowAddModel(true);
            }}
            onDelete={deleteDept}
          />
        )}
        {md.activetab === "role" && (
          <Role
            roles={md.role}
            OnEdit={(r) => {
              md.setEditRole(r);
              md.setRname(r.role_name);
              md.setRcode(r.role_code);
              md.setShowAddModel(true);
            }}
            onDelete={deleteRole}
          />
        )}
        {md.activetab === "category" && (
          <Category
            cat={md.category}
            onEdit={(c) => {
              md.setEditCategory(c);
              md.setCname(c.category_name);
              md.setImageFile(null);
              md.setShowAddModel(true);
            }}
            onDelete={deleteCategory}
          />
        )}
      </div>

      {md.showAddModel && (
        <AddEditModal
          {...md}
          onClose={() => md.setShowAddModel(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default MasterData;
