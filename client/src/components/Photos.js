import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Button from '@mui/material/Button';
//import Table from '@mui/material/Table';
//import TableContainer from '@mui/material/TableContainer';
//import Paper from '@mui/material/Paper';

const Photos = (props) => {
    const [photosList, setPhotosList] = useState([])

    useEffect(() =>{
        axios.get("http://localhost:8000/api/photos")
        .then((res=>{
            console.log(res);
            console.log(res.data);
            setPhotosList(res.data);
        }))
        .catch((err)=>console.log(err))
    }, [])

    return(
        <div>
            <div>
                <img className="image" src="camera-clip-art.jpg" alt="logo"/>
                <h1>PhotoBomb!</h1>
                <h3>Free storage and organization</h3>
                <h3>for all your memories</h3>
                <Button variant="contained" href="/signin">Go to PhotoBomb!</Button>
                <div className="form-group">
                    {photosList.map((photo, index) => (
                        <Link to={`/photos/${photo._id}`}>
                            <img className="image" src={"../images/"+ photo.file_name} alt="image"/>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Photos;