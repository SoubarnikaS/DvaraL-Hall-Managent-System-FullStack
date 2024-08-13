// import React from 'react';
// import { Search, BookMarked, Heart, Mail, DollarSign, Wifi, Home, Tv, Flame } from "lucide-react";

// export function BookingCard() {

//   const amenities = [
//     { icon: DollarSign, tooltip: "$129 per night" },
//     { icon: Wifi, tooltip: "Free wifi" },
//     { icon: Home, tooltip: "2 bedrooms" },
//     { icon: Tv, tooltip: '65" HDTV' },
//     { icon: Flame, tooltip: "Fire alert" },
//   ];

//   const bookingCards = [
//     {
//       id: 1,
//       title: "Wooden House, Florida",
//       image: "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
//       description: "Enter a freshly updated and thoughtfully furnished peaceful home surrounded by ancient trees, stone walls, and open meadows.",
//       rating: 5.0,
//     },
//     {
//       id: 2,
//       title: "Beachfront Villa, Malibu",
//       image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
//       description: "Luxurious beachfront villa with stunning ocean views, private pool, and direct access to the sandy shores of Malibu.",
//       rating: 4.9,
//     },
//     {
//       id: 3,
//       title: "Mountain Cabin, Aspen",
//       image: "https://images.unsplash.com/photo-1518732714860-b62714ce0c59?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
//       description: "Cozy mountain retreat perfect for skiing enthusiasts, featuring a fireplace, hot tub, and breathtaking mountain views.",
//       rating: 4.8,
//     },
//     {
//       id: 4,
//       title: "City Loft, New York",
//       image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
//       description: "Modern and stylish loft in the heart of Manhattan, close to all the attractions and featuring a rooftop terrace.",
//       rating: 4.7,
//     },
//     {
//       id: 5,
//       title: "Tropical Bungalow, Bali",
//       image: "https://images.unsplash.com/photo-1570213489059-0aac6626cade?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
//       description: "Exotic bungalow surrounded by lush tropical gardens, featuring a private pool and traditional Balinese architecture.",
//       rating: 4.9,
//     },
//   ];


//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//             {bookingCards.map((card) => (
//               <div key={card.id} className=" h-[65vh] bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-104 transition duration-300">
//                 <div className="relative">
//                   <img
//                     className="w-full h-48 object-cover"
//                     src={card.image}
//                     alt={card.title}
//                   />
//                   <button
//                     className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition duration-200"
//                     aria-label="Like"
//                   >
//                     <Heart className="h-6 w-6" />
//                   </button>
//                 </div>
//                 <div className="p-6">
//                   <div className="flex justify-between items-center mb-4">
//                     <h2 className="text-xl font-semibold text-gray-800">{card.title}</h2>
//                     <div className="flex items-center bg-blue-100 rounded-full px-2 py-1">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
//                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                       </svg>
//                       <span className="ml-1 text-blue-600 font-semibold">{card.rating}</span>
//                     </div>
//                   </div>
//                   <p className="text-gray-600 mb-4 line-clamp-3">{card.description}</p>
//                   <div className="flex flex-wrap gap-2 mb-4">
//                     {amenities.map((item, index) => (
//                       <div key={index} className="relative group">
//                         <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors group-hover:bg-gray-200">
//                           <item.icon className="h-5 w-5" />
//                         </span>
//                         <span className="absolute bottom-full left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//                           {item.tooltip}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                   <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 flex items-center justify-center">
//                     <BookMarked className="h-5 w-5 mr-2" />
//                     <span>Reserve Now</span>
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//   );
// }

import React, { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { BookMarked, Heart, DollarSign, Wifi, Home, Tv, Flame, MapPin } from "lucide-react";

import { getAllHalls, addToFav, getFavsForUser, deleteFavHall } from '../../services/api';


const notify = () => toast.success('Added to your favorites!');

export function BookingCard() {

  const navigate = useNavigate();

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
      hallPrice : '',
      hallLogo:'',
    }
  
  ]);
  const [fhalls, setFHalls] = useState([
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
          hallPrice: ''
      }
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

  const hallView = (hallID) => {
  navigate(`/hall-view/${hallID}`)
  }

  const fetchAllFavs = async () => {
    try {
        const res = await getFavsForUser();
        console.log(res);
        
        setFHalls(res.data.map(favObj => ({
            ...favObj,
            isFavorite: true 
        })));
    } catch (error) {
        console.error("Error fetching favorites:", error);
    }
};

useEffect(() => {
  console.log("favss");
  fetchAllFavs()
}, [])



  const addFavs = async (hallID) =>{

    const res = await addToFav(hallID);
    if(res.status === 200){
      toast.success("Added to favorites");
    }
    // console.log("fav");
    fetchAllFavs();
    // navigate(0);
    // window.location.reload(false);
    notify;
  }

  
  const delFavs =  async (favObj) => {
    try{
         const res = await deleteFavHall(favObj);

         if(res.status === 200)
            toast.success("Removed from favorites");
         fetchAllFavs();
         fetchAllHalls();
        // navigate(0);
        // window.location.reload(false);

    }catch (error) {
        console.error("Error deleting favorites:", error);
    }
}


  const amenities = [
    { icon: DollarSign, tooltip: "$129 per night", name: "Affordable" },
    { icon: Wifi, tooltip: "Free wifi", name: "Free WiFi" },
    { icon: Home, tooltip: "2 bedrooms", name: "2 Bedrooms" },
    { icon: Tv, tooltip: '65" HDTV', name: "HDTV" },
    { icon: Flame, tooltip: "Fire alert", name: "Fire Alert" },
  ];



  return (
    <div>
      {halls.length > 0 ?(
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {halls.map((hall) => (
            <div key={hall.hallID} className="h-[70vh] bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-104 transition duration-300">
              <div className="relative">
                <img
                  className="w-full h-48 object-cover"
                  src={hall.hallLogo}
                  // src={"https://image.wedmegood.com/resized/1000X/uploads/member/2876203/1723188194_WhatsApp_Image_2024_07_27_at_1.00.25_PM.jpeg"}
                  alt={hall.hallName}
                />
                {
                  fhalls.find(e => e.hall.hallID === hall.hallID) ? (
                    <button style = {{ fill: 'red', color: 'red'}} onClick= {() => delFavs(fhalls.find(e => e.hall.hallID))}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition duration-200"
                  aria-label="Like"
                >
                  <Heart className="h-6 w-6" />
                </button>


                  ):(
                    <button onClick= {() => addFavs(hall.hallID)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition duration-200"
                  aria-label="Like"
                >
                  <Heart className="h-6 w-6" />
                </button>

                  )
                }
               
                
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <button onClick={() => hallView(hall.hallID)}>
                    <h2 className="text-xl font-semibold text-blue-700 cursor-pointer">{hall.hallName}</h2>
                  </button>
      
                  <div className="flex items-center bg-blue-100 rounded-full px-2 py-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1 text-blue-600 font-semibold">{hall.hallRating}</span>
                  </div>
                </div>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{hall.hallLocation}</span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3">{hall.hallDescription}</p>
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
              
                  <button className="w-full bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 flex items-center justify-center" onClick={() => hallView(hall.hallID)}>
                    <BookMarked className="h-5 w-5 mr-2" />
                    <span>Reserve Now</span>
                  </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-xl text-gray-600">No results found. Please try different filters.</p>
        </div>
      )}
    </div>
  );
}