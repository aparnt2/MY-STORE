import React from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import './Category.css';

function Category({ cat, onEdit, onDelete }) {
  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cat.map(c => (
            <tr key={c.category_id}>
              <td>{c.category_id}</td>
              <td>
                <div className="image-wrapper">
                  <img src={c.image_url} alt={c.category_name} />
                </div>
              </td>
              <td>{c.category_name}</td>
              <td>
                <button className="edit-btn" onClick={() => onEdit(c)}>
                  <FaEdit size={16} />
                </button>
                <button className="delete-btn" onClick={() => onDelete(c.category_id)}>
                  <MdDelete size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Category;
