import React, { useEffect, useState } from "react";
import Header from "../../../Components/Header/AdminHeader";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import ProductForm from "../../../Components/ProductForm/ProductForm";
import "./AddProduct.css";
import Swal from "sweetalert2";

function AddProduct() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/category/`)
      .then((res) => res.json())
      .then((data) => setCategories(data.categories));
  }, []);

  const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("upload_file", imageFile);

    const res = await fetch(`${BASE_URL}/files/uploadfile`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.image_url;
  };

  const handleAddProduct = async (data) => {
    if (!data.imageFile || !data.category_id) {
      await Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Image and category are required.",
      });
      return false;
    }

    try {
      Swal.fire({
        title: "Uploading...",
        text: "Please wait",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const image_url = await uploadImage(data.imageFile);

      const payload = {
        product_name: data.product_name,
        price: Number(data.price),
        stock: Number(data.stock),
        description: data.description,
        image_url,
        category_id: Number(data.category_id),
      };

      const res = await fetch(`${BASE_URL}/product/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.detail || "save failed");
      }

      await Swal.fire({
        icon: "success",
        title: "Product Added",
        text: "Product has been added successfully.",
        timer: 1500,
        showConfirmButton: false,
        customClass: {
          popup: "modern-popup success-border",
          title: "modern-title",
          htmlContainer: "modern-text",
        },
      });

      navigate("/view-product");
      return true;
    } catch (error) {
      console.error(error);

      await Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });

      return false;
    }
  };

  return (
    <>
      <Header />

      <div className="heading">
        <IoIosArrowBack
          className="back-icon"
          onClick={() => navigate("/dashboard")}
        />
        <h3>Add Product</h3>
      </div>

      <ProductForm
        categories={categories}
        initialData={{
          product_name: "",
          price: "",
          stock: "",
          description: "",
          category_id: "",
          image_url: "",
        }}
        submitText="Add"
        onSubmit={handleAddProduct}
      />
    </>
  );
}

export default AddProduct;
