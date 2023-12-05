import React from 'react'
import useAxiosrequest from './useAxiosrequest'
import { useQuery } from '@tanstack/react-query'

const useGetPopulerCourses = () => {
  const axiosrequest = useAxiosrequest()
  const { isPending: populerCoursesLoading, data: populerCourses = [], refetch } = useQuery({
    queryKey: ['populerCourses'],
    queryFn: async () => {
      const res = await axiosrequest.get('/bestcourses')
      if (res.data?.success === false) {
        return
      }
      return res.data;
    }
  })
  return { populerCoursesLoading, populerCourses, refetch }
}

export default useGetPopulerCourses
