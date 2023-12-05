import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure"
import { useQuery } from "@tanstack/react-query";
import { CareerHuntData } from "../Context/CareerHunt";


const useCourse = (limit) => {
    const { search } = useContext(CareerHuntData)
    const axiosecure = useAxiosSecure()
    const { isPending: Loading, data: course = [], refetch } = useQuery({
        queryKey: ['course', limit, search],
        queryFn: async () => {
            const res = await axiosecure.get(`/courses?limit=${limit}&search=${search}`)
            if (res.data?.success === false) {
                return
            }
            return res.data;
        }
    })
    return { Loading, course, refetch }
}

export default useCourse
