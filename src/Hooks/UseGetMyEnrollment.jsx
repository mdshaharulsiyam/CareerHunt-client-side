import useAxiosSecure from "./useAxiosSecure"
import { useQuery } from "@tanstack/react-query";


const UseGetMyEnrollment = (useremail,id) => {
    const axiosecure = useAxiosSecure()
    const { isPending: loading, data: myenrollment = [], refetch } = useQuery({
        queryKey: ['aplicationdata', useremail,id],
        enabled: !!useremail,
        queryFn: async () => {
            const res = await axiosecure.get(`/enroll?useremail=${useremail}&id=${id}`)
            if (res.data?.success === false) {
               return  
            }
            return res.data;
        }
    })
    return { loading, myenrollment, refetch }
}
//enroll
export default UseGetMyEnrollment
