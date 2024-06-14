import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import toast from 'react-hot-toast';

const CreateSubcategory = () => {
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
    console.log(data)
    try {
      let res = await axios.post("https://www.api.prvlite.com/api/subcategory", data);
      if (res.status === 200) {
        toast.success("Subcategory Created successfully");
        navigate("/admin/subcategory");
      } else {
        toast.error("Failed to add subcategory");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApiDataCategory();
  }, []);

  return (
    <>
      <div className="blue_bg mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="titlepage">
                <h2 className='text-center mb-5'>Add A New SubCategory</h2>
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
                    <option >Choose Main Category</option>
                    {
                      allCategory.map((item, index) => {
                        return <option key={index} >{item.maincategory}</option>;
                      })
                    }
                  </select>
                </div>
              </div>
              <div className="row">
                <div className='col'>
                  <label htmlFor="">SubCategory Name <span className='text-danger'>*</span></label>
                  <input type="text" className="form-control" name='subcategory' onChange={getInputData} required placeholder="SubCategory Name" />
                </div>
                <button className='btn mt-2 mb-3 text-light text-center w-100' onClick={postData} style={{ backgroundColor: "#183661" }}>Add Category</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateSubcategory;
