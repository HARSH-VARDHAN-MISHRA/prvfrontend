import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../Sidebar';
import toast from 'react-hot-toast';


const UpdateSubcategory = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [allCategory, setAllCategory] = useState([]);
  const [data, setData] = useState({
    maincategory: "",
    subcategory: ""
  });
  const getInputData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const getApiDataCategory = async () => {
    try {
      let res = await axios.get("https://www.api.prvlite.com/api/category");
      setAllCategory(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const postData = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.put(`https://www.api.prvlite.com/api/subcategory/${_id}`, data);
      console.log(res);
      if (res.status === 200) {
        toast.success("Subcategory updated successfully");
        navigate("/admin/subcategory");
      } else {
        toast.error("Failed to add subcategory");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getApiData = async () => {
    try {
      let res = await axios.get(`https://www.api.prvlite.com/api/subcategory/${_id}`);
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApiData();
    getApiDataCategory()
  }, []);

  useEffect(() => {
    if (allCategory.length > 0) {
      setData(prevData => ({
        ...prevData,
        maincategory: allCategory[0].maincategory
      }));
    }
  }, [allCategory]);

  return (
    <>
      <div className="blue_bg mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="titlepage">
                <h2 className='text-center mb-5'>Update Subcategory</h2>
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
            <form>
              <div className="row">
                <div className='col'>
                  <label htmlFor="">Select Maincategory <span className='text-danger'>*</span></label>
                  <select name="maincategory" onChange={getInputData} className='form-control'>
                    <option selected disabled>Choose Main Category</option>
                    {
                      allCategory.map((item, index) => {
                        return <option key={index}  >{item.maincategory}</option>;
                      })
                    }
                  </select>
                </div>
              </div>
              <div className="row">
                <div className='col'>
                  <label htmlFor="name">Subcategory Name <span className='text-danger'>*</span></label>
                  <input type="text" className="form-control" name='subcategory' value={data.subcategory} onChange={getInputData} required placeholder="Subcategory Name" />
                </div>
                <button className='btn mt-2 mb-3 text-light text-center w-100' onClick={postData} style={{ backgroundColor: "#183661" }}>Update Subcategory</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdateSubcategory;
