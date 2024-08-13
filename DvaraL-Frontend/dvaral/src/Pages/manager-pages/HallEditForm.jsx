import React, { useState, useEffect } from 'react';
import {
    User, Home, Type, MapPin, FileText, Star, Phone, Users, DollarSign,
    Wifi, Wind, Utensils, Car, Bed, Edit, Save, X, Check
} from 'lucide-react';

import ManNavBar from './ManNavBar';
import ManagerSideBar from './ManagerSideBar';
import Modal from './Modal';

import toast from 'react-hot-toast';


import { getHallDetailsForOwner, editHallDetails } from '../../services/api';


const HallEditForm = ({ initialData, onSubmit }) => {

    const [hID, setHID] = useState(null);

    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [formData, setFormData] = useState(initialData || {
        // hallID : '',
        hallOwner: '',
        hallName: '',
        hallType: '',
        hallLocation: '',
        hallDescription: '',
        hallStatus: '',
        hallRating: 0,
        hallAddress: '',
        hallContact: '',
        capacity: 0,
        hallPrice: 0,
        hallLogo : ''
        // hallAmenities: [],
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const fetchAllRegisteredHalls = async () => {
        try {
            const res = await getHallDetailsForOwner();
            console.log(res);
            if (res.data && Array.isArray(res.data) && res.data.length > 0) {
                const hallData = res.data[0];
                setHID(hallData.hallID);
                // hid = (hallData.hallID); 
                setFormData(prevData => ({
                    ...prevData,
                    hallOwner: hallData.hallOwner || '',
                    hallName: hallData.hallName || '',
                    hallType: hallData.hallType || '',
                    hallLocation: hallData.hallLocation || '',
                    hallDescription: hallData.hallDescription || '',
                    hallStatus: hallData.hallStatus || '',
                    hallRating: parseFloat(hallData.hallRating) || 0,
                    hallAddress: hallData.hallAddress || '',
                    hallContact: hallData.hallContact || '',
                    capacity: parseInt(hallData.capacity, 10) || 0,
                    hallPrice: parseFloat(hallData.hallPrice) || 0,
                    hallLogo: hallData.hallLogo || '',
                    // hallAmenities: hallData.hallAmenitiesList || [],
                }));
            }
        } catch (error) {
            console.error("Error fetching hall details:", error);
        }
    };

    // console.log("Hall:  " + formData.hallID);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditing) {
            try {
                const payload = {
                    hallOwner: formData.hallOwner,
                    hallName: formData.hallName,
                    hallType: formData.hallType,
                    hallLocation: formData.hallLocation,
                    hallDescription: formData.hallDescription,
                    hallStatus: formData.hallStatus,
                    hallRating: formData.hallRating,
                    hallAddress: formData.hallAddress,
                    hallContact: formData.hallContact,
                    capacity: formData.capacity,
                    hallPrice: formData.hallPrice,
                    hallLogo: formData.hallLogo,
                };
    
                const response = await editHallDetails(hID, payload);
                console.log("Hall updated successfully:", response.data);
                toast.success(payload.hallName + " details updated successfully");
                setIsEditing(false);
                if (onSubmit && typeof onSubmit === 'function') {
                    onSubmit(response.data);
                }
                // Update the local state
                setFormData(response.data);
            } catch (error) {
                console.error("Error updating hall details:", error);
            }
        }
    };
    useEffect(() => {
        fetchAllRegisteredHalls();
    }, []);

    const toggleEdit = () => {
        if (!isEditing) {
            setIsModalOpen(true);
        } else {
            setIsEditing(false);
        }
    };

    const handleConfirmEdit = () => {
        setIsEditing(true);
        setIsModalOpen(false);
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (isEditing) {
    //         onSubmit(formData);
    //         setIsEditing(false);
    //     }
    // };




    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <ManNavBar />
            <div className="flex flex-grow overflow-hidden">
                <ManagerSideBar />
                <div className="flex-1 p-6 overflow-y-auto">
                    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-blue-500 font-[Poppins]">Hall Details</h2>
                            <button 
                                onClick={toggleEdit}
                                className={`px-4 py-2 rounded-lg transition duration-200 flex items-center ${
                                    isEditing 
                                    ? 'bg-red-600 text-white hover:bg-red-700' 
                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}
                            >
                                {isEditing ? (
                                    <>
                                        <X size={18} className="mr-2" />
                                        Cancel
                                    </>
                                ) : (
                                    <>
                                        <Edit size={18} className="mr-2" />
                                        Edit
                                    </>
                                )}
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="hallOwner" className="block text-sm font-medium text-gray-700 mb-1">Hall Owner</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            className={`pl-10 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                isEditing ? 'bg-white' : 'bg-gray-100'
                                            }`}
                                            name="hallOwner"
                                            id="hallOwner"
                                            placeholder='Hall Owner'
                                            defaultValue={formData.hallOwner}
                                            disabled={!isEditing}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="hallName" className="block text-sm font-medium text-gray-700 mb-1">Hall Name</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Home className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            className={`pl-10 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                isEditing ? 'bg-white' : 'bg-gray-100'
                                            }`}
                                            name="hallName"
                                            id="hallName"
                                            placeholder="Hall Name"
                                            disabled={!isEditing}
                                            onChange={handleInputChange}
                                            defaultValue={formData.hallName}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="hallType" className="block text-sm font-medium text-gray-700 mb-1">Hall Type</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Type className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            className={`pl-10 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                isEditing ? 'bg-white' : 'bg-gray-100'
                                            }`}
                                            name="hallType"
                                            id="hallType"
                                            placeholder="Hall Type"
                                            disabled={!isEditing}
                                            onChange={handleInputChange}
                                            defaultValue={formData.hallType}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="hallLocation" className="block text-sm font-medium text-gray-700 mb-1">Hall Location</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <MapPin className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            className={`pl-10 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                isEditing ? 'bg-white' : 'bg-gray-100'
                                            }`}
                                            name="hallLocation"
                                            id="hallLocation"
                                            placeholder="Hall Location"
                                            disabled={!isEditing}
                                            onChange={handleInputChange}
                                            defaultValue={formData.hallLocation}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="hallStatus" className="block text-sm font-medium text-gray-700 mb-1">Hall Status</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Star className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            className={`pl-10 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                isEditing ? 'bg-white' : 'bg-gray-100'
                                            }`}
                                            name="hallStatus"
                                            id="hallStatus"
                                            placeholder="Hall Status"
                                            disabled={!isEditing}
                                            onChange={handleInputChange}
                                            defaultValue={formData.hallStatus}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="hallRating" className="block text-sm font-medium text-gray-700 mb-1">Hall Rating</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Star className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            className={`pl-10 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                isEditing ? 'bg-white' : 'bg-gray-100'
                                            }`}
                                            type="number"
                                            name="hallRating"
                                            id="hallRating"
                                            placeholder="Hall Rating"
                                            disabled={!isEditing}
                                            onChange={handleInputChange}
                                            value={formData.hallRating}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="hallAddress" className="block text-sm font-medium text-gray-700 mb-1">Hall Address</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <MapPin className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            className={`pl-10 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                isEditing ? 'bg-white' : 'bg-gray-100'
                                            }`}
                                            name="hallAddress"
                                            id="hallAddress"
                                            placeholder="Hall Address"
                                            disabled={!isEditing}
                                            onChange={handleInputChange}
                                            defaultValue={formData.hallAddress}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="hallContact" className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Phone className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            className={`pl-10 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                isEditing ? 'bg-white' : 'bg-gray-100'
                                            }`}
                                            name="hallContact"
                                            id="hallContact"
                                            placeholder="Contact Number"
                                            disabled={!isEditing}
                                            onChange={handleInputChange}
                                            defaultValue={formData.hallContact}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Users className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            className={`pl-10 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                isEditing ? 'bg-white' : 'bg-gray-100'
                                            }`}
                                            type="number"
                                            name="capacity"
                                            id="capacity"
                                            placeholder="Capacity"
                                            disabled={!isEditing}
                                            onChange={handleInputChange}
                                            value={formData.capacity}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="hallPrice" className="block text-sm font-medium text-gray-700 mb-1">Hall Price</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <DollarSign className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            className={`pl-10 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                isEditing ? 'bg-white' : 'bg-gray-100'
                                            }`}
                                            type="number"
                                            name="hallPrice"
                                            id="hallPrice"
                                            placeholder="Hall Price"
                                            disabled={!isEditing}
                                            onChange={handleInputChange}
                                            value={formData.hallPrice}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="hallLogo" className="block text-sm font-medium text-gray-700 mb-1">Hall Logo URL</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <DollarSign className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            className={`pl-10 w-[205%] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                isEditing ? 'bg-white' : 'bg-gray-100'
                                            }`}
                                            type="number"
                                            name="hallLogo"
                                            id="hallLogo"
                                            placeholder="Hall Logo URL"
                                            disabled={!isEditing}
                                            onChange={handleInputChange}
                                            value={formData.hallLogo}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <label htmlFor="hallDescription" className="block text-sm font-medium text-gray-700 mb-1">Hall Description</label>
                                <div className="relative">
                                    <div className="absolute top-3 left-3 pointer-events-none">
                                        <FileText className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <textarea
                                        name="hallDescription"
                                        id="hallDescription"
                                        rows="4"
                                        className={`pl-10 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            isEditing ? 'bg-white' : 'bg-gray-100'
                                        }`}
                                        placeholder="Hall Description"
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        defaultValue={formData.hallDescription}
                                    ></textarea>
                                </div>
                            </div>
                            {isEditing && (
                                <div className="mt-6">
                                    <button type="submit" className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200 flex items-center justify-center">
                                        <Save size={18} className="mr-2" />
                                        Save Changes
                                    </button>
                                </div>
                            )}
                            </form>
                        </div>
                    </div>
                </div>
                <Modal 
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={handleConfirmEdit}
                />
            </div>
    );
};

export default HallEditForm;


