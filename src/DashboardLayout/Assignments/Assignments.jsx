import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CareerHuntData } from '../../Context/CareerHunt'
import useGetAssignment from '../../Hooks/useGetAssignment'
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import useAxiosrequest from '../../Hooks/useAxiosrequest'
import moment from 'moment';
import StarRatings from 'react-star-ratings';
import { useForm } from 'react-hook-form'
import { FaRegWindowClose } from 'react-icons/fa'
import Swal from 'sweetalert2'
import useGetUserData from '../../Hooks/useGetUserData'
const Assignments = () => {
  document.title = "CareerHunt | Dashboard Assignments"
  const { currentUser } = useContext(CareerHuntData)
  const { userData } = useGetUserData(currentUser?.useremail)
  const { id } = useParams()
  const axiossecure = useAxiosSecure()
  const { loading, myassignments, refetch } = useGetAssignment(currentUser?.useremail, id, userData?._id)
  const axiosrequest = useAxiosrequest()
  const [CourseDetails, setCourseDetails] = useState(null)
  const [show, setshow] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const [submitingFeedbcak, setsubmitingFeedbcak] = useState(false)
  const [submitassignment, setsubmitassignmrent] = useState(false)
  useEffect(() => {
    axiosrequest.get(`/singlecourse?id=${id}`)
      .then((res) => {
        setCourseDetails(res.data)
      })
  }, [])
  const submitAssignment = (e, assignmentId, courseId) => {
    e.preventDefault()
    const link = e.target.link.value
    if (!link) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: 'your assignment link is empty'
      });
    }
    setsubmitassignmrent(true)
    const date = new Date()
    const formatedate = moment(date).format("MMM Do YY");
    const data = {
      assignment: assignmentId,
      course: courseId,
      student: userData?._id,
      link: link,
      submittime: formatedate
    }
    axiossecure.post(`/suubmit?useremail=${currentUser?.useremail}`, data)
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
          setsubmitassignmrent(false)
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: 'unable to delete class'
          });
          setsubmitassignmrent(false)
        }
      })
  }
  const [rating, setrating] = useState(5)
  const onSubmit = async (data) => {
    setsubmitingFeedbcak(true)
    const feedback = {
      course: id,
      title: CourseDetails?.title,
      rating: rating,
      description: data.description,
      username: currentUser?.username,
      userimage: currentUser?.profileImage
    }
    axiossecure.post(`/feedback?useremail=${currentUser?.useremail}`, feedback)
      .then((res) => {
        if (res.data.success) {
          setshow(false)
          reset()
          setsubmitingFeedbcak(false)
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "feedback sent succesfully",
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: 'unable to submit feedback'
          });
          setsubmitingFeedbcak(false)
        }
      })
  }
  return (
    <div className='container mx-auto'>
      <div className="bg-white space-y-3 p-4 rounded-lg shadow my-4">
        <h2>course</h2>
        <div className="flex items-center space-x-2 text-sm">
          <div>
            <img className='w-24 h-16 rounded' src={CourseDetails?.img} alt="" />
          </div>
          <span>
            <div className="text-gray-500 font-bold text-lg">{CourseDetails?.title}</div>
            <div className="text-black font-semibold ">{CourseDetails?.teacher?.username}</div>
          </span>
          <div>
          </div>
        </div>
      </div>
      <h3 className='text-center uppercase text-2xl pt-5'>assignments</h3>
      {
        myassignments.length > 0 && <p className='text-red-600 text-center font-bold pt-2'>total {myassignments.length} pending assignment </p>
      }
      {
        submitassignment && <span className="loading loading-dots loading-lg py-3"></span>
      }
      <div className='container mx-auto grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2 p-3 pt-12'>
        {
          (!loading && myassignments.length <= 0) && <p className='text-red-600'>no assignment available</p>
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
          myassignments?.map((item) => <div className='shadow-2xl rounded-md' key={item._id}>
            <div className='p-2'>
              <h2 className='font-semibold text-lg py-1'>{item?.title}</h2>
              <p className='font-light'>{item?.description}</p>
              <p className='font-light'>{item?.deadline}</p>
              <span>
                <form onSubmit={(e) => {
                  submitAssignment(e, item._id, item.course._id)
                }}>
                  <input className='border mr-1 border-black border-b-2 p-1' type="text" name='link' placeholder='your assignment link ' />
                  <button className='bg-teal-400 font-semibold mt-1 hover:text-white hover:bg-teal-600 transition-all'>submit</button>
                </form>
              </span>
            </div>
          </div>)
        }
        {
          show && <div className="flex justify-center flex-col items-center absolute bg-white shadow-2xl p-6 pb-0 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <form className="max-w-2xl mx-auto pb-12 min-w-[320px]" onSubmit={handleSubmit(onSubmit)}>
              <FaRegWindowClose onClick={() => setshow(false)} className='ml-auto text-2xl m-2 hover:text-red-500 cursor-pointer' />
              <h2 className='font-semibold pb-2'>Leave your feedback</h2>
              <div>
                <StarRatings
                  rating={rating}
                  starRatedColor="orange"
                  starHoverColor="orange"
                  changeRating={(r) => setrating(r)}
                  numberOfStars={5}
                  starDimension="30px"
                  starSpacing="5px"
                  name='rating'
                />
              </div>
              {errors.deadline && <p className="text-red-500 ">deadline is required*</p>}
              <textarea className="block outline-none border-b-2 w-full mx-auto p-2 h-20 resize-none pl-0 border-b-gray-400 my-2" type="number" placeholder="description" {...register("description", { required: true })} />
              {errors.description && <p className="text-red-500 ">description is required*</p>}
              <button className="w-full bg-red-600 cursor-pointer mt-4 rounded-lg text-white py-2 hover:bg-red-900 transition-all" type="submit">{submitingFeedbcak ? <span className="loading loading-bars loading-sm"></span> : 'send feedback'}</button>
            </form>
          </div>
        }

      </div>
      <button onClick={() => setshow(true)} className='ml-auto block mr-9 bg-orange-400 font-semibold hover:bg-orange-700 hover:text-white transition-all'>send Feedback</button>
    </div>
  )
}

export default Assignments
