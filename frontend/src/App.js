import React from "react";
import PatientList from "./components/PatientList";
import {Routes,Route} from "react-router-dom";
import AddPatient from "./components/AddPatient";
import EditPatient from "./components/EditPatient";
import "./App.css"
function App() {
  return (
    
    // We make routes for the adding  and editing of the data of patients

  <div className="root">
    <Routes>
      <Route path="/" element={<PatientList />} />
      <Route path="add" element={<AddPatient />} />
      <Route path="edit/:id" element={<EditPatient />} />
    </Routes>
  </div>

  
  );
}

export default App;
