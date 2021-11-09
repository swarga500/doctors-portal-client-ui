import { Alert, CircularProgress, Container } from '@mui/material';
import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import login from '../../../images/login.png';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button  from '@mui/material/Button';
import { NavLink, useHistory } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const Register = () => {
    const [loginData, setLoginData] = useState({});
    const history = useHistory()

    const { user, registerUser, isLoading, authError} = useAuth()


    const handleOnBlur = e =>{
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = {...loginData};
        newLoginData[field] = value;
               
        setLoginData(newLoginData);

    }
    const handleLoginSubmit = e=>{
        if(loginData.password !== loginData.password2){
            alert('Your password did not match')
            return
        }
        registerUser(loginData.email, loginData.password,loginData.name, history)

        e.preventDefault()

    }
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item sx={{mt: 8 }} xs={12} md={6}>
                <Typography variant="body1" gutterBottom>
                    Register
                </Typography>
                { !isLoading && <form onSubmit={handleLoginSubmit}>
                <TextField 
                    sx={{width:'75%', m:1}}
                    id="standard-basic" 
                    name="name"
                    onBlur={handleOnBlur}
                    label="Your Name" 
                    variant="standard" />
                <TextField 
                    sx={{width:'75%', m:1}}
                    id="standard-basic" 
                    type="email"
                    name="email"
                    onBlur={handleOnBlur}
                    label="Email" 
                    variant="standard" />
                <TextField
                    sx={{width:'75%', m:1}}
                    id="standard-password-input"
                    label="Type Password"
                    type="password"
                    name="password"
                    onBlur={handleOnBlur}
                    autoComplete="current-password"
                    variant="standard"
                />    
                <TextField
                    sx={{width:'75%', m:1}}
                    id="standard-password-input"
                    label="ReType Your Password"
                    type="password"
                    name="password2"
                    onBlur={handleOnBlur}
                    autoComplete="current-password"
                    variant="standard"
                />    
                
                
                <Button sx={{width:'75%', m:1}} type="submit" variant="contained">Register</Button>
                <NavLink 
                 style={{textDecoration: "none"}}
                 to="/login"><Button variant="text">Already Registered? Please Login</Button></NavLink>

                </form>}
                {isLoading && <CircularProgress />}
                {user?.email && <Alert severity="success">User created successful</Alert>}
                {authError && <Alert severity="error">{authError}</Alert>}
                </Grid>
                <Grid item xs={12} md={6}>
                    <img style={{width: '100%'}} src={login} alt="" />
                </Grid>
            </Grid>
            </Container>
    );
};

export default Register;