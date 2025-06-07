import { Button, Grid, TextField } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../state/Auth/Action';

const LoginForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (formRef.current && !formRef.current.contains(event.target)) {
                navigate('/');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [navigate]);



    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const userData = {
            email: data.get("email"),
            password: data.get("password"),
        }
        dispatch(login(userData))
        // console.log("userData", userData);
    }
    return (
        <div ref={formRef}>
            <form onSubmit={handleSubmit}>

                <Grid container spacing={3}>

                    <Grid size={{ xs: 12 }}>
                        <TextField
                            required
                            id='email'
                            name='email'
                            label='Email'
                            fullWidth
                            autoComplete='email'
                        />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <TextField
                            required
                            id='password'
                            name='password'
                            label='Password'
                            fullWidth
                            autoComplete='current-password'
                        />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <Button type='submit'
                            fullWidth variant='contained'
                            size='large'
                            sx={{ padding: ".8rem 0", bgcolor: "#ca8a04" }}>
                            Login
                        </Button>
                    </Grid>

                </Grid>


            </form>
            <div className='flex justify-center flex-col items-center'>
                <div className='py-3 flex items-center'>
                    <p>Don't have an account ?</p>
                    <Button onClick={() => navigate("/register")} className='ml-5' size='small'>register</Button>
                </div>
            </div>
            <div className='py-3 flex justify-center'>
                <Button
                    onClick={() => navigate("/forgot-password")
                    }
                    size='small'
                    sx={{ color: "#ca8a04" }}
                    >
                    Forgot Password?
                </Button>
            </div>
        </div>
    )
}

export default LoginForm
