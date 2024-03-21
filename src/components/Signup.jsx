import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [credentials, setCredentials] = useState({ name: "", email: "", location: "", password: "" });
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      const response = await fetch("http://localhost:5000/user/newuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
      });
      if (response.ok) {
        const responseJson = await response.json();
        console.log(responseJson);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setCredentials({ name: "", email: "", location: "", password: "" })

    navigate('/login')
    
  }

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <div className='flex'>
      <div className='upleft bg-blue-500 w-1/3 h-[100vh] overflow-hidden'>
        <img src="meat.jpg" className='min-w-max' alt="" />
      </div>
      <div className='upright w-2/3'>
        <div className="flex justify-end mr-3 mt-3">
          <Link to="/">
            <h1 className="text-[#051726] bg-[#81FFD9] w-14 font-bold text-center rounded-md">Home</h1>
          </Link>
        </div>
        <form onSubmit={handleSubmit} className='w-full flex items-center h-[90vh] justify-center mb-4'>
          <div className='w-1/2'>
            <img src="logo-no-background.png" className='mb-4' alt="" />
            <div className="form-group text-white">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" id="name" autoComplete="given-name" name='name' value={credentials.name} placeholder="Enter Name" onChange={handleChange} />
            </div>
            <div className="form-group text-white">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control" autoComplete="given-email" id="exampleInputEmail1" name='email' value={credentials.email} aria-describedby="emailHelp" placeholder="Enter email" onChange={handleChange} />
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group text-white">
              <label htmlFor="location">Location</label>
              <input type="text" className="form-control" id='location' name='location' onChange={handleChange} value={credentials.location} placeholder="Enter Location" />
            </div>
            <div className="form-group text-white">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" onChange={handleChange} name='password' value={credentials.password} placeholder="Password" />
            </div>
            <div className='flex items-center justify-between'>
              <button type="submit" className="btn btn-primary">Sign Up</button>
              <Link to='/login'><h1 className='text-[#81FFD9] italic'>Already a User? Login</h1></Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
