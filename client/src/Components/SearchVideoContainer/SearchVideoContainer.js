import React from 'react';
import VideoItem from '../VideoItem/VideoItem';
import { Grid } from '@material-ui/core';
const SearchVideoContainer = ({ videos, onVideoSelect }) => {
    const listOfVideo = videos.map((video, id) => <VideoItem onVideoSelect={onVideoSelect} key={id} video={video}/>)
    return (
        <Grid container spacing={5} style={{padding: "0 100px"}}>
            {listOfVideo}
        </Grid>
    );
}

export default SearchVideoContainer;