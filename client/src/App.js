import './App.css';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useEffect, useState } from 'react';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import { useEmployeeData } from './context/contextApi';
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';
import { AddFunc, DeleteFunc, EditFunc, GetFunc } from './context/service';


function App() {
  const {employList, setEmployList} = useEmployeeData();
  const [editData, setEditData] = useState({});
  const [openForm, setOpenForm] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    GetFunc(setEmployList)
  },[]);

  const editFuncHandler = (e) => {
    setEditData({
      _id: e._id,
      name: e.name,
      age: e.age,
      email: e.email,
      gender: e.gender
    });
    setOpenForm(true);
  }

  const submitHandler = () => {
    if (editData._id) {
      if (editData.name && editData.age
        && editData.email && editData.gender) {
        EditFunc(editData._id,editData, setEmployList);
        setOpenForm(false)
        setEditData({})
        setError(false)
      } else {
        setError(true)
      }
    } else {
      if (editData.name && editData.age
        && editData.email && editData.gender) {
        AddFunc(editData,setEmployList);
        setOpenForm(false)
        setEditData({})
        setError(false)
      } else {
        setError(true)
      }
    }
  };


  return (
    <Container maxWidth="md">

      {openForm && <Card
        style={{ position: 'fixed', top: "15%", left: "40%", border: "2px solid" }}
      >
        <CardContent>

          <form noValidate autoComplete="off" style={{ marginBottom: "0.5rem" }}>
            <TextField
              onChange={e => setEditData({ ...editData, name: e.target.value })}
              id="outlined-basic"
              label="Name" value={editData.name} variant="outlined" required ></TextField>
          </form>


          <form noValidate autoComplete="off" style={{ marginBottom: "0.5rem" }}>
            <TextField
              onChange={e => setEditData({ ...editData, age: e.target.value })}
              id="outlined-basic"
              label="Age" value={editData.age} variant="outlined" required />
          </form>


          <form noValidate autoComplete="off" style={{ marginBottom: "0.5rem" }}>
            <TextField
              onChange={e => setEditData({ ...editData, gender: e.target.value })}
              id="outlined-basic"
              label="Genger" value={editData.gender} variant="outlined" required />
          </form>

          <form noValidate autoComplete="off">
            <TextField
              onChange={e => setEditData({ ...editData, email: e.target.value })}
              id="outlined-basic"
              label="Email" value={editData.email} variant="outlined" required />
          </form>
        </CardContent>
        <CardActions>
          <Button
            onClick={submitHandler}
            size="small">Submit</Button>
          <Button
            onClick={() => {
              setOpenForm(false)
              setEditData({})
            }}
            size="small">Close</Button>
        </CardActions>
        {error && <p align="center" style={{ color: "red" }}>You Should Fill All The Data</p>}
      </Card>}

      <h3 align="center">All Employees</h3>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell align="center"><strong>Name</strong></TableCell>
              <TableCell align="center"><strong>Gender</strong></TableCell>
              <TableCell align="center"><strong>Age</strong></TableCell>
              <TableCell align="center"><strong>Email</strong></TableCell>
              <TableCell align="center">
                <ButtonGroup variant="contained" aria-label="contained primary button group">
                  <Button
                    onClick={() => setOpenForm(true)}
                    color="primary">Add New</Button>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {employList?.map(e =>
              <TableRow key={e._id}>
                <TableCell component="th" scope="row" align="center">{e.name}</TableCell>
                <TableCell align="center">{e.gender}</TableCell>
                <TableCell align="center">{e.age}</TableCell>
                <TableCell align="center">{e.email}</TableCell>
                <TableCell align="center">
                  <ButtonGroup variant="contained" size="small" aria-label="contained primary button group">
                    <Button
                      onClick={() => DeleteFunc(e._id, setEmployList)}
                      color="secondary">Delete</Button>
                    <Button
                      onClick={() => editFuncHandler(e)}
                      color="primary">Edit</Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default App;
