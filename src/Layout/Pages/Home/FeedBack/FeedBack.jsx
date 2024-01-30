import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import StarRatings from 'react-star-ratings';
import useAxiosrequest from '../../../../Hooks/useAxiosrequest';
import { useEffect, useState } from 'react';
import Aos from 'aos'
import 'aos/dist/aos.css'
const FeedBack = ({ show }) => {
    const axiosrequest = useAxiosrequest()
    const [feedback, setfeedback] = useState([])
    const [loading,setloadin]=useState(false)
    useEffect(() => {
        setloadin(true)
        axiosrequest.get('/feedback')
            .then((res) => {
                setloadin(false)
                setfeedback(res.data)})
    }, [])
    useEffect(() => {
        AOS.init();
    }, [])
    return (
        <div className='py-12'>
            <h3 className='uppercase text-3xl pb-12 text-center'>FeedBack </h3>
            <Swiper data-aos="zoom-in-up"
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
            >{
                    feedback.map(item => <SwiperSlide key={item._id}>
                        <div class="group flex mb-10 flex-col h-[240px] bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7] p-2 md:p-6">
                            <div className='flex justify-start gap-2 items-center flex-wrap pb-2'>
                                <img className='h-12 w-12 rounded-full' src={item?.userimage} alt="" />
                                <span>
                                    <h3 className='text-sm dark:text-white'>{item?.username}</h3>
                                    <StarRatings
                                        rating={parseInt(item?.rating)}
                                        starRatedColor="orange"
                                        starHoverColor="orange"
                                        numberOfStars={5}
                                        starDimension="17px"
                                        starSpacing="1px"
                                        name='rating'
                                    />
                                </span>
                            </div>
                            <div class="">
                                <h3 class="font-semibold text-gray-800 dark:text-gray-300 dark:hover:text-white">
                                    {item?.title}
                                </h3>
                                <p class="mt-3 text-gray-500 text-xs sm:text-base">
                                    {item?.description.slice(0, 120)}....
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                    )
                }
                {
                   loading && <SwiperSlide>
                        <div className="py-4 rounded shadow-md w-60 sm:w-80 animate-pulse bg-gray-900">
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
                        </div>
                    </SwiperSlide>
                }
            </Swiper>
        </div >
    )
}

export default FeedBack
