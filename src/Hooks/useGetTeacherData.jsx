
import useAxiosrequest from './useAxiosrequest'
import { useQuery } from "@tanstack/react-query";
const useGetTeacherData = () => {
    const axiosrequest = useAxiosrequest()
    const { isPending: TeacherLoadin, data: TeacherData = [], refetch } = useQuery({
        queryKey: ['Teacher'],
        queryFn: async () => {
            const res = await axiosrequest.get(`/teacher`)
            if (res.data?.success === false) {
                return
              }
              return res.data;
        }
    })
    return { TeacherLoadin, TeacherData, refetch }
}

export default useGetTeacherData
