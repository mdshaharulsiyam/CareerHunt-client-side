import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import './ourTutor.css';
import Aos from 'aos'
import 'aos/dist/aos.css'
import { EffectCards, Autoplay } from 'swiper/modules';
import useGetTeacherData from '../../../../Hooks/useGetTeacherData';
import { FaPhoneAlt } from 'react-icons/fa';
import { useEffect } from 'react';
const OurTutors = () => {
    const { TeacherLoadin, TeacherData, refetch } = useGetTeacherData()
    useEffect(() => {
        AOS.init();
    }, [])
    return (
        <div className='container mx-auto tutor pt-14'>
            <p className='text-center italic font-extrabold text-cyan-400'>People Behind Our Success</p>
            <h3 className='text-4xl font-bold text-center pt-3 uppercase'>Our Tutors</h3>
            <p className='max-w-2xl text-center font-light mx-auto py-10'>We employ highly experienced and qualified teachers who set the ground for all our programs and courses. They are aimed to help you achieve more on your path to success.</p>
            <Swiper data-aos="flip-right"
                effect={'cards'}
                grabCursor={true}
                autoplay={{
                    autoplay: true,
                    delay: 2000
                }}
                modules={[EffectCards, Autoplay]}
                className="mySwiper"
            >
                {
                    TeacherData.map(item => <SwiperSlide key={item._id}>
                        <div className="flex flex-col justify-center max-w-xs p-6 rounded-xl sm:px-12 dark:bg-gray-900 dark:text-gray-100">
                            <img src={item?.profileImage} alt="" className="w-36 h-36 p-3 mx-auto rounded-full dark:bg-gray-500 aspect-square" />
                            <div className="space-y-4 text-center divide-y dark:divide-gray-700">
                                <div className="my-2 space-y-1">
                                    <h2 className="text-xl font-semibold sm:text-2xl">{item?.username}</h2>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="flex justify-start items-center gap-1 text-base mb-1 font-semibold"> {item?.useremail}</span>
                                    <span className="flex justify-start items-center gap-1 text-base font-normal"><FaPhoneAlt className='' /> {item?.phone}</span>

                                </div>
                            </div>
                        </div>
                    </SwiperSlide>)
                }
                {
                    TeacherLoadin && <SwiperSlide >
                    <div className="flex flex-col m-8 rounded w-full animate-pulse h-96k ">
                        <div className="h-36 w-36 mx-auto rounded-full bg-gray-700"></div>
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

export default OurTutors
