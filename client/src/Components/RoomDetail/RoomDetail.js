import React from 'react';

import { Grid, Paper, Typography } from '@material-ui/core';

const RoomDetail = ({ roomThumb, roomDes }) => {
    return (
        <Grid item xs={3}>
            <Paper style={{cursor: "pointer", padding: '10px'}} spacing={4} elevation={5}>
                <img style={{width: "100%"}} alt="thumb" src={roomThumb}/>
                <Typography variant="subtitle2">{roomDes}</Typography>
            </Paper>
        </Grid>
    )
}
                                     
export default RoomDetail;