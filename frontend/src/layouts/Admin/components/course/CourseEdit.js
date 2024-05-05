import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../../api/axios";
import toast, { Toaster } from 'react-hot-toast';

const CourseEdit = () => {
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const [title, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  

  useEffect(() => {
    // Fetch the student data
    axios.get(`http://127.0.0.1:8000/api/admin/courses/show/${id}`, {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
  })
  .then(response => {
      const studentData = response.data;
  
      // Update the state variables with the fetched data
      setName(studentData.title);
      setDuration(studentData.duration);
      setCategoryId(studentData.categoryId);
      setDescription(studentData.description);
  })
  .catch(error => {
      console.log(error);
  });
  
    // Fetch the categories data
    axios.get('/api/categories')
      .then(response => {
        const categoriesData = response.data;
        setCategories(categoriesData);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  const handleCategoryChange = (event) => {
    setCategoryId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Create a FormData object to send the data
    const formData = new FormData();
    formData.append('title', title);
    formData.append('duration', duration);
    formData.append('description', description);
    formData.append('myVideo', file);
  
    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `http://127.0.0.1:8000/api/admin/courses/edit/${id}`);
  
    // Get the token from local storage
    const token = localStorage.getItem('token');
  
    if (token) {
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    } else {
      // Handle the case when the token is not available
      console.log('JWT Token not found');
      return;
    }
  
    // Handle the response
    xhr.onload = () => {
      if (xhr.status === 200) {
        setIsSubmitted(true);
        toast.success('course successfuly edited'); // Display success toast
        console.log(JSON.parse(xhr.responseText)); // Handle the successful response
      } else {
        toast.error('Request failed'); // Display error toast
        console.log('Request failed. Status:', xhr.status);
      }
    };
  
    // Handle network errors
    xhr.onerror = () => {
      toast.error('Network error'); // Display error toast
      console.log('Request failed. Network error.');
    };
    // Send the request with the form data
    xhr.send(formData);
  };
  
  
  return (
    <div>
      <div
        className="addcourse form-container box"
        style={{ backgroundColor: "transparent", color: "black" }}
      >
        <form
          className="form2"
          onSubmit={handleSubmit}
          style={{ color: "black" }}
        >
          <div className="form-title">
            <h1 className="Sign">Edit Course</h1>
          </div>
          <div className="form-row">
            <label htmlFor="id">ID :</label>
            <input
              disabled
              type="text"
              id="id"
              value={id}
            />
            <label htmlFor="name">Title :</label>
            <input
              type="text"
              id="name"
              value={title}
              onChange={(event) => setName(event.target.value)}
            />
            <label htmlFor="duration">Duration :</label>
            <input
              type="text"
              id="duration"
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
            />
          </div>
          <div className="form-row">
            <label htmlFor="category">Category :</label>
            <select
              id="category"
              value={categoryId}
              onChange={handleCategoryChange}
            >
              <option value="">-- Select an option --</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
          <div className="form-row">
            <label htmlFor="description">Description :</label>
            <textarea
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          <div className="form-row">
            <label htmlFor="file">File :</label>
            <input
              type="file"
              id="file"
              onChange={(event) => setFile(event.target.files[0])}
            />
          </div>
          <div className="form-row">
            <button type="submit">Submit</button>
          </div>
        </form>
        <a
          href="#"
          className="go-back-link"
          onClick={() => window.history.back()}
        >
          Go back
        </a>
      </div>
      <Toaster />
    </div>
  );
};

export default CourseEdit;
