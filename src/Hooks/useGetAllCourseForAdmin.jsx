import useAxiosSecure from "./useAxiosSecure"
import { useQuery } from "@tanstack/react-query";

const useGetAllCourseForAdmin = (useremail, filter, pageNumber, itemPerPage) => {
    const axiosecure = useAxiosSecure()
    const { isPending: courseLoading, data: allcourse = [], refetch } = useQuery({
        queryKey: ['courseall', useremail, filter, pageNumber, itemPerPage],
        enabled: !!useremail,
        queryFn: async () => {
            const res = await axiosecure.get(`/allcourse?useremail=${useremail}&pageNumber=${pageNumber}&itemPerPage=${itemPerPage}&filter=${filter}`)
            if (res.data?.success === false) {
                return
            }
            return res.data;
        }
    })
    return { courseLoading, allcourse, refetch }
}
//allcourse
export default useGetAllCourseForAdmin
