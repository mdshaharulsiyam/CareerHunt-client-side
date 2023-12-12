import useAxiosSecure from "./useAxiosSecure"
import { useQuery } from "@tanstack/react-query";

const useGetAllSubmitedAssignment = (useremail, course) => {
    const axiosecure = useAxiosSecure()
    const { isPending: loadingdata, data: allsubmitions = [], refetchdata } = useQuery({
        queryKey: ['allsubmitedassignment', useremail, course],
        enabled: !!useremail,
        queryFn: async () => {
            const res = await axiosecure.get(`/allsuubmitedassignment?useremail=${useremail}&course=${course}`)
            if (res.data?.success === false) {
                return
            }
            return res.data;
        }
    })
    return { loadingdata, allsubmitions, refetchdata }
}
export default useGetAllSubmitedAssignment
