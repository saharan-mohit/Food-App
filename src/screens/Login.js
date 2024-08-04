import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [cred, setcred] = useState({ email: "", password: "" });
  let navigate  = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_API_URL}/loginuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: cred.email, password: cred.password }),
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter Valid Credentials");
    }
    if(json.success){
      localStorage.setItem('userName',cred.email);
      localStorage.setItem("authToken",json.authToken);
      navigate("/");
    }
  };

  const onChange = (event) => {
    setcred({ ...cred, [event.target.name]: event.target.value });
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            onChange={onChange}
            value={cred.email}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            onChange={onChange}
            value={cred.password}
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>

        <button type="submit" className="m-3 btn btn-primary">
          Submit
        </button>
        <Link to="/createuser" className="m-3 btn btn-danger">
          Create an account
        </Link>
      </form>
    </div>
  );
}
