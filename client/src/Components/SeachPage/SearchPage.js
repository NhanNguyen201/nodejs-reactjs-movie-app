import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import SearchBar from '../SearchBar/SearchBar';
import SearchVideoContainer from '../SearchVideoContainer/SearchVideoContainer';
import youtube from '../../Api/youtube.js';
const SearchPage = ({ onVideoSelect }) => {
    // const [ videoSelect, setVideoSelect ] = useState('');
    const [ videos, setVideos ] = useState([]);
    // const onVideoChoose = video => {
    //     setVideoSelect(video);
    //     return videoSelect;
    // }
    const handleSubmit = async (searchTerm) => {
        const response = await youtube.get('search', {
            params: {
                part: 'snippet',
                maxResults: 8,
                key : "AIzaSyCfhFfJ99Ukw4rzXcATu_VEfH5BlVrQ_x0",
                q: searchTerm,
            }
        });
        setVideos(response.data.items);
    }
    return (
       <Grid container spacing={5} style={{height: '80vh', boxSizing:'border-box', padding: '20px'}}>
           <Grid item xs={12}>
                <SearchBar onFormSubmit={handleSubmit}/>
            </Grid> 
            <Grid item xs={12}>
                <SearchVideoContainer videos={ videos } onVideoSelect={onVideoSelect}/>
            </Grid>
       </Grid>
    )
}

export default SearchPage;