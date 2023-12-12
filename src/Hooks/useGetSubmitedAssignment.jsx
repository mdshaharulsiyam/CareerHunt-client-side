import useAxiosSecure from "./useAxiosSecure"
import { useQuery } from "@tanstack/react-query";

const useGetSubmitedAssignment = (useremail, course, student) => {
    const axiosecure = useAxiosSecure()
    console.log(useremail, course, student);
    const { isPending: loadingdata, data: mysubmission = [], refetchdata } = useQuery({
        queryKey: ['mysubmissionassignment', useremail, course, student],
        enabled: !!useremail,
        queryFn: async () => {
            const res = await axiosecure.get(`/suubmitedassignment?useremail=${useremail}&course=${course}&student=${student}`)
            if (res.data?.success === false) {
                return
            }
            return res.data;
        }
    })
    return { loadingdata, mysubmission, refetchdata }
}

export default useGetSubmitedAssignment
