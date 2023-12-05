import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import useGetCourseSammery from '../../Hooks/useGetCourseSammery'
import { CareerHuntData } from '../../Context/CareerHunt'
import { useForm } from 'react-hook-form'
import { FaPlus, FaRegWindowClose } from "react-icons/fa";
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import moment from 'moment';
import Swal from 'sweetalert2'
const MyClassDetails = () => {
  document.title = "CareerHunt | Dashboard class Details"
  const currentDate = new Date();
  const formatedate = moment(currentDate).format("MMM Do YY");
  const [targetDate, settargetDate] = useState(formatedate)
  const { currentUser } = useContext(CareerHuntData)
  const axiossecure = useAxiosSecure()
  const { id } = useParams()
  const [show, setshow] = useState(false)
  const { loading, sammery, refetch } = useGetCourseSammery(currentUser?.useremail, id, targetDate)
  const [submiting, setsubmiting] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const onSubmit = async (data) => {
    setsubmiting(true)
    data.course = sammery?.course?._id
    data.teacher = sammery?.course?.teacher
    data.deadline = moment(data.deadline).format("MMM Do YY");
    axiossecure.post(`/assignments?useremail=${currentUser?.useremail}`, data)
      .then((res) => {
        if (res.data.success) {
          refetch()
          reset()
          setshow(false)
          setsubmiting(false)
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "assignment added successfully",
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: 'unable to add assignment'
          });
          setsubmiting(false)
        }

      })
  }
  return (
    <div className='container mx-0 px-3'>
      <div key={sammery?.course?._id} className="bg-white space-y-3 p-4 rounded-lg shadow my-4">
        <div className="flex items-center space-x-2 text-sm">
          <div>
            <img className='w-24 h-16 rounded' src={sammery?.course?.img} alt="" />
          </div>
          <span>
            <div className="text-gray-500 font-bold text-lg">{sammery?.course?.title}</div>
            <div className="text-black font-semibold ">{sammery?.course?.useremail}</div>
          </span>
          <div>
          </div>
        </div>
      </div>
      <div className='flex flex-wrap justify-between items-center '>
        <button onClick={() => setshow(true)} className='flex gap-2 justify-start items-center uppercase bg-teal-400 hover:bg-teal-600 hover:text-white transition-all'> <FaPlus />assignment</button>
        <span>
          <span className='pr-2'>filter by date </span>
          <input className='border-2 border-black p-1 px-3' type="date" onInput={(e) => {
            const setDate = e.target.value
            const formate = moment(setDate).format("MMM Do YY");
            settargetDate(formate)
            refetch()
          }} value={currentDate} />
        </span>
      </div>
      <section className="p-6 my-6 dark:bg-gray-800 dark:text-gray-100">
        <div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-3">
          <div className="flex flex-col justify-center align-middle shadow-2xl py-20 box-border">
            <p className="text-3xl leadi text-center font-extrabold">{sammery?.course?.totalenroll}</p>
            <p className="capitalize text-center py-2 font-semibold">total enroll</p>
          </div>
          <div className="flex flex-col justify-center align-middle shadow-2xl py-20 box-border">
            <p className="text-3xl  leadi text-center font-extrabold">{sammery?.course?.totalassignment}</p>
            <p className="capitalize text-center py-2 font-semibold">total assignment</p>
          </div>
          <div className="flex flex-col justify-center align-middle shadow-2xl py-20 box-border">
            <p className="text-3xl leadi text-center font-extrabold">{sammery?.totalSubmitions}</p>
            <p className="capitalize text-center py-2 font-semibold">assignment submitted in <br /> {targetDate}</p>
          </div>
        </div>
      </section>
      {
        show && <div className="flex justify-center items-center absolute bg-white shadow-2xl p-6 pb-0 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <form className="max-w-2xl mx-auto pb-12" onSubmit={handleSubmit(onSubmit)}>
            <FaRegWindowClose onClick={() => setshow(false)} className='ml-auto text-2xl m-2 hover:text-red-500 cursor-pointer' />
            <h3 className="text-center text-4xl uppercase font-semibold pb-6">add a new assignment</h3>
            <input className="block outline-none border-b-2 w-full mx-auto p-2 pl-0 border-b-gray-400 my-2" type="text" placeholder="Title" {...register("title", { required: true })} />
            {errors.title && <p className="text-red-500 ">title is required*</p>}
            <p className='italic'>deadline for assignment *</p>
            <input className="block outline-none border-b-2 w-full mx-auto p-2 pl-0 border-b-gray-400 my-2" type="date" placeholder="deadline" {...register("deadline", { required: true })} />
            {errors.deadline && <p className="text-red-500 ">deadline is required*</p>}
            <textarea className="block outline-none border-b-2 w-full mx-auto p-2 h-20 resize-none pl-0 border-b-gray-400 my-2" type="number" placeholder="description" {...register("description", { required: true })} />
            {errors.description && <p className="text-red-500 ">description is required*</p>}
            <button className="w-full bg-red-600 cursor-pointer mt-4 rounded-lg text-white py-2 hover:bg-red-900 transition-all" type="submit">{submiting ? <span className="loading loading-bars loading-xs"></span> : 'submit assignment'}</button>
          </form>
        </div>
      }
    </div>
  )
}

export default MyClassDetails
