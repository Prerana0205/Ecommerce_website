import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Signup() {
  const [activeTab, setActiveTab] = useState('login');
  

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <section id="login">
    <div class="container">
      <div class="card">
        <div class="tabs">
          <div
            class={`tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => handleTabChange('login')}
          >
            Login
          </div>
          <div
            class={`tab ${activeTab === 'signup' ? 'active' : ''}`}
            onClick={() => handleTabChange('signup')}
          >
            Sign Up
          </div>
        </div>
        <div class="form">
          {activeTab === 'login' && <LoginForm />}
          {activeTab === 'signup' && <SignupForm />}
        </div>
      </div>
    </div>
   </section>
  );
}

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/login', {
        email: email,
        password: password
      });

      if (response.data.success) {
        // Redirect to home or another page upon successful login
        navigate('/');
        console.log('Login successful');
        localStorage.setItem('userName', response.data.name);

      } else {
        console.log('Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };
  return (
    <div>
      <form  class="text-start">
            <div class="input-group input-group-outline my-3">
                <label class="form-label">Email</label>
                <input type="email" value={email}   onChange={(e) => setEmail(e.target.value)}class="form-control"></input>
            </div>
            <div class="input-group input-group-outline mb-3">
                <label class="form-label">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}class="form-control"></input>
            </div>
            <p class="mt-4 text-sm text-center">
              <a href="../pages/sign-up.html" class="text-primary text-gradient font-weight-bold">forgot password ?</a>
            </p>
            <div class="text-center">
                <button type="button" onClick={handleLogin}class="btn bg-gradient-primary w-100 my-4 mb-2">login</button>
            </div>
      </form>
      {/* Your login form elements */}
    </div>
  );
}

function SignupForm() {
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const navigate = useNavigate();
  const handleSign = async () => {
    try {
      const response = await axios.post('http://localhost:3001/users', {
        name: name,
        email: email,
        password: password
      });

      if (response.data.message === 'User added successfully') {
        // Clear form fields after successful submission
        setName('');
        setEmail('');
        setPassword('');
        navigate('/signup'); // Redirect to home or another page upon successful signup
      } else {
        console.log('Error adding user:', response.data.error);
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };
  

  return (
    <div>
        <form class="text-start">
          <div class="input-group input-group-outline my-3">
              <label class="form-label">Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} class="form-control" />
          </div>
          <div class="input-group input-group-outline my-3">
              <label class="form-label">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} class="form-control" />
          </div>
          <div class="input-group input-group-outline mb-3">
              <label class="form-label">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} class="form-control" />
          </div>
          <div class="text-center">
              <button type="button" onClick={handleSign} className="btn bg-gradient-primary w-100 my-4 mb-2">Register</button>
          </div>
       </form>

      {/* Your sign-up form elements */}
    </div>
  );
}

export default Signup;
