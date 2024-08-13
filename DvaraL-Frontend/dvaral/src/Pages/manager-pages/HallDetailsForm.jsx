import React, { useState } from 'react';
import ManNavBar from './ManNavBar';
import ManagerSideBar from './ManagerSideBar';
import { addHallDetails } from '../../services/api';
import toast from 'react-hot-toast';

const HallDetailsForm = () => {
    const [formData, setFormData] = useState({
        hallOwner: '',
        hallName: '',
        hallType: '',
        hallLocation: '',
        hallDescription: '',
        hallStatus: 'Available',
        hallRating: 4.5,
        hallAddress: '',
        hallContact: '',
        capacity: 0,
        hallPrice: 0,
        hallLogo: '',
        hallAmenities: [],
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: name === 'capacity' || name === 'hallPrice' ? Number(value) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        const res = await addHallDetails(formData.hallOwner, formData.hallName, formData.hallType, formData.hallLocation, formData.hallDescription, formData.hallAddress, formData.capacity, formData.hallPrice, 4.5, "Available" , formData.hallContact, formData.hallLogo);

        if(res.status === 201)
            toast.success(formData.hallName + " has been successfully added!");
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <ManNavBar />
            <div className="flex flex-grow overflow-hidden">
                <ManagerSideBar />
                <div className="flex-grow p-6 overflow-y-auto">
                    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-bold mb-6 text-center text-blue-500 font-[Poppins]">Let Us Know About Your Hall</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="hallOwner" className="block text-sm font-medium text-gray-700 mb-1">Hall Owner</label>
                                    <input
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        name="hallOwner"
                                        id="hallOwner"
                                        type="text"
                                        // value={formData.hallOwner}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="hallName" className="block text-sm font-medium text-gray-700 mb-1">Hall Name</label>
                                    <input
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        name="hallName"
                                        id="hallName"
                                        type="text"
                                        // value={formData.hallName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="hallType" className="block text-sm font-medium text-gray-700 mb-1">Hall Type</label>
                                    <input
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        name="hallType"
                                        id="hallType"
                                        type="text"
                                        // value={formData.hallType}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="hallLocation" className="block text-sm font-medium text-gray-700 mb-1">Hall Location</label>
                                    <input
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        name="hallLocation"
                                        id="hallLocation"
                                        type="text"
                                        // value={formData.hallLocation}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="hallAddress" className="block text-sm font-medium text-gray-700 mb-1">Hall Address</label>
                                    <input
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        name="hallAddress"
                                        id="hallAddress"
                                        type="text"
                                        // value={formData.hallAddress}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="hallContact" className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                                    <input
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        name="hallContact"
                                        id="hallContact"
                                        type="text"
                                        // value={formData.hallContact}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                                    <input
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        name="capacity"
                                        id="capacity"
                                        type="number"
                                        // value={formData.capacity}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="hallPrice" className="block text-sm font-medium text-gray-700 mb-1">Hall Price</label>
                                    <input
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        name="hallPrice"
                                        id="hallPrice"
                                        type="number"
                                        // value={formData.hallPrice}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="hallLogo" className="block text-sm font-medium text-gray-700 mb-1">Hall Logo URL</label>
                                    <input
                                        className="w-[205%] px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        name="hallLogo"
                                        id="hallLogo"
                                        type="text"
                                        // value={formData.hallPrice}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="mt-4">
                                <label htmlFor="hallDescription" className="block text-sm font-medium text-gray-700 mb-1">Hall Description</label>
                                <textarea
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    name="hallDescription"
                                    id="hallDescription"
                                    rows="4"
                                    // value={formData.hallDescription}
                                    onChange={handleInputChange}
                                ></textarea>
                            </div>
                            <div className="mt-6">
                                <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HallDetailsForm;