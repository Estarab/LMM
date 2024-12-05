import React, { useState } from 'react';
import { FaUserPlus, FaGift, FaUserAlt, FaCheckCircle } from 'react-icons/fa'; // Additional icons
import { motion } from 'framer-motion'; // For animations

const GiftExchangeInstructions = () => {
  const [showRecipient, setShowRecipient] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && phone) {
      setShowRecipient(true);
    } else {
      alert('Please enter your name and phone number!');
    }
  };

  return (
    <div className="w-full py-16 bg-gradient-to-r from-red-900 to-red-500 text-white mb-8">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          LMM Zambia Christmas Gift Exchange
        </motion.h2>

        <motion.p
          className="text-lg sm:text-xl mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          Participate in the exciting Christmas Gift Exchange! Please follow the steps below to get started.
        </motion.p>

        {/* Guidelines with icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <FaUserPlus className="text-4xl text-red-600 mb-4 mx-auto" />
            <h3 className="font-bold text-xl mb-2 text-red-500">Step 1: Register and Sign Up </h3>
            <p className="text-gray-700">To participate, you must have Signed Up and created your unique Password, Ensure your password is accurate</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <FaGift className="text-4xl text-red-600 mb-4 mx-auto" />
            <h3 className="font-bold text-xl mb-2 text-red-500">Step 2: Select a Number</h3>
            <p className="text-gray-700">Browse through the available numbers and select one to see your recipient. Each number corresponds to a participant</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <FaUserAlt className="text-4xl text-red-600 mb-4 mx-auto" />
            <h3 className="font-bold text-xl mb-2 text-red-500">Step 3: Enter Your Personal Details</h3>
            <p className="text-gray-700">Fill in your first name, surname, and password to confirm your participation and details.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <FaCheckCircle className="text-4xl text-red-600 mb-4 mx-auto" />
            <h3 className="font-bold text-xl mb-2 text-red-500">Step 4: Submit and Confirm</h3>
            <p className="text-gray-700">Once submitted, you’ll be able to see details of the person you are buying a gift for</p>
          </div>
        </div>

        {/* Additional Instructions */}
        <motion.p
          className="text-lg sm:text-xl mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
           Once you see the person you're buying a gift for, take a screenshot of the details for your reference.
        </motion.p>
      </div>
    </div>
  );
};

export default GiftExchangeInstructions;




// import React, { useState } from 'react';
// import {  FaUser, FaGift } from 'react-icons/fa';
// import { motion } from 'framer-motion'; // For animations

// const GiftExchangeInstructions = () => {
//   const [showRecipient, setShowRecipient] = useState(false);
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (name && phone) {
//       setShowRecipient(true);
//     } else {
//       alert('Please enter your name and phone number!');
//     }
//   };

//   return (
//     <div className="w-full py-16 bg-gradient-to-r from-red-900 to-red-500 text-white mb-8">
//       <div className="container mx-auto px-6 text-center">
//         <motion.h2
//           className="text-4xl md:text-5xl font-bold mb-6"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1 }}
//         >
//           LMM Zambia Christmas Gift Exchange
//         </motion.h2>

//         <motion.p
//           className="text-lg sm:text-xl mb-8"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1.2 }}
//         >
//           Click a number, enter your name and phone number, then you'll be able
//           to see the person you're buying a gift for. You can also take a screenshot
//           of this page as a reminder!
//         </motion.p>

//         <div className="flex justify-center space-x-8 mb-12">
//           {/* Big Icons for Steps */}
//           <motion.div
//             className="text-5xl p-6 bg-white rounded-full shadow-lg cursor-pointer transform transition-all hover:scale-110 hover:bg-purple-600 hover:text-white"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 1.4 }}
//           >
//             <FaGift className="text-red-600 " />
//           </motion.div>

        //   {/* <motion.div
        //     className="text-5xl p-6 bg-white rounded-full shadow-lg cursor-pointer transform transition-all hover:scale-110 hover:bg-pink-600 hover:text-white"
        //     initial={{ opacity: 0 }}
        //     animate={{ opacity: 1 }}
        //     transition={{ duration: 1.6 }}
        //   >
        //     <FaUser className="text-red-600" />
        //   </motion.div> */}

          {/* <motion.div
            className="text-5xl p-6 bg-white rounded-full shadow-lg cursor-pointer transform transition-all hover:scale-110 hover:bg-purple-600 hover:text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.8 }}
          >
            <FaGift className="text-red-600" />
          </motion.div> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GiftExchangeInstructions;
