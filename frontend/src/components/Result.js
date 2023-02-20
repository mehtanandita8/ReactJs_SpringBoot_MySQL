import React, { useState, useEffect } from 'react';
import { FormLabel, Box } from '@mui/material';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function Result() {
    const [category, setCategory] = useState([]);
    useEffect(() => {
        const requestOptions = { method: 'GET', headers: { 'Content-Type': 'application/json' } };
        fetch('/getResult', requestOptions)
            .then(response => response.json())
            .then(data => {
                setCategory(data);
            })
            console.log(category);
    }, []);
    return (
        <Box borderRadius="2%" className="result-box">
            <h1 className="result-heading">Survey Result</h1>
            <Box style={{display: 'flex', justifyContent: 'space-evenly', alignItem: 'center', width: '60vw'}}>
                <div style={{ width: 150}}>
                    <CircularProgressbar value={category[0]} text={`${category[0]}%`} />
                    <FormLabel style={{ color: "#000000", fontSize: "1.2rem" }}>Company Culture</FormLabel>
                </div>
                <div style={{ width: 150}}>
                    <CircularProgressbar value={category[1]} text={`${category[1]}%`} />
                    <FormLabel style={{ color: "#000000", fontSize: "1.2rem" }}>Management & Leadership</FormLabel>
                </div>
                <div style={{ width: 150 }}>
                    <CircularProgressbar value={category[2]} text={`${category[2]}%`} />
                    <FormLabel style={{ color: "#000000", fontSize: "1.2rem" }}>Work Satisfaction</FormLabel>
                </div>
            </Box>
        </Box>
    )
}

export default Result;