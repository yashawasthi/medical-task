import React, { useState } from 'react'
import Axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
const AddPatient = () => {

    // We use these to store the information of the user


    const [name, setName] = useState("");
    const [records, setRecords] = useState("");
    const [medicines, setMedicines] = useState("");
    const [allergies, setAllergies] = useState("");
    const [doctorname, setDoctorName] = useState("");
  
    //useNavigate is used to navigate from current page to some other page
      const navigate=useNavigate();

      //here we save the patients details using Axios

      const savePatient=async(e)=>{
          e.preventDefault();   
          try {
              await Axios.post("http://localhost:3001/patients",{
                   name,
                   records,
                   medicines,
                   allergies,
                   doctorname
              });
              navigate("/")
          } catch (error) {
              console.log(error)
          }
       }
  return (
    <div>

        {/* We call savePatient function when the form is sumbitted */}

        <div style={{
            width:"60%",
            margin:"50px auto"

        }}>
  <form onSubmit={savePatient}>
         <TextField style={{width:"100%",marginTop:"10px"}} label="Name of the patient" variant="outlined" onChange={(event) => {setName(event.target.value);}} />
         <TextField style={{width:"100%",marginTop:"10px"}} label="Patient records" variant="outlined" onChange={(event) => {setRecords(event.target.value);}} />
         <TextField style={{width:"100%",marginTop:"10px"}} label="Medicines" variant="outlined" onChange={(event) => {setMedicines(event.target.value);}} />
         <TextField style={{width:"100%",marginTop:"10px"}} label="Allergies" variant="outlined" onChange={(event) => {setAllergies(event.target.value);}} />
         <TextField style={{width:"100%",marginTop:"10px"}} label="Doctor Name" variant="outlined" onChange={(event) => {setDoctorName(event.target.value);}} />

       <Button style={{ padding:"10px" ,color:"white", backgroundColor:"green",marginTop:"10px"}} type="submit">Submit</Button>
    </form>
    </div>
    
</div>
  )
}

export default AddPatient