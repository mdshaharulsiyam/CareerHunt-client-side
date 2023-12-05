import React, { useEffect, useState } from 'react'
import useAxiosrequest from '../../Hooks/useAxiosrequest'
import Swal from 'sweetalert2'
const Messages = () => {
    document.title = "CareerHunt | Dashboard message"
    const [loading, setloading] = useState(false)
    const [messages, setmessages] = useState([])
    const [refatch, setrefatch] = useState(false)
    const axiosrequest = useAxiosrequest()
    useEffect(() => {
        setloading(true)
        axiosrequest.get('/contact')
            .then((res) => {
                if (res.data?.success === false) {
                    setloading(false)
                    return
                }
                setloading(false)
                setmessages(res.data)
            })
    }, [refatch])
    const deletemassage = (id) => {
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
                axiosrequest.delete(`/contact?id=${id}`)
                    .then((res) => {
                        if (res.data.success) {
                            setrefatch(!refatch)
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
            <p className='text-xl font-bold p-5 text-center py-10'> message </p>
            {
                loading && <>
                    <span className="loading loading-ball loading-xs"></span>
                    <span className="loading loading-ball loading-sm"></span>
                    <span className="loading loading-ball loading-md"></span>
                    <span className="loading loading-ball loading-lg"></span>
                </>
            }
            <div className='grid md:grid-cols-2 lg:grid-cols-3  gap-4'>
                {
                    (!loading && messages.length <= 0) && <p className='text-xl font-bold p-5'>no message available</p>
                }
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
                    messages.map(item => <div key={item._id} class="group flex mb-10 flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7] p-2 md:p-6">
                        <div className='flex justify-start gap-2 items-center flex-wrap pb-2'>
                            <span>
                                <h3 className='text-sm'>{item?.username}</h3>
                            </span>
                        </div>
                        <div class="">
                            <h3 class="font-semibold text-gray-800 dark:text-gray-300 dark:hover:text-white">
                                {item?.useremail}
                            </h3>
                            <p class="mt-3 text-gray-500 text-xs sm:text-base">
                                {item?.msg}
                            </p>
                        </div>
                        <button onClick={() => deletemassage(item._id)} className='bg-red-600 active:scale-95 mt-auto w-32 ml-auto font-bold text-white hover:bg-red-900'>delete</button>
                    </div>)
                }
            </div>
        </div>
    )
}

export default Messages
