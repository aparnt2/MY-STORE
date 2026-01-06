import React, { useEffect, useState } from 'react'
import { LuUpload } from "react-icons/lu"
import './ProductForm.css'

function ProductForm({
  initialData = {},
  categories = [],
  onSubmit,
  submitText
}) {
  const [formData, setFormData] = useState({
    product_name: "",
    price: "",
    stock: "",
    description: ""
  })

  const [selectedCate, setSelectedCate] = useState("")
  const [imgPreview, setImgPreview] = useState(null)
  const [imageFile, setImageFile] = useState(null)

  // validation errors
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setFormData({
      product_name: initialData.product_name || "",
      price: initialData.price || "",
      stock: initialData.stock || "",
      description: initialData.description || ""
    })

    setSelectedCate(initialData.category_id || "")
    setImgPreview(initialData.image_url || null)
  }, [initialData])

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImgPreview(URL.createObjectURL(file))
    setImageFile(file)
  }

  // validate form before submit
const validate = () => {
  const newErrors = {}

  if (!formData.product_name.trim()) newErrors.product_name = "Product Name is required"

  if (!formData.price.trim()) {
    newErrors.price = "Price is required"
  } else if (isNaN(formData.price)) {
    newErrors.price = "Price must be a number"
  }

  if (!formData.stock.trim()) {
    newErrors.stock = "Stock is required"
  } else if (isNaN(formData.stock)) {
    newErrors.stock = "Stock must be a number"
  }

  if (!selectedCate) newErrors.category = "Category is required"
  if (!formData.description.trim()) newErrors.description = "Description is required"

  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}


  const handleSubmit = () => {
    if (!validate()) return
    onSubmit({
      ...formData,
      category_id: selectedCate,
      imageFile
    })
  }

  return (
    <div className='content'>
      <div className='body'>
        {/* Image Section */}
        <div className='img-section'>
          <h4>Select Product Image</h4>
          <label className='upload-box'>
            {imgPreview ? (
              <img src={imgPreview} alt="preview" className='preview-img' />
            ) : (
              <div className='upload'>
                <LuUpload className='upload-image' />
                <p>Upload Image</p>
                <small>JPG, PNG up to 5MB</small>
              </div>
            )}
            <input type='file' hidden onChange={handleImage} />
          </label>
        </div>

        {/* Form Section */}
        <div className='add-product-section'>
          {/* Product Name */}
          <div className='form-group'>
            {errors.product_name && <div className='error-message'>{errors.product_name}</div>}
            <label>Product Name</label>
            <input
            
              value={formData.product_name}
              onChange={e => setFormData({ ...formData, product_name: e.target.value })}
            />
          </div>

          {/* Price & Stock */}
          <div className='price-stock'>
            <div className='form-group'>
              {errors.price && <div className='error-message'>{errors.price}</div>}
              <label>Price</label>
              <input
              
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: e.target.value })}
              />
            </div>

            <div className='form-group'>
              {errors.stock && <div className='error-message'>{errors.stock}</div>}
              <label>Stock</label>
              <input
              type='number'
                value={formData.stock}
                onChange={e => setFormData({ ...formData, stock: e.target.value })}
              />
            </div>
          </div>

          {/* Category */}
          <div className='form-group'>
            {errors.category && <div className='error-message'>{errors.category}</div>}
            <label>Category</label>
            <select
              value={selectedCate}
              onChange={e => setSelectedCate(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map(c => (
                <option key={c.category_id} value={c.category_id}>
                  {c.category_name}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className='form-group'>
            {errors.description && <div className='error-message'>{errors.description}</div>}
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className='buttoncontainer'>
        <button className='btn-save' onClick={handleSubmit}>
          {submitText}
        </button>
      </div>
    </div>
  )
}

export default ProductForm
