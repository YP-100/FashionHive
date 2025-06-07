
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../../state/Auth/Action';
import { toast } from 'react-hot-toast';

const OTPVerification = ({ userData, onBack }) => {
  const [otp, setOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth, error } = useSelector(store => store);
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
    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }
    setIsSubmitting(true);
    dispatch(register({ ...userData, otp }));
  };

  useEffect(() => {
    if (auth.jwt) {
      toast.success('Registration successful!');
      navigate('/');
    }
  }, [auth.jwt, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      setIsSubmitting(false);
    }
  }, [error]);

  return (
    <div ref={formRef}>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>
        <p className="mb-6">We've sent a 6-digit code to {userData.email}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="otp" className="block mb-2">OTP Code</label>
            <input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              disabled={isSubmitting}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4 rounded ${isSubmitting ? 'bg-gray-400' : 'bg-yellow-600 hover:bg-yellow-700'} text-white`}
          >
            {isSubmitting ? 'Verifying...' : 'Verify & Register'}
          </button>

          <button
            type="button"
            onClick={onBack}
            disabled={isSubmitting}
            className="w-full py-2 px-4 text-yellow-600 hover:text-yellow-700"
          >
            Back to Registration
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;