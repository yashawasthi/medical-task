import "./App.css"
import {Button,ButtonGroup,Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,TextField} from "@mui/material"
import {makeStyles} from "@material-ui/core";
const useStyles=makeStyles(
  {
    outlined:{
      width:"100%"
    }
  }
);
function App() {
  const classes=useStyles();
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  const rows = [
    createData('X', "....", "....", "....", "...."),
    createData('X', "....", "....", "....", "...."),
    createData('X', "....", "....", "....", "...."),
    createData('X', "....", "....", "....", "...."),
    createData('X', "....", "....", "....", "...."),
  ];

  return (
    <div>
     <form style={{
       alignItems:"center",
        width:"60%",
        margin:" 2rem auto"
      }}>
     <TextField className={classes.outlined} label="Name of the patient" variant="outlined" />
     <TextField className={classes.outlined} label="Patient records" variant="outlined" />
     <TextField className={classes.outlined} label="Medicines" variant="outlined" />
     <TextField className={classes.outlined} label="Allergies" variant="outlined" />
     <TextField className={classes.outlined} label="Doctor Name" variant="outlined" />
     <ButtonGroup style={{marginTop:"10px"}}>
       <Button style={{ padding:"10px" ,color:"white", backgroundColor:"red"}}>Update</Button>
       <Button style={{ padding:"10px" ,color:"white", backgroundColor:"green"}}>Submit</Button>
       <Button style={{ padding:"10px" ,color:"white", backgroundColor:"blue"}}>Display</Button>
     </ButtonGroup>


     <TableContainer component={Paper} style={{marginTop:"50px"}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name of the patient</TableCell>
            <TableCell align="right">Patient Records</TableCell>
            <TableCell align="right">Medicines</TableCell>
            <TableCell align="right">Allergies</TableCell>
            <TableCell align="right">Doctor Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
     </form>
    </div>
  );
}

export default App;
