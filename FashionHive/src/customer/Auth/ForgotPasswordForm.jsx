import { Button, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../state/Auth/Action';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
    navigate('/reset-password', { state: { email } });
  };

  return (
    <div ref={formRef}>
      <Typography variant="h5" gutterBottom>
        Forgot Password
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid size={{xs:12}}>
            <TextField
              required
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid size={{ xs:12}}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ padding: ".8rem 0", bgcolor: "#ca8a04" }}
            >
              Send OTP
            </Button>
          </Grid>
          <Grid size={{xs:12}}>
            <Button
              onClick={() => navigate('/login')}
              fullWidth
              variant="text"
            >
              Back to Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;