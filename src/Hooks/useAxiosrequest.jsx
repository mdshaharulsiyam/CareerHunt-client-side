import axios from "axios";
const axiosrequest = axios.create({
    baseURL:'https://career-hunt-server.vercel.app',
    // baseURL:'http://localhost:5000',
})
const useAxiosrequest = () => {
  return axiosrequest
}

export default useAxiosrequest
