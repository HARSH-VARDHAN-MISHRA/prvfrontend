import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/HomaPageComponets/Navbar'
import Footer from './Components/HomaPageComponets/Footer'
import Home from './Components/user/Home'
import About from "./Components/user/About";
import Product from "./Components/user/Product";
import Contact from "./Components/user/Contact";
import Cart from "./Components/user/Cart";
import Login from "./Components/user/Login";
import Signup from "./Components/Admin/Signup";
import SinglePageProduct from "./Components/user/SinglePageProduct";
import AdminHome from "./Components/Admin/AdminHome";
import CreateProduct from "./Components/Admin/Product/CreateProduct";
import UpdateProduct from "./Components/Admin/Product/UpdateProduct";
import AdminProduct from "./Components/Admin/Product/AdminProduct";
import Orders from "./Components/user/Orders";
import PageNotFound from "./Components/user/PageNotFound";
import AdminOrder from "./Components/Admin/AdminOrder";
import SingleProductPage from "./Components/user/SingleProductPage";
import Category from "./Components/Admin/Category/Category";
import Subcategory from "./Components/Admin/Subcategory/Subcategory";
import CreateCtegory from "./Components/Admin/Category/CreateCtegory";
import UpdateCategory from "./Components/Admin/Category/UpdateCategory";
import CreateSubcategory from "./Components/Admin/Subcategory/CreateSubcategory";
import UpdateSubcategory from "./Components/Admin/Subcategory/UpdateSubcategory";
import CreateSize from "./Components/Admin/Size/CreateSize";
import Size from "./Components/Admin/Size/Size";
import UpdateSize from "./Components/Admin/Size/UpdateSize";
import toast, { Toaster } from 'react-hot-toast';
import SingleOrder from "./Components/user/SingleOrder";
import AdminSinglePageOrder from "./Components/Admin/AdminSinglePageOrder";
import Admincontact from "./Components/Admin/Contact/AdminContact";
import Invoice from "./Components/Admin/Invioce";
import CreateName from "./Components/Admin/Product/CreateName";
import Kids from "./Components/user/Kids";
import Mens from "./Components/user/Mens";
import Women from "./Components/user/Women";
import AllProductNames from "./Components/Admin/Product/AllProductNames";



function App() {
  const token = localStorage.getItem('token')
  return (
    <>
      <BrowserRouter >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:_id" element={<SingleProductPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/singlepage" element={<SinglePageProduct />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/singleorder/:_id" element={<SingleOrder />} />
          <Route path="/Kids" element={<Kids />} />
          <Route path="/Mens" element={<Mens />} />
          <Route path="/womens" element={<Women />} />




          {token ? (
            <>

              <Route path="/adminhome" element={<AdminHome />} />
              <Route path="/admin/product" element={<AdminProduct />} />
              <Route path="/admin/product/create" element={<CreateProduct />} />
              <Route path="/editproduct/:_id" element={<UpdateProduct />} />
              <Route path="/admin/category" element={<Category />} />
              <Route path="/admin/category/create" element={<CreateCtegory />} />
              <Route path="/editcategory/:_id" element={<UpdateCategory />} />
              <Route path="/admin/subcategory" element={<Subcategory />} />
              <Route path="/admin/subcategory/create" element={<CreateSubcategory />} />
              <Route path="/editsubcategory/:_id" element={<UpdateSubcategory />} />
              <Route path="/admin/size" element={<Size />} />
              <Route path="/admin/size/create" element={<CreateSize />} />
              <Route path="/editsize/:_id" element={<UpdateSize />} />
              <Route path="/admin/createName" element={<CreateName />} />
              <Route path="/admin/order" element={<AdminOrder />} />
              <Route path="/adminordersinglpage/:_id" element={<AdminSinglePageOrder />} />
              <Route path="/admin/contact" element={<Admincontact />} />
              <Route path="/admin/NamesOfProduct" element={<AllProductNames />} />
              
            </>
          ) :
            null
          }

          <Route path="/invoice" element={<Invoice />} />

          <Route path="/*" element={<PageNotFound />} />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>


    </>
  );
}

export default App;
