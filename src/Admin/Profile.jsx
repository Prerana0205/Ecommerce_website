import React from 'react'
import { Link } from 'react-router-dom'
import Head from './Head';
function Profile() {
  return (
    <>
    <Head/>
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
          <Link class="nav-link text-white " to="/admin/category">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i class="material-icons category">category</i>
            </div>
            <span class="nav-link-text ms-1">Category</span>
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
          <a class="nav-link text-white " href="/admin/order">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i class="material-icons shopping_basket">shopping_basket</i>
            </div>
            <span class="nav-link-text ms-1">Orders</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-white " href="/admin/banner">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i class="material-icons star">star</i>
            </div>
            <span class="nav-link-text ms-1">Banners</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-white active bg-gradient-primary" href="/admin/profile">
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
    </>
  )
}

export default Profile