import React from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import './Role.css';

function Role({ roles, OnEdit, onDelete }) {
  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Code</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map(r => (
            <tr key={r.role_id}>
              <td>{r.role_id}</td>
              <td>{r.role_code}</td>
              <td>{r.role_name}</td>
              <td>
                <button className="edit-btn" onClick={() => OnEdit(r)}>
                  <FaEdit size={16} />
                </button>
                <button className="delete-btn" onClick={() => onDelete(r.role_id)}>
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

export default Role;
