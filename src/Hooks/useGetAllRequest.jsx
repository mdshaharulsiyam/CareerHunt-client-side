import useAxiosSecure from "./useAxiosSecure"
import { useQuery } from "@tanstack/react-query";

const useGetAllRequest = (useremail,pageNumber,itemPerPage) => {
    const axiosecure = useAxiosSecure()
    const { isPending:loadin, data: requests = [], refetch } = useQuery({
        queryKey: ['request', useremail,pageNumber,itemPerPage],
        enabled: !!useremail,
        queryFn: async () => {
            const res = await axiosecure.get(`/allrequest?useremail=${useremail}&pageNumber=${pageNumber}&itemPerPage=${itemPerPage}`)
            if (res.data?.success === false) {
                return
            }
            return res.data;
        }
    })
    return { loadin, requests, refetch }
}

export default useGetAllRequest
