import React, { useContext } from 'react'
import { CareerHuntData } from '../Context/CareerHunt'
import { Navigate, useLocation } from 'react-router-dom'

const PrivetRoute = ({children}) => {
    const { currentUser, loading, } = useContext(CareerHuntData)
    const location = useLocation()
    if (loading) {
        return <span className="loading loading-spinner my-32 w-28 mx-auto block text-secondary"></span>
    }
    if (!currentUser?.useremail) {
        return <Navigate state={location.pathname} to={'/login'}></Navigate>
    }
    return (
        <div>
            {children}
        </div>
    )
}

export default PrivetRoute
