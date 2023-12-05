import { useContext, useState } from "react"
import { updateProfile } from "firebase/auth";
import { useForm, } from "react-hook-form"
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa6"
import { Link, useNavigate } from "react-router-dom"
import useAxiosrequest from "../../../Hooks/useAxiosrequest"
import Swal from 'sweetalert2'
import { CareerHuntData } from "../../../Context/CareerHunt";
const SignUp = () => {
    document.title = 'CareerHunt | Sign Up'
    const [loading,setloading]=useState(false)
    const { createNewUser,loginwithGoogle } = useContext(CareerHuntData)
    const [showPasswords, setshowPasswords] = useState(false)
    const axiosrequest = useAxiosrequest()
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const showPassword = () => {
        setshowPasswords(!showPasswords)
    }
    const navigate =useNavigate()
    const imageapikey = import.meta.env.VITE_IMAGE_API_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${imageapikey}`;
    const onSubmit = async (data) => {
        setloading(true)
        const image = {
            image: data.profile[0]
        }
        const res = await axiosrequest.post(image_hosting_api, image, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        if (res.data.success) {
            createNewUser(data.email, data.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    updateProfile(userCredential.user, {
                        displayName: data.name, photoURL: res.data.data.display_url
                    }).then(() => {
                        const userData = {
                            profileImage: res.data.data.display_url,
                            username: data.name,
                            useremail: data.email,
                            role: "student",
                            skils : ''
                        }
                        axiosrequest.post('/user', userData)
                            .then((res) => {
                                setloading(false)
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: `account created succesfuly`,
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                navigate('/login')
                            })

                    }).catch((error) => {
                        setloading(false)
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: `${error.message}`,
                            footer: 'unable to update new users profile'
                        });
                    });

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setloading(false)
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: `${errorMessage}`,
                        footer: 'unable to create new user'
                    });
                });
        } else {
            setloading(false)
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: 'unable to create new user'
            });
        }
    }
    return (
        <div>
            {/* <!-- Hero --> */}
            <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* <!-- Grid --> */}
                <div class="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-center">
                    <div class="relative ms-4">
                        <img class="w-full rounded-md" src="https://i.ibb.co/y5ShHN6/5-beginner-level-online-courses-to-help-you-learn-programming.webp" />
                    </div>
                    <div className="lg:px-12 box-border">
                        <h1 class="block text-xl font-bold text-gray-800 sm:text-2xl lg:text-3xl lg:leading-tight dark:text-white">Create an account</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input id="" className="block outline-none border-b-2 w-full mx-auto p-2 pl-0 border-b-gray-400" type="text" placeholder="Name" {...register("name", { required: true })} />
                            {errors.name && <p className="text-red-500 ">Name is required*</p>}
                            <input className="block outline-none border-b-2 w-full mx-auto p-2 pl-0 border-b-gray-400" type="email" placeholder="Email" {...register("email", { required: true })} />
                            {errors.email && <p className="text-red-500 ">email is required*</p>}
                            <div className="relative">
                                <input className="block outline-none border-b-2 w-full mx-auto p-2 pl-0 border-b-gray-400" type={`${showPasswords ? 'text' : 'password'}`} placeholder="Password" {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                })} /> <span onClick={showPassword} className="absolute right-0 top-[50%] translate-y-[-50%] cursor-pointer text-2xl hover:text-red-600 hover:scale-105 active:scale-95 transition-all">
                                    {
                                        showPasswords ? <FaEye /> : <FaEyeSlash />
                                    }
                                </span>
                            </div>
                            {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                            {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                            {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}
                            <input type="file" {...register("profile", { required: true })} className="file-input file-input-bordered w-full block my-2" />
                            {errors.profile && <p className="text-red-500 ">profile picture is required*</p>}
                            <button className="w-full bg-red-600 cursor-pointer rounded-lg text-white py-2 hover:bg-red-900 transition-all" type="submit">{loading ? <span className="loading loading-bars loading-xs"></span> : 'signup'}</button>
                        </form>
                        <span className="text-center block">--or--</span>
                        <button onClick={loginwithGoogle} className="flex justify-center items-center gap-3 w-full mt-2 bg-transparent border-black active:scale-90 transition-all hover:text-blue-700"><FaGoogle /> Sign up with Google</button>
                        <p className="pt-2">Already have account? <Link className="hover:underline text-blue-600" to={'/login'}>Log in</Link></p>
                    </div>
                </div>
                {/* <!-- End Grid --> */}
            </div>
            {/* <!-- End Hero --> */}
        </div>
    )
}

export default SignUp
