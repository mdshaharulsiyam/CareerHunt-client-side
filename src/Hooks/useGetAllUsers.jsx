import useAxiosSecure from "./useAxiosSecure"
import { useQuery } from "@tanstack/react-query";

const useGetAllUsers = (useremail, seacrhValue, itemPerPage, pageNumber) => {
    const axiosecure = useAxiosSecure()
    const { isPending: loading, data: users = [], refetch } = useQuery({
        queryKey: ['allusers', useremail, seacrhValue, itemPerPage, pageNumber],
        enabled: !!useremail,
        queryFn: async () => {
            const res = await axiosecure.get(`/alluser?useremail=${useremail}&seacrhValue=${seacrhValue}&pageNumber=${pageNumber}&itemPerPage=${itemPerPage}`)
            if (res.data?.success === false) {
                return
            }
            return res.data;
        }
    })
    return { loading, users, refetch }
}

export default useGetAllUsers