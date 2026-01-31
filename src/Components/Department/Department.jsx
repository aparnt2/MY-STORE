import React from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import './Department.css';

function Department({ dep, onEdit, onDelete }) {
  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
           
            <th>Code</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dep.map(d => (
            <tr key={d.id}>
             
              <td>{d.code}</td>
              <td>{d.name}</td>
              <td>
                <button className="edit-btn" onClick={() => onEdit(d)}>
                  <FaEdit />
                </button>
                <button className="delete-btn" onClick={() => onDelete(d.id)}>
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Department;
