import useAxiosSecure from "./useAxiosSecure"
import { useQuery } from "@tanstack/react-query";

const useGetCourseSammery = (useremail,id,targetDate) => {
    const axiosecure = useAxiosSecure()
    const { isPending: loading, data: sammery, refetch } = useQuery({
        queryKey: ['allusers', useremail, id,targetDate],
        enabled: !!useremail,
        queryFn: async () => {
            const res = await axiosecure.get(`/coursesammery?useremail=${useremail}&id=${id}&targetDate=${targetDate}`)
            if (res.data?.success === false) {
                return
            }
            return res.data;
        }
    })
    return { loading, sammery, refetch }
}
export default useGetCourseSammery

