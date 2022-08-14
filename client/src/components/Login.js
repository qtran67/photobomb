import React, { useState } from 'react'
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';

const Login = (props) => {
    const {usersList, setUsersList} = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const onSubmitHandler = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/login', {email, password})
            .then(res=>{
                console.log(res);
                console.log(res.data);

                //setUsersList([...usersList, res.data])
                console.log("NAVIGATING "+res.data._id);
                navigate("/dashboard/"+res.data._id);
            })
            .catch((err) => {console.log(err);setErrors(err.response.data.error.errors)})     
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
                        <div className="photo_topbar">
                        <Link to={"/register"}>Create account</Link>
                            <Button variant="contained" type="submit">Sign In</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;

