import React, { useContext } from 'react'
import { CareerHuntData } from '../Context/CareerHunt'
import { Navigate, useLocation } from 'react-router-dom'

const LoginRoute = ({ children }) => {
    const { currentUser, loading, } = useContext(CareerHuntData)
    const location = useLocation()
    console.log(location);
    if (loading) {
        return <span className="loading loading-spinner my-32 w-28 mx-auto block text-secondary"></span>
    }
    if (currentUser?.useremail) {
        if (location.state) {
            return <Navigate to={`${location.state}`}></Navigate>
        } else {
            return <Navigate to={'/'}></Navigate>
        }
    }
    return (
        <div>
            {children}
        </div>
    )
}

export default LoginRoute
