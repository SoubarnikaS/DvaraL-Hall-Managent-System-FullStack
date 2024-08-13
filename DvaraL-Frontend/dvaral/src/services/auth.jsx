import { axiosInstance } from "./api";
import { jwtDecode } from "jwt-decode";

const setToken = (token) => localStorage.setItem('token', token);

const getToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
        return token;
    }
    return null;
}


const getUserEmail = () => {
    const token = getToken();
    if (token) {
        const payLoad = jwtDecode(token);
        return payLoad?.sub;
    }
    return null;
}

const getUserIdByEmail = async (email) => {
    try {
        const response = await axiosInstance.get(`/v2/auth/getUserId`, { params: { email } });
        return response.data; 
    } catch (error) {
        console.error('Error fetching user ID by email:', error);
        throw error;
    }
}

const getUserName = async () => {
    try{
        const email = getUserEmail;
        
        const response = await axiosInstance.get('/v2/auth/getUserName', email);
        return response.data;
    }catch (error) {
        console.error('Error fetching user ID by email:', error);
        throw error;
    }
}

const getUserID = async () => {
    const email = getUserEmail();
    if (email) {
        return await getUserIdByEmail(email);
    }
    return null;
}


const getUserRole = () => {
    const token = getToken();
    if (token) {
        const payLoad = jwtDecode(token);
        return payLoad?.role;
    }
    return null;
}

const isLoggedIn = () => {
    const token = getToken();
    if (token) {
        const payLoad = jwtDecode(token);
        const isLogin = Date.now() < payLoad.exp * 1000;
        return isLogin;

    }
}

const SignIn = (email, password) => axiosInstance.post("v1/auth/authenticate", { email, password });
const SignOut = () => localStorage.clear()


export const authService = { getToken, setToken,getUserName, getUserEmail, getUserIdByEmail, getUserID, getUserRole, isLoggedIn, SignIn, SignOut };