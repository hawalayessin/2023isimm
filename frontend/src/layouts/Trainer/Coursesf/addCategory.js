import axios from "../../../api/axios";
import React, { useState } from "react";
import  { useLayoutEffect } from 'react'
import { useOutletContext } from 'react-router-dom';
import './addcategori.css'
import toast, { Toaster } from 'react-hot-toast';

const Addcategory = () => {
    const [animationIsFinished, setAnimationIsFinished] = useOutletContext();
  const showNav = () => setAnimationIsFinished(true);
  useLayoutEffect(() => {
    showNav();
  }, []);
    const [title, setTitle] = useState("");
    const token = localStorage.getItem("token");

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    function handleTitleChange(event) {
        setTitle(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        axios
          .post("http://127.0.0.1:8000/api/category", { title }, {headers: {
            'Content-Type': 'application/json'
          }})
          .then((response) => {
            console.log(response.data);
            toast.success(' category Successfully added!');
          })
          .catch((error) => {
            console.error(error);
            toast.error("There is a problem");
          });
    }

    return (
       <div className="addcourse form-container box">
            <div className="form2-title">
                <h1 className="Sign">Add category</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title :</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={handleTitleChange}
                />
                <button type="submit">submit</button>
                
        <a href="#" className="go-back-link" onClick={() => window.history.back()}>
          Go back
        </a>
            </form>
            <Toaster/>
            </div>
    )
}

export default Addcategory;
