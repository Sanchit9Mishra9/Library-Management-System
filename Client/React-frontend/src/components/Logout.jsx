import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true;

const Logout = ({ setRoleApp }) => {
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/logout")
      .then((res) => {
        if (res.data.logout) {
          setRoleApp("");
          navigate("/");
        }
      })
      .catch((err) => console.log("Error in logout=> " + err));
  }, []);
};

export default Logout;
