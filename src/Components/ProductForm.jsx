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

  const handleSubmit = () => {
    onSubmit({
      ...formData,
      category_id: selectedCate,
      imageFile
    })
  }

  return (
    <div className='content'>
      <div className='body'>
        <div className='img-section'>
          <h4>Product Image</h4>

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

        <div className='add-product-section'>
          <div className='form-group'>
            <label>Product Name</label>
            <input
              value={formData.product_name}
              onChange={e => setFormData({ ...formData, product_name: e.target.value })}
            />
          </div>

          <div className='price-stock'>
            <div className='form-group'>
              <label>Price</label>
              <input
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: e.target.value })}
              />
            </div>

            <div className='form-group'>
              <label>Stock</label>
              <input
                value={formData.stock}
                onChange={e => setFormData({ ...formData, stock: e.target.value })}
              />
            </div>
          </div>

          <div className='form-group'>
            <label>Category</label>
            <select
              value={selectedCate}
              onChange={e => setSelectedCate(e.target.value)}
            >
              <option value="">Select Category</option>
              {
                categories.map(c => (
                  <option key={c.category_id} value={c.category_id}>
                    {c.category_name}
                  </option>
                ))}
            </select>
          </div>

          <div className='form-group'>
            <label>Description</label>
            <input
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className='buttoncontainer'>
        <button className='btn-save' onClick={handleSubmit}>
          {submitText}
        </button>
      </div>
    </div>
  )
}

export default ProductForm
