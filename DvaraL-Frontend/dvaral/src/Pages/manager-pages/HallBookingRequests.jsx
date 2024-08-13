import React, { useState, useEffect } from 'react';
import { ChevronDownIcon, ChevronUpIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react';
import ManNavBar from './ManNavBar';
import ManagerSideBar from './ManagerSideBar';

import { getRequestForManager, updateBookingStatus } from '../../services/api';

const HallBookingRequests = () => {

  const [requests, setRequests] = useState([
    {
      bookingID: '',
      userName: '',
      userEmail: '',
      userPhone: '',
      requestedDate: '',
      requestedTime: '',
      noOfGuest: '',
      eventType: '',
      specialRequests: '',
      bookingStatus: ''
    }
  ]);

  const fetchAllRequests = async () => {

    const res = await getRequestForManager();
    setRequests(res.data);
  };
  
  useEffect(() => {
    fetchAllRequests()
},[])


    const [expandedRow, setExpandedRow] = useState(null);
  
    const handleRowClick = (id) => {
      setExpandedRow(expandedRow === id ? null : id);
    };
  
    const handleRequestAction = async (id, action) => {
      console.log(id);
      const res = await updateBookingStatus(id, action);
      // setRequests.bookingStatus(action);
      setRequests(requests.map(request => 
        request.bookingID === id ? { ...request, status: action } : request
      ));
      window.location.reload(false);

    };
  
    const getStatusColor = (status) => {
      switch (status) {
        case "Pending": return "bg-yellow-100 text-yellow-800 border-yellow-300";
        case "approved": return "bg-green-100 text-green-800 border-green-300";
        case "rejected": return "bg-red-100 text-red-800 border-red-300";
        default: return "bg-gray-100 text-gray-800 border-gray-300";
      }
    };
  
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
        <ManNavBar />
        <div className="flex flex-grow overflow-hidden h-[90vh]">
          <ManagerSideBar />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
            <div className="container mx-auto px-6 py-8">
              <h1 className="text-3xl font-semibold text-gray-800 mb-6">Hall Booking Requests</h1>
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-200 text-gray-700">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">User</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Email</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Contact</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {requests.map((request) => (
                        <React.Fragment key={request.bookingID}>
                          <tr className={`hover:bg-gray-50 cursor-pointer transition duration-150 ease-in-out ${expandedRow === request.bookingID ? 'bg-gray-50' : ''}`}>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{request.userName}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{request.userEmail}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{request.userPhone}</td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusColor(request.bookingStatus)}`}>
                                {request.bookingStatus}
                              </span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                              {request.bookingStatus === 'Pending' && (
                                <div className="flex space-x-2">
                                  <button 
                                    onClick={(e) => { e.stopPropagation(); handleRequestAction(request.bookingID, 'approved'); }}
                                    className="flex items-center px-2 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition duration-150 ease-in-out"
                                  >
                                    <CheckCircleIcon className="w-4 h-4 mr-1" />
                                    Accept
                                  </button>
                                  <button 
                                    onClick={(e) => { e.stopPropagation(); handleRequestAction(request.bookingID, 'rejected'); }}
                                    className="flex items-center px-2 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition duration-150 ease-in-out"
                                  >
                                    <XCircleIcon className="w-4 h-4 mr-1" />
                                    Reject
                                  </button>
                                </div>
                              )}
                              <button 
                                onClick={() => handleRowClick(request.bookingID)}
                                className="ml-2 p-1 rounded-full text-gray-400 hover:text-gray-600 focus:outline-none"
                              >
                                {expandedRow === request.id ? (
                                  <ChevronUpIcon className="w-5 h-5" />
                                ) : (
                                  <ChevronDownIcon className="w-5 h-5" />
                                )}
                              </button>
                            </td>
                          </tr>
                          {expandedRow === request.bookingID && (
                            <tr>
                              <td colSpan="5" className="px-4 py-3">
                                <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="bg-white p-3 rounded-md shadow">
                                      <p className="font-semibold text-gray-700">Date:</p>
                                      <p className="text-gray-600">{request.requestedDate}</p>
                                    </div>
                                    <div className="bg-white p-3 rounded-md shadow">
                                      <p className="font-semibold text-gray-700">Number of Guests:</p>
                                      <p className="text-gray-600">{request.noOfGuest}</p>
                                    </div>
                                    <div className="bg-white p-3 rounded-md shadow">
                                      <p className="font-semibold text-gray-700">Purpose:</p>
                                      <p className="text-gray-600">{request.eventType}</p>
                                    </div>
                                    <div className="bg-white p-3 rounded-md shadow">
                                      <p className="font-semibold text-gray-700">Additional Information:</p>
                                      <p className="text-gray-600">{request.specialRequests}</p>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  };
  
export default HallBookingRequests;