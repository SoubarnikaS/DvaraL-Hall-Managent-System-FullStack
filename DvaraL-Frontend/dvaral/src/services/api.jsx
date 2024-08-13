import axios from 'axios';

const baseURL = 'http://localhost:8080/api';

const axiosInstance = axios.create({
    baseURL,
});

axiosInstance.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem('token');
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    }, (error) => {
        return Promise.reject(error);
    }

);

const SignUpData = (name, email, password, role) => 
    axiosInstance.post(`${baseURL}/v1/auth/register`, {name, email, password, role});

const addHallDetails = (hallOwner, hallName, hallType, hallLocation,hallDescription, hallAddress,capacity , hallPrice, hallRating, hallStatus, hallContact ) => 
    axiosInstance.post(`${baseURL}/v2/halls/add-halls`, {hallOwner, hallName, hallType, hallLocation,hallDescription, hallAddress,capacity , hallPrice, hallRating, hallStatus, hallContact}, {
        'Content-Type': 'application/json'
      });


const getAllHalls = () =>
    axiosInstance.get(`${baseURL}/v2/halls/fetch/all-halls`);

const getHallByid = (hallID) =>
    axiosInstance.get(`${baseURL}/v2/halls/fetch/${hallID}`);

const bookHall = (hallID, userName, userEmail, userPhone, requestedDate, requestedTime , noOfGuest, eventType, specialRequests, bookingStatus) =>
    axiosInstance.post(`${baseURL}/v2/hall/add/booking-details/${hallID}`, {userName, userEmail, userPhone, requestedDate, requestedTime , noOfGuest, eventType, specialRequests, bookingStatus});

const getRequestForManager = () =>
    axiosInstance.get(`${baseURL}/v2/hall/fetch/booking-requests`);


const updateBookingStatus = (bookingID, bookingStatus) =>
    axiosInstance.patch(`${baseURL}/v2/hall/update-status/${bookingID}`, {bookingStatus}, {
         'Content-Type': 'application/json'
    });


const addToFav = (hallID) =>
    axiosInstance.post(`${baseURL}/v2/halls/add-to-fav/${hallID}`);

const getFavsForUser = () =>
    axiosInstance.get(`${baseURL}/v2/halls/get-favourite`);

const getReservedHallsForUser = () =>
    axiosInstance.get(`${baseURL}/v2/hall/fetch/booked-by-user`);


const getHallDetailsForOwner = () => 
    axiosInstance.get(`${baseURL}/v2/halls/fetch/by/manager`);

const deleteFavHall = (favObj) =>
    axiosInstance.delete(`${baseURL}/v2/halls/remove-favourites`, {data: favObj});

const getAllUsersByManager = () => 
    axiosInstance.get(`${baseURL}/v2/auth/fetch/allUser`);

const updateAccountStatus = (id, bookingStatus) =>
    axiosInstance.patch(`${baseURL}/v2/auth/manager-account/${id}`, {bookingStatus});

const editHallDetails = (hID, formData) =>
    axiosInstance.put(`${baseURL}/v2/halls/edit/hall/${hID}`, formData);


export {axiosInstance, SignUpData, addHallDetails, getAllHalls, getHallByid, bookHall, getRequestForManager,
     updateBookingStatus, addToFav, getFavsForUser, getReservedHallsForUser, getHallDetailsForOwner, deleteFavHall,
      getAllUsersByManager, updateAccountStatus, editHallDetails }

