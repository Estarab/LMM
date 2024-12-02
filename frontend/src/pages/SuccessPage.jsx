import React from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg transform hover:scale-105 transition-all duration-300">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Success!</h2>
        <p className="text-xl text-center text-gray-700 mb-6">
          You have successfully registered to participate in the LMM Zambia Christmas Gift Exchange!
        </p>
        <p className="text-lg text-center text-gray-600 mb-6">
          Note that you need to save your password as you will use it to login when you want to pick someone to buy a gift for.
        </p>
        <div className="flex justify-center">
          {/* <button
            onClick={() => navigate('/login')}
            className="py-2 px-6 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition-all duration-300"
          >
            Go to Login
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
