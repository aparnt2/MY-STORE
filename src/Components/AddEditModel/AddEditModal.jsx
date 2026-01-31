import React, { useState, useEffect } from 'react';
import './AddEditModal.css';
import { LuUpload } from 'react-icons/lu'; // make sure this import exists if you use it

function AddEditModal({
  activetab,
  editdept,
  editRole,
  editCategory,
  name,
  setName,
  code,
  setCode,
  rname,
  setRname,
  rcode,
  setRcode,
  cname,
  setCname,
 
  imageFile,
  setImageFile,
  onClose,
  onSave
}) {
 
  const [preview, setPreview] = useState(editCategory?.image_url || null);

  useEffect(() => {
    if (imageFile) {
      const objectUrl = URL.createObjectURL(imageFile);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (editCategory?.image_url) {
      setPreview(editCategory.image_url); // show existing image if no new file
    } else {
      setPreview(null);
    }
  }, [imageFile, editCategory]);

  return (
    <div className='modal-layout'>
      <div className='model'>
        <h3>
          {activetab === 'department' && (editdept ? 'Edit Department' : 'Add Department')}
          {activetab === 'role' && (editRole ? 'Edit Role' : 'Add Role')}
          {activetab === 'category' &&(editCategory ? 'Edit Category' : 'Add Category')}
        </h3>

        <div className='model-form'>
          {/* Department Inputs */}
          {activetab === 'department' && (
            <>
             <label>Department Name</label>
              <input
                type="text"
                placeholder="Enter department name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
               <label>Department Code</label>
              <input
                type="text"
                placeholder="Enter department code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </>
          )}

          {/* Role Inputs */}
          {activetab === 'role' && (
            <>
            <label>Role Name</label>
              <input
                type="text"
                placeholder="Enter role name"
                value={rname}
                onChange={(e) => setRname(e.target.value)}
              />
              <label>Role Code</label>
              <input
                type="text"
                placeholder="Enter role code"
                value={rcode}
                onChange={(e) => setRcode(e.target.value)}
              />
            </>
          )}

          {/* Category Inputs */}
          {activetab === 'category' && (
            <>
            <label>Category Name</label>
              <input
                type="text"
                placeholder="Enter category name"
                value={cname}
                onChange={(e) => setCname(e.target.value)}
              />
            
              <div className="image-upload-container">
                <label className="upload-box">
                  {preview ? (
                    <img src={preview} alt="Preview" className="image-preview" />
                  ) : (
                    <div className="upload-placeholder">
                      <LuUpload className="upload-icon" />
                      <p>Upload Image</p>
                      <small>JPG, PNG up to 5MB</small>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => setImageFile(e.target.files[0])}
                  />
                </label>
              </div>
            </>
          )}
        </div>

        <div className='btn-section'>
          <button className='btn-cancel' onClick={onClose}>Cancel</button>
          <button className='btn-save' onClick={onSave}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default AddEditModal;
