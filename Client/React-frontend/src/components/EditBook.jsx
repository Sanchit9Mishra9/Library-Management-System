import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditBook = () => {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState("");
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
      .get("http://localhost:3001/book/books/" + id)
      .then((res) => {
        if (res.data.Error === true) {
          navigate("/");
        }
        setName(res.data.name);
        setImageUrl(res.data.imageUrl);
        setAuthor(res.data.author);
      })
      .catch((err) => console.log("err" + res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .put("http://localhost:3001/book/books/" + id, {
        name,
        author,
        imageUrl,
      })
      .then((res) => {
        if (res.data.updated) {
          navigate("/books");
        } else {
        }
        // if (res.data.registered) {
        //   navigate("/dashboard");
        // }
      })
      .catch((err) => console.log("Error", err));
  };

  return (
    <div className="student-form-container">
      <form className="student-form" onSubmit={handleSubmit}>
        <h2>Edit Book</h2>
        <div className="form-group">
          <label htmlFor="name">Book Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author Name:</label>
          <input
            type="text"
            id="author"
            value={author}
            name="author"
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image Url:</label>
          <input
            type="text"
            id="image"
            value={imageUrl}
            name="image"
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <button type="submit">Update book</button>
      </form>
    </div>
  );
};

export default EditBook;
