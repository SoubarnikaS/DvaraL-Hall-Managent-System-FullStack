import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import Navbar from "../../Web/Navbar";
import UserSideBar from './UserSideBar';
import toast from 'react-hot-toast';


import { BookMarked, Heart, DollarSign, Wifi, Home, Tv, Flame, MapPin, MoveRight } from "lucide-react";
import { Button } from '@mui/material';



import { getFavsForUser, deleteFavHall } from "../../services/api";


const Favourites = () => {

    const navigate = useNavigate();

    const [halls, setHalls] = useState([
        {
            users:{
                email : '',
                name : '',
                id : ''

            },

            hall: {
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
                hallPrice: '',
                hallLogo: ''
            }
        }
    ]);



    const fetchAllFavs = async () => {
        try {
            const res = await getFavsForUser();
            console.log(res);
            
            setHalls(res.data.map(favObj => ({
                ...favObj,
                isFavorite: true 
            })));
        } catch (error) {
            console.error("Error fetching favorites:", error);
        }
    };


    const delFavs =  async (favObj) => {
        try{
             const res = await deleteFavHall(favObj);
             if(res.status === 200)
                toast.success("Removed from favorites");
             setHalls(halls => halls.map(favHallObj => (
                favHallObj.hall.hallID === favObj.hallID
                ? { ...favHallObj, isFavorite: false } : favHallObj
            )));

            fetchAllFavs();

            // window.location.reload(false);

        }catch (error) {
            console.error("Error deleting favorites:", error);
        }
    }

    const toggleFavorite = (hallID) => {
        setHalls(prevHalls => 
            prevHalls.map(hall => 
                hall.hall.hallID === hallID 
                    ? { ...hall, isFavorite: !hall.isFavorite }
                    : hall
            )
        );
        
    };


    useEffect(() => {
        console.log("favss");
        fetchAllFavs()
    }, [])

    

    const amenities = [
        { icon: DollarSign, tooltip: "$129 per night", name: "Affordable" },
        { icon: Wifi, tooltip: "Free wifi", name: "Free WiFi" },
        { icon: Home, tooltip: "2 bedrooms", name: "2 Bedrooms" },
        { icon: Tv, tooltip: '65" HDTV', name: "HDTV" },
        { icon: Flame, tooltip: "Fire alert", name: "Fire Alert" },
    ];

    const hallView = (hallID) => {
        navigate(`/hall-view/${hallID}`)
    }



    return (
        <>
            <div className="flex flex-col min---h-screen bg-gray-100">
                <Navbar />
                <div className="flex flex-grow overflow-hidden h-[90vh]">
                    <UserSideBar />

                    <main className="flex-grow p-6 overflow-y-auto w-[450%]">
                        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                            <h1 className="text-3xl font-semibold text-blue-600">Favourites</h1>
                            <p className="text-gray-600 mt-2">Check out the halls you favourites!</p>
                        </div>

                        <div>
                            {halls.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {halls.map((favObj) => (
                                        <div key={favObj.hall.hallID} className="h-[70vh] bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-104 transition duration-300">
                                            <div className="relative">
                                                <img
                                                    className="w-full h-48 object-cover"
                                                    src = {favObj.hall.hallLogo}
                                                    // src={"https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"}
                                                    alt={favObj.hall.hallName}
                                                />
                                                <button
                                                    // onClick={() => toggleFavorite(favObj.hall.hallID)}
                                                    onClick={() => delFavs(favObj)}
                                                    className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition duration-200"
                                                    aria-label="Toggle Favorite"
                                                >
                                                    <Heart
                                                        style={{ fill: favObj.isFavorite ? 'red' : 'none', color: favObj.isFavorite ? 'red' : 'white' }}
                                                        className="h-6 w-6"
                                                    />
                                                </button>
                                            </div>
                                            <div className="p-6">
                                                <div className="flex justify-between items-center mb-4">
                                                    <button onClick={() => hallView(favObj.hall.hallID)}>
                                                        <h2 className="text-xl font-semibold text-blue-700 cursor-pointer">{favObj.hall.hallName}</h2>
                                                    </button>

                                                    <div className="flex items-center bg-blue-100 rounded-full px-2 py-1">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                        <span className="ml-1 text-blue-600 font-semibold">{favObj.hall.hallRating}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center text-gray-600 mb-2">
                                                    <MapPin className="h-4 w-4 mr-1" />
                                                    <span>{favObj.hall.hallLocation}</span>
                                                </div>
                                                <p className="text-gray-600 mb-4 line-clamp-3">{favObj.hall.hallDescription}</p>
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

                                                <button className="w-full bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 flex items-center justify-center" onClick={() => hallView(favObj.hall.hallID)}>
                                                    <BookMarked className="h-5 w-5 mr-2" />
                                                    <span>Reserve Now</span>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-xl text-gray-600">You don’t have any favorite halls at this moment.</p>
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
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

export default Favourites;