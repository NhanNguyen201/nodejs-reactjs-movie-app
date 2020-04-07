import React, { useState } from 'react';
import { Paper , TextField } from '@material-ui/core';
const SearchBar = ({onFormSubmit}) => {
    const [searchTerm, setSearchTerm] = useState('')
    const handleChange = (e) => setSearchTerm(e.target.value)
    const handleSubmit = (e) => {
        onFormSubmit(searchTerm);
        e.preventDefault();
    }
    return (
        <Paper elevation={6} style={{padding : '25px'}}>
            <form onSubmit={handleSubmit}>
                <TextField fullWidth label="Search..." onChange={handleChange}/>
            </form>
        </Paper>
    )
}
export default SearchBar;