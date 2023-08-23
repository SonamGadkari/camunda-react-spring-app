import React, { useState, useEffect } from 'react';
import './GetAllRecords.css';
import { Box, TextField, Button, Alert } from '@mui/material'
import NavBar from './NavBar';
import { Link } from 'react-router-dom';
const GetAllRecords = (props) => {
    const [recordName, setRecordName] = useState("");
    const [description, setDescription] = useState("");
    const status = false;
    const [recordData, setRecordData] = useState();
    let newRecord = [];
    let recordDetails = [];
    const dummyRecords = [];
   /*     {
            name: "TRP0010030",
            description: "TAIS Interview Scheduler"
        }, {
            name: "TRP0010031",
            description: "Offer Approval Tool"
        }
    ]*/


    let onrecordNameChange = (event) => {
        const newValue = event.target.value;
        setRecordName(newValue);

    }
    let onDescriptionChange = (event) => {
        const newValue = event.target.value;
        setDescription(newValue);

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        newRecord = { name: recordName, description: description };
        setRecordData(prevState => [...prevState, newRecord]);
        const response = await fetch('http://localhost:8080/create', {
             method: 'POST',
             body: JSON.stringify({ name: recordName, description: description, processInstanceId: 0}),
             headers: {
                 'Content-Type': 'application/json'
             }
         }).catch(error => console.log(error));
         const result = await response.json();
         console.log(result);
        setRecordName('');
        setDescription('');
    }
    const sendrecordDetails = (recordName, description,processInstanceId, status) => {
        recordDetails = { name: recordName, description: description ,processInstanceId:processInstanceId, status: status};
        props.getRecord(recordDetails);
    }

    useEffect(() => {
        fetch('http://localhost:8080/list').then(response => response.json()).
            then((data) => { console.log(data[0]); setRecordData(data) }).catch((error) => { console.log(error) })
    }, [recordData])

    return (
        <React.Fragment>

            <NavBar /><br /><br /><br />

            {status && <Alert severity="info">This is an information message!</Alert>}
            <h2>Create </h2>

            <Box>
                &nbsp;&nbsp;  Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <TextField sx={{ width: 200, "& .MuiInputBase-root": { height: 40 } }} id={recordName} variant="outlined" onChange={onrecordNameChange}> </TextField>
                <br /><br />&nbsp;&nbsp;
                 Description:&nbsp;&nbsp;
                <TextField sx={{ width: 200, "& .MuiInputBase-root": { height: 40 } }} id={description} variant="outlined" onChange={onDescriptionChange}> </TextField>
                <br /><br /> &nbsp;&nbsp;  &nbsp;&nbsp;  &nbsp;&nbsp;  &nbsp;&nbsp;  &nbsp;&nbsp;  &nbsp; &nbsp;&nbsp; &nbsp;
                <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            </Box>
            <br /><br />
            <table>
                <thead>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Status</th>
                </thead>

                <tbody>                
                    {
                        recordData && Array.isArray(recordData) && recordData.map((record, index) => {
                            return <tr key={index}>
                                <td><Link to="/recordDetails/" onClick={() => sendrecordDetails(record.name, record.description,record.processInstanceId,record.status)}>{record.name}</Link></td>
                                <td>{record.description}</td>
                                <td>{record.status}</td>
                            </tr>
                        })

                    }

                    {/*
                      
                */}
                </tbody>
            </table>

        </React.Fragment>
    );
};
export default GetAllRecords;