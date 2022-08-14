import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';

const Photos = (props) => {
    const {user_id} = useParams();
    const [photosList, setPhotosList] = useState([])
    const [file, setFile] = useState();
    const [files, setFiles] = useState([]);

    const navigate = useNavigate();

    useEffect(() =>{
        axios.get(`http://localhost:8000/api/photos/user/${user_id}`)
        .then((res=>{
            console.log(res);
            console.log(res.data);
            setPhotosList(res.data);
        }))
        .catch((err)=>console.log(err))
    }, [])

    const changeFile = (e) => {
        setFile(e.target.files[0]);
        setFiles(e.target.files);
        console.log(e.target.files);
    }

    const uploadPhoto = (e) =>{
        e. preventDefault();
        
        console.log(file);
        
        const url = 'http://localhost:8000/api/photos/uploadFile';

        for(let i=0;i<files.length;i++){
            const formData = new FormData();
            formData.append('file', files[i]);
            formData.append('fileName', files[i].name);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            };
            axios.post(url, formData, config)
            .then((res) => {
                console.log(res.data);

                const file_name = files[i].name;
                const upload_date = Date();
                axios.post('http://localhost:8000/api/photos', {file_name, user_id, upload_date})
                .then(res=>{
                    console.log(res.data);

                    navigate("/dashboard/"+user_id);
                    setFile("");
                })
                .catch((err)=>console.log(err))
            });
        }
    }

    return(
        <div>
            <div>
                <div className="dashboard_topbar">
                    <div className="dashboard_topbar_left">
                        <img src="../camera-clip-art.jpg" height="100px" alt="logo"></img>
                        <span><h1>PhotoBomb!</h1></span>
                    </div>
                    <div className="wrapper">
                        <Input defaultValue="" color="primary"/>
                        <Button variant="outlined">Search</Button>
                    </div>
                    <div className="dashboard_topbar_right">
                        <form onSubmit={uploadPhoto}>
                        <input type="file" name="myFile" onChange={changeFile} accept="image/*" multiple/>
                        <Button variant="contained" type="submit">Upload</Button>
                        </form>
                    </div>
                </div>
                <p/>
                <div className="photos">
                    {photosList.map((photo, index) => (
                        <Link key={index} to={`/photos/${photo._id}`}>
                            <img className="image" src={"../images/"+ photo.file_name} alt="image"/>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Photos;