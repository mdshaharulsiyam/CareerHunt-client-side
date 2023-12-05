import useAxiosSecure from "./useAxiosSecure"
import { useQuery } from "@tanstack/react-query";

const useGetAssignment = (useremail, course, student) => {
    const axiosecure = useAxiosSecure()
    const { isPending: loading, data: myassignments = [], refetch } = useQuery({
        queryKey: ['aplicationdata', useremail, course, student],
        enabled: !!useremail,
        queryFn: async () => {
            const res = await axiosecure.get(`/assignments?useremail=${useremail}&course=${course}&student=${student}`)
            if (res.data?.success === false) {
                return
            }
            return res.data;
        }
    })
    return { loading, myassignments, refetch }
}
export default useGetAssignment
