import React from "react";

import { BookMarked, Heart, DollarSign, Wifi, Home, Tv, Flame } from "lucide-react";

import React, { useState, useEffect } from "react";

import { getAllHalls, addToFav } from '../../services/api';




export default BookingCardFiltered =()=>{

    const [halls, setHalls] = useState([
        {
          hallID: '',
          hallOwner : '',
          hallName : '',
          hallType : '',
          hallLocation : '',
          hallDescription : '',
          hallRating : '',
          hallAddress : '',
          hallContact : '',
          capacity : '',
          hallPrice : ''
        }
      ]);


    const fetchAllHalls = async () => {

        const res = await getAllHalls();
        console.log(res);
        setHalls(res.data);
      };
      
      useEffect(() => {
        console.log("use");
        fetchAllHalls()
    },[])


    const addFavs = async (hallID) =>{

        const res = await addToFav(hallID);
        if(res.status === 200){
          toast.success("Added to favorites");
    
    
        }

      }


    return(
        <>
           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 bg-gray-100">
                    {halls.map((card) => (
                        <div key={card.id} className="bg-white rounded-xl h-[65vh] w-[29vw] shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition duration-300">
                            <div className="relative">
                                <img
                                    className="w-full h-48 object-cover"
                                    src={card.image}
                                    alt={card.title}
                                />
                                <button
                                    className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition duration-200"
                                    aria-label="Like"
                                >
                                    <Heart className="h-6 w-6" />
                                </button>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-semibold text-gray-800">{card.title}</h2>
                                    <div className="flex items-center bg-blue-100 rounded-full px-2 py-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="ml-1 text-blue-600 font-semibold">{card.rating}</span>
                                    </div>
                                </div>
                                <p className="text-gray-600 mb-4 line-clamp-3">{card.description}</p>
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
                                    <span className="text-2xl font-bold text-blue-900">${card.price}/night</span>
                                    <button className="bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 flex items-center justify-center">
                                        <BookMarked className="h-5 w-5 mr-2" />
                                        <span className="text-center">Reserve</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
        </>
    )
}