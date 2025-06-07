import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquareWarning } from 'lucide-react';

const Request = ({ actionName = "This section" }) => {
  const navigate = useNavigate();

  const handleFeedbackRedirect = () => {
    navigate('/feedback');
  };

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-yellow-50 text-yellow-900 p-6 text-center">
      <MessageSquareWarning size={64} className="text-yellow-600 mb-4" />
      <h1 className="text-3xl font-semibold mb-2">{actionName} is not available</h1>
      <p className="mb-6 max-w-md">
        This section isn’t available on our website and may be added in the future.
        If you were expecting something specific or have suggestions, we'd love to hear from you.
      </p>
      <button
        onClick={handleFeedbackRedirect}
        className="px-6 py-2 rounded-2xl bg-yellow-600 hover:bg-yellow-700 text-white transition-all duration-200 shadow-lg"
      >
        Leave Feedback
      </button>
    </div>
  );
};

export default Request;
