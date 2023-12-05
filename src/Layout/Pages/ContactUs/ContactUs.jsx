import React, { useContext, useState } from 'react'
import { CareerHuntData } from '../../../Context/CareerHunt'
import useAxiosrequest from '../../../Hooks/useAxiosrequest'
import Swal from 'sweetalert2'

const ContactUs = () => {
    const { currentUser } = useContext(CareerHuntData)
    const [loading, setloading] = useState(false)
    const axiosrequest = useAxiosrequest()
    const submitmassage = e => {
        setloading(true)
        e.preventDefault()
        const msg = e.target.msg.value
        const data = {
            msg,
            username: currentUser?.username,
            useremail: currentUser?.useremail
        }
        axiosrequest.post('/contact', data)
            .then((res) => {
                setloading(false)
                if (res.data.success) {
                    e.target.reset()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "message sent succesfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "unable to send message",
                    });
                }
            })
    }
    return (
        <section className=" dark:bg-gray-800 dark:text-gray-50 container mx-auto py-10 my-10">
            <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
                <div className="py-6 md:py-0 md:px-6">
                    <h1 className="text-4xl font-bold">Get in touch</h1>
                    <p className="pt-2 pb-4">Fill in the form to start a conversation</p>
                    <div className="space-y-4">
                        <p className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 sm:mr-6">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                            </svg>
                            <span>address, bogra 9999 City</span>
                        </p>
                        <p className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 sm:mr-6">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                            </svg>
                            <span>1234567asd89</span>
                        </p>
                        <p className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 sm:mr-6">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                            </svg>
                            <span>contact@business.com</span>
                        </p>
                    </div>
                </div>
                <form onSubmit={submitmassage} className="flex flex-col py-6 space-y-6 md:py-0 md:px-6">
                    <label className="block">
                        <span className="mb-1">Full name</span>
                        <p>{currentUser?.username}</p>
                    </label>
                    <label className="block">
                        <span className="mb-1">Email address</span>
                        <p>{currentUser?.useremail}</p>
                    </label>
                    <label className="block">
                        <span className="mb-1">Message</span>
                        <textarea required name='msg' rows="3" className="block w-full rounded-md focus:ring focus:ri focus:ri dark:bg-gray-800 p-2" placeholder='drop you message to us '></textarea>
                    </label>
                    <button type="submit" className="self-center px-8 py-3 text-lg bg-teal-600 rounded focus:ring hover:ring focus:ri dark:bg-violet-400 dark:text-gray-900 focus:ri hover:ri"> {loading ? <span className="loading loading-dots loading-sm"></span> : 'send'}</button>
                </form>
            </div>
        </section>
    )
}

export default ContactUs
