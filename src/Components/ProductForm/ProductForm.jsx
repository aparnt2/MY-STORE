import React, { useEffect, useState } from 'react'
import { LuUpload } from "react-icons/lu"
import './ProductForm.css'
import { useNavigate } from 'react-router-dom'

function ProductForm({
  initialData = {},
  categories = [],
  onSubmit,
  submitText
}) 
{
  const navigate=useNavigate()
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
      product_name: initialData.product_name ?? "",
      price: initialData.price != null ? String(initialData.price) : "",
      stock: initialData.stock != null ? String(initialData.stock) : "",
      description: initialData.description ?? ""
    })

    setSelectedCate(initialData.category_id ?? "")
    setImgPreview(initialData.image_url ?? null)
  }, [initialData])

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImgPreview(URL.createObjectURL(file))
    setImageFile(file)
  }

 const validate = () => {
  const e = {}

  if (!formData.product_name.trim()) {
    e.product_name = "Product name is required"
  } else if (formData.product_name.length < 3) {
    e.product_name = "Product name must be at least 3 characters"
  }

  if (!formData.price.trim()) {
    e.price = "Price is required"
  } else if (isNaN(formData.price) || Number(formData.price) <= 0) {
    e.price = "Price must be a positive number"
  }

  if (!formData.stock.trim()) {
    e.stock = "Stock is required"
  } else if (isNaN(formData.stock) || Number(formData.stock) < 0) {
    e.stock = "Stock must be 0 or more"
  }

  if (!selectedCate) {
    e.category = "Category is required"
  }

  if (!formData.description.trim()) {
    e.description = "Description is required"
  } else if (formData.description.length < 10) {
    e.description = "Description must be at least 10 characters"
  }

 if (!imageFile && !imgPreview) {
  e.image = "Product image is required"
}


  setErrors(e)
  return Object.keys(e).length === 0
}



 const handleSubmit = async () => {
  if (!validate()) return

  const success = await onSubmit({
    ...formData,
    category_id: selectedCate,
    imageFile
  })

  if (success) {
    
    setFormData({
      product_name: "",
      price: "",
      stock: "",
      description: ""
    })
    setSelectedCate("")
    setImgPreview(null)
    setImageFile(null)
    setErrors({})
  }
}

  return (
    <div className='product-container'>
      <div className='body'>
        {/* Image Section */}
        <div className='img-section'>
          <h4>Select Product Image</h4>
           <p className="error-text">{errors.image || " "}</p>
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
    <label>Product Name</label>
    <p className="error-text">{errors.product_name || " "}</p>
    <input
      value={formData.product_name}
      onChange={e => {
        setFormData({ ...formData, product_name: e.target.value })
        setErrors(prev => ({ ...prev, product_name: "" }))
      }}
    />
    
  </div>

  {/* Price */}
  <div className='form-group'>
    <label>Price</label>
      <p className="error-text">{errors.price || " "}</p>
    <input
      value={formData.price}
      onChange={e => {
        setFormData({ ...formData, price: e.target.value })
        setErrors(prev => ({ ...prev, price: "" }))
      }}
    />
  
  </div>

  {/* Stock */}
  <div className='form-group'>
    <label>Stock</label>
    <p className="error-text">{errors.stock || " "}</p>
    <input
      type="number"
      value={formData.stock}
      onChange={e => {
        setFormData({ ...formData, stock: e.target.value })
        setErrors(prev => ({ ...prev, stock: "" }))
      }}
    />
    
  </div>

  {/* Category */}
  <div className='form-group'>
    <label>Category</label>
     <p className="error-text">{errors.category || " "}</p>
    <select
      value={selectedCate}
      onChange={e => {
        setSelectedCate(e.target.value)
        setErrors(prev => ({ ...prev, category: "" }))
      }}
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
    <label>Description</label>
    <p className="error-text">{errors.description || " "}</p>
    <textarea
      value={formData.description}
      onChange={e => {
        setFormData({ ...formData, description: e.target.value })
        setErrors(prev => ({ ...prev, description: "" }))
      }}
    />
    
  </div>

</div>

      </div>

      {/* Submit Button */}
      <div className='buttoncontainer'>
        <button className='btn-cancel' onClick={()=>navigate(-1)}>Cancel</button>
        <button className='btn-save' onClick={handleSubmit}>
          {submitText}
        </button>
      </div>
    </div>
  )
}

export default ProductForm
