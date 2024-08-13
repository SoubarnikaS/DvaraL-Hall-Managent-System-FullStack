import React, {useState, useEffect} from "react";
import { getRequestForManager } from '../../services/api';


const Requests = ({ status }) => {

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
  
  const mockRequests = [
    { id: 1, name: "John Doe", date: "2024-08-15", hallName: "Grand Hall" },
    { id: 2, name: "Jane Smith", date: "2024-08-20", hallName: "Crystal Room" },
    { id: 3, name: "Bob Johnson", date: "2024-08-25", hallName: "Sunset Pavilion" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "approved": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">
        {status.charAt(0).toUpperCase() + status.slice(1)} Requests Summary
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contactt</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No of Guests</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {requests.map((request) => (
              <tr key={request.hallID}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.userName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.userPhone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.noOfGuest}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.eventType}</td>
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
    </div>
  );
};

export default Requests;