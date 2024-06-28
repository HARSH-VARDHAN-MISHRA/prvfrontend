import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const AdminProduct = () => {
   const [data, setData] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [productsPerPage] = useState(8); // Number of products per page

   const deleteProduct = async (_id) => {
      try {
         const token = localStorage.getItem('token');
         const res = await axios.delete(`https://www.api.prvlite.com/api/product/${_id}`, {
            headers: {
               Authorization: `${token}`
            }
         });
         if (res.status === 200) {
            toast.success("Product Deleted successfully");
         } else {
            toast.error("Failed to Delete product");
         }
         getAPIData();
      } catch (error) {
         console.log(error);
      }
   }

   const getAPIData = async () => {
      try {
         const token = localStorage.getItem('token');
         const res = await axios.get("https://www.api.prvlite.com/api/product", {
            headers: {
               Authorization: `${token}`
            }
         });
         setData(res.data.data.reverse()); // Reversing the order of products
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      getAPIData();
   }, []);

   // Get current products
   const indexOfLastProduct = currentPage * productsPerPage;
   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
   const currentProducts = data.slice(indexOfFirstProduct, indexOfLastProduct);

   // Change page
   const paginate = pageNumber => setCurrentPage(pageNumber);

   return (
      <>
         <div className="blue_bg mt-5">
            <div className="container">
               <div className="row">
                  <div className="col-md-12">
                     <div className="titlepage justify-content-around d-flex">
                        <h2 className='text-center'>All Products </h2>
                        <Link to="/admin/product/create" className='btn btn-secondary float-end mb-5'>Create Product</Link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="container-fluid">
            <div className="row">
               <div className="col-md-3" style={{ marginTop: 35 }}>
                  <Sidebar />
               </div>
               <div className="col-md-9">
                  <div className="table-responsive">
                     <table className='table table-bordered'>
                        <thead>
                           <tr>
                              {/* <th>Id</th> */}
                              <th>Name</th>
                              <th>Brand</th>
                              <th>Category</th>
                              <th>SubCategory</th>
                              <th>Color</th>
                              <th>Size</th>
                              <th>Stock</th>
                              <th>pic</th>
                              <th>pic</th>
                              <th>pic</th>
                              <th>pic</th>
                              <th colSpan={2}>Action</th>
                           </tr>
                        </thead>
                        <tbody>
                           {
                              currentProducts.map((item, index) =>
                                 <tr key={index}>
                                    {/* <td>{item._id}</td> */}
                                    <td>{item.name}</td>
                                    <td>{item.brand}</td>
                                    <td>{item.maincategory}</td>
                                    <td>{item.subcategory}</td>
                                    <td>{item.color}</td>
                                    <td>{item.sizename}</td>
                                    <td>{item.stock}</td>
                                    <td><img src={item.pic1} alt="" style={{ height: 50 }} /></td>
                                    <td><img src={item.pic2} alt="" style={{ height: 50 }} /></td>
                                    <td><img src={item.pic3} alt="" style={{ height: 50 }} /></td>
                                    <td><img src={item.pic4} alt="" style={{ height: 50 }} /></td>
                                    <td><Link to={`/editproduct/${item._id}`} className='btn btn-success'>Edit</Link></td>
                                    <td><button className='btn btn-danger' onClick={() => { deleteProduct(item._id) }}>Delete</button></td>
                                 </tr>
                              )}
                        </tbody>
                     </table>
                     <Pagination
                        productsPerPage={productsPerPage}
                        totalProducts={data.length}
                        paginate={paginate}
                     />
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}

const Pagination = ({ productsPerPage, totalProducts, paginate }) => {
   const pageNumbers = [];

   for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
      pageNumbers.push(i);
   }

   return (
      <nav>
         <ul className='pagination justify-content-center'>
            {pageNumbers.map(number => (
               <li key={number} className='page-item'>
                  <button onClick={() => paginate(number)}  className='page-link'>
                     {number}
                  </button>
               </li>
            ))}
         </ul>
      </nav>
   );
}

export default AdminProduct;
