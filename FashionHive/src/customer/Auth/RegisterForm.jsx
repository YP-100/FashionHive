import { Button, Grid, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser, register } from '../../state/Auth/Action';
import OTPVerification from './OtpVerification';


const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem('jwt');
  const [showOTP, setShowOTP] = useState(false);
  const [userData, setUserData] = useState(null);
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

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, dispatch]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
    };

    try {
      const result = await dispatch(register(formData));

      if (result?.otpSent) {
        setUserData(formData);
        setShowOTP(true);
      }
    } catch (error) {
      //error will be shown using toast from action no need to show here
    }
  };

  if (showOTP) {
    return <OTPVerification
      userData={userData}
      onBack={() => setShowOTP(false)}
    />;
  }

  return (
    <div ref={formRef}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              required
              id='firstName'
              name='firstName'
              label='First Name'
              fullWidth
              autoComplete='given-name'
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              required
              id='lastName'
              name='lastName'
              label='Last Name'
              fullWidth
              autoComplete='given-name'
            />
          </Grid>
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
              type="password"
              autoComplete='new-password'
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              size='large'
              sx={{ padding: ".8rem 0", bgcolor: "#ca8a04" }}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
      <div className='flex justify-center flex-col items-center'>
        <div className='py-3 flex items-center'>
          <p>Already have an account ?</p>
          <Button onClick={() => navigate("/login")} className='ml-5' size='small'>login</Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;