import useGetPopulerCourses from "../../../Hooks/useGetPopulerCourses"
import PopulerCourses from "../../Shered/Courses/PopulerCourses"
import Baner from "./Baner/Baner"
import Colaborate from "./Colaborate/Colaborate"
import FeedBack from "./FeedBack/FeedBack"
import JoinAsTeacher from "./JoinAsTeacher/JoinAsTeacher"
import OurTutors from "./OurTutors/OurTutors"
import TotalEnroll from "./TotalEnroll/TotalEnroll"
import WeProvide from "./WeProvide/WeProvide"
import Aos from 'aos'
import 'aos/dist/aos.css'
const Home = () => {
  document.title = "CareerHunt | Home"
  const { populerCoursesLoading, populerCourses } = useGetPopulerCourses()
  return (
    <>
      <Baner />
      <h2 className="uppercase text-4xl font-bold text-center py-16 pt-20 ">Populer Courses</h2>
      <div className="container mx-auto hidden lg:block">
        <PopulerCourses courses={populerCourses} loading={populerCoursesLoading} showItem={3} />
      </div>
      <div className="container mx-auto hidden md:block lg:hidden">
        <PopulerCourses courses={populerCourses} loading={populerCoursesLoading} showItem={2} />
      </div>
      <div className="container mx-auto block md:hidden">
        <PopulerCourses courses={populerCourses} loading={populerCoursesLoading} showItem={1} />
      </div>
      <TotalEnroll />
      <WeProvide />
      <OurTutors />
      <div className="hidden lg:block">
        <Colaborate show={3} />
      </div>
      <div className="hidden md:block lg:hidden">
        <Colaborate show={2} />
      </div>
      <div className="block md:hidden">
        <Colaborate show={1} />
      </div>
      <JoinAsTeacher />
      <div className="sm:hidden ">
        <FeedBack show={1} />
      </div>
      <div className="hidden sm:block lg:hidden">
        <FeedBack show={2} />
      </div>
      <div className="hidden lg:block">
        <FeedBack show={4} />
      </div>
    </>
  )
}

export default Home
