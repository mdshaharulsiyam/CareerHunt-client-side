import useAxiosSecure from "./useAxiosSecure"
import { useQuery } from "@tanstack/react-query";

const useGetSIngleEnrolmentData = (useremail, id, student) => {
    const axiosecure = useAxiosSecure()
    const { isPending: loading, data: singleenroll = [], refetch } = useQuery({
        queryKey: ['singleenroll', useremail, student],
        enabled: !!useremail,
        queryFn: async () => {
            const res = await axiosecure.get(`/singleenroll?useremail=${useremail}&id=${id}&student=${student}`)
            if (res.data?.success === false) {
                return
            }
            return res.data;
        }
    })
    return { loading, singleenroll, refetch }
}
//singleenroll
export default useGetSIngleEnrolmentData
