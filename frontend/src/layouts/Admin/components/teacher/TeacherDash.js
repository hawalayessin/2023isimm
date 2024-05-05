import { useState } from "react";
import CustomizedTables from "../CustomizedTables";
import { useLayoutEffect } from "react";
import axios from "../../../../api/axios";

const TeacherDash = () => {
  const [response, setResponse] = useState([]);
  const token = localStorage.getItem('token');
  useLayoutEffect(() => {
   
    chargeStudent();
  }, []);
  const chargeStudent = async () => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      console.log('JWT Token not found');
      return;
    }
  
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/admin/teachers/list`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setResponse(response.data);
    } catch (err) {
      console.log('err', err);
    }
  };
  
  function createData(ID, Nom, Prenom, Username,Email) {
    return { ID, Nom, Prenom, Username,Email };
  }
 
  const headers = ["id", "email", "username",  "firstName","lastName"];
  return (
    <div>
      <h1>Teachers Dashboard</h1>
      <CustomizedTables rows={response} headers={headers} type={"teacher"}></CustomizedTables>
    </div>
  );
};
export default TeacherDash;
