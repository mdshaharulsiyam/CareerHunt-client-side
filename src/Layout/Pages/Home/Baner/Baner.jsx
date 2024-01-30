import { Link } from 'react-router-dom'
import { useTypewriter, Cursor } from 'react-simple-typewriter'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import { useContext, useEffect } from 'react'
import { CareerHuntData } from '../../../../Context/CareerHunt'
import useGetUserData from '../../../../Hooks/useGetUserData'
import Aos from 'aos'
import 'aos/dist/aos.css'
const Baner = () => {
    const { currentUser } = useContext(CareerHuntData)
    const { userData } = useGetUserData(currentUser?.useremail)
    const [text] = useTypewriter({
        words: ['programming', 'design', 'business', 'development', 'coding', 'web development', 'software engineering', 'graphic design', 'user experience', 'entrepreneurship', 'startups']
        ,
        loop: {},
    })
    useEffect(() => {
        AOS.init();
    }, [])
    return (
        <div
            className='bg-[url(https://i.ibb.co/hVDqJDF/Online-learning-scaled.jpg)] py-20 bg-cover bg-no-repeat relative z-20 '>
            <span className='w-full h-full absolute top-0 left-0 bg-black -z-10 bg-opacity-70'></span>
            <div className='container mx-auto sm:flex justify-between  items-center '>
                <div className='container mx-auto text-white z-20'>
                    <span data-aos="fade-down" className='text-5xl mb-6 block '>
                        Learn <span className='uppercase text-4xl'>{text}</span>
                        <Cursor cursorColor='red' />
                    </span>
                    <p data-aos="zoom-in-up" style={{ textShadow: '2px 7px 5px rgba(0,0,0,0.3), 0px -4px 10px rgba(255,255,255,0.3)' }} className='max-w-2xl opacity-90 italic tracking-[1px]'>
                        Discover a world of knowledge at <span className='font-bold text-lg'>CareerHunt</span>. Whether you're passionate about programming, eager to sharpen your business acumen, or exploring diverse topics, we offer expertly curated resources to propel your learning journey. Join our interactive community, access top-notch tutorials, and stay ahead in a rapidly evolving digital landscape. Start your path to success with us – learn, grow, and thrive
                    </p>
                    <Link to={'/Classes'}><button data-aos="fade-up" style={{ boxShadow: 'rgba(0, 0, 0, 0.56) 0px 22px 70px 4px' }} className='text-black block bg-white font-bold my-6 hover:text-blue-700 '>Browse Courses</button></Link>
                    {
                        (userData?.role !== 'teacher' && userData?.role !== 'admin') && <span>
                            <Link to={'/teachon'} className='underline' data-tooltip-id="apply_for_teacher"
                                data-tooltip-content="apply for teacher"
                                data-tooltip-place="top"
                            >Are you a teacher?</Link>
                            <Tooltip id="apply_for_teacher" />
                        </span>
                    }

                </div>

                <img data-aos="zoom-in" className='hidden sm:block sm:w-64 lg:w-96' src="https://i.ibb.co/TrWrMpY/online-education-concept-illustration-study-learning-online-with-laptop-tablet-smartphone-and-headph.webp" alt="" />
            </div>
        </div>
        // <div className='App'>
        //    
        // </div>
    )
}
// cursorColor='red'
export default Baner
