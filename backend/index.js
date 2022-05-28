
//we require the dependencies we need 


const express = require("express");
const app = express();
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");


app.use(cors());
app.use(express.json());


const db = new sqlite3.Database("./patients.db",sqlite3.OPEN_READWRITE,(err)=>{
    if(err) return console.log(err.message)
  })


//   This command given below will create a new table with the following field items in the database but should not be run twice

// sql="CREATE TABLE patients(id INTEGER PRIMARY KEY,name,records,medicines,allergies,doctorname)"
// db.run(sql);


// we treat the get request from the frontend and serve all the data present in the database

app.get("/patients",async (req,res)=>{
  db.all("SELECT * FROM patients", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
})


// we only serve the data that is related to the id which is asked from the fronted

app.get("/patient/:id", async (req,res)=>{
  const id = req.params.id;
db.run("SELECT FROM patients WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
})

// we store the data passed from the post request form the frontend
app.post("/patients",async (req,res)=>{
  const name = req.body.name;
  const records = req.body.records;
  const  medicines= req.body.medicines;
  const  allergies= req.body.allergies;
  const doctorname = req.body.doctorname;

  db.run(
    "INSERT INTO patients (name, records, medicines, allergies, doctorname) VALUES (?,?,?,?,?)",
    [name, records, medicines, allergies, doctorname],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
})

// this is used to update the data that is asked to be updated by using the id 

app.patch("/patients/:id",async (req,res)=>{
  const id = req.params.id;
  const name = req.body.name;
  const records = req.body.records;
  const  medicines= req.body.medicines;
  const  allergies= req.body.allergies;
  const doctorname = req.body.doctorname;
  console.log(id,name,records,medicines,allergies,doctorname);
  db.run(
    `UPDATE patients SET name="${name}", records="${records}", medicines="${medicines}", allergies="${allergies}", doctorname="${doctorname}" WHERE id = "${id}"`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
})


//here we delete the data from the database whoose id is passed to us

app.delete("/patients/:id",async (req,res)=>{
  const id = req.params.id;
  db.run("DELETE FROM patients WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
})




app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});