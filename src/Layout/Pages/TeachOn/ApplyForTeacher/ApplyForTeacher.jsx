import { useContext, useState } from "react"
import { useForm, } from "react-hook-form"
import { CareerHuntData } from "../../../../Context/CareerHunt"
import useGetUserData from "../../../../Hooks/useGetUserData"
import useAxiosSecure from "../../../../Hooks/useAxiosSecure"
import Swal from "sweetalert2"
document.title = 'CareerHunt | Apply for teacher'
const ApplyForTeacher = ({ refetch }) => {
  const skillOptions = ["Beginner", "Intermediate", "experienced", "Advanced",];
  const category = ['programming', 'design', 'business', 'development', 'coding', 'web development', 'software engineering', 'graphic design', 'user experience', 'entrepreneurship', 'startups']
  const [loading, setloading] = useState(false)
  const { currentUser } = useContext(CareerHuntData)
  const { userData, isPending } = useGetUserData(currentUser?.useremail)
  const axiorequest = useAxiosSecure()
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const onSubmit = (data) => {
    setloading(true)
    const applicatioData = {
      requestedUser: userData?._id,
      title: data.title,
      experience: data.experience,
      category: data.category,
      status: 'pending'
    }
    axiorequest.post(`/teacthersaplication?useremail=${currentUser?.useremail}`, applicatioData)
      .then((res) => {
        if (res.data.success) {
          reset()
          refetch()
          setloading(false)
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "applications sent",
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          setloading(false)
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: 'unable to send applications'
          });
        }
      })
  }
  return (
    <div className="relative">
      {
        isPending && <span className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] loading loading-bars loading-lg"></span>
      }
      <h3 className="text-4xl pt-12 text-center font-bold">apply for a teaching position </h3>
      {
        userData?.useremail && <img className="mx-auto w-16 h-16 mt-10 rounded-xl" src={userData?.profileImage} alt="" />
      }
      <form className="max-w-2xl mx-auto pb-12" onSubmit={handleSubmit(onSubmit)}>
        <input className="block outline-none border-b-2 w-full mx-auto p-2 pl-0 border-b-gray-400 my-2" type="text" disabled defaultValue={userData?.username} {...register("username",)} />
        <input className="block outline-none border-b-2 w-full mx-auto p-2 pl-0 border-b-gray-400 my-2" type="text" placeholder="Title" {...register("title", { required: true })} />
        {errors.title && <p className="text-red-500 ">title is required*</p>}
        <select className="block outline-none border-b-2 w-full mx-auto p-2 pl-0 border-b-gray-400 my-2" {...register("experience", { required: true })}>
          <option selected disabled value=''>select your experience level</option>
          {
            skillOptions.map(item => <option key={item} value={item}>{item}</option>)
          }
        </select>
        {errors.experience && <p className="text-red-500 ">experience level required*</p>}
        <select className="block outline-none border-b-2 w-full mx-auto p-2 pl-0 border-b-gray-400 my-2" {...register("category", { required: true })}>
          <option disabled selected value=''>select a category</option>
          {
            category.map(item => (
              <option key={item} value={item}>
                {item}
              </option>
            ))

          }
        </select>
        {errors.category && <p className="text-red-500 ">category required*</p>}
        <button className="w-full bg-red-600 cursor-pointer rounded-lg text-white py-2 hover:bg-red-900 transition-all" type="submit">{loading ? <span className="loading loading-bars loading-xs"></span> : 'submit for review'}</button>
      </form>
    </div>
  )
}

export default ApplyForTeacher
