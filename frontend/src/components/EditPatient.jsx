import {Button,TextField} from "@mui/material"
import Axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPatient = () => {

    // We store the details of the user to be edited in these arrays 
    const [name, setName] = useState("");
    const [records, setRecords] = useState("");
    const [medicines, setMedicines] = useState("");
    const [allergies, setAllergies] = useState("");
    const [doctorname, setDoctorName] = useState("");
  
      const navigate=useNavigate();
      const {id}=useParams()
  
       //it is used to protect the getPatients to be called again and again implicitly
      useEffect(()=>{
          getPatientById();
      },[]);

      // we get the newly updated information of the patient
      const getPatientById=async ()=>{
          const response=await Axios.get(`http://localhost:3001/patients/${id}`);
          setName(response.data.name)
          setRecords(response.data.records)
          setMedicines(response.data.medicines)
          setAllergies(response.data.allergies)
          setDoctorName(response.data.doctorname)
      };

      //we update the patient detailes using axios
      const updatePatient=async(e)=>{
          e.preventDefault();   
          try {
              await Axios.patch(`http://localhost:3001/patients/${id}`,{
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

        {/* updatePatient function is called when the form is submitted */}

        <div style={{
            width:"60%",
            margin:"50px auto"

        }}>
         <form onSubmit={updatePatient}>
         <TextField style={{width:"100%",marginTop:"10px"}} label="Name of the patient" variant="outlined" onChange={(event) => {setName(event.target.value);}} />
         <TextField style={{width:"100%",marginTop:"10px"}} label="Patient records" variant="outlined" onChange={(event) => {setRecords(event.target.value);}} />
         <TextField style={{width:"100%",marginTop:"10px"}} label="Medicines" variant="outlined" onChange={(event) => {setMedicines(event.target.value);}} />
         <TextField style={{width:"100%",marginTop:"10px"}} label="Allergies" variant="outlined" onChange={(event) => {setAllergies(event.target.value);}} />
         <TextField style={{width:"100%",marginTop:"10px"}} label="Doctor Name" variant="outlined" onChange={(event) => {setDoctorName(event.target.value);}} />

       <Button style={{ marginTop:"10px", padding:"10px" ,color:"white", backgroundColor:"green"}} type="submit">Update</Button>
    
         </form>
         </div>
    </div>
  )
}

export default EditPatient