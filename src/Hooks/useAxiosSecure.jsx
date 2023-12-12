import axios from 'axios'
import { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { CareerHuntData } from '../Context/CareerHunt';
const axiosecure = axios.create({
    // baseURL: 'https://career-hunt-server.vercel.app',
    baseURL: 'http://localhost:5000',
    withCredentials: true,
})
const useAxiosSecure = () => {
    const { userSignOut } = useContext(CareerHuntData);
    axiosecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
        if (status === 401 || status === 403) {
            userSignOut();
            return <Navigate to={'/login'}></Navigate>
        }
        return Promise.reject(error);
    })

    return axiosecure
}

export default useAxiosSecure
