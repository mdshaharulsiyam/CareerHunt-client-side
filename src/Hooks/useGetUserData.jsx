import useAxiosSecure from "./useAxiosSecure"
import { useQuery } from "@tanstack/react-query";
const useGetUserData = (useremail) => {
    const axiosecure =useAxiosSecure()
    const {isPending,data: userData,refetch} =useQuery({
        queryKey : ['userData',useremail],
        enabled : !!useremail, 
        queryFn : async()=>{
            const res = await axiosecure.get(`/user?useremail=${useremail}`)
            if (res.data?.success === false) {
                return
              }
              return res.data;
        }
    })
  return {isPending,userData,refetch}
}

export default useGetUserData
