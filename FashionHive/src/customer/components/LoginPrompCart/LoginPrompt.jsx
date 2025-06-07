// src/components/common/LoginPrompt.jsx
import { Snackbar, Alert, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoginPrompt = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showLoginPrompt, loginMessage } = useSelector(store => store.CartLoginpop);

  const handleClose = () => dispatch({ type: 'HIDE_LOGIN_PROMPT' });
  const handleLogin = () => {
    navigate('/login');
    handleClose();
  };

  return (
    <Snackbar open={showLoginPrompt} autoHideDuration={6000} onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <Alert severity="warning" onClose={handleClose}
        action={
          <Button color="inherit" size="small" onClick={handleLogin}
            sx={{ color: "#ca8a04" }}>
            Login
          </Button>
        }>
        {loginMessage}
      </Alert>
    </Snackbar>
  );
};

export default LoginPrompt;