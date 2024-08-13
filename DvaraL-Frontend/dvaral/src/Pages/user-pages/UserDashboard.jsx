import React from "react";
import Navbar from '../../Web/Navbar';
import { BookingCard } from "./BookingCard";

// import { authService } from "../../services/auth";


import UserSideBar from './UserSideBar';


const UserDashboard = () => { 

  // const userName = authService.getUserName();
  // console.log(userName);
  

  
  
  return (
    <div className="flex flex-col min---h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-grow overflow-hidden">
        {/* Sidebar */}
  
          <UserSideBar />
   

        {/* Main Content */}
        <main className="flex-grow p-6 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h1 className="text-3xl font-semibold text-gray-800">Welcome back, <span className="text-blue-600">Username!</span></h1>
            <p className="text-gray-600 mt-2">Explore our latest offerings and find your perfect stay.</p>
          </div>

          <BookingCard/>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;