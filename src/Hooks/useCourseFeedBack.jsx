import { useQuery } from '@tanstack/react-query'
import React from 'react'
import useAxiosSecure from './useAxiosSecure'

const useCourseFeedBack = (useremail, id) => {
    const axiosecure = useAxiosSecure()
    const { isPending, data: FeedBacksData = [], refetch } = useQuery({
        queryKey: ['courseall', useremail, id],
        enabled: !!useremail,
        queryFn: async () => {
            const res = await axiosecure.get(`/feedbacks?useremail=${useremail}&id=${id}`)
            if (res.data?.success === false) {
                return
            }
            return res.data;
        }
    })
    return { isPending, FeedBacksData, refetch }

}

export default useCourseFeedBack
