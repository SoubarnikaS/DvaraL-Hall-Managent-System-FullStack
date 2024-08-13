import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, Home } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { SignUpData } from '../../services/api';

const HallOwnerRegistration = ({ onSwitchToRegularSignUp }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');

    const togglePasswordVisibility = (field) => {
        if (field === 'password') {
            setShowPassword(!showPassword);
        } else if (field === 'confirmPassword') {
            setShowConfirmPassword(!showConfirmPassword);
        }
    };

    const [registerdata, setRegisterdata] = useState({
        name: '',
        email: '',
        password: '',
        cpassword: '',
       
    })

    const handleChange = (e) => {
        setRegisterdata({ ...registerdata, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(registerdata);
        const res = await SignUpData(registerdata.name, registerdata.email, registerdata.password, 'MANAGER');

        if (res.status === 200) {
            // setTimeout(() => {
                setRegisterdata({
                    name: '',
                    email: '',
                    password: '',
                    cpassword: ''
                    
                });
                toast.success("wait Untill Your Account is verified by Admin!")
            // },)
        }
        else {
            toast.error(res.data)
        }
    }

    return (
        <>
            <form className="space-y-6" onSubmit={handleSubmit}>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}
                <div className="relative">
                    <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">
                        Full Name
                    </label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <User className="h-5 w-5 text-gray-400" />
                        </span>
                        <input
                            type="text"
                            id="name"
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your full name"
                            required
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="relative">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                        Email Address
                    </label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <Mail className="h-5 w-5 text-gray-400" />
                        </span>
                        <input
                            type="email"
                            id="email"
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your email"
                            required
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="relative">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
                        Password
                    </label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <Lock className="h-5 w-5 text-gray-400" />
                        </span>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Create a password"
                            required
                            onChange={handleChange}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center pr-3"
                            onClick={() => togglePasswordVisibility('password')}
                        >
                            {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                        </button>
                    </div>
                </div>
                <div className="relative">
                    <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-medium mb-2">
                        Confirm Password
                    </label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <Lock className="h-5 w-5 text-gray-400" />
                        </span>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="cpassword"
                            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Confirm your password"
                            required
                            onChange={handleChange}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center pr-3"
                            onClick={() => togglePasswordVisibility('confirmPassword')}
                        >
                            {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                        </button>
                    </div>
                </div>
                
                <div className="mt-4 text-center">
                    <button 
                        type="button"
                        onClick={onSwitchToRegularSignUp}
                        className="text-blue-600 hover:underline"
                    >
                        Want to register as a regular user? Click here
                    </button>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300"
                >
                    Sign Up as Hall Owner
                </button>
            </form>
        </>
    );
}

export default HallOwnerRegistration;