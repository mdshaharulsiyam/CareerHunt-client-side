import React, { useContext } from 'react'
import useGetUserData from '../../Hooks/useGetUserData'
import { CareerHuntData } from '../../Context/CareerHunt'
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import { FaPhoneAlt } from "react-icons/fa";
const Profile = () => {
    const { currentUser } = useContext(CareerHuntData)
    const { isPending, userData, refetch } = useGetUserData(currentUser?.useremail)
    const axiosecure = useAxiosSecure()
    const updateProfile = e => {
        e.preventDefault()
        const phone = e.target.phone.value
        if (!phone) {
            return false
        }
        const data = {
            id: userData?._id,
            phone: phone
        }
        axiosecure.patch(`/user?useremail=${currentUser?.useremail}`, data)
            .then((res) => {
                refetch()
            })
    }
    document.title = "CareerHunt | Dashboard profile"
    return (
        <>
            {
                <p className='text-center py-5 uppercase text-3xl'>profile</p >
            }
            {
                isPending ? <div className="py-4 rounded shadow-md w-60 sm:w-80 animate-pulse bg-gray-900">
                    <div className="flex p-4 space-x-4 sm:px-8">
                        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gray-700"></div>
                        <div className="flex-1 py-2 space-y-4">
                            <div className="w-full h-3 rounded bg-gray-700"></div>
                            <div className="w-5/6 h-3 rounded bg-gray-700"></div>
                        </div>
                    </div>
                    <div className="p-4 space-y-4 sm:px-8">
                        <div className="w-full h-4 rounded bg-gray-700"></div>
                        <div className="w-full h-4 rounded bg-gray-700"></div>
                        <div className="w-3/4 h-4 rounded bg-gray-700"></div>
                    </div>
                </div> : <div className='container mx-auto p-4 pl-20 pt-20 flex flex-wrap justify-start gap-4'>
                    <div className="flex flex-col justify-center max-w-xs p-6 shadow-md rounded-xl sm:px-12 dark:bg-gray-900 dark:text-gray-100">
                        <img src={userData?.profileImage} alt="" className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square" />
                        <div className="space-y-4 text-center divide-y dark:divide-gray-700">
                            <div className="my-2 space-y-1">
                                <h2 className="text-xl font-semibold sm:text-2xl">{userData?.username}</h2>
                                <h2>{userData?.role}</h2>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className=" flex justify-start items-center gap-1"> {userData?.useremail}</span>
                                <span className=" flex justify-start items-center gap-1"><FaPhoneAlt className='' /> {userData?.phone}</span>

                            </div>
                        </div>
                    </div>
                    {
                        !userData?.phone && <form onSubmit={updateProfile} className="col-span-full sm:col-span-3 p-4 max-w-sm">
                            <p>Hi there! 📱 Add your phone number for personalized updates and account security. We'll only use it for important notifications. Thanks!</p>
                            <label className="text-sm font-semibold">you phone number</label>
                            <input type="number" placeholder="phone" name='phone' className="w-full border-2 p-2 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
                            <button className='bg-green-400 mt-2 hover:scale-105 transition-all'>add number</button>
                        </form >
                    }
                </div>
            }

        </>
    )
}

export default Profile
