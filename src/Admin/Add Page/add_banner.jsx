
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Head from '../Head'
function AddBanner() {
  const [bannerName, setBannerName] = useState('');
  const [bannerImage, setBannerImage] = useState(null);
  const [status, setStatus] = useState('active');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('bannerName', bannerName);
      formData.append('bannerImage', bannerImage);
      formData.append('status', status);

      await axios.post('http://localhost:3001/banners', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Clear form fields after successful submission
      setBannerName('');
      setBannerImage(null);
      setStatus('active');
      navigate('/admin/banner');
    } catch (error) {
      console.error('Error adding banner:', error);
    }
  };

  const handleImageChange = (e) => {
    setBannerImage(e.target.files[0]);
  };
  return (
    <>
    <Head />
    <aside class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark" id="sidenav-main">
    <div class="sidenav-header">
      <i class="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
      <a class="navbar-brand m-0" href=" https://demos.creative-tim.com/material-dashboard/pages/dashboard " target="_blank">
        <img src="../assets/img/logo-ct.png" class="navbar-brand-img h-100" alt="main_logo"></img>
        <span class="ms-1 font-weight-bold text-white">Material Dashboard 2</span>
      </a>
    </div>
    <hr class="horizontal light mt-0 mb-2"></hr>
    <div class="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
      <ul class="navbar-nav">
        <li class="nav-item">
         <Link className="nav-link text-white " to="/admin/dashboard">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i class="material-icons opacity-10">dashboard</i>
            </div>
            <span class="nav-link-text ms-1">Dashboard</span>
          </Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link text-white " to="/admin/products">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i class="material-icons add_shopping_cart">add_shopping_cart</i>
            </div>
            <span class="nav-link-text ms-1">Products</span>
          </Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link text-white " to="/admin/category">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i class="material-icons category">category</i>
            </div>
            <span class="nav-link-text ms-1">Category</span>
          </Link>
        </li>
        <li class="nav-item">
          <a class="nav-link text-white " href="/admin/order">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i class="material-icons shopping_basket">shopping_basket</i>
            </div>
            <span class="nav-link-text ms-1">Orders</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-white active bg-gradient-primary" href="/admin/banner">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i class="material-icons star">star</i>
            </div>
            <span class="nav-link-text ms-1">Banners</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-white " href="/admin/profile">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i class="material-icons account_circle">account_circle</i>
            </div>
            <span class="nav-link-text ms-1">Profile</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-white " href="/admin/users">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i class="material-icons people">people</i>
            </div>
            <span class="nav-link-text ms-1">Users</span>
          </a>
        </li>
 
      </ul>
    </div>
  </aside>
  <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
    <nav class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" data-scroll="true">
        <div class="container-fluid py-1 px-3">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
            <li class="breadcrumb-item text-sm"><a class="opacity-5 text-dark" href="javascript:;">Pages</a></li>
            <li class="breadcrumb-item text-sm text-dark active" aria-current="page">Banner</li>
            </ol>
            <h6 class="font-weight-bolder mb-0">Banner</h6>
        </nav>
        <div class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
            <div class="ms-md-auto pe-md-3 d-flex align-items-center">
            <div class="input-group input-group-outline">
                <label class="form-label">Type here...</label>
                <input type="text" class="form-control"></input>
            </div>
            </div>
            <ul class="navbar-nav  justify-content-end">
            <li class="nav-item d-flex align-items-center">
                <a class="btn btn-outline-primary btn-sm mb-0 me-3" target="_blank" href="https://www.creative-tim.com/builder?ref=navbar-material-dashboard">Online Builder</a>
            </li>
            <li class="mt-2">
                <a class="github-button" href="https://github.com/creativetimofficial/material-dashboard" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star creativetimofficial/material-dashboard on GitHub">Star</a>
            </li>
            <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
                <a href="javascript:;" class="nav-link text-body p-0" id="iconNavbarSidenav">
                <div class="sidenav-toggler-inner">
                    <i class="sidenav-toggler-line"></i>
                    <i class="sidenav-toggler-line"></i>
                    <i class="sidenav-toggler-line"></i>
                </div>
                </a>
            </li>
            <li class="nav-item px-3 d-flex align-items-center">
                <a href="javascript:;" class="nav-link text-body p-0">
                <i class="fa fa-cog fixed-plugin-button-nav cursor-pointer"></i>
                </a>
            </li>
            <li class="nav-item dropdown pe-2 d-flex align-items-center">
                <a href="javascript:;" class="nav-link text-body p-0" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fa fa-bell cursor-pointer"></i>
                </a>
                <ul class="dropdown-menu  dropdown-menu-end  px-2 py-3 me-sm-n4" aria-labelledby="dropdownMenuButton">
                <li class="mb-2">
                    <a class="dropdown-item border-radius-md" href="javascript:;">
                    <div class="d-flex py-1">
                        <div class="my-auto">
                        <img src="../assets/img/team-2.jpg" class="avatar avatar-sm  me-3 "></img>
                        </div>
                        <div class="d-flex flex-column justify-content-center">
                        <h6 class="text-sm font-weight-normal mb-1">
                            <span class="font-weight-bold">New message</span> from Laur
                        </h6>
                        <p class="text-xs text-secondary mb-0">
                            <i class="fa fa-clock me-1"></i>
                            13 minutes ago
                        </p>
                        </div>
                    </div>
                    </a>
                </li>
                <li class="mb-2">
                    <a class="dropdown-item border-radius-md" href="javascript:;">
                    <div class="d-flex py-1">
                        <div class="my-auto">
                        <img src="/assets/img/small-logos/logo-spotify.svg" class="avatar avatar-sm bg-gradient-dark  me-3 "></img>
                        </div>
                        <div class="d-flex flex-column justify-content-center">
                        <h6 class="text-sm font-weight-normal mb-1">
                            <span class="font-weight-bold">New album</span> by Travis Scott
                        </h6>
                        <p class="text-xs text-secondary mb-0">
                            <i class="fa fa-clock me-1"></i>
                            1 day
                        </p>
                        </div>
                    </div>
                    </a>
                </li>
                </ul>
            </li>
            <li class="nav-item d-flex align-items-center">
                <a href="../pages/sign-in.html" class="nav-link text-body font-weight-bold px-0">
                <i class="fa fa-user me-sm-1"></i>
                <span class="d-sm-inline d-none">Sign In</span>
                </a>
            </li>
            </ul>
        </div>
        </div>
    </nav>
    <div class="container-fluid py-4">
        <div class="row">   
       
        <div class="col-lg-6 mx-auto">
        <div class="card">
         <div class="card-body">
           <h5 class="card-title">Add Banner</h5>
            <form role="form" class="text-start">
            <div class="input-group input-group-outline my-3">
                <label class="form-label">Banner Name</label>
                <input type="text" value={bannerName} onChange={(e) => setBannerName(e.target.value)}  class="form-control"></input>
            </div>
            <div class="input-group input-group-outline mb-3">
                <label class="form-label">Banner Image</label>
                <input type="file" class="form-control" id="bannerImage" accept="image/*" onChange={handleImageChange}></input>
                <img id="previewImage" src="#" alt="Preview" style={{ maxWidth: '100px', maxHeight: '100px' }}/>
            </div>
            <div class="input-group input-group-outline mb-3">
              <label class="form-label">Status</label>
              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div class="text-center">
                <button type="button" onClick={handleSubmit} class="btn bg-gradient-primary w-100 my-4 mb-2">Sumbit</button>
            </div>
            </form>
        </div>
        </div>
        </div>
        </div>
        </div>
  </main>
    </>
  )
}

export default AddBanner