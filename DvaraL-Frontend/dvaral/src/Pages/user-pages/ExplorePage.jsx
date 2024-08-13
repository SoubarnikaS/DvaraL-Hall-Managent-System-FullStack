import React, { useState, useEffect } from "react";
import Navbar from '../../Web/Navbar';
import { BookMarked, Heart, DollarSign, Wifi, Home, Tv, Flame, Filter, Search } from "lucide-react";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { getAllHalls, addToFav } from '../../services/api';

const notify = () => toast.error('Sign in to perform actions');

const ExplorePage = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [halls, setHalls] = useState([]);
    const [filteredHalls, setFilteredHalls] = useState([]);

    const [filters, setFilters] = useState({
        priceRange: 1000,
        eventPurpose: 'all',
        amenities: [],
        searchQuery: '',
    });

    const fetchAllHalls = async () => {
        const res = await getAllHalls();
        setHalls(res.data);
        setFilteredHalls(res.data);
    };

    useEffect(() => {
        fetchAllHalls();
    }, []);

    const addFavs = async (hallID) => {
        const res = await addToFav(hallID);
        if (res.status === 200) {
            toast.success("Added to favorites");
        }
    };

    const hallView = (hallID) => {
        navigate(`/hall-view/${hallID}`);
    };

    const amenities = [
        { icon: DollarSign, tooltip: "Affordable" },
        { icon: Wifi, tooltip: "Free wifi" },
        { icon: Home, tooltip: "Entire home" },
        { icon: Tv, tooltip: 'HDTV' },
        { icon: Flame, tooltip: "Heating" },
    ];

    const eventPurposes = [
        'Wedding',
        'Corporate Event',
        'Birthday Party',
        'Conference',
        'Others'
    ];

    const handleFilterChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: type === 'checkbox'
                ? checked
                    ? [...prevFilters.amenities, value]
                    : prevFilters.amenities.filter(item => item !== value)
                : value
        }));
    };

    useEffect(() => {
        const newFilteredHalls = halls.filter(hall => {
            const matchesPrice = hall.hallPrice <= filters.priceRange;
            const matchesEventPurpose = filters.eventPurpose === 'all' || hall.hallType === filters.eventPurpose;
            const matchesAmenities = filters.amenities.length === 0 || filters.amenities.every(amenity =>
                hall.hallDescription.toLowerCase().includes(amenity.toLowerCase())
            );
            const matchesSearch = hall.hallName.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                                  hall.hallDescription.toLowerCase().includes(filters.searchQuery.toLowerCase());

            return matchesPrice && matchesEventPurpose && matchesAmenities && matchesSearch;
        });
        setFilteredHalls(newFilteredHalls);
    }, [filters, halls]);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto p-10">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 leading-tight font-josefin-sans">Your Vision, Our Spaces!</h1>
                    <p className="text-xl text-gray-600 font-popppins">Find your perfect getaway</p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <div className="flex items-center mb-4">
                        <Filter className="h-6 w-6 text-blue-500 mr-2" />
                        <h2 className="text-2xl font-semibold">Filters</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price Range (up to ${filters.priceRange})</label>
                            <input
                                type="range"
                                name="priceRange"
                                min="0"
                                max="1000"
                                value={filters.priceRange}
                                onChange={handleFilterChange}
                                className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-sm text-gray-600 mt-1">
                                <span>$0</span>
                                <span>${filters.priceRange}</span>
                            </div>
                        </div>
                        {/* <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Event Purpose</label>
                            <select
                                name="eventPurpose"
                                value={filters.eventPurpose}
                                onChange={handleFilterChange}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                            >
                                <option value="all">All</option>
                                {eventPurposes.map((purpose, index) => (
                                    <option key={index} value={purpose}>{purpose}</option>
                                ))}
                            </select>
                        </div> */}
                        {/* <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Amenities</label>
                            <div className="space-y-2">
                                {amenities.map((amenity, index) => (
                                    <label key={index} className="inline-flex items-center mr-4">
                                        <input
                                            type="checkbox"
                                            name="amenities"
                                            value={amenity.tooltip}
                                            checked={filters.amenities.includes(amenity.tooltip)}
                                            onChange={handleFilterChange}
                                            className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">{amenity.tooltip}</span>
                                    </label>
                                ))}
                            </div>
                        </div> */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="searchQuery"
                                    value={filters.searchQuery}
                                    onChange={handleFilterChange}
                                    placeholder="Search halls..."
                                    className="w-[250%] pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 bg-gray-100">
                    {filteredHalls.map((card) => (
                        <div key={card.hallID} className="bg-white rounded-xl h-[68vh] w-[29vw] shadow-lg overflow-hidden cursor-pointer transform hover:scale-103 transition duration-300">
                            <div className="relative">
                                <img
                                    className="w-full h-48 object-cover"
                                    src={card.hallLogo}
                                    alt={card.hallName}
                                />
                                {token != null ? (
                                    <button onClick={() => addFavs(card.hallID)}
                                        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition duration-200"
                                        aria-label="Like"
                                    >
                                        <Heart className="h-6 w-6" />
                                    </button>
                                ) : (
                                    <button onClick={notify}
                                        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition duration-200"
                                        aria-label="Like"
                                    >
                                        <Heart className="h-6 w-6" />
                                    </button>
                                )}
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    {token === null ? (
                                        <h2 onClick={notify} className="text-xl font-semibold text-blue-900">{card.hallName}</h2>
                                    ) : (
                                        <button onClick={() => hallView(card.hallID)}>
                                            <h2 className="text-xl font-semibold text-blue-900">{card.hallName}</h2>
                                        </button>
                                    )}
                                    <div className="flex items-center bg-blue-100 rounded-full px-2 py-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="ml-1 text-blue-600 font-semibold">{card.hallRating}</span>
                                    </div>
                                </div>
                                <p className="text-gray-600 mb-4 line-clamp-3">{card.hallDescription}</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {amenities.map((item, index) => (
                                        <div key={index} className="relative group">
                                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors group-hover:bg-gray-200">
                                                <item.icon className="h-5 w-5" />
                                            </span>
                                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                {item.tooltip}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-2xl font-bold text-blue-900">${card.hallPrice}/night</span>
                                    {token === null ? (
                                        <button onClick={notify} className="bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 flex items-center justify-center">
                                            <BookMarked className="h-5 w-5 mr-2" />
                                            <span className="text-center">Reserve</span>
                                        </button>
                                    ) : (
                                        <button onClick={() => hallView(card.hallID)} className="bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 flex items-center justify-center">
                                            <BookMarked className="h-5 w-5 mr-2" />
                                            <span className="text-center">Reserve</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ExplorePage;