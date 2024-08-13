import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

import Navbar from "../../Web/Navbar";
import UserSideBar from './UserSideBar';

import {MoveRight} from "lucide-react";
import { Button } from '@mui/material';


import { getReservedHallsForUser } from "../../services/api";


const ReservedHall = () => {

    const [reserved, setReserved] = useState([
        
        {
            requestedDate : '',
            bookingStatus : '',
            eventType : '',
            noOfGuest : '',

            halls: {
                hallID: '',
                hallOwner: '',
                hallName: '',
                hallType: '',
                hallLocation: '',
                hallDescription: '',
                hallRating: '',
                hallAddress: '',
                hallContact: '',
                capacity: '',
                hallPrice: ''
            }
        }
    ]);

    
  const fetchAllReservedHalls = async () => {

    const res = await getReservedHallsForUser();
    console.log(res);
    
    setReserved(res.data);
  };
  
  useEffect(() => {

    console.log("use");
    fetchAllReservedHalls()
    
},[])


    const getStatusColor = (status) => {
        switch (status) {
            case "pending": return "bg-yellow-100 text-yellow-800";
            case "Pending": return "bg-yellow-100 text-yellow-800";
            case "approved": return "bg-green-100 text-green-800";
            case "Approved": return "bg-green-100 text-green-800";
            case "rejected": return "bg-red-100 text-red-800";
            case "Rejected": return "bg-red-100 text-red-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };


    return (
        <>


            <div className="flex flex-col min---h-screen bg-gray-100">
                <Navbar />
                <div className="flex flex-grow overflow-hidden h-[90vh]">
                    <UserSideBar />


                    <main className="flex-grow p-6 overflow-y-auto w-[450%]">
                        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                            <h1 className="text-3xl font-semibold text-blue-600">Reserved Halls</h1>
                            <p className="text-gray-600 mt-2">Check out the halls you reserved!</p>
                        </div>

                        <div>
                            {reserved.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white">
                                    <thead className="bg-gray-300">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hall Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Type</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No of Guests</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {reserved.map((request) => (
                                            <tr key={request.halls.hallID}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.halls.hallName}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.requestedDate}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.eventType}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.noOfGuest}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.halls.hallPrice}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(request.bookingStatus)}`}>
                                                        {request.bookingStatus}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            ) : (
                                <div className="text-center py-8">
                                <p className="text-xl text-gray-600">You haven't any reserved any halls at this moment.</p>
                                <Link to="/explore-page">
                                    <div className='mt-6'>
                                        <Button
                                            style={{ color: "#fff", backgroundColor: "#1E3A8A" }}
                                            className=" hover:bg-blue-900 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-full text-sm sm:text-base md:text-lg font-semibold transition-all duration-300 ease-in-out"
                                        >
                                            Explore Venues <MoveRight className="ml-2" />
                                        </Button>
                                    </div>
                                </Link>
                            </div>
                            )
                        }
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

export default ReservedHall;