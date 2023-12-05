import React, { useContext } from 'react'
import UseGetMyEnrollment from '../../Hooks/UseGetMyEnrollment'
import { CareerHuntData } from '../../Context/CareerHunt'
import { Link } from 'react-router-dom'
import useGetUserData from '../../Hooks/useGetUserData'

const MyEnrollment = () => {
    const { currentUser } = useContext(CareerHuntData)
    const { userData } = useGetUserData(currentUser?.useremail)
    const { loading, myenrollment, refetch } = UseGetMyEnrollment(currentUser?.useremail, userData?._id)
    document.title = "CareerHunt | Dashboard EnrollMent Classes"
    return (
        <>
            {
                <p className='text-center py-5 uppercase text-3xl'>My EnrollMent</p >
            }
            <div className='container mx-auto grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 p-3 pt-12'>
                {
                    loading && <div className="flex flex-col m-8 rounded shadow-md w-60 sm:w-80 animate-pulse h-96">
                        <div className="h-48 rounded-t bg-gray-700"></div>
                        <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 dark:bg-gray-900">
                            <div className="w-full h-6 rounded bg-gray-700"></div>
                            <div className="w-full h-6 rounded bg-gray-700"></div>
                            <div className="w-3/4 h-6 py-2 ml-auto rounded bg-gray-700"></div>
                        </div>
                    </div>
                }
                {
                    (!loading && myenrollment.length <= 0) && <p className='text-3xl text-red-500 pt-14 pl-10'>you not enrolled in any course</p>
                }
                {
                    myenrollment?.map(item => <div className='shadow-2xl rounded-md h-full flex flex-col ' key={item._id}>
                        <div className='w-full h-48 '>
                            <img className='w-full h-full object-cover' src={item?.course?.img} alt="" />
                        </div>
                        <div className='p-2 flex-grow'>
                            <h2 className='font-semibold text-lg py-1'>{item?.course?.title}</h2>
                            <p className='font-light'>{item?.course?.teacher?.username}</p>
                        </div>
                        <Link to={`/dashboard/assignments/${item?.course?._id}`}><button className='bg-teal-400 block ml-auto font-semibold mb-2 mr-2 hover:text-white hover:bg-teal-600 transition-all'>Continue</button> </Link>
                    </div>)
                }
            </div>
        </>
    )
}
export default MyEnrollment
