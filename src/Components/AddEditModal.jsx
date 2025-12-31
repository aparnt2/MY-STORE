import './AddEditModal.css'

function AddEditModal({
  activetab,
  editdept,
  editRole,
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
  ccode,
  setCcode,
  onClose,
  onSave
}) {
  return (
    <div className='modal-layout'>
      <div className='model'>
        <h3>
          {activetab === 'department' && (editdept ? 'Edit Department' : 'Add Department')}
          {activetab === 'role' && (editRole?'Edit Role':'Add Role')}
          {activetab === 'category' && 'Add Category'}
        </h3>

        <div className='content'>
          {activetab=='department' && (
            <>
            <input
            type="text"
            placeholder="enter department name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="enter department code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
            
            </>
          )}
          {
            activetab==='role' &&(
                <>
                <input
            type="text"
            placeholder="enter role name"
            value={rname}
            onChange={(e) => setRname(e.target.value)}
          />
          <input
            type="text"
            placeholder="enter role code"
            value={rcode}
            onChange={(e) => setRcode(e.target.value)}
          />
                </>
            )
          }
          {
            activetab==='category' &&(
              <>
              <input type='text' placeholder='enter category name' value={cname} onChange={(e=>setCname(e.target.value))}/>
              <input type='text' placeholder='enter category code' value={ccode} onChange={(e)=>setCcode(e.target.value)}/>
              </>
            )
          }
        </div>

        <div className='btn-section'>
          <button className='btn-cancel' onClick={onClose}>Cancel</button>
          <button className='btn-save' onClick={onSave}>Save</button>
        </div>
      </div>
    </div>
  )
}

export default AddEditModal;
