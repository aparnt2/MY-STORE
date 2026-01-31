import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function useMasterData(BASE_URL) {
  const [activetab, setactivetab] = useState("department");
  const [showAddModel, setShowAddModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // data
  const [department, setDepartment] = useState([]);
  const [role, setRole] = useState([]);
  const [category, setCategory] = useState([]);

  // form fields
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [rname, setRname] = useState("");
  const [rcode, setRcode] = useState("");
  const [cname, setCname] = useState("");
  const [imageFile, setImageFile] = useState(null);

  // edit states
  const [editdept, setEditdept] = useState(null);
  const [editRole, setEditRole] = useState(null);
  const [editCategory, setEditCategory] = useState(null);

  // ================= FETCH ALL =================
  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const [d, r, c] = await Promise.all([
        fetch(`${BASE_URL}/department/`).then(r => r.json()),
        fetch(`${BASE_URL}/role/`).then(r => r.json()),
        fetch(`${BASE_URL}/category/`).then(r => r.json()),
      ]);

      setDepartment(d.departments || []);
      setRole(r.roles || []);
      setCategory(c.categories || []);
    } catch (err) {
      console.error(err);
      setError("Error loading master data");
    } finally {
      setLoading(false);
    }
  };

  // ================= ALERTS =================
  const swalSuccess = (text) =>
    Swal.fire({ icon: "success", title: "Success", text, timer: 1500, showConfirmButton: false });

  const swalError = (text) =>
    Swal.fire({ icon: "error", title: "Error", text, confirmButtonColor: "#dc2626" });

  const swalConfirm = (text) =>
    Swal.fire({
      title: "Are you sure?",
      text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

  return {
    // tabs & modal
    activetab, setactivetab,
    showAddModel, setShowAddModel,

    // data
    department, setDepartment,
    role, setRole,
    category, setCategory,

    // fields
    name, setName,
    code, setCode,
    rname, setRname,
    rcode, setRcode,
    cname, setCname,
    imageFile, setImageFile,

    // edit
    editdept, setEditdept,
    editRole, setEditRole,
    editCategory, setEditCategory,

    // ui
    loading, error,

    // helpers
    swalSuccess, swalError, swalConfirm,
  };
}
