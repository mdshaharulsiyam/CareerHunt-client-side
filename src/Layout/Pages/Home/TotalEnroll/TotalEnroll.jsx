import React, { useEffect, useState } from 'react'
import { PiUsersThreeFill } from "react-icons/pi";
import useAxiosrequest from '../../../../Hooks/useAxiosrequest';
import { PiStudentFill } from "react-icons/pi";
import { FaBook } from 'react-icons/fa';
import Aos from 'aos'
import 'aos/dist/aos.css'
const TotalEnroll = () => {
    const axiosrequest = useAxiosrequest()
    const [TotalEnroll, setTotalEnroll] = useState(null)
    useEffect(() => {
        axiosrequest.get('/totaldata')
            .then((res) => setTotalEnroll(res.data))
    }, [])
    useEffect(() => {
        AOS.init();
    }, [])
    return (
        <div className='grid lg:grid-cols-2 gap-4 container mx-auto py-28'>
            <h2 className='text-center text-2xl font-semibold pb-4 lg:hidden'>Why Choose Us</h2>
            <p className='px-5 text-center py-2 lg:hidden'>CareerHunt offers quality education helping you build your future career. Here just some of the facts that show why students choose us. </p>
            <img data-aos="flip-left"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000" className='w-full rounded-lg object-cover' src="https://i.ibb.co/YRM89Mg/Elearning-online-training.jpg" alt="" />
            <div >
                <h2 className='text-center text-2xl font-semibold pb-4 lg:block hidden'>Why Choose Us</h2>
                <p className='px-5 text-center py-2 lg:block hidden'>CareerHunt offers quality education helping you build your future career. Here just some of the facts that show why students choose us. </p>
                <div className='flex flex-wrap justify-center items-center gap-4'>
                    <div  data-aos="fade-up"
                    data-aos-duration="3000" className="flex flex-col justify-center items-center max-w-xs p-6 shadow-md rounded-xl sm:px-12 dark:bg-gray-900 dark:text-gray-100">
                        <PiUsersThreeFill className='text-6xl' />
                        <div className="space-y-4 text-center divide-y dark:divide-gray-700">
                            <div className="my-2 space-y-1">
                                <h2 className="font-semibold ">total users</h2>
                                <p className='text-3xl font-extrabold '>{TotalEnroll?.totalUser}</p>
                            </div>

                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center max-w-xs p-6 shadow-md rounded-xl sm:px-12 dark:bg-gray-900 dark:text-gray-100">
                        <FaBook className='text-6xl' />
                        <div className="space-y-4 text-center divide-y dark:divide-gray-700">
                            <div className="my-2 space-y-1">
                                <h2 className="font-semibold ">total course</h2>
                                <p className='text-3xl font-extrabold'>{TotalEnroll?.totalcourse}</p>
                            </div>

                        </div>
                    </div>
                    <div data-aos="fade-down"
                        data-aos-easing="linear"
                        data-aos-duration="1500" className="flex flex-col justify-center items-center max-w-xs p-6 shadow-md rounded-xl sm:px-12 dark:bg-gray-900 dark:text-gray-100">
                        <PiStudentFill className='text-6xl' />
                        <div className="space-y-4 text-center divide-y dark:divide-gray-700">
                            <div className="my-2 space-y-1">
                                <h2 className="font-semibold ">total Enroll</h2>
                                <p className='text-3xl font-extrabold animate-bounce '>{TotalEnroll?.totalEnrolment[0]?.totalEnroll}</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TotalEnroll
