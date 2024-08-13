// import React, { useState } from 'react';
// import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';


// const SignIn = () => {

//     const navigate = useNavigate();


//     const [showPassword, setShowPassword] = useState(false);
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');

//     const togglePasswordVisibility = () => setShowPassword(!showPassword);

//     const users = [
//         { email: 'Zaynaa@gmail.com', password: 'user', role: 'user' },
//         { email: 'admin@gmail.com', password: 'admin', role: 'admin' }
//     ];

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setError('');

//         const user = users.find(u => u.email === email && u.password === password);

//         if (user) {
            
//             alert(`Logged in successfully as ${user.role}`);
//             // onLogin({ email });

//             if(user.role === 'user')
//                 navigate('/dashboard');
//             else
//                 navigate('/request-management');
//             setEmail('');
//             setPassword('');
           
//         } else {
          
//             setError('Invalid email or password');
//             setEmail('');
//             setPassword(''); 
//         }
//     };

//     return (
//         <>
//             <form className="space-y-6" onSubmit={handleSubmit}>
//                 {error && (
//                     <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
//                         <span className="block sm:inline">{error}</span>
//                     </div>
//                 )}
//                 <div className="relative">
//                     <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
//                         Email Address
//                     </label>
//                     <div className="relative">
//                         <span className="absolute inset-y-0 left-0 flex items-center pl-3">
//                             <Mail className="h-5 w-5 text-gray-400" />
//                         </span>
//                         <input
//                             type="email"
//                             id="email"
//                             className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                             placeholder="Enter your email"
//                             required
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                         />
//                     </div>
//                 </div>
//                 <div className="relative">
//                     <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
//                         Password
//                     </label>
//                     <div className="relative">
//                         <span className="absolute inset-y-0 left-0 flex items-center pl-3">
//                             <Lock className="h-5 w-5 text-gray-400" />
//                         </span>
//                         <input
//                             type={showPassword ? "text" : "password"}
//                             id="password"
//                             className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                             placeholder="Enter your password"
//                             required
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                         <button
//                             type="button"
//                             className="absolute inset-y-0 right-0 flex items-center pr-3"
//                             onClick={togglePasswordVisibility}
//                         >
//                             {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
//                         </button>
//                     </div>
//                 </div>
//                 <div className="flex items-center justify-between">
//                     <div className="flex items-center">
//                         <input
//                             type="checkbox"
//                             id="remember"
//                             className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                         />
//                         <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
//                             Remember me
//                         </label>
//                     </div>
//                     <a href="#" className="text-sm text-blue-600 hover:underline">
//                         Forgot password?
//                     </a>
//                 </div>
//                 <button
//                     type="submit"
//                     className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300"
//                 >
//                     Sign In
//                 </button>
//             </form>
//         </>
//     )
// }

// export default SignIn;


import React, { useState, useEffect, useRef} from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth';

const SignIn = ({ onLogin }) => {

    
    const navigate = useNavigate();

    const [error, setError] = useState('');

  //   const checkRedirect = async () => {
  //     if (authService.getToken() !== null && authService.isLoggedIn()) {
  //         const userRole = authService.getUserRole();
  //         if (userRole !== null) {
  //             if (userRole === "MANAGER") {
  //                 navigate('/request-management');
  //             } else if (userRole === "USER") {
  //                 navigate('/dashboard');
  //             } else {
  //                 toast.error("Something went wrong");
  //             }
  //         }
  //     }
  // };

  // useEffect(() => {
  //     checkRedirect();
  // }, []);

    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const handleLogin = async (e) => {
        e.preventDefault();

        const res = await authService.SignIn(emailRef.current.value, passwordRef.current.value)
        console.log(res.data);

        if (res.status === 200 && res.data.role == 'USER') {
            authService.setToken(res.data.token)
            navigate('/dashboard');
            

        }
        else if(res.status === 200 && res.data.role === 'MANAGER'){
          authService.setToken(res.data.token)
          navigate('/manager-dashboard');
        }

        else if (res.status === 200 && res.data.role === 'ADMIN'){
          authService.setToken(res.data.token)
          navigate('/request-management');
        }
    };



    // const users = [
    //     { email: 'Zaynaa@gmail.com', password: 'user', role: 'user' },
    //     { email: 'admin@gmail.com', password: 'admin', role: 'admin' }
    // ];


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   e.preventDefault();
  //           setError('');
    
  //           const user = users.find(u => u.email === email && u.password === password);
    
  //           if (user) {
                
  //               alert(`Logged in successfully as ${user.role}`);
  //               onLogin({ email });
    
  //               if(user.role === 'user')
  //                   navigate('/dashboard');
  //               else
  //                   navigate('/request-management');
  //               setEmail('');
  //               setPassword('');
               
  //           } else {
              
  //               setError('Invalid email or password');
  //               setEmail('');
  //               setPassword(''); 
  //           }
  // };

  return (
    <form onSubmit={handleLogin}>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
          Email
        </label>
        <div className="relative">
          <input
            type="email"
            id="email"
            ref={emailRef} 
            className="w-full px-3 py-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            ref={passwordRef}
            className="w-full px-3 py-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <button
            type="button"
            className="absolute right-3 top-2.5"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Sign In
      </button>
    </form>
  );
};

export default SignIn;

