import React from 'react'
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar'

const AdminHome = () => {
  return (
   <>
    
      <div className="container-fluid">
        <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        </div>
      </div>
   </>
  )
}

export default AdminHome