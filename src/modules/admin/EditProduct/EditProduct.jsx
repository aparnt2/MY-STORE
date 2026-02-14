import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../Components/Header/AdminHeader";
import ProductForm from "../../../Components/ProductForm/ProductForm";
import { IoIosArrowBack } from "react-icons/io";
import "./EditProduct.css";
import { useParams } from "react-router-dom";

import Swal from "sweetalert2";

function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const [category, setCategory] = useState([]);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${BASE_URL}/product/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
  }, [id]);

  //get categories
  useEffect(() => {
    const fetchdata = async () => {
      const res = await fetch(`${BASE_URL}/category/`);
      const categories = await res.json();
      setCategory(categories.categories);
    };
    fetchdata();
  }, []);

  // Function to upload a new image if selected
  const uploadImage = async (imageFile) => {
    if (!imageFile) return null;

    const formData = new FormData();
    formData.append("upload_file", imageFile);

    try {
      const res = await fetch(`${BASE_URL}/files/uploadfile`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      return data.image_url;
    } catch (err) {
      console.error("Image upload failed", err);

      await Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: "Failed to upload image.",
      });

      return null;
    }
  };

  // Function to handle form submission
  const handleEditProduct = async (data) => {
    try {
      Swal.fire({
        title: "Updating product...",
        text: "Please wait",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // 1. Upload new image if selected, otherwise use old image
      const image_url = data.imageFile
        ? await uploadImage(data.imageFile)
        : product.image_url;

      if (!image_url) throw new Error("Image upload failed");

      // 2. Prepare payload
      const payload = {
        product_name: data.product_name,
        price: Number(data.price),
        stock: Number(data.stock),
        description: data.description,
        category_id: Number(data.category_id),
        image_url,
      };

      // 3. Send update request
      const res = await fetch(
        `${BASE_URL}/product/${product.product_id}/update`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.detail || "Update failed");
      }

      await Swal.fire({
        icon: "success",
        title: "Updated",
        text: "Product updated successfully.",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/view-product");
    } catch (err) {
      console.error(err);

      await Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
      });
    }
  };
  if (!product) return <h3>Loading...</h3>;

  return (
    <>
      <Header />

      <div className="heading">
        <IoIosArrowBack
          className="back-icon"
          onClick={() => navigate("/view-product")}
        />
        <h3>Edit Product</h3>
      </div>

      <ProductForm
        categories={category}
        initialData={{
          product_name: product.product_name,
          price: product.price,
          stock: product.stock,
          description: product.description,
          category_id: product.category.category_id || "",
          image_url: product.image_url,
        }}
        submitText="Update"
        onSubmit={handleEditProduct}
      />
    </>
  );
}

export default EditProduct;
