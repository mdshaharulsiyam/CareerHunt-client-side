import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { CareerHuntData } from '../Context/CareerHunt'
import useGetUserData from '../Hooks/useGetUserData'
const StudentRoute = ({children}) => {
    const { currentUser,loading,}=useContext(CareerHuntData)
    const {userData,isPending}=useGetUserData(currentUser?.useremail)
    const location = useLocation()
    if (isPending || loading) {
        return <span className="loading loading-spinner my-32 w-28 mx-auto block text-secondary"></span>
    }
    if (location.pathname === '/teachon' && userData?.role !== 'student') {
      return <Navigate to={'/dashboard'}></Navigate>
    }
  return (
    <div>
      {children}
    </div>
  )
}

export default StudentRoute
