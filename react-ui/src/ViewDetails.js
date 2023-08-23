import React,{useState} from 'react';
import NavBar from './NavBar';
import { Box, Divider, Typography, Grid, FormLabel, Button,Alert } from '@mui/material';
const ViewDetails = (props) => {
    const [status,setStatus]=useState();
    const handleApprove = async (e) => {
       //App.css console.log(this.props)
        e.preventDefault();
       
         const response = await fetch('http://localhost:8080/userApproval', {
             method: 'POST',
             body: JSON.stringify({ name: props.record.name, description: props.record.description, processInstanceId: props.record.processInstanceId, status: 'yes'}),
             headers: {
                 'Content-Type': 'application/json'
             }
         }).catch(error => console.log(error));
         const result = await response.json();
         console.log(result);
         const status = result.status;
         setStatus(status);
    }
    const handleReject = async (e) => {
        e.preventDefault();      
        const response = await fetch('http://localhost:8080/userApproval', {
             method: 'POST',
             body: JSON.stringify({ name: props.record.name, description: props.record.description, processInstanceId: props.record.processInstanceId, status: 'no'}),           
             headers: {
                 'Content-Type': 'application/json'
             }
         }).catch(error => console.log(error));
         const result = await response.json();
         console.log(result);
         const status = result.status;
         setStatus(status);

    }
    return (
        <React.Fragment>
            <NavBar /><br /><br /><br />
            <Box sx={{ p: 2, m: 2, border: '1px solid grey' }}>
                <Divider textAlign="center">
                    <Typography variant="h6" color="red">Details</Typography>
                </Divider>
                {status && status==="Approved" && <Alert severity="success">Approved</Alert>}
                {status && status==="Rejected" && <Alert severity="error">Rejected</Alert>}
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <FormLabel> Name   :  {props.record.name}</FormLabel>
                    </Grid>
                    <Grid item xs={8}>
                        <FormLabel> Description   :  {props.record.description}</FormLabel>
                    </Grid>
                    {(status==="Approved"||status==="Rejected")&& <Grid item xs={4}>
                        <Button disabled variant="contained" onClick={handleApprove}>Approve</Button>&nbsp;&nbsp;
                        <Button disabled variant="contained" onClick={handleReject}>Reject</Button>
                    </Grid>}
                    {(status!=="Approved" && status!=="Rejected")&& <Grid item xs={4}>
                        <Button variant="contained" onClick={handleApprove}>Approve</Button>&nbsp;&nbsp;
                        <Button variant="contained" onClick={handleReject}>Reject</Button>
                    </Grid>}
                  
                </Grid>
            </Box>
        </React.Fragment>
    );
};
export default ViewDetails;