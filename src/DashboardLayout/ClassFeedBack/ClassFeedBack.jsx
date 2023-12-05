import React, { useContext, useEffect, useState } from 'react'
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import { CareerHuntData } from '../../Context/CareerHunt'
import { useParams } from 'react-router-dom'
import useAxiosrequest from '../../Hooks/useAxiosrequest'
import StarRatings from 'react-star-ratings';
import useCourseFeedBack from '../../Hooks/useCourseFeedBack'
import Swal from 'sweetalert2'
const ClassFeedBack = () => {
    document.title = 'CareerHunt | Dashboard class progress'
    const { currentUser } = useContext(CareerHuntData)
    const { id } = useParams()
    const axiosrequest = useAxiosrequest()
    const axiosequre = useAxiosSecure()
    const [CourseDetails, setCourseDetails] = useState(null)
    useEffect(() => {
        axiosrequest.get(`/singlecourse?id=${id}`)
            .then((res) => {
                setCourseDetails(res.data)
            })
    }, [])
    const [loading, setloading] = useState(false)
    const { isPending, FeedBacksData, refetch } = useCourseFeedBack(currentUser?.useremail, id)
    const deleteFeedback = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                setloading(true)
                axiosequre.delete(`/feedbacks?useremail=${currentUser?.useremail}&id=${id}`)
                    .then((res) => {
                        if (res.data.success) {
                            refetch()
                            setloading(false)
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        } else {
                            setloading(false)
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "Something went wrong!",
                                footer: '<a href="#">Why do I have this issue?</a>'
                            });
                        }

                    })

            } else {
                setloading(false)
            }
        });
    }
    return (
        <div className='container mx-auto px-2'>
            <div className="bg-white space-y-3 p-4 rounded-lg shadow my-4">
                <h2>course</h2>
                <div className="flex items-center space-x-2 text-sm">
                    <div>
                        <img className='w-24 h-16 rounded' src={CourseDetails?.img} alt="" />
                    </div>
                    <span>
                        <p className="text-gray-500 font-bold text-lg">{CourseDetails?.title}</p>
                        <p className="text-black font-semibold ">{CourseDetails?.teacher?.username}</p>
                        <p className="text-black font-semibold ">{CourseDetails?.teacher?.useremail}</p>
                    </span>
                    <div>
                    </div>
                </div>
            </div>
            {
                loading && <>
                    <span className="loading loading-ball loading-xs"></span>
                    <span className="loading loading-ball loading-sm"></span>
                    <span className="loading loading-ball loading-md"></span>
                    <span className="loading loading-ball loading-lg"></span>
                </>
            }
            {
                <p className='text-center py-5 uppercase text-3xl'>feedback</p>
            }
            <div className='grid md:grid-cols-2 lg:grid-cols-3  gap-4'>
                {
                    (!isPending && FeedBacksData.length <= 0) && <p className='text-xl font-bold p-5'>no feedback available</p>
                }
                {
                    isPending && <div className="flex flex-col m-8 rounded shadow-md w-60 sm:w-80 animate-pulse h-96">
                        <div className="h-48 rounded-t bg-gray-700"></div>
                        <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 dark:bg-gray-900">
                            <div className="w-full h-6 rounded bg-gray-700"></div>
                            <div className="w-full h-6 rounded bg-gray-700"></div>
                            <div className="w-3/4 h-6 py-2 ml-auto rounded bg-gray-700"></div>
                        </div>
                    </div>
                }
                {
                    FeedBacksData.map(item => <div key={item._id} class="group flex mb-10 flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7] p-2 md:p-6">
                        <div className='flex justify-start gap-2 items-center flex-wrap pb-2'>
                            <img className='h-12 w-12 rounded-full' src={item?.userimage} alt="" />
                            <span>
                                <h3 className='text-sm'>{item?.username}</h3>
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
                        <button onClick={() => deleteFeedback(item._id)} className='bg-red-600 active:scale-95 mt-auto w-32 ml-auto font-bold text-white hover:bg-red-900'>delete</button>
                    </div>)
                }
            </div>
        </div>
    )
}
//feedbacks
export default ClassFeedBack
