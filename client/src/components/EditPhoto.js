import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';

const EditPhoto = (props) => {
    const {id} = useParams();
    const {photosList, setPhotosList} = props;

    const [photo, setPhoto] = useState("");
    const [description, setDescription] = useState(""); 
    const [keywords, setKeywords] = useState("");
    const [album, setAlbum] = useState("");
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/photos/${id}`)
        .then((res)=>{
            console.log(res);
            console.log(res.data);

            setPhoto(res.data);
            setDescription(res.data.description);
            setKeywords(res.data.keywords);
        })
        .catch((err)=>console.log(err));
    },[])

    const onSubmitHandler = (e)=>{
        e. preventDefault();

        axios.put(`http://localhost:8000/api/photos/${id}`,{description, keywords})
        .then((res)=>{
            console.log(res);
            console.log(res.data);
            navigate(`/photos/${id}`);
        })
        .catch((err) => setErrors(err.response.data.error.errors)) 
    }

    const deletePhoto = (id, user_id) =>{
        axios.delete(`http://localhost:8000/api/photos/${id}`)
        .then((res)=>{
            console.log(res.data);
            //setPhotosList(photosList.filter((photo, index)=>photo._id !== id))
            navigate(`/dashboard/` + user_id);
        })
        .catch((err)=>console.log(err))
    }

    return (
        <div>
            <div className="wrapper">
                <div>
                    <div className="photo_topbar">
                        <Button variant="contained" href={`/dashboard/${photo.user_id}`}>Home</Button>
                        <div className="photo_topbar_right">
                        <Button variant="contained" color="error" onClick={() => deletePhoto(photo._id, photo.user_id)}>Delete</Button>
                        </div>
                    </div>
                    <p/>
                    <div><h3>Filename: {photo.file_name}</h3></div>
                    <img className="image_full" src={"../images/"+ photo.file_name} alt="image"/>
                </div>
                <div className="info_bar">
                    <div className="form-group">
                        <form onSubmit={onSubmitHandler}>
                            <div className='bold-font'>
                                <label>Description:</label><br/>
                                <input type="text" value={description} onChange = {(e)=>setDescription(e.target.value)}/>
                            </div>
                            {errors.description && <span style={{color:"red"}}>{errors.description.message}</span>}
                            <div className='bold-font'>
                                <label>Keywords:</label><br/>
                                <input type="text" value={keywords} onChange = {(e)=>setKeywords(e.target.value)}/>
                            </div>
                            {errors.keywords && <span style={{color:"red"}}>{errors.keywords.message}</span>}
                            <div className='bold-font'>
                                <label>Album:</label><br/>
                                <input type="text" value={album} onChange = {(e)=>setAlbum(e.target.value)}/>
                            </div>
                            <br/>
                            <Button variant="contained" type="submit">Save</Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EditPhoto;

