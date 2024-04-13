import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://meradhaba.netlify.app/user/ouruser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
      });
        const responseJson = await response.json();
        console.log(responseJson);
        if (!responseJson.success) {
          alert('Enter valid credentials');
        }
        else{
          localStorage.setItem("authToken", responseJson.authToken)
          console.log(localStorage.getItem("authToken"))
          navigate("/")
        }
      
    } catch (error) {
      console.error("Error:", error);
    }
    setCredentials({ email: "", password: "" });
  }

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <div className='flex'>

      <div className='inleft w-2/3'>
        <div className="flex justify-start ml-3 mt-3 gap-3">
          <Link to="/">
            <h1 className="text-[#051726] bg-[#81FFD9] w-14 font-bold text-center rounded-md">Home</h1>
          </Link>
        </div>
        <form onSubmit={handleSubmit} className='w-full flex items-center h-[90vh] justify-center mb-4'>
          <div className='w-1/2'>
            <img src="logo-no-background.png" className='mb-4' alt="" />
            <div className="form-group text-white">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control" autoComplete="given-email" id="exampleInputEmail1" name='email' value={credentials.email} aria-describedby="emailHelp" placeholder="Enter email" onChange={handleChange} />
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group text-white">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" onChange={handleChange} name='password' value={credentials.password} placeholder="Password" />
            </div>
            <div className='flex items-center justify-between'>
              <button type="submit" className="btn btn-primary">Log In</button>
              <Link to='/signup'><h1 className='text-[#81FFD9] italic'>New Here? SignUp</h1></Link>
            </div>
          </div>
        </form>
      </div>
      <div className='inright bg-blue-500 w-1/3 h-[100vh] overflow-hidden'>
        <img src="meat.jpg" className='max-w-max' alt="" />
      </div>
    </div>
  );
}

export default Login;
