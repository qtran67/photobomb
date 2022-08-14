import React, { useState } from 'react'
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';

const UserForm = (props) => {
    const {usersList, setUsersList} = props;

    const [first_name, setFirstName] = useState(""); 
    const [last_name, setLastName] = useState(""); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log("CAME HERE");

        axios.post('http://localhost:8000/api/users', {first_name, last_name, email, password})
            .then(res=>{
                console.log(res);
                console.log(res.data);

                //setUsersList([...usersList, res.data])
                navigate("/dashboard/"+res.data.user._id);
            })
            .catch((err) => setErrors(err.response.data.error.errors))     
    }
    
    return (
        <div>
            <div className="login_box">
                <img className="image" src="../camera-clip-art.jpg"/>
                <h2>PhotoBomb!</h2>
                <h3>Sign in</h3>
                <div className="form-group">
                    <form onSubmit={onSubmitHandler}>
                        <div className='bold-font'>
                            <label>First Name:</label><br/>
                            <input type="text" value={first_name} onChange = {(e)=>setFirstName(e.target.value)}/>
                        </div>
                        {errors.first_name && <span style={{color:"red"}}>{errors.first_name.message}</span>}
                        <div className='bold-font'>
                            <label>Last Name:</label><br/>
                            <input type="text" value={last_name} onChange = {(e)=>setLastName(e.target.value)}/>
                        </div>
                        {errors.last_name && <span style={{color:"red"}}>{errors.last_name.message}</span>}
                        <div className='bold-font'>
                            <label>Email:</label><br/>
                            <input type="text" value={email} onChange = {(e)=>setEmail(e.target.value)}/>
                        </div>
                        {errors.email && <span style={{color:"red"}}>{errors.email.message}</span>}
                        <div>
                            <label>Password:</label><br/>
                            <input type="password" value={password} onChange = {(e)=>setPassword(e.target.value)}/>
                        </div>
                        {errors.password && <span style={{color:"red"}}>{errors.password.message}</span>}
                        <br/>
                        <Button variant="contained" type="submit">Register</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UserForm;

