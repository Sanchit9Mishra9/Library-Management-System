import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Books from "./components/Books";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AddStudent from "./components/AddStudent";
import { useEffect, useState } from "react";
import Logout from "./components/Logout";
import AddBook from "./components/AddBook";
import axios from "axios";
import EditBook from "./components/EditBook";
import DeleteBook from "./components/DeleteBook";
function App() {
  const [roleApp, setRoleApp] = useState("");
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/verify")
      .then((res) => {
        if (res.data.login) {
          setRoleApp(res.data.role);
        } else {
          setRoleApp("");
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <BrowserRouter>
      <Navbar roleApp={roleApp} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/books" element={<Books roleApp={roleApp} />}></Route>
        <Route
          path="/login"
          element={<Login setRoleApp={setRoleApp} />}
        ></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/addstudent" element={<AddStudent />}></Route>
        <Route path="/addbook" element={<AddBook />}></Route>
        <Route path="/book/:id" element={<EditBook />}></Route>
        <Route path="/delete/:id" element={<DeleteBook />}></Route>
        <Route
          path="/logout"
          element={<Logout setRoleApp={setRoleApp} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
