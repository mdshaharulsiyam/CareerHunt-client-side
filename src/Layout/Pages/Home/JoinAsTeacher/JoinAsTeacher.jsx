import { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { CareerHuntData } from "../../../../Context/CareerHunt"
import useGetUserData from "../../../../Hooks/useGetUserData"
import Aos from 'aos'
import 'aos/dist/aos.css'
const JoinAsTeacher = () => {
    useEffect(() => {
        AOS.init();
    }, [])
    const { currentUser } = useContext(CareerHuntData)
    const { userData } = useGetUserData(currentUser?.useremail)
    return (
        <div  className="container mx-auto grid md:grid-cols-2 gap-4 items-center py-14">
            <img data-aos="zoom-out-up" className="w-full rounded-lg" src='https://i.ibb.co/3NhqR1N/file-teaching-skills-1605625101.jpg' alt="" />
            <div>
                <h2 data-aos="zoom-out-up" className="text-3xl font-semibold py-4">Become an instructor</h2>
                <p data-aos="zoom-out-up" className="font-light leading-6 tracking-[1px]">Unlock your passion for teaching! Join us as an Instructor and inspire minds. Share your expertise, shape futures, and be part of a dynamic learning community. Let's empower together!</p>
                <Link to={userData?.role === 'student' ? '/teachon' :'/dashboard/dashboard'}><button className="bg-black text-white mt-4 hover:bg-opacity-90">start teaching today</button></Link>
            </div>
        </div>
    )
}

export default JoinAsTeacher
