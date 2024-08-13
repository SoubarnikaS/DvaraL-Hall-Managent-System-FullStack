import React, { useState } from 'react';
import { PackageOpen, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';


const ManNavBar = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");


    const handleLogout = () => {
        navigate('/');
        localStorage.clear("token");
        logout();
        
    };



    return (
        <nav className="sticky top-0 z-50 bg-white shadow-md h-[9vh]">
        <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                    <PackageOpen className="h-8 w-8 text-blue-600" />
                    <Link to="/">
                        <span className="ml-2 text-3xl font-bold text-blue-600 font-['Dancing_Script']">
                            DvaraL
                        </span>
                    </Link>
                </div>
               

                <div className="flex items-center">
                    {token != null ? (
                        <div className="relative group">
                            <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-['Poppins']">
                                <User className="mr-2 h-5 w-5" />
                                Profile
                            </button>
                            <div className="absolute right-0 w-40 mt-1 py-1 bg-red-500 border border-gray-200 rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                                <button onClick={handleLogout} className="block w-full px-4 py-2 text-sm text-white font-bold font-[Poppins] text-center">Logout</button>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="hidden md:block px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-['Poppins']"
                        >
                            Sign In
                        </button>
                    )}

                    
                </div>
            </div>
        </div>

      

    </nav>
    );
};

export default ManNavBar;
