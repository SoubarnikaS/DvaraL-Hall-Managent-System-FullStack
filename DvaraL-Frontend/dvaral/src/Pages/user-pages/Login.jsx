// import React, { useState } from 'react';
// import { Mail , Lock , Eye , EyeOff , User  } from 'lucide-react';

// import SignIn from './SignIn';
// import SignUp from './SignUp';

// const Login = ({ onClose }) => {
//   const [isSignIn, setIsSignIn] = useState(true);
  

//   return (
//     <div className="h-50 flex items-center justify-center pb-10">
//       <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
//         <div className="relative">
//           <button
//             className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-300"
//             onClick={onClose}
//           >
    
//           </button>
//           <div className="flex">
//             <button
//               className={`w-1/2 py-4 text-center font-semibold transition-all duration-300 ${
//                 isSignIn ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//               }`}
//               onClick={() => setIsSignIn(true)}
//             >
//               Sign In
//             </button>
//             <button
//               className={`w-1/2 py-4 text-center font-semibold transition-all duration-300 ${
//                 !isSignIn ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//               }`}
//               onClick={() => setIsSignIn(false)}
//             >
//               Sign Up
//             </button>
//           </div>
//         </div>
//         <div className="p-8">
//           {isSignIn ? (
//               <SignIn/>
//           ) : (
//             <SignUp/>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import HallOwnerRegistration from '../manager-pages/HallManagerRegistration';
// import { useAuth } from '../../Web/AuthContext';

const Login = ({ onClose }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [isHallOwnerRegistration, setIsHallOwnerRegistration] = useState(false);
  // const { login } = useAuth();

  const handleLogin = (userData) => {
    // login(userData);
    onClose();
  };

  const handleSwitchToHallOwner = () => {
    setIsHallOwnerRegistration(true);
  };

  const handleSwitchToRegularSignUp = () => {
    setIsHallOwnerRegistration(false);
  };

  return (
    <div className="h-50 flex items-center justify-center pb-10">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
        <div className="relative">
          <div className="flex">
            <button
              className={`w-1/2 py-4 text-center font-semibold transition-all duration-300 ${
                isSignIn ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => {
                setIsSignIn(true);
                setIsHallOwnerRegistration(false);
              }}
            >
              Sign In
            </button>
            <button
              className={`w-1/2 py-4 text-center font-semibold transition-all duration-300 ${
                !isSignIn ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => {
                setIsSignIn(false);
                setIsHallOwnerRegistration(false);
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
        <div className="p-8">
          {isSignIn ? (
            <SignIn onLogin={handleLogin} />
          ) : isHallOwnerRegistration ? (
            <HallOwnerRegistration onSwitchToRegularSignUp={handleSwitchToRegularSignUp} />
          ) : (
            <SignUp onSignUp={handleLogin} onSwitchToHallOwner={handleSwitchToHallOwner} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;