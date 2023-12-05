import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { CareerHuntData } from '../Context/CareerHunt'
import useGetUserData from '../Hooks/useGetUserData'
const AdminRoute = ({children}) => {
    const { currentUser, loading, } = useContext(CareerHuntData)
    const { userData, isPending } = useGetUserData(currentUser?.useremail)
    const location = useLocation()
    if (loading || isPending) {
        return <span className="loading loading-spinner my-32 w-28 mx-auto block text-secondary"></span>
    }
    if (!currentUser?.useremail) {
        return <Navigate state={location.pathname} to={'/login'}></Navigate>
    }
    if (userData?.role !== 'admin' || !userData?.useremail) {
        return <Navigate to={'/dashboard'}></Navigate>
    }
    return (
        <div>
            {children}
        </div>
    )
}

export default AdminRoute
