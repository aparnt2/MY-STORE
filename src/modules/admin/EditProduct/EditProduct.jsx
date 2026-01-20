import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../../../Components/Header/Header'
import ProductForm from '../../../Components/ProductForm/ProductForm'
import { IoIosArrowBack } from "react-icons/io"

function EditProduct() {
  const navigate = useNavigate()
  const location = useLocation()
  const[category,setCategory]=useState([])

  // Get product from previous page
  const product = location.state?.product

  if (!product) return <h3>No product data found</h3>

  const BASE_URL = import.meta.env.VITE_BASE_URL
  //get categories
  useEffect(()=>{
    const fetchdata=async()=>{
        const res=await fetch(`${BASE_URL}/category/`)
        const categories=await res.json()
        setCategory(categories.categories)
    }
    fetchdata()
  },[])

  // Function to upload a new image if selected
  const uploadImage = async (imageFile) => {
    if (!imageFile) return null

    const formData = new FormData()
    formData.append('upload_file', imageFile)

    try {
      const res = await fetch(`${BASE_URL}/files/uploadfile`, {
        method: 'POST',
        body: formData
      })

      const data = await res.json()
      return data.image_url
    } catch (err) {
      console.error("Image upload failed", err)
      alert("Failed to upload image")
      return null
    }
  }

  // Function to handle form submission
  const handleEditProduct = async (data) => {
    try {
      // 1. Upload new image if selected, otherwise use old image
      const image_url = data.imageFile
        ? await uploadImage(data.imageFile)
        : product.image_url

      // 2. Prepare payload
      const payload = {
        product_name: data.product_name,
        price: Number(data.price),
        stock: Number(data.stock),
        description: data.description,
        category_id: Number(data.category_id),
        image_url
      }

      // 3. Send POST request to your backend update endpoint
      const res = await fetch(`${BASE_URL}/product/${product.product_id}/update`, {
        method: 'POST',   
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!res.ok) throw new Error("Failed to update product")

      alert("Product updated successfully")
      navigate('/admin/view-product')
    } catch (err) {
      console.error(err)
      alert("Error updating product")
    }
  }

  return (
    <>
      <Header />

      <div className='heading'>
        <IoIosArrowBack
          className='back-icon'
          onClick={() => navigate('/view-product')}
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
          category_id: product.category.category_id,
          image_url: product.image_url
        }}
        submitText="Update"
        onSubmit={handleEditProduct}
      />
    </>
  )
}

export default EditProduct
