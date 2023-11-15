import React, { useState } from 'react'
import {Link} from 'react-router-dom'
export default function SignUp() {
    const [cred,setcred] = useState({name : "",email : "",password : "",geolocation : ""});

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const response = await fetch('http://localhost:4000/api/createuser',{
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({name : cred.name,email : cred.email,password : cred.password,location : cred.geolocation})
            
        })
        const json = await response.json();
        console.log(json);
        if(!json.success){
          alert("Enter Valid Credentials")
        }
    }

    const onChange = (event)=>{
        setcred({...cred,[event.target.name] : event.target.value})
    }

  return (
    <div className='container'>
    <form onSubmit={handleSubmit}>
        <div className ="form-group">
    <label htmlFor="name">Name</label>
    <input type="text" className ="form-control" name = 'name' value = {cred.name} onChange={onChange} placeholder="Enter your name"/>
  </div>
  <div className ="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className ="form-control" name = 'email' onChange={onChange} value = {cred.email} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
    <small id="emailHelp" className ="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className ="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className ="form-control" name = 'password'  onChange={onChange} value = {cred.password} id="exampleInputPassword1" placeholder="Password"/>
  </div>
  <div className ="form-group">
    <label htmlFor="location">Location</label>
    <input type="text" className ="form-control" name = 'geolocation' onChange={onChange} value = {cred.geolocation} placeholder="Enter your Location"/>
  </div>
  <button type="submit" className ="m-3 btn btn-primary">Submit</button>
  <Link to = '/login' className ="m-3 btn btn-danger">ALready a User</Link>
</form>
</div>
  )
}
