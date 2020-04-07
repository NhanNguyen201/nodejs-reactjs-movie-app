import React from 'react';
import RoomDetail from '../RoomDetail/RoomDetail';
import { Grid } from '@material-ui/core';

const RoomContainer = ({rooms}) => {
    return(
        <Grid container>
            {
                rooms ? rooms.map(room => <RoomDetail videoDes={""} videoThumb={""}/> ) : null
            }
        </Grid>
    )    
}

export default RoomContainer;