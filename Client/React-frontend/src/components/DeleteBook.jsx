import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DeleteBook = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  ///////////////////////////////////////////////////////////////////
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/verify")
      .then((res) => {
        if (res.data.login) {
          if (res.data.role === "student") {
            navigate("/");
          }
        } else {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  }, []);
  /////////////////////////////////////////////////////////////////////
  useEffect(() => {
    axios
      .delete("http://localhost:3001/book/books/" + id)
      .then((res) => {
        if (res.data.deleted) {
          navigate("/books");
        }
      })
      .catch((err) => console.log("Error in logout=> " + err));
  }, []);
};

export default DeleteBook;
