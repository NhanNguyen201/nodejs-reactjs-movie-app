import React from 'react';
import  { Grid, Paper, Typography } from '@material-ui/core';
const VideoItem = ({video, onVideoSelect}) => {
    return (
        <Grid item xs={6}>
            <Paper elevation={5} style={{display: "flex", alignItems: "center", cursor: 'pointer', padding: '5px'}} onClick={() => onVideoSelect(video)}>
                <img style={{marginRight: '20px', height:'180px'}} alt="thumbnail" src={video.snippet.thumbnails.medium.url}/>
                <Typography variant="subtitle1">
                    <b>{video.snippet.title}</b>
                </Typography>
            </Paper>
        </Grid>
    )
} 
export default VideoItem;