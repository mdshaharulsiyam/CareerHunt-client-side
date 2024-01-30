import React, { useContext, useEffect, useState } from 'react'
import useAxiosrequest from '../../../Hooks/useAxiosrequest'
import { Link, useParams } from 'react-router-dom'
import { FaArrowLeft, FaRegCreditCard } from 'react-icons/fa6'
import { Tooltip } from 'react-tooltip'
import { CareerHuntData } from '../../../Context/CareerHunt'
import useGetSIngleEnrolmentData from '../../../Hooks/useGetSIngleEnrolmentData'
import useGetUserData from '../../../Hooks/useGetUserData'
const Details = () => {
    const { currentUser } = useContext(CareerHuntData)
    const axiosrequest = useAxiosrequest()
    const [CourseDetails, setCourseDetails] = useState(null)
    const params = useParams()
    useEffect(() => {
        axiosrequest.get(`/singlecourse?id=${params.id}`)
            .then((res) => {
                setCourseDetails(res.data)
            })
    }, [])

    const { userData } = useGetUserData(currentUser?.useremail)
    const { loading, singleenroll, refetch } = useGetSIngleEnrolmentData(currentUser?.useremail, params.id, userData?._id)
    document.title = "CareerHunt | Details"
    return (
        <div>
            {loading && <div className="flex my-8 rounded w-full animate-pulse h-[400px] shadow-2xl justify-center items-center px-4">
                <div className="h-full w-1/2 rounded-t bg-gray-700"></div>
                <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 ">
                    <div className="w-full h-6 rounded bg-gray-700"></div>
                    <div className="w-full h-6 rounded bg-gray-700"></div>
                    <div className="w-3/4 h-6 rounded bg-gray-700"></div>
                </div>
            </div>}
            <section className="">
                <div className="container flex flex-col justify-center items-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
                    <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 w-full sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
                        <img src={CourseDetails?.img} alt="" className="w-full object-cover h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" />
                    </div>
                    <div className="flex flex-col justify-center p-6 rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
                        <span className='pb-1'>Instructor info : </span>
                        <span className='flex justify-start items-center gap-3 '>
                            <img className='h-10 w-10 rounded-full' src={CourseDetails?.teacher?.profileImage} alt="" />
                            <p className='text-xl font-semibold'>{CourseDetails?.teacher?.username}</p>
                        </span>
                        <p className='pt-2 font-semibold italic'>skiled in : {CourseDetails?.teacher?.skils}</p>
                        <span className='pt-4'>course details :</span>
                        <p className=' text-3xl'>{CourseDetails?.title}</p>
                        <p className="my-5 text-lg ">
                            {CourseDetails?.description}
                        </p>
                        <span className=' flex justify-start items-center gap-3'>
                            <p>price : <span className='font-bold'>${CourseDetails?.price}</span></p>
                            <p>totalenroll : ({CourseDetails?.totalenroll})</p>
                        </span>
                        <div className="flex flex-col space-y-4 pt-2 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
                            {
                                singleenroll.length > 0 ? <p className='uppercase font-bold '>you have enrolled this course</p> : <Link to={`/payment/${CourseDetails?._id}`}
                                    data-tooltip-id="pay"
                                    data-tooltip-content="pay for enroll "
                                    data-tooltip-place="left" rel="noopener noreferrer" className="flex justify-start items-center gap-1 bg-orange-600 px-10 hover:text-white text-black hover:bg-orange-500 py-2 text-lg font-semibold rounded "><FaRegCreditCard /> Pay</Link >
                            }
                            <Tooltip id="pay" />
                            <Link to={-1} rel="noopener noreferrer" className="flex justify-start items-center gap-1 px-8 py-1 text-lg font-semibold border-4 hover:border-gray-400 transition-all border-transparent rounded "><FaArrowLeft /> back</Link >
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Details
