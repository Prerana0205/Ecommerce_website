import { Routes,Route} from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart';
import Sign_Up from './components/Sign_up';
import Admin from './Admin/Login';
import Dashboard from './Admin/Dashboard';
import Products from './Admin/Products';
import Category from './Admin/Category';
import Order from './Admin/Order';
import Banner from './Admin/Banner';
import Profile from './Admin/Profile';
import Users from './Admin/Users';
import Add_Banner from './Admin/Add Page/add_banner';
import Edit_Banner from './Admin/Edit page/edit_banner';
import Add_Category from './Admin/Add Page/add_category';
import Add_Product from './Admin/Add Page/add_product';
function App() {
  return (
     <>
      <Routes>
        <Route path="/" element={<Home />} ></Route>
        <Route path="/Cart" element={<Cart />} ></Route>
        <Route path="/signup" element={<Sign_Up />} ></Route>
        <Route path="/admin" element={<Admin/>}></Route>
        <Route path="/admin/dashboard" element={<Dashboard/>}></Route>
        <Route path="/admin/Products" element={<Products/>}></Route>
        <Route path="/admin/category" element={<Category/>}></Route>
        <Route path="/admin/order" element={<Order/>}></Route>
        <Route path="/admin/banner" element={<Banner/>}></Route>
        <Route path="/admin/profile" element={<Profile/>}></Route>
        <Route path="/admin/users" element={<Users/>}></Route>
        <Route path="/admin/add-Banner" element={<Add_Banner/>}></Route>
        <Route path="/admin/edit-Banner/:id" element={<Edit_Banner/>}></Route>
        <Route path="/admin/add-category" element={<Add_Category/>}></Route>
        <Route path="/admin/add-product" element={<Add_Product/>}></Route>

      </Routes>
      
     </>
  );
}

export default App;
