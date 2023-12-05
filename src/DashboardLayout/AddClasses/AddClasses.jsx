import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { CareerHuntData } from "../../Context/CareerHunt"
import useGetUserData from "../../Hooks/useGetUserData"
import useAxiosrequest from "../../Hooks/useAxiosrequest"
import Swal from "sweetalert2"
import useAxiosSecure from "../../Hooks/useAxiosSecure"
import { useNavigate } from "react-router-dom"


const AddClasses = () => {
    document.title = "CareerHunt | Dashboard Add class"
    const { currentUser } = useContext(CareerHuntData)
    const { isPending, userData, refetch } = useGetUserData(currentUser?.useremail)
    const axiosrequest = useAxiosrequest()
    const axiossecure = useAxiosSecure()
    const [loading, setloading] = useState(false)
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const navigate =useNavigate()
    const imageapikey = import.meta.env.VITE_IMAGE_API_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${imageapikey}`;
    const onSubmit = async (data) => {
        setloading(true)
        const image = {
            image: data.img[0]
        }
        const res = await axiosrequest.post(image_hosting_api, image, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        if (res.data.success) {
            const classData = {
                teacher: userData?._id,
                title: data.title,
                price: data.price,
                description: data.description,
                img: res.data.data.display_url,
                status: 'pending',
                totalenroll: 0
            }
            axiossecure.post(`/courses?useremail=${currentUser?.useremail}`, classData)
                .then((res) => {
                    if (res.data.success) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "course request sent",
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
                            footer: 'unable to sent course request'
                        });
                    }

                })

        } else {
            setloading(false)
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: 'unable to add new course'
            });
        }

    }
    return (
        <div className="flex justify-center items-center min-h-screen ">
            <form className="max-w-2xl mx-auto pb-12" onSubmit={handleSubmit(onSubmit)}>
                <h3 className="text-center text-4xl uppercase font-semibold pb-6">add a new class</h3>
                <input className="block outline-none border-b-2 w-full mx-auto p-2 pl-0 border-b-gray-400 my-2" type="text" disabled placeholder={currentUser?.username} />
                <input className="block outline-none border-b-2 w-full mx-auto p-2 pl-0 border-b-gray-400 my-2" type="text" disabled placeholder={currentUser?.useremail} />
                <input className="block outline-none border-b-2 w-full mx-auto p-2 pl-0 border-b-gray-400 my-2" type="text" placeholder="Title" {...register("title", { required: true })} />
                {errors.title && <p className="text-red-500 ">title is required*</p>}
                <input className="block outline-none border-b-2 w-full mx-auto p-2 pl-0 border-b-gray-400 my-2" type="number" placeholder="price" {...register("price", { required: true })} />
                {errors.price && <p className="text-red-500 ">price is required*</p>}
                <span>chooes a image for class</span>
                <input className="file-input file-input-bordered w-full " type="file" placeholder="image" {...register("img", { required: true })} />
                {errors.img && <p className="text-red-500 ">img is required*</p>}
                <textarea className="block outline-none border-b-2 w-full mx-auto p-2 h-20 resize-none pl-0 border-b-gray-400 my-2" type="number" placeholder="description" {...register("description", { required: true })} />
                {errors.description && <p className="text-red-500 ">description is required*</p>}
                <button className="w-full bg-red-600 cursor-pointer rounded-lg text-white py-2 hover:bg-red-900 transition-all" type="submit">{loading ? <span className="loading loading-bars loading-xs"></span> : 'Add class'}</button>
            </form>
        </div>
    )
}

export default AddClasses
