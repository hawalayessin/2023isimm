import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";

import DeleteIcon from "@mui/icons-material/Delete";
import axios from "../../../api/axios";
import toast, { Toaster } from 'react-hot-toast';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
[`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
},
[`&.${tableCellClasses.body}`]: {
    fontSize: 14,
},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
"&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
},
// hide last border
"&:last-child td, &:last-child th": {
    border: 0,
},
}));

export default function CustomizedTables({ rows, headers, type }) {
  const deleteCoursete = async (id) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/course/${id}`
      );
      toast.success('course successfully deleted');
      console.log("Course deleted successfully");
      // Handle any additional logic after deleting the course
    } catch (error) {
      console.log("Error deleting course: ", error);
      toast.error('Error deleting course');
      // Handle error cases
    }
  };
  const deleteCourse = async (id) => {
    
  

    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/admin/courses/delete/${id}`
      );
      toast.success('course successfully deleted');
      console.log("Object deleted successfully");
      // Handle any additional logic after deleting the object
    } catch (error) {
      console.log("Error deleting object: ", error);
      // Handle error cases
      toast.error('Error deleting course');
    }
  };
    const deleteStudent = async (id) => {
      try {
        const response = await axios.delete(
          `http://127.0.0.1:8000/api/admin/students/delete/${id}`
        );
        toast.success('student successfully deleted');
        console.log("Object deleted successfully");
        // Handle any additional logic after deleting the object
      } catch (error) {
        console.log("Error deleting object: ", error);
        toast.error('Error deleting student');
        // Handle error cases
      }
    };
    
  
    const deleteTeacher = async (id) => {
      try {
        const response = await axios.delete(
          `http://127.0.0.1:8000/api/admin/teachers/delete/${id}`
        );
        toast.success('teacher successfully deleted');
        console.log("Object deleted successfully");
        // Handle any additional logic after deleting the object
      } catch (error) {
        console.log("Error deleting object: ", error);
        toast.error('Error deleting teacher');
        // Handle error cases
      }
    };
  
    const handleDelete = (id) => {
      if (type === "student") {
        deleteStudent(id);
      } else if (type === "teacher") {
        deleteTeacher(id);
      } else if (type === "course") {
        deleteCourse(id);
      } else if (type === "coursete") {
        deleteCoursete(id);
      }
    };
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <StyledTableCell>{header}</StyledTableCell>
              ))}
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.id}>
                {headers.map((header) => (
                  <StyledTableCell align="left">{row[header]}</StyledTableCell>
                ))}
                <StyledTableCell>
                  <Link to={"show/" + row.id}>
                    <VisibilityIcon color="action" />
                  </Link>
                  <Link to={"edit/" + row.id}>
                    <EditIcon color="primary" />
                  </Link>
                  <DeleteIcon
                    color="error"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDelete(row.id)}
                    
                  />   <Toaster />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  