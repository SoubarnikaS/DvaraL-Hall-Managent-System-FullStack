import React, { useState, useEffect } from 'react';
import { Upload, X } from 'lucide-react';

import axios from 'axios';

import { getHallDetailsForOwner } from '../../services/api';


import ManNavBar from './ManNavBar';
import ManagerSideBar from './ManagerSideBar';

const HallImages = ({}) => {

    const [formData, setFormData] = useState({
        hallID: '',
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
        hallLogo: '',
        hallAmenities: [],
    });

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchAllRegisteredHalls();
    }, []);

    useEffect(() => {
        if (formData.hallID) {
            fetchHallImages();
        }
    }, [formData.hallID]);

    const fetchAllRegisteredHalls = async () => {
        try {
            const res = await getHallDetailsForOwner();
            setFormData(res.data);
        } catch (error) {
            console.error("Error fetching hall details:", error);
            setError("Failed to fetch hall details. Please try again.");
        }
    };

    const fetchHallImages = async () => {
        try {
            const response = await axios.get(`/api/images/hall/${formData.hallID}`);
            setUploadedImages(response.data);
        } catch (error) {
            console.error("Error fetching hall images:", error);
            setError("Failed to fetch hall images. Please try again.");
        }
    };

    const handleFileSelection = (e) => {
        const files = Array.from(e.target.files);
        setError('');

        const validFiles = files.filter(file => {
            if (!file.type.startsWith('image/')) {
                setError('Please select only image files.');
                return false;
            }
            if (file.size > 5 * 1024 * 1024) {
                setError('Image size should not exceed 5MB.');
                return false;
            }
            return true;
        });

        setSelectedFiles(prevFiles => [...prevFiles, ...validFiles]);
    };

    const handleUpload = async (hallID) => {
        if (!formData.hallID) {
            setError('No hall ID available. Please try again.');
            return;
        }

        for (const file of selectedFiles) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('hallId', formData.hallID);

            try {
                await axios.post(`/api/images/upload/${hallID}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } catch (error) {
                console.error(`Error uploading file ${file.name}:`, error);
                setError(`Failed to upload ${file.name}. Please try again.`);
                return;
            }
        }

        setSelectedFiles([]);
        fetchHallImages();
    };

    const removeSelectedFile = (index) => {
        setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    };

    const removeUploadedImage = async (imageId) => {
        try {
            await axios.delete(`/api/images/${imageId}`);
            fetchHallImages();
        } catch (error) {
            console.error("Error deleting image:", error);
            setError("Failed to delete image. Please try again.");
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <ManNavBar />
            <div className="flex flex-grow overflow-hidden h-[90vh]">
                <ManagerSideBar />
                <div className="p-4 w-[85%]">
                    <h2 className="text-2xl font-bold mb-4">Hall Images for {formData.hallName}</h2>
                    <div className="mb-4">
                        <label htmlFor="image-upload" className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                            <div className="flex flex-col items-center">
                                <Upload className="w-8 h-8 text-gray-400" />
                                <span className="mt-2 text-sm text-gray-500">Click to select images</span>
                            </div>
                            <input
                                id="image-upload"
                                type="file"
                                multiple
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileSelection}
                            />
                        </label>
                    </div>
                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    {selectedFiles.length > 0 && (
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold mb-2">Selected Files:</h3>
                            <div className="grid grid-cols-3 gap-4">
                                {selectedFiles.map((file, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={`Selected ${index + 1}`}
                                            className="w-full h-32 object-cover rounded-lg"
                                        />
                                        <button
                                            onClick={() => removeSelectedFile(index)}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={handleUpload()}
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Upload Selected Images
                            </button>
                        </div>
                    )}

                    {uploadedImages.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Uploaded Images:</h3>
                            <div className="grid grid-cols-3 gap-4">
                                {uploadedImages.map((image) => (
                                    <div key={image.id} className="relative">
                                        <img
                                            src={`/api/images/${image.id}`}
                                            alt={`Uploaded ${image.filename}`}
                                            className="w-full h-32 object-cover rounded-lg"
                                        />
                                        <button
                                            onClick={() => removeUploadedImage(image.id)}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HallImages;