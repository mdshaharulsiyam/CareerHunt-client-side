import React, { useContext } from 'react'
import useGetAllCourseForAdmin from '../../Hooks/useGetAllCourseForAdmin'
import { CareerHuntData } from '../../Context/CareerHunt'
//
import { useEffect, useState } from "react"
import useAxiosrequest from "../../Hooks/useAxiosrequest"
import { Tooltip } from 'react-tooltip'
import useAxiosSecure from "../../Hooks/useAxiosSecure"
import { Link } from 'react-router-dom'

const MyClasses = () => {
    document.title = "CareerHunt | Dashboard My Classes"
    const axiosecure = useAxiosSecure()
    const { currentUser } = useContext(CareerHuntData)
    const [filter, setfilter] = useState('approved')
    const { courseLoading, allcourse, refetch } = useGetAllCourseForAdmin(currentUser?.useremail, filter)
    const deleteid = id => {
        axiosecure.delete(`/coursesrequest?useremail=${currentUser?.useremail}&id=${id}`)
            .then((res) => {
                refetch()
            })
    }
    return (
        <div>
            <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100 overflow-y-auto scroll-smooth ">
                <h2 className="mb-4 text-2xl font-semibold leading">My classes </h2>
                <div className="p-5 min-h-full ">
                    <div className=''>
                        <h1 className="text-xl mb-2">i have {allcourse.length} classes </h1>
                        <span className='flex justify-start items-center gap-2 text-white'>
                            <p className='text-black'>filter by</p>
                            <select className='text-black p-2' onInput={(e) => setfilter(e.target.value)}>
                                <option value="approved">approved</option>
                                <option value="pending">requested</option>
                                <option value="rejected">rejected</option>
                            </select>
                            <p className='text-black'>classes</p>
                        </span>
                    </div>
                    <h3 className='uppercase text-xl py-3 opacity-70'>my {filter} classes</h3>
                    <div className="">
                        {
                            allcourse.length <=0 && <p className='text-red-600 text-xl font-bold p-7'>no {filter} classes found</p>
                        }
                        {
                            courseLoading && <>
                            <div className=" space-y-3 p-4 h-24 rounded-lg shadow my-4 animate-pulse bg-gray-100">
                                <div className="flex items-center space-x-2 text-sm">
                                    <div>
                                        <img className='w-24 h-16 bg-gray-500 rounded'  />
                                    </div>
                                    <span>
                                        <div className=" h-4 bg-slate-600 w-60  font-bold text-lg"></div>
                                        <div className=" h-3 bg-slate-600 w-56  font-bold text-lg mt-1"></div>
                                    </span>
                                    <div>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-700">
                                </div>
                            </div>
                            <div className=" space-y-3 p-4 h-24 rounded-lg shadow my-4 animate-pulse bg-gray-100">
                                <div className="flex items-center space-x-2 text-sm">
                                    <div>
                                        <img className='w-24 h-16 bg-gray-500 rounded'  />
                                    </div>
                                    <span>
                                        <div className=" h-4 bg-slate-600 w-60  font-bold text-lg"></div>
                                        <div className=" h-3 bg-slate-600 w-56  font-bold text-lg mt-1"></div>
                                    </span>
                                    <div>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-700">
                                </div>
                            </div>
                            </>
                        }
                        {
                            allcourse.map(item => <div key={item._id} className="bg-white space-y-3 p-4 rounded-lg shadow my-4">
                                <div className="flex items-center space-x-2 text-sm">
                                    <div>
                                        <img className='w-24 h-16 rounded' src={item?.img} alt="" />
                                    </div>
                                    <span>
                                        <div className="text-gray-500 font-bold text-lg">{item?.title}</div>
                                        <div className="text-black font-semibold ">{item?.teacher?.useremail}</div>
                                    </span>
                                    <div>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-700">
                                    {item?.description.slice(0, 150)}....
                                </div>
                                {
                                    item?.status === 'pending' && <span className="text-sm text-gray-700 bg-teal-200 rounded-md p-1 px-5">
                                        {item?.status}
                                    </span>
                                }

                                <span className='mt-3 block'>
                                    <Tooltip id="approved" />
                                    {
                                        (item?.status === "approved") && <>
                                            <Link to={`/dashboard/updateclasses/${item._id}`} >
                                                <button className='px-4 py-1 hover:scale-105 active:scale-95 bg-green-600 text-white ml-2'>
                                                    update
                                                </button>
                                            </Link>
                                            <button onClick={() => deleteid(item._id)} className='px-4 py-1 hover:scale-105 active:scale-95 bg-red-600 text-white ml-2'>
                                                delete
                                            </button>
                                            <Link to={`/dashboard/myclass/${item._id}`}>
                                                <button className='px-4 py-1 hover:scale-105 active:scale-95 bg-teal-400 text-black ml-2'>
                                                    See details
                                                </button>
                                            </Link>
                                        </>
                                    }
                                    {
                                        item?.status === "rejected" && <button onClick={() => deleteid(item._id)} className='px-4 py-1 hover:scale-105 active:scale-95 bg-red-600 text-white ml-2'>
                                            delete
                                        </button>
                                    }
                                </span>
                            </div>)
                        }

                    </div>

                </div>

            </div>

        </div>
    )
}

export default MyClasses
