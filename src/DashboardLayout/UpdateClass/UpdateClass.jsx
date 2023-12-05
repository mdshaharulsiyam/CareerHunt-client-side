import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { CareerHuntData } from "../../Context/CareerHunt"
import useGetUserData from "../../Hooks/useGetUserData"
import useAxiosrequest from "../../Hooks/useAxiosrequest"
import Swal from "sweetalert2"
import useAxiosSecure from "../../Hooks/useAxiosSecure"
import { useNavigate, useParams } from "react-router-dom"

const UpdateClass = () => {
    document.title = "CareerHunt | Dashboard Update Clases"
    const { currentUser } = useContext(CareerHuntData)
    const axiosrequest = useAxiosrequest()
    const axiossecure = useAxiosSecure()
    const [loading, setloading] = useState(false)
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const [CourseDetails, setCourseDetails] = useState(null)
    const params = useParams()
    useEffect(() => {
        axiosrequest.get(`/singlecourse?id=${params.id}`)
            .then((res) => {
                setCourseDetails(res.data)
            })
    }, [])
    const navigate = useNavigate()
    const imageapikey = import.meta.env.VITE_IMAGE_API_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${imageapikey}`;
    const onSubmit = async (data) => {
        setloading(true)
        if (data.title === '') data.title = CourseDetails?.title
        if (data.price === '') data.price = CourseDetails?.price
        if (data.description === '') data.description = CourseDetails?.description
        if (data.img.length <= 0) {
            data.img = CourseDetails?.img
        } else {
            const res = await axiosrequest.post(image_hosting_api, { image: data.img[0] }, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            if (res.data.success) {
                data.img = res.data.data.display_url
            } else {
                return Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    footer: 'unable to add new course'
                });
            }
        }
        axiossecure.patch(`/courses?useremail=${currentUser?.useremail}&id=${CourseDetails?._id}`, data)
            .then((res) => {
                if (res.data.success) {
     
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "course updated sent",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    reset()
                    setloading(false)
                    navigate('/dashboard/myclasses')
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                        footer: 'unable to update course'
                    });
                    setloading(false)
                }
            })


    }
    return (
        <div className="flex justify-center items-center min-h-screen ">
            <form className="max-w-2xl mx-auto pb-12" onSubmit={handleSubmit(onSubmit)}>
                <h3 className="text-center text-4xl uppercase font-semibold pb-6">update  class</h3>
                <input className="block outline-none border-b-2 w-full mx-auto p-2 pl-0 border-b-gray-400 my-2" type="text" disabled placeholder={currentUser?.username} />
                <input className="block outline-none border-b-2 w-full mx-auto p-2 pl-0 border-b-gray-400 my-2" type="text" disabled placeholder={currentUser?.useremail} />
                <input className="block outline-none border-b-2 w-full mx-auto p-2 pl-0 border-b-gray-400 my-2" type="text" defaultValue={CourseDetails?.title} {...register("title")} />
                <input className="block outline-none border-b-2 w-full mx-auto p-2 pl-0 border-b-gray-400 my-2" type="number" defaultValue={CourseDetails?.price} {...register("price")} />
                <span>chooes a image for class</span>
                <input className="file-input file-input-bordered w-full " type="file" placeholder="image" {...register("img")} />
                <textarea className="block outline-none border-b-2 w-full mx-auto p-2 h-20 resize-none pl-0 border-b-gray-400 my-2" type="text" defaultValue={CourseDetails?.description} {...register("description")} />
                <button className="w-full bg-red-600 cursor-pointer rounded-lg text-white py-2 hover:bg-red-900 transition-all" type="submit">{loading ? <span className="loading loading-bars loading-xs"></span> : 'Add class'}</button>
            </form>
        </div>
    )
}

export default UpdateClass
