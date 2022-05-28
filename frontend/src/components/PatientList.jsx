import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Axios from "axios";
import { Link } from "react-router-dom"
const PatientList = () => {


    //we create an array to store the patients details that is served from the backend

    const [patients,setPatients]=useState([]);


    //it is used to protect the getPatients to be called again and again implicitly

    useEffect(()=>{
        getPatients()
    },[]);


    //we use Axios to fetch the list of paitients information

    const getPatients=async()=>{
        const response=await Axios.get("http://localhost:3001/patients")
        setPatients(response.data);
    }

    // this function deletes the user with the concerned id

    const deleteUser=async (id)=>{
        try {
            await Axios.delete(`http://localhost:3001/patients/${id}`);
            getPatients();
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div>

        {/* Button for adding more patients into the list */}
        <div style={{
            margin:"40px"
        }}>
        <Button style={{
            marginBottom:"20px",
             padding:"20px",
            backgroundColor:"orange",
            color:"white"
        }}><Link to="add">Add New</Link></Button>
        </div>


        {/* This is the table which shocases the data */}

         <TableContainer component={Paper} style={{margin:"auto",
        width:"80%" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name of the patient</TableCell>
            <TableCell align="right">Patient Records</TableCell>
            <TableCell align="right">Medicines</TableCell>
            <TableCell align="right">Allergies</TableCell>
            <TableCell align="right">Doctor Name</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>


            {/* We map through all the values and show the result on the table */}

          {patients.map((value,key) => (
              
            <TableRow
            // style={{backgroundColor:'red', color: 'white',}}
              key={value.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {value.name}
              </TableCell>
              <TableCell align="right">{value.records}</TableCell>
              <TableCell align="right">{value.medicines}</TableCell>
              <TableCell align="right">{value.allergies}</TableCell>
              <TableCell align="right">{value.doctorname}</TableCell>
              <TableCell align="right">
              <Button style={{ marginRight:"6px", padding:"10px" ,color:"white", backgroundColor:"lightblue"}}><Link to={`edit/${value.id}`}>Update</Link></Button>
              <Button style={{ padding:"10px" ,color:"white", backgroundColor:"red"}} onClick={()=>deleteUser(value.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default PatientList