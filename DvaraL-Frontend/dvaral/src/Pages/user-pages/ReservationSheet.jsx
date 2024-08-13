import React, { useState, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { bookHall } from '../../services/api';

const ReservationSheet = ({ isOpen, onClose, hallData }) => {
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    userPhone: '',
    requestedDate: '',
    requestedTime: '',
    noOfGuest: '',
    eventType: '',
    specialRequests: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { userName, userEmail, userPhone, requestedDate, requestedTime, noOfGuest, eventType, specialRequests } = formData;

    try {
      const res = await bookHall(hallData, userName, userEmail, userPhone, requestedDate, requestedTime, noOfGuest, eventType, specialRequests, 'Pending');
      toast.success('Reservation booked successfully!');
      onClose();
      setFormData({
        userName: '',
        userEmail: '',
        userPhone: '',
        requestedDate: '',
        requestedTime: '',
        noOfGuest: '',
        eventType: '',
        specialRequests: ''
      });
    } catch (error) {
      console.error('Error booking reservation:', error);
      toast.error('Failed to book reservation. Please try again.');
    }
  };

  return (
    <div 
      className={`fixed inset-y-0 right-0 w-96 bg-white shadow-lg transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 ease-in-out overflow-y-auto`}
    >
      <div className="p-10 bg-gradient-to-b from-blue-50 to-white">
        <div className="sticky top-0 z-10 pt-20">
          <button 
            onClick={onClose} 
            className="absolute top-12 right-4 text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out"
            aria-label="Close reservation sheet"
          >
            X
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              id="userEmail"
              name="userEmail"
              value={formData.userEmail}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="userPhone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              id="userPhone"
              name="userPhone"
              value={formData.userPhone}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="requestedDate" className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
            <input
              type="date"
              id="requestedDate"
              name="requestedDate"
              value={formData.requestedDate}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="requestedTime" className="block text-sm font-medium text-gray-700 mb-1">Time Slot</label>
            <select
              id="requestedTime"
              name="requestedTime"
              value={formData.requestedTime}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none"
            >
              <option value="">Select a time slot</option>
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="evening">Evening</option>
            </select>
          </div>
          <div>
            <label htmlFor="noOfGuest" className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
            <input
              type="number"
              id="noOfGuest"
              name="noOfGuest"
              value={formData.noOfGuest}
              onChange={handleInputChange}
              required
              min="1"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-1">Event Purpose</label>
            <select
              id="eventType"
              name="eventType"
              value={formData.eventType}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none"
            >
              <option value="">Select event type</option>
              <option value="wedding">Wedding</option>
              <option value="corporate">Corporate Event</option>
              <option value="birthday">Birthday Party</option>
              <option value="conference">Conference</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
            <textarea
              id="specialRequests"
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none"
              placeholder="Any special arrangements or requests?"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-3 px-4 rounded-lg hover:bg-blue-800 transition duration-300 flex items-center justify-center shadow-md"
          >
            Book Reservation
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReservationSheet;
