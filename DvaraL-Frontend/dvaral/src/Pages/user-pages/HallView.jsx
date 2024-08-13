import Navbar from "../../Web/Navbar";
import UserSideBar from './UserSideBar';
import ReservationSheet from "./ReservationSheet";

import { Star, MapPin, Wifi, Tv, Coffee, Utensils } from 'lucide-react';


import HallImg1 from '/src/assets/images/HallImg1.avif';
import HallImg2 from '/src/assets/images/HallImg2.webp';
import HallImg3 from '/src/assets/images/HallImg3.jpeg';

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getHallByid } from "../../services/api";


const HallView = () => {

  const {hallID} = useParams();

  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [hallDetails, setHallDetails] = useState([
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


  const getHall = async () => {

    console.log("hall id : " + hallID);


    const res = await getHallByid(hallID);
    console.log(res.data);
    setHallDetails(res.data);
    };
  
    useEffect(() => {
    console.log("use");
    getHall()
  },[])




  const hallData = {
    name: "Grand Ballroom",
    location: "New York City, USA",
    rating: 4.8,
    capacity: 500,
    price: 2000,
    description: "The Grand Ballroom is an elegant and spacious venue perfect for large gatherings, weddings, and corporate events. With its stunning chandeliers, high ceilings, and state-of-the-art amenities, it provides a luxurious setting for any occasion.",
    images: [
      HallImg1,
      HallImg2,
      HallImg3,

    ],
    amenities: [
      { icon: Wifi, name: "Free Wi-Fi" },
      { icon: Tv, name: "Projector & Screen" },
      { icon: Coffee, name: "Coffee Machine" },
      { icon: Utensils, name: "Catering Available" },
    ],
    availableDates: [
      { date: "2024-08-15", slots: ["Morning", "Afternoon", "Evening"] },
      { date: "2024-08-16", slots: ["Morning", "Afternoon"] },
      { date: "2024-08-17", slots: ["Evening"] },
    ],
  };


  return (
    <>
      <div className="flex flex-col min---h-screen bg-gray-100">
        <Navbar />
        <div className="flex flex-grow overflow-hidden h-[90vh]">
          {/* Sidebar */}
          <UserSideBar />

          <main className="flex-grow p-6 overflow-y-auto w-[450%]">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h1 className="text-3xl font-semibold text-blue-900">{hallDetails.hallName}</h1>
              <div className="flex items-center mt-2">
                <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                <p className="text-gray-600">{hallDetails.hallLocation}, Tamil Nadu</p>
              </div>
              <div className="flex items-center mt-2">
                <Star className="h-5 w-5 text-yellow-400 mr-2" />
                <p className="text-gray-700 font-semibold">{hallDetails.hallRating} / 5</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold mb-4">About this venue</h2>
                <p className="text-gray-600">{hallDetails.description}</p>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Key Features</h3>
                  <ul className="list-disc list-inside text-gray-600">
                    <li>Capacity: {hallDetails.capacity} guests</li>
                    <li>Price: Rs. {hallDetails.hallPrice} per day</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 gap-4">
                  {hallData.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <amenity.icon className="h-6 w-6 text-blue-500 mr-2" />
                      <span>{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-4">Photo Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {hallData.images.map((image, index) => (
                  <img key={index} src={image} alt={`Hall view ${index + 1}`} className="w-full h-48 object-cover rounded-lg" />
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Availability</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {hallData.availableDates.map((date, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <p className="font-semibold">{date.date}</p>
                    <ul className="mt-2">
                      {date.slots.map((slot, slotIndex) => (
                        <li key={slotIndex} className="text-gray-600">{slot}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <button
                className="bg-blue-900 w-full text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
                onClick={() => {setIsReservationOpen(true)}}
              >
                Reserve Now
              </button>
            </div>
            <ReservationSheet
              isOpen={isReservationOpen}
              onClose={() => setIsReservationOpen(false)}
              hallData={hallID}
            />
          </main>
        </div>
      </div>

    </>
  )
}

export default HallView;
