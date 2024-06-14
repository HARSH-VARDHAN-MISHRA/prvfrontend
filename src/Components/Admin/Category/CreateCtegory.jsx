import React, { useState } from 'react'
import Sidebar from '../Sidebar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';

const CreateCtegory = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    maincategory: ""
  })

  const getInputData = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  const postData = async (e) => {
    e.preventDefault()
    // alert(name)
    try {
      let res = await axios.post("https://www.api.prvlite.com/api/category", data)
      if (res.status === 200) {
        toast.success("Maincategory Created successfully");
        navigate("/admin/category");
      } else {
        toast.error("Failed to add product");
      }
    } catch (error) {
      console.log(error);
    }

  }


  return (
    <>
      <div className="blue_bg mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="titlepage">
                <h2 className='text-center mb-5'>Add A New Category</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3" style={{ marginTop: "-35px" }}>
            <Sidebar />
          </div>
          <div className="col-md-9 ">
            <form action="" >
              <div className="row">
                <div className='col'>
                  <label htmlFor="">Category Name <span className='text-danger'>*</span></label>
                  <input type="text" className="form-control" name='maincategory' onChange={getInputData} required placeholder="Category Name" />
                </div>
                <button className='btn  mt-2 mb-3 text-light text-center w-100' onClick={postData} style={{ backgroundColor: "#183661" }}>Add Category</button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </>
  )
}

export default CreateCtegory