import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth';
import { getAllUsersByManager, updateAccountStatus } from '../../services/api';
import RequestSummary from './RequestSidePanel';

function RequestManagement() {
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);
    const [expandedId, setExpandedId] = useState(null);
    const [showSummary, setShowSummary] = useState(false);

    useEffect(() => {
        fetchAllManagers();
    }, []);

    const fetchAllManagers = async () => {
        const res = await getAllUsersByManager();
        console.log(res);
        setRequests(res.data);
    };

    const handleLockAccount = async (id) => {
        try {
            await updateAccountStatus(id, 'accept'); 
            fetchAllManagers(); 
        } catch (error) {
            console.error('Error locking account:', error);
        }
    };
    const handleUnlockAccount = (id) => {
        // Implement the unlock account functionality
    };

    const handleRequestSummary = () => {
        setShowSummary(true);
    };

    const handleCloseSummary = () => {
        setShowSummary(false);
    };

    const handleLogout = () => {
        authService.SignOut();
        navigate('/');
    };

    if (showSummary) {
        return <RequestSummary requests={requests} onClose={handleCloseSummary} />;
    }

    return (
        <div className="bg-gray-100 min-h-screen p-4 sm:p-6 md:p-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-bold text-indigo-800 mb-6">User Management</h2>
                <div className="flex flex-col sm:flex-row justify-between mb-6">
                    <button 
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
                    >
                        Logout
                    </button>
                </div>
                <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 overflow-x-auto">
                    <table className="w-full divide-y divide-indigo-200">
                        <thead className="bg-indigo-100">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">User ID</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">Name</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">Email</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">Status</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">Account Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-indigo-100">
                            {requests.map((request) => (
                                <tr key={request.id} className="hover:bg-indigo-50 transition-colors duration-200">
                                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800">{request.id}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800">{request.name}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{request.email}</td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${request.locked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                            {request.locked ? 'Locked' : 'Unlocked'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                                        {!request.locked && (
                                            <button onClick={() => handleLockAccount(request.id)} className="bg-green-100 hover:bg-green-200 text-green-800 font-bold py-1 px-2 rounded mr-1 transition-colors duration-200">
                                                Account is Unlocked 
                                            </button>
                                        )}
                                        {request.locked && (
                                            <button onClick={() => handleLockAccount(request.id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded transition-colors duration-200">
                                                Unlock Account
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default RequestManagement;
