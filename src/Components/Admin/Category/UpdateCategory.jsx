import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const UpdateCategory = () => {
    const { _id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({
        maincategory: ""
    });

    const getInputData = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const postData = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.put(`https://www.api.prvlite.com/api/category/${_id}`, data);
            console.log(res);
            if (res.status === 200) {
                toast.success("Maincategory Updated successfully")
                navigate("/admin/category");
            } else {
                toast.error("Failed deletd");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getApiData = async () => {
        try {
            let res = await axios.get(`https://www.api.prvlite.com/api/category/${_id}`);
            setData(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getApiData();
    }, []);

    return (
        <>
            <div className="blue_bg mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="titlepage">
                                <h2 className='text-center mb-5'>Update  Category</h2>
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
                                    <label htmlFor="name">Category Name <span className='text-danger'>*</span></label>
                                    <input type="text" className="form-control" name='maincategory' value={data.maincategory} onChange={getInputData} required placeholder="Category Name" />
                                </div>
                                <button className='btn mt-2 mb-3 text-light text-center w-100' onClick={postData} style={{ backgroundColor: "#183661" }}>Update Category</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdateCategory;
