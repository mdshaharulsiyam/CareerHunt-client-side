import React, { useContext, useState } from 'react'
import { CareerHuntData } from '../../../Context/CareerHunt'
import useGetAllRequest from '../../../Hooks/useGetAllRequest'
import { useForm, } from "react-hook-form"
import { IoMdCloseCircle } from "react-icons/io";
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
const Table = ({ totalData }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const [pageNumber, setPagenumber] = useState(0)
    const [itemPerPage, setItemPerPage] = useState(10)
    const [showmodal, setshowModal] = useState(false)
    const [loading, setloading] = useState(false)
    const { currentUser } = useContext(CareerHuntData)
    const axiorequst = useAxiosSecure()
    const { loadin, requests, refetch } = useGetAllRequest(currentUser?.useremail, pageNumber, itemPerPage)
    const totalpagenumber = Math.ceil(parseInt(totalData) / itemPerPage)
    const pages = [...Array(totalpagenumber).keys()];
    const [id, setid] = useState(null)
    const onSubmit = (data) => {
        setloading(true)
        const statusdata = {
            id: id,
            status: 'rejected',
            msg: data.msg
        }
        axiorequst.patch(`/allrequest?useremail=${currentUser?.useremail}`, statusdata)
            .then((res) => {
                if (res.data.success) {
                    setloading(false)
                    refetch()
                    setshowModal(false)
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "assignment added successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    setloading(false)
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                        footer: 'unable to add assignment'
                    });
                    setshowModal(false)
                    refetch()
                }

            })
    }
    const approveUser = (userid, requestid, skils) => {
        setloading(true)
        const approveData = {
            userid, requestid, skils
        }
        Swal.fire({
            title: "Are you sure?",
            text: "You want's to approve ",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, approve!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiorequst.patch(`/setteacher?useremail=${currentUser?.useremail}`, approveData)
                    .then((res) => {
                        if (res.data.success) {
                            setloading(false)
                            refetch()
                            Swal.fire({
                                title: "approved!",
                                text: "succesfully approved as teacher",
                                icon: "success"
                            });
                        } else {
                            setloading(false)
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "Something went wrong!",
                                footer: 'failed to approve'
                            });
                        }

                    })

            } else {
                setloading(false)
            }
        });

    }
    return (
        <div>
            <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100 overflow-y-scroll">
                <h2 className="mb-4 text-2xl font-semibold leading">Teacher Request's</h2>
                <div className="p-5 h-screen bg-gray-100">
                    <h1 className="text-xl mb-2">All Request</h1>
                    <div className="overflow-auto rounded-lg shadow hidden md:block">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b-2 border-gray-200">
                                {
                                    requests.length > 0 ? <tr>
                                        <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">Images </th>
                                        <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">Name </th>
                                        <th className="p-3 text-sm font-semibold tracking-wide text-left">Title</th>
                                        <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">category</th>
                                        <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">experience</th>
                                        <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">status</th>
                                        <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">action</th>
                                    </tr> : <tr>
                                        {
                                            !loadin && <th className="py-9 px-4 text-red-600">no request availabe</th>
                                        }{
                                            loading && <span className="loading loading-infinity loading-sm"></span>
                                        }
                                    </tr>
                                }

                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {
                                    loadin && <tr className="animate-pulse">
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            <img className='w-10 h-10 bg-gray-700 rounded-full' alt="" />
                                        </td>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            <p className='h-2 w-3/4 bg-gray-700'></p>
                                        </td>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            <p className='h-2 w-3/4 bg-gray-700'></p>
                                        </td>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            <p className='h-2 w-3/4 bg-gray-700'></p>
                                        </td>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            <p className='h-2 w-3/4 bg-gray-700'></p>
                                        </td>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">

                                            <p className='h-2 w-3/4 bg-gray-700'></p>

                                        </td>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            <button className='px-8 py-4 hover:scale-105 active:scale-95 bg-gray-700 text-white'></button>
                                            <button className='px-8 py-4 hover:scale-105 active:scale-95 bg-gray-700 text-white ml-1'></button>
                                        </td>
                                    </tr>
                                }
                                {
                                    requests.map(item => <tr key={item._id} className="">
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            <img className='w-10 h-10 rounded-full' src={item?.requestedUser[0]?.profileImage} alt="" />
                                        </td>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            {item?.requestedUser[0]?.username}
                                        </td>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{item?.title}</td>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{item?.category}</td>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{item?.experience}</td>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            <span
                                                className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">{requests[0]?.status}</span>
                                        </td>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap"><button onClick={() => {
                                            setshowModal(true)
                                            setid(item._id)

                                        }} className='px-4 py-1 hover:scale-105 active:scale-95 bg-red-600 text-white'>reject</button>
                                            <button onClick={() => {
                                                approveUser(item?.requestedUser[0]?._id, item._id, item?.category)
                                            }} className='px-4 py-1 hover:scale-105 active:scale-95 bg-green-600 text-white ml-2'>aprrove</button></td>
                                    </tr>)
                                }

                            </tbody>
                        </table>
                        {
                            requests.length > 0 && <div className='text-right bg-white p-2 flex justify-end items-center'>
                                {
                                    pages.map(item => <button onClick={() => setPagenumber(item)} key={item} className='p-0 px-3 active:scale-95 bg-transparent'>{item + 1}</button>)
                                }
                                <select onInput={(e) => setItemPerPage(e.target.value)}>
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={50}>50</option>
                                </select>
                            </div>
                        }

                    </div>

                    <div className="md:hidden">
                        {
                            requests.map(item => <div key={item._id} className="bg-white space-y-3 p-4 rounded-lg shadow">
                                <div className="flex items-center space-x-2 text-sm">
                                    <div>
                                        <img className='w-10 h-10 rounded-full' src={item?.requestedUser[0]?.profileImage} alt="" />
                                    </div>
                                    <span>
                                        <div className="text-gray-500">{item?.requestedUser[0]?.username}</div>
                                        <div className="text-gray-500">{item?.title}</div>
                                    </span>
                                    <div>
                                        <span
                                            className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">{item?.status}</span>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-700">
                                    category :  {item?.category}
                                </div>
                                <div className="text-sm font-medium text-black">
                                    experience : {item?.experience}
                                </div>
                                <span className='mt-3 block'>
                                    <button onClick={() => {
                                        setshowModal(true)
                                        setid(item._id)

                                    }} className='px-4 py-1 hover:scale-105 active:scale-95 bg-red-600 text-white'>reject</button>
                                    <button onClick={() => {
                                        approveUser(item?.requestedUser[0]?._id, item._id, item?.category)
                                    }} className='px-4 py-1 hover:scale-105 active:scale-95 bg-green-600 text-white ml-2'>aprrove</button>
                                </span>
                            </div>)
                        }

                    </div>

                </div>
            </div>
            {
                showmodal && <div className='max-w-2xl mx-auto p-12 rounded-xl absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-gray-200'>
                    <span className='flex justify-between items-center '><h3>reason of rejection</h3> <IoMdCloseCircle onClick={() => setshowModal(false)} className='text-3xl hover:text-red-600 cursor-pointer active:scale-95 transition-all' /></span>
                    <form className="" onSubmit={handleSubmit(onSubmit)}>
                        <textarea className="block outline-none border-b-2 w-full mx-auto p-2 pl-0 border-b-gray-400 my-2" type="text" placeholder="message" {...register("msg", { required: true })} />
                        {errors.msg && <p className="text-red-500 ">message is required*</p>}

                        <button className="w-full bg-red-600 cursor-pointer rounded-lg text-white py-2 hover:bg-red-900 transition-all" type="submit">
                            reject
                        </button>
                    </form>
                </div>
            }

        </div>
    )
}

export default Table
