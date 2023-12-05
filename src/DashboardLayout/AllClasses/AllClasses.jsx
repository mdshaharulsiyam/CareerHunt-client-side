import React, { useContext } from 'react'
import useGetAllCourseForAdmin from '../../Hooks/useGetAllCourseForAdmin'
import { CareerHuntData } from '../../Context/CareerHunt'
import { useEffect, useState } from "react"
import useAxiosrequest from "../../Hooks/useAxiosrequest"
import { Tooltip } from 'react-tooltip'
import useAxiosSecure from "../../Hooks/useAxiosSecure"
import { Link, } from "react-router-dom"
import Swal from 'sweetalert2'
const AllClasses = () => {
    document.title = "CareerHunt | Dashboard All class"
    const axiorequst = useAxiosrequest()
    const axiosecure = useAxiosSecure()
    const { currentUser } = useContext(CareerHuntData)
    const [pageNumber, setPagenumber] = useState(0)
    const [itemPerPage, setItemPerPage] = useState(10)
    const [totalclasses, settotalclasses] = useState(0)
    const [filter, setfilter] = useState('approved')
    const [loading, setloading] = useState(false)
    const { courseLoading, allcourse, refetch } = useGetAllCourseForAdmin(currentUser?.useremail, filter, pageNumber, itemPerPage)
    const totalpagenumber = Math.ceil(parseInt(totalclasses) / itemPerPage)
    const pages = [...Array(totalpagenumber).keys()];
    useEffect(() => {
        axiorequst.get('/courseCount')
            .then((res) => settotalclasses(res.data))
    }, [])
    const reject = id => {
        const data = {
            id,
            status: 'rejected'
        }
        Swal.fire({
            title: "Are you sure?",
            text: "You want's to reject this class",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes,"
        }).then((result) => {
            setloading(true)
            if (result.isConfirmed) {
                axiosecure.patch(`/coursesrequest?useremail=${currentUser?.useremail}`, data)
                    .then((res) => {
                        if (res.data.success) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "class rejected succesfully",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            refetch()
                            setloading(false)
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "Something went wrong!",
                                footer: 'unable to reject class'
                            });
                            setloading(false)
                        }

                    })
            } else {
                setloading(false)
            }
        });

    }
    const approve = id => {
        const data = {
            id,
            status: 'approved'
        }
        Swal.fire({
            title: "Are you sure?",
            text: "You want's to approve this class",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes,"
        }).then((result) => {
            setloading(true)
            if (result.isConfirmed) {
                axiosecure.patch(`/coursesrequest?useremail=${currentUser?.useremail}`, data)
                    .then((res) => {
                        if (res.data.success) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "class approved succesfully",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            refetch()
                            setloading(false)
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "Something went wrong!",
                                footer: 'unable to approve class'
                            });
                            setloading(false)
                        }

                    })
            } else {
                setloading(false)
            }
        });

    }
    const deleteid = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want's to delete this class",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes,"
        }).then((result) => {
            setloading(true)
            if (result.isConfirmed) {
                axiosecure.delete(`/coursesrequest?useremail=${currentUser?.useremail}&id=${id}`)
                    .then((res) => {
                        if (res.data.success) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "class deleted succesfully",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            refetch()
                            setloading(false)
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "Something went wrong!",
                                footer: 'unable to delete class'
                            });
                            setloading(false)
                        }

                    })
            } else {
                setloading(false)
            }
        });
    }
    return (
        <div>
            <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100 overflow-y-auto scroll-smooth ">
                <h2 className="mb-4 text-2xl font-semibold leading">All Users </h2>
                <div className="p-5 min-h-full ">
                    <div className='flex flex-wrap justify-start items-center gap-2'>
                        <h1 className="text-xl mb-2">total {totalclasses} classes </h1>
                        <span className='flex justify-start items-center gap-2 text-white'>
                            <button onClick={() => setfilter('approved')} className='bg-green-500 hover:scale-105 active:scale-95 transition-all'>approved</button>
                            <button onClick={() => setfilter('pending')} className='bg-orange-500 hover:scale-105 active:scale-95 transition-all'>requested</button>
                            <button onClick={() => setfilter('rejected')} className='bg-red-600 hover:scale-105 active:scale-95 transition-all'>rejected</button>
                        </span>
                    </div>
                    <h3 className='uppercase text-xl py-3 opacity-70'>{filter} classes</h3>
                    <div className="">
                        {
                            loading && <div className='flex justify-start items-center'><span className="loading loading-ring loading-xs"></span>
                                <span className="loading loading-ring loading-sm"></span>
                                <span className="loading loading-ring loading-md"></span>
                                <span className="loading loading-ring loading-lg"></span>
                                </div>
                        }
                        {
                            (!courseLoading && allcourse.length <= 0) && <p className='text-xl font-bold text-red-600'>no data found</p>
                        }
                        {
                            courseLoading && <>
                                <div className=" space-y-3 p-4 h-24 rounded-lg shadow my-4 animate-pulse bg-gray-100">
                                    <div className="flex items-center space-x-2 text-sm">
                                        <div>
                                            <img className='w-24 h-16 bg-gray-500 rounded' />
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
                                            <img className='w-24 h-16 bg-gray-500 rounded' />
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

                                <span className='mt-3 block'>
                                    {
                                        item?.status !== "approved" ? item?.status !== "rejected" &&
                                            <button data-tooltip-id="approved"
                                                data-tooltip-content={`this course not published`}
                                                data-tooltip-place="left" disabled className='px-4 py-1 bg-gray-600 text-white ml-2'>
                                                See progress
                                            </button>
                                            :
                                            <Link to={`/dashboard/classrogress/${item._id}`}>
                                                <button className='px-4 py-1 hover:scale-105 active:scale-95 bg-green-600 text-white ml-2'>
                                                    See progress
                                                </button>
                                            </Link>
                                    }
                                    <Tooltip id="approved" />
                                    {
                                        (item?.status !== "approved" && item?.status !== "rejected") && <>
                                            <button onClick={() => approve(item._id)} className='px-4 py-1 hover:scale-105 active:scale-95 bg-green-600 text-white ml-2'>
                                                approve
                                            </button>
                                            <button onClick={() => reject(item._id)} className='px-4 py-1 hover:scale-105 active:scale-95 bg-red-600 text-white ml-2'>
                                                reject
                                            </button>
                                        </>
                                    }
                                    {
                                        item?.status === "rejected" && <button onClick={() => deleteid(item._id)} className='bg-red-600 text-white hover:scale-105 active:scale-95'>delete</button>
                                    }
                                </span>
                            </div>)
                        }

                    </div>

                </div>
                {
                    allcourse.length > 0 && <div className='text-right bg-white p-2 flex justify-end items-center'>
                        {
                            pages.map(item => <button onClick={() => setPagenumber(item)} key={item} className='p-0 px-3 active:scale-95 bg-transparent'>{item + 1}</button>)
                        }
                        <select onInput={(e) => {
                            setPagenumber(0)
                            setItemPerPage(e.target.value)
                        }}>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                    </div>
                }
            </div>

        </div>
    )
}

export default AllClasses
