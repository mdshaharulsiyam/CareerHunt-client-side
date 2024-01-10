import { useContext, useState } from "react"
import { useForm, } from "react-hook-form"
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa6"
import { Link, Navigate, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { CareerHuntData } from "../../../Context/CareerHunt"
const Login = () => {
    document.title = 'CareerHunt | login'
    const [loadings, setloading] = useState(false)
    const { loginuser, loginwithGoogle, currentUser, loading } = useContext(CareerHuntData)
    const navigate = useNavigate()
    const [showPasswords, setshowPasswords] = useState(false)
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const showPassword = () => {
        setshowPasswords(!showPasswords)
    }
    const onSubmit = (data) => {
        setloading(true)
        loginuser(data.email, data.password)
            .then((userCredential) => {
                setloading(false)
                const user = userCredential.user;
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `logged in user succesfuly`,
                    showConfirmButton: false,
                    timer: 1500
                });


            })
            .catch((error) => {
                setloading(false)
                const errorCode = error.code;
                const errorMessage = error.message;
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `${error.message}`,
                    footer: 'unable to log in user'
                });
            });
    }
    const loggindemouser = () => {
        setloading(true)
        loginuser('user11@gmail.com', 'user11@gmail.coM')
            .then((userCredential) => {
                setloading(false)
                const user = userCredential.user;
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `logged in user succesfuly`,
                    showConfirmButton: false,
                    timer: 1500
                });

            })
            .catch((error) => {
                setloading(false)
                const errorCode = error.code;
                const errorMessage = error.message;
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `${error.message}`,
                    footer: 'unable to log in user'
                });
            });
    }
    const loggindemoadmin = () => {
        setloading(true)
        loginuser('admin11@gmail.com', 'admin11@gmail.coM')
            .then((userCredential) => {
                setloading(false)
                const user = userCredential.user;
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `logged in user succesfuly`,
                    showConfirmButton: false,
                    timer: 1500
                });

            })
            .catch((error) => {
                setloading(false)
                const errorCode = error.code;
                const errorMessage = error.message;
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `${error.message}`,
                    footer: 'unable to log in user'
                });
            });
    }
    const loggindemoteacher = () => {
        setloading(true)
        loginuser('teacher11@gmail.com', 'teacher11@gmail.coM')
            .then((userCredential) => {
                setloading(false)
                const user = userCredential.user;
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `logged in user succesfuly`,
                    showConfirmButton: false,
                    timer: 1500
                });

            })
            .catch((error) => {
                setloading(false)
                const errorCode = error.code;
                const errorMessage = error.message;
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `${error.message}`,
                    footer: 'unable to log in user'
                });
            });
    }
    return (
        <div>
            {/* <!-- Hero --> */}
            {
                loadings && <span className="loading loading-ring  absolute w-28 z-20 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"></span>
            }
            <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* <!-- Grid --> */}
                <span className="text-center block">
                    <button onClick={loggindemouser} className="hover:scale-105 active:scale-90 bg-red-500 text-white hover:text-black hover:bg-red-300 transition-all m-2  inline-block">demo user</button>
                    <button onClick={loggindemoadmin} className="hover:scale-105 active:scale-90  bg-green-500 text-white hover:text-black hover:bg-green-300 transition-all m-2  inline-block">demo admin</button>
                    <button onClick={loggindemoteacher} className="hover:scale-105 active:scale-90  bg-orange-500 text-white hover:text-black hover:bg-orange-300 transition-all m-2  inline-block">demo teacher</button>
                </span>
                <div class="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-center">
                    <div class="relative ms-4">
                        <img class="w-full rounded-md" src="https://i.ibb.co/y5ShHN6/5-beginner-level-online-courses-to-help-you-learn-programming.webp" />
                    </div>
                    <div className="lg:px-12 box-border">
                        <h1 class="block text-xl font-bold text-gray-800 sm:text-2xl lg:text-3xl lg:leading-tight dark:text-white">Log in to Exclusive</h1>
                        <p class="mt-3 text-lg text-gray-800 dark:text-gray-400">Enter your details below</p>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input className="block outline-none border-b-2 w-full mx-auto p-2 pl-0 border-b-gray-400" type="email" placeholder="Email" {...register("email", { required: true })} />
                            {errors.email && <p className="text-red-500 ">email is required*</p>}
                            <div className="relative mb-2">
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
                            <button className="w-full bg-red-600 cursor-pointer rounded-lg text-white py-2 hover:bg-red-900 transition-all" type="submit">{loadings ? <span className="loading loading-bars loading-xs"></span> : 'Log in'}</button>
                        </form>
                        <span className="text-center block">--or--</span>
                        <button onClick={loginwithGoogle} className="flex justify-center items-center gap-3 w-full mt-2 bg-transparent border-black active:scale-90 transition-all hover:text-blue-700"><FaGoogle /> Sign in with Google</button>
                        <p className="pt-2">don't have account? <Link className="hover:underline text-blue-600" to={'/signup'}>sign up</Link></p>
                    </div>
                </div>
                {/* <!-- End Grid --> */}
            </div>
            {/* <!-- End Hero --> */}
        </div>
    )
}

export default Login
