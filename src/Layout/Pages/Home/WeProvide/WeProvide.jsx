import React, { useEffect } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'
const WeProvide = () => {
    useEffect(() => {
        AOS.init();
    }, [])
    return (
        <div className='container mx-auto'>
            <p className='text-center italic font-extrabold text-cyan-400'>Guaranteed Success</p>
            <h3 className='text-4xl font-bold text-center mt-2'>What We Offer</h3>
            <p className='max-w-3xl container mx-auto text-center py-5 pb-9 font-light'>CareerHunt offers students the best of education and entertainment opportunities available in the area. We are glad to take care of every student and university entrant.</p>
            <div data-aos="zoom-out" className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                <div className='flex justify-center items-center flex-col shadow-md px-3 py-4'>
                    <img src="https://i.ibb.co/TP1r8FN/Screenshot-2023-11-26-201704.png" alt="" />
                    <h4 className='text-center text-lg font-semibold py-2'>Online Education</h4>
                    <p className='text-center font-light'>Teachzy provides online education services with all learning materials and lectures available to you.</p>
                </div>
                <div className='flex justify-center items-center flex-col shadow-md px-3 py-4'>
                    <img src="https://i.ibb.co/5RkC7S5/Screenshot-2023-11-26-202303.png" alt="" />
                    <h4 className='text-center text-lg font-semibold py-2'>Programs & Courses</h4>
                    <p className='text-center font-light'>We offer a wide range of courses and programs that encompass lots of knowledge spheres.</p>
                </div>
                <div className='flex justify-center items-center flex-col shadow-md px-3 py-4'>
                    <img src="https://i.ibb.co/z8bL1yj/Screenshot-2023-11-26-202151.png" alt="" />
                    <h4 className='text-center text-lg font-semibold py-2'>Campus Events</h4>
                    <p className='text-center font-light'>Our campus is the hub to a talented and diverse student community that turns opportunities into success.</p>
                </div>
            </div>
        </div>
    )
}

export default WeProvide
