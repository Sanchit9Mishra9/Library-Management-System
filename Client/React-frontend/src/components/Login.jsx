import React, { useState } from "react";
import "../css/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = ({ setRoleApp }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [errMessage, setErrMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    // axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:3001/auth/login", { username, password, role })
      .then((response) => {
        if (response.data.login && response.data.role === "admin") {
          setRoleApp("admin");
          navigate("/dashboard");
        } else if (response.data.login && response.data.role === "student") {
          setRoleApp("student");
          navigate("/");
        } else {
          console.log(response.data);
          setErrMessage("Password or name is wrong");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2> <br />
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            placeholder="Enter Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select
            name="role"
            id="role"
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="student">Student</option>
          </select>
        </div>
        <button className="btn-login" onClick={handleSubmit}>
          Login
        </button>
        {errMessage}
      </div>
    </div>
  );
};

export default Login;
