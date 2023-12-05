import { useContext, useEffect, useState } from "react"
import { CareerHuntData } from "../../Context/CareerHunt"
import useGetAllUsers from "../../Hooks/useGetAllUsers"
import useAxiosrequest from "../../Hooks/useAxiosrequest"
import { IoSearchOutline } from "react-icons/io5"
import { GrUserAdmin } from "react-icons/gr";
import { MdAdminPanelSettings } from "react-icons/md";
import { Tooltip } from 'react-tooltip'
import useAxiosSecure from "../../Hooks/useAxiosSecure"
import Swal from "sweetalert2"
const AllUsers = () => {
    document.title = "CareerHunt | Dashboard All users"
    const { currentUser } = useContext(CareerHuntData)
    const [seacrhValue, setseacrhValue] = useState('')
    const [pageNumber, setPagenumber] = useState(0)
    const [itemPerPage, setItemPerPage] = useState(10)
    const [totalUser, settotalUser] = useState(0)
    const axiorequst = useAxiosrequest()
    const axiosecure = useAxiosSecure()
    useEffect(() => {
        axiorequst.get('/UserCount')
            .then((res) => settotalUser(res.data))
    }, [])
    const totalpagenumber = Math.ceil(parseInt(totalUser) / itemPerPage)
    const pages = [...Array(totalpagenumber).keys()];
    const { loading, users, refetch } = useGetAllUsers(currentUser?.useremail, seacrhValue, itemPerPage, pageNumber)
    const [setingadmin, setsetingadmin] = useState(false)
    const handelSearch = e => {
        e.preventDefault()
        setseacrhValue(e.target.search.value)
    }
    const MakeAdmin = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "wanst to make this person admin !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                setsetingadmin(true)
                axiosecure.patch(`/makeadmin?useremail=${currentUser?.useremail}`, { id: id })
                    .then((res) => {
                        if (res.data.success) {
                            setsetingadmin(false)
                            refetch()
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "set add admin succesfully",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            // setloading(false)
                            navigate('/dashboard/myclasses')
                        } else {
                            setsetingadmin(false)
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "Something went wrong!",
                                footer: 'unable to set as admin'
                            });
                        }
                    })

            }
        });


    }
    return (
        <div>
            <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100 overflow-y-auto scroll-smooth">
                <h2 className="mb-4 text-2xl font-semibold leading">All Users </h2>
                <div className="p-5">
                    <div className="grid sm:grid-cols-3 gap-1 py-4">
                        <h1 className="text-xl mb-2">total {totalUser} users </h1>
                        <form onSubmit={handelSearch} className="col-span-2 max-w-xs ml-auto">
                            <div className="relative z-10 flex space-x-3 bg-white border rounded-lg shadow-lg shadow-gray-100 dark:bg-slate-900 dark:border-gray-700 dark:shadow-gray-900/[.2]">
                                <div className="flex-[1_0_0%]">
                                    <label for="hs-search-article-1" className="block text-sm text-gray-700 font-medium dark:text-white"></label>
                                    <input onKeyUp={(e) => setseacrhValue(e.target.value)} type="text" name="search" id="hs-search-article-1" className="py-2.5 px-4 block w-full border-transparent rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Filter by role" />
                                </div>
                                <button className="absolute top-[50%] font-extrabold right-1 active:scale-90 hover:bg-blue-600 hover:bg-opacity-25 -translate-y-[50%] bg-transparent p-2 "><IoSearchOutline /></button>
                            </div>
                        </form>
                    </div>
                    {
                        seacrhValue && <h3 className="">Filterd by ["{seacrhValue}"]</h3>
                    }

                    <div className="overflow-auto rounded-lg shadow hidden md:block">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b-2 border-gray-200">
                                {
                                    users.length > 0 ? <tr>
                                        <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">Images </th>
                                        <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">Name </th>
                                        <th className="p-3 text-sm font-semibold tracking-wide text-left">email</th>
                                        <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">prone</th>
                                        <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">role</th>
                                        <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">action</th>
                                    </tr> : <tr>
                                        {
                                            !loading && <th className="py-9 px-4 text-red-600">no request availabe</th>
                                        }
                                    </tr>
                                }

                            </thead>
                            <tbody className="divide-y relative divide-gray-100">
                                {
                                    setingadmin && <span className="loading absolute top-9 left-9 loading-spinner text-secondary"></span>
                                }
                                {
                                    loading && <tr className="animate-pulse">
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
                                        </td>
                                    </tr>
                                }
                                {
                                    users.map(item => <tr key={item._id} className="">
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            <img className='w-10 h-10 rounded-full' src={item?.profileImage} alt="" />
                                        </td>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            {item?.username}
                                        </td>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{item?.useremail}</td>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{item?.phone ? item?.phone : 'not added'}</td>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            <span
                                                className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">{item?.role}</span>
                                        </td>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            {
                                                item?.role === 'admin' ?
                                                    <button data-tooltip-id="admin"
                                                        data-tooltip-content={`${item.username} is an admin`}
                                                        data-tooltip-place="left" disabled className='px-4 py-1 bg-gray-600 text-white ml-2'>
                                                        <MdAdminPanelSettings />
                                                    </button>
                                                    :
                                                    <button onClick={() => MakeAdmin(item._id)}
                                                        data-tooltip-id="notadmin"
                                                        data-tooltip-content={`make ${item.username} an admin`}
                                                        data-tooltip-place="left"
                                                        className='px-4 py-1 hover:scale-105 active:scale-95 bg-green-600 text-white ml-2'>
                                                        <GrUserAdmin />
                                                    </button>
                                            }
                                            <Tooltip id="admin" />
                                            <Tooltip id="notadmin" />
                                        </td>
                                    </tr>)
                                }

                            </tbody>
                        </table>
                        {
                            users.length > 0 && <div className='text-right bg-white p-2 flex justify-end items-center'>
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
                            users.map(item => <div key={item._id} className="bg-white space-y-3 p-4 rounded-lg shadow">
                                <div className="flex items-center space-x-2 text-sm">
                                    <div>
                                        <img className='w-10 h-10 rounded-full' src={item?.profileImage} alt="" />
                                    </div>
                                    <span>
                                        <div className="text-gray-500">{item?.username}</div>
                                        <div className="text-gray-500">{item?.useremail}</div>
                                    </span>
                                    <div>
                                        <span
                                            className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">{item?.role}</span>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-700">
                                    {item?.phone ? item?.phone : 'not added'}
                                </div>

                                <span className='mt-3 block'>
                                    {
                                        item?.role === 'admin' ?
                                            <button data-tooltip-id="admin"
                                                data-tooltip-content={`${item.username} is an admin`}
                                                data-tooltip-place="left" disabled className='px-4 py-1 bg-gray-600 text-white ml-2'>
                                                <MdAdminPanelSettings />
                                            </button>
                                            :
                                            <button onClick={() => MakeAdmin(item._id)}
                                                data-tooltip-id="notadmin"
                                                data-tooltip-content={`make ${item.username} an admin`}
                                                data-tooltip-place="left"
                                                className='px-4 py-1 hover:scale-105 active:scale-95 bg-green-600 text-white ml-2'>
                                                <GrUserAdmin />
                                            </button>
                                    }
                                    <Tooltip id="admin" />
                                    <Tooltip id="notadmin" />
                                </span>
                            </div>)
                        }

                    </div>

                </div>
            </div>

        </div>
    )
}

export default AllUsers
