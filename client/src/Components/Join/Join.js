import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Paper, TextField, Typography, Button } from '@material-ui/core';
const Join = () => {
    const [ name, setName ] = useState("");
    const [ roomHost, setRoomHost ] = useState("")
    return (
        <Grid container style={{height: '100vh', background:'#a8a8a8'}} justify="center" alignContent="center">
            <Grid item xs={11} >
                <Paper elevation={5} style={{height:"85vh"}}>
                    <Grid container style={{height: '100%'}}>
                        <Grid item xs={4}>
                            <Grid container justify="center" alignContent="center" style={{height: '100%'}}>
                                <Grid item xs={5} style={{marginBottom: '25px'}}>
                                    <Typography variant="h4">Movie Together</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Paper elevation={5} style={{padding : '25px'}}>
                                        <TextField fullWidth label="Your name" onChange={ e => { setName(e.target.value)}}/>
                                        <TextField fullWidth label="Room" onChange={ e => { setRoomHost(e.target.value)}} style={{marginTop: '20px'}}/>
                                        <Link onClick={e => (!name || !roomHost) ? e.preventDefault() : null} to={`/chat?name=${name}&roomHost=${roomHost}`} style={{textDecoration: "none"}}>
                                            <Button variant="outlined" color="primary" style={{marginTop: '20px'}}>Join</Button>
                                        </Link>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={8}>
                            <Grid container style={{height: "100%"}}>
                                {/* <Grid item xs={12} style={{padding:"10px 50px", height: "10%"}}>
                                    <Grid container justify="flex-end" alignContent="center" style={{height: "100%"}}>
                                        <Grid item>
                                            <Link onClick={e => (!name) ? e.preventDefault() : null} to={`/chat?name=${name}&roomHost=${roomHost}`} style={{textDecoration: "none"}}>
                                                <Button variant="outlined" color="primary">New Room</Button>
                                            </Link>
                                        </Grid>
                                    </Grid> 
                                </Grid> */}
                                <Grid item xs={12} style={{height: "90%"}}>
                                    <Grid container style={{height: "100%"}}>
                                       {}
                                    </Grid>
                                </Grid>   
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}


export default Join;