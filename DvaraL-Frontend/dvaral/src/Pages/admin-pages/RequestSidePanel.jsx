import React from 'react';

function RequestSidePanel({ requests, onClose }) {
    
    const pendingRequests = requests.filter(req => req.status === 'pending');
    const acceptedRequests = requests.filter(req => req.status === 'accepted');
    const declinedRequests = requests.filter(req => req.status === 'declined');

    return (
        <div className="bg-gray-100 min-h-screen p-4 sm:p-6 md:p-8">
            <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-xl p-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-indigo-800 mb-6">Request Summary</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-yellow-100 p-4 rounded-lg">
                        <h3 className="font-semibold text-yellow-800">Pending Requests</h3>
                        <p className="text-2xl font-bold text-yellow-900">{pendingRequests.length}</p>
                    </div>
                    <div className="bg-green-100 p-4 rounded-lg">
                        <h3 className="font-semibold text-green-800">Accepted Requests</h3>
                        <p className="text-2xl font-bold text-green-900">{acceptedRequests.length}</p>
                    </div>
                    <div className="bg-red-100 p-4 rounded-lg">
                        <h3 className="font-semibold text-red-800">Declined Requests</h3>
                        <p className="text-2xl font-bold text-red-900">{declinedRequests.length}</p>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full divide-y divide-indigo-200">
                        <thead className="bg-indigo-100">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">Client</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">Date</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">Event</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-indigo-100">
                            {requests.map((request) => (
                                <tr key={request.id} className="hover:bg-indigo-50 transition-colors duration-200">
                                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800">{request.client}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{request.date}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{request.event}</td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${request.status === 'accepted' ? 'bg-green-100 text-green-800' : 
                                            request.status === 'declined' ? 'bg-red-100 text-red-800' : 
                                            'bg-yellow-100 text-yellow-800'}`}>
                                            {request.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-6 text-right">
                    <button 
                        onClick={onClose}
                        className="bg-blue-900 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
                    >
                        Back to Requests
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RequestSidePanel;