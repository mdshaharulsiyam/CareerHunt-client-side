import useAxiosSecure from "./useAxiosSecure"
import { useQuery } from "@tanstack/react-query";

const useGetMyApplication = (useremail) => {
    const axiosecure = useAxiosSecure()
    const { isPending:loadin, data: myApplocations = [], refetch } = useQuery({
        queryKey: ['aplicationdata', useremail],
        enabled: !!useremail,
        queryFn: async () => {
            const res = await axiosecure.get(`/teacthersaplication?useremail=${useremail}`)
            if (res.data?.success === false) {
                return
            }
            return res.data;
        }
    })
    return { loadin, myApplocations, refetch }
}

export default useGetMyApplication
