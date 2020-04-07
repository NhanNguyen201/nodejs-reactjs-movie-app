import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import  { Grid, Paper, Typography } from '@material-ui/core';

const UserOnline = ({name, roomHost}) => {
    return(
        <Grid item >
            <Paper elevation={5} style={{display: "flex", alignItems: "center", padding: "8px 15px", borderRadius: "20px"}}>
                {
                    name === roomHost 
                        ?   <StarHalfIcon style={{height: '30px', width: '30px'}}/>
                        :   <PersonIcon style={{height: '30px', width: '30px'}}/>
                }
                <Typography><b>{name}</b></Typography>
            </Paper>
        </Grid>
    )
}

export default UserOnline;