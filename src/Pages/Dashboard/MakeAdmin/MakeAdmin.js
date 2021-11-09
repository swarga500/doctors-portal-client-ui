import { Alert, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const MakeAdmin = () => {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);
    const {token} = useAuth()
    const handleOnBlur = e =>{
        setEmail(e.target.value)
    }
    const handleAdminSubmit = e =>{
        const user = {email}
    
        fetch('https://aqueous-mesa-83166.herokuapp.com/users/admin', {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount){
                console.log(data)
                
                setSuccess(true)
            }
            
        })
        e.preventDefault()

    }
    return (
        <div>
            <h1>Make an Admin</h1>
            <form onSubmit={handleAdminSubmit}>
            <TextField
              sx={{width: '50%'}}
              id="standard-basic"
              label="Email"
              type="email"
              onBlur={handleOnBlur}
              variant="standard" />
            <Button type="submit" variant="contained">Make Admin</Button>

            </form>
            {success && <Alert severity="success">Made Admin successful</Alert>}
        </div>
    );
};

export default MakeAdmin;