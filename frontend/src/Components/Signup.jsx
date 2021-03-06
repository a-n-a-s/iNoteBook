import React, { useState } from "react";
import { useHistory , Link } from "react-router-dom";

const Signup = ({showAlert}) => {
  const history = useHistory();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    
    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      history.push("/");
      showAlert("Sign In Successful", "success");
    } else {
      showAlert(json.error, "danger");
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    
  };
  return (
    <div className="container">
      <h1 className="text-center">Sign Up</h1>
      <form onSubmit={handleSubmit} className="container">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="name"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            value={credentials.name}
            onChange={onChange}
            name="name"
            required
            minLength="3"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            value={credentials.email}
            onChange={onChange}
            name="email"
            required
            minLength="5"
          />

          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={onChange}
            name="password"
            value={credentials.password}
            required
            minLength="5"
          />
          <div id="emailHelp" className="form-text">
            The Pasword must be 5 characters long.
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <div className="my-3 container">
        <p>Already Registered <Link to="/login" >Login</Link></p>
      </div>
    </div>
  );
};

export default Signup;
