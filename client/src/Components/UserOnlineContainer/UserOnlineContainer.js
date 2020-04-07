import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import UserOnline from '../UserOnline/UserOnline'

const UserOnlineContainer = ({users, roomHost}) => {
    let userList = users.map(user => <UserOnline name={user.name} roomHost={roomHost} key={user.name}/>)
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Paper elevation={5} style={{padding: '15px'}}>
                    <Typography><b>Users online: {users.length}</b></Typography>
                </Paper>
            </Grid>
            {userList}
        </Grid>
    )
}
export default UserOnlineContainer;