import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast';


const Size = () => {
  let [data, setData] = useState([])

  const getApiData = async () => {
    try {
      let res = await axios.get("https://www.api.prvlite.com/api/size")
      setData(res.data.data.reverse()); // Reversing the order of sizes
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getApiData()
  }, [])

  const deleteProduct = async (_id) => {
    try {
      let res = await axios.delete("https://www.api.prvlite.com/api/size/" + _id)
      if (res.status === 200) {
        toast.success("Size Deleted successfully");
      } else {
        toast.error("Failed to delete Size");
      }
      getApiData()
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
                <h2 className='text-center'>Admin Size Table </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 " style={{ marginTop: 35 }}>
            <Sidebar />
          </div>
          <div className="col-md-9">
            <Link to="/admin/size/create" className='btn btn-secondary float-end mb-5'>Create Size</Link>
            <table className='table table-bordered table-responsive'>
              <thead>
                <tr>
                  <th>Maincategory</th>
                  <th>Size</th>
                  <th colSpan={2}>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.map((item, index) =>
                    <tr key={index}>
                      <td>{item.maincategory}</td>
                      <td>{item.sizename}</td>
                      <td><Link to={`/editsize/${item._id}`} className='btn btn-success'>Edit</Link></td>
                      <td><button className='btn btn-danger' onClick={() => { deleteProduct(item._id) }}>Delete</button></td>
                    </tr>
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Size
