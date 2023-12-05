import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import Aos from 'aos'
import 'aos/dist/aos.css'
import { Pagination, Autoplay } from 'swiper/modules';
const Colaborate = ({ show }) => {
    const [colaborateData, setColaborateData] = useState([])
    const [loading, setLoadin] = useState(false)
    useEffect(() => {
        setLoadin(true)
        fetch('/colaborate.json')
            .then((res) => res.json())
            .then((data) => {
                setColaborateData(data)
                setLoadin(false)
            })
    }, [])
    useEffect(() => {
        AOS.init();
    }, [])
    return (
        <div className='py-24 container mx-auto'>
            <h2 className='uppercase text-4xl font-bold text-center pb-16'>collaborators</h2>
            <Swiper data-aos="zoom-in-down"
                slidesPerView={show}
                spaceBetween={30}
                autoplay={{
                    autoplay: true,
                    delay: 1500
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
            >
                {
                    colaborateData?.map(item => <SwiperSlide key={item._id}><div className='flex justify-center items-center flex-col text-center mb-10 shadow-2xl w-full h-60 box-border p-3'>
                        <img className='w-20 h-20 rounded-full mb-2' src={item?.image} />
                        <h3 className='mb-2 font-semibold'>{item?.companyName}</h3>
                        <p>{item?.description}</p>
                    </div></SwiperSlide>)
                }
                {loading && <SwiperSlide>
                    <div className="flex flex-col m-8 rounded w-full animate-pulse ">
                        <div className="h-16 w-16 mx-auto rounded-full bg-gray-700"></div>
                        <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 dark:bg-gray-900">
                            <div className="w-full h-6 rounded bg-gray-700"></div>
                            <div className="w-full h-6 rounded bg-gray-700"></div>
                            <div className="w-3/4 h-6 rounded bg-gray-700"></div>
                        </div>
                    </div>
                </SwiperSlide>
                }
            </Swiper>
        </div>
    )
}

export default Colaborate
