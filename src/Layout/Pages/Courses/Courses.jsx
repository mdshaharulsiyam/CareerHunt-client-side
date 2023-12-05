import useCourse from "../../../Hooks/useCourse"
import useGetPopulerCourses from "../../../Hooks/useGetPopulerCourses"
import CourseCard from "./CourseCard"
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import { CareerHuntData } from "../../../Context/CareerHunt";
const Courses = () => {
  const { search } = useContext(CareerHuntData)
  const [content, setContent] = useState([]);
  const [limit, setlimit] = useState(1);
  const { Loading, course, } = useCourse(limit)
  const { populerCoursesLoading, populerCourses, } = useGetPopulerCourses()
  document.title = "CareerHunt | Courses"

  useEffect(() => {
    if (Loading) {
      return
    }
    setContent(course)
  }, [course])
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [limit]);

  const handleScroll = () => {
    const scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    if (scrollPosition + window.innerHeight >= document.documentElement.scrollHeight) {
      setlimit((prevPage) => prevPage + 1);
    }
  };
  return (
    <>
      {
        populerCoursesLoading && <div className="flex my-8 rounded w-full animate-pulse h-[400px] shadow-2xl justify-center items-center px-4">
          <div className="h-full w-1/2 rounded-t bg-gray-700"></div>
          <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 dark:bg-gray-900">
            <div className="w-full h-6 rounded bg-gray-700"></div>
            <div className="w-full h-6 rounded bg-gray-700"></div>
            <div className="w-3/4 h-6 rounded bg-gray-700"></div>
          </div>
        </div>
      }
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          autoplay: true,
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >{
          populerCourses.map(item => <SwiperSlide key={item._id}>
            <div class="group md:flex mb-10 h-full bg-white border border-gray-200 items-center shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7] px-4">
              <div class=" h-[400px] flex flex-col justify-center items-cente">
                <img className='w-full h-full object-cover' src={item?.img} alt="" />
              </div>
              <div class="p-2 md:p-6">
                <h3 class="sm:text-xl font-semibold text-sm text-gray-800 dark:text-gray-300 dark:hover:text-white">
                  {item?.title}
                </h3>
                <p className='pt-2 text-xs sm:text-base'><span className='hidden sm:inline'>Instructor :</span> <span className='font-semibold'>{item?.teacher?.username}</span></p>
                <p class="mt-3 text-gray-500 text-xs sm:text-base">
                  {item?.description.slice(0, 90)}.....
                </p>
                <span className='sm:text-lg text-xs pt-1 flex justify-start items-center gap-3'>
                  <p>totalenroll : ({item?.totalenroll})</p>
                  <p>price : <span className='font-bold'>${item?.price}</span></p>
                </span>
                <Link to={`/details/${item._id}`} class="font-bold py-3  inline-flex justify-center items-center gap-x-2 px-10 mt-2 bg-teal-600 text-gray-800 shadow-sm hover:bg-green-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 hover:text-white transition-all dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" >
                  Enroll
                </Link>
              </div>
            </div>
          </SwiperSlide>
          )
        }

      </Swiper>
      <h3 className="uppercase text-3xl font-semibold text-center pt-12 ">Courses</h3>
      <span className="text-teal-500 text-xl font-semibold text-center pb-12 block pt-3"><span className="font-extrabold text-2xl text-teal-700">{course.length}</span> Courses  {
        search && <span> found for [ " {search} " ] </span>
      } </span>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto py-12">
        {
          content?.map(item => <CourseCard key={item._id} item={item}></CourseCard>)
        }
        {
          Loading && <div className="flex flex-col m-8 rounded w-full animate-pulse h-96k shadow-2xl">
            <div className="h-48 rounded-t bg-gray-700"></div>
            <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 dark:bg-gray-900">
              <div className="w-full h-6 rounded bg-gray-700"></div>
              <div className="w-full h-6 rounded bg-gray-700"></div>
              <div className="w-3/4 h-6 rounded bg-gray-700"></div>
            </div>
          </div>
        }
      </div>
    </>
  )
}

export default Courses
