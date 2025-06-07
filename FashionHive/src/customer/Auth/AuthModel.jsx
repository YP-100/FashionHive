import { Box, Modal } from '@mui/material'
import React from 'react'
import RegisterForm from './RegisterForm';
import { useLocation } from 'react-router-dom';
import LoginForm from './LoginForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import ResetPasswordForm from './ResetPasswordForm';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: '80%', md: 'auto' },
    maxWidth: '450px', 
    bgcolor: 'background.paper',
    outline: "none",
    boxShadow: 24,
    p: { xs: 2, sm: 4 },
    maxHeight: '90vh',
    overflow: 'auto', 
    borderRadius: '8px' 
};
const AuthModel = ({ open, handleClose }) => {
    const location = useLocation();
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {/* {location.pathname==="/login"?<LoginForm />:<RegisterForm />} */}
                    {location.pathname === "/login" ? <LoginForm /> : 
     location.pathname === "/forgot-password" ? <ForgotPasswordForm handleClose={handleClose} /> : 
     location.pathname === "/reset-password" ? <ResetPasswordForm handleClose={handleClose} /> : 
     location.pathname === "/register" ? <RegisterForm /> : null}

                </Box>
            </Modal>
        </div>
    )
}

export default AuthModel
