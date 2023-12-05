import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosrequest from "../../../Hooks/useAxiosrequest";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { CareerHuntData } from "../../../Context/CareerHunt";
import { FaArrowLeft } from "react-icons/fa6";
import useGetUserData from "../../../Hooks/useGetUserData";
import Swal from "sweetalert2";

const CheckoutForm = () => {
    const { currentUser } = useContext(CareerHuntData)
    const [clientSecret, setclientSecret] = useState(null)
    const axiosrequest = useAxiosrequest()
    const axiosSecure = useAxiosSecure()
    const [CourseDetails, setCourseDetails] = useState(null)
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState('')
    const params = useParams()
    const Navigate = useNavigate()
    useEffect(() => {
        setloading(true)
        axiosrequest.get(`/singlecourse?id=${params.id}`)
            .then((res) => {
                setloading(false)
                setCourseDetails(res.data)
            })
    }, [])
    if (!loading && CourseDetails?.teacher?.useremail === currentUser?.useremail) {
        return <Navigate to={'/dashboard/myclasses'}></Navigate>
    }
    useEffect(() => {
        if (!CourseDetails?.price || !currentUser?.useremail) {
            return
        }
        axiosSecure.post('/create-payment-intent', { price: 50 })
            .then((res) => {
                setclientSecret(res.data.clientSecret)
            })
    }, [CourseDetails?.price, currentUser?.useremail])
    const { userData } = useGetUserData(currentUser?.useremail)
    const stripe = useStripe();
    const elements = useElements();
    const handleSubmit = async (event) => {
        setloading(true)
        event.preventDefault();
        if (!stripe || !elements) {
            setloading(false)
            return;

        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            setloading(false)
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setloading(false)
            seterror(error?.message)
        }
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: currentUser?.useremail || 'anonymous',
                    name: currentUser?.username || 'anonymous'
                }
            }
        })

        if (confirmError) {
            setloading(false)
            seterror(confirmError?.message)
        }
        else {
            if (paymentIntent.status === 'succeeded') {
                const enrolldata = {
                    student: userData?._id,
                    course: CourseDetails?._id,
                    TransactionId: paymentIntent?.id
                }
                axiosSecure.post('enroll', enrolldata).then((res) => {
                    if (res.data.success) {
                        setloading(false)
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Your work has been saved",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }

                    Navigate('/dashboard/myenrollment')


                })
            } else {
                seterror("somthing went's wrong")
                setloading(false)
            }
        }
    }

    return (
        <div>
            <div className="flex justify-center items-center container mx-auto mt-10">
                <div className="flex space-x-2 sm:space-x-4 mx-a">
                    <img className="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500" src={CourseDetails?.img} alt="Polaroid camera" />
                    <div className="flex flex-col justify-between w-full pb-4">
                        <span className='flex justify-start items-center gap-3 '>
                            <img className='h-10 w-10 rounded-full' src={CourseDetails?.teacher?.profileImage} alt="" />
                            <p className='text-base font-semibold'>{CourseDetails?.teacher?.username}</p>
                        </span>
                        <div className="flex justify-between w-full pb-2 space-x-2">
                            <div className="space-y-1">
                                <h3 className="text-lg font-semibold leadi sm:pr-8">{CourseDetails?.title}</h3>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-semibold">${CourseDetails?.price}</p>
                            </div>
                        </div>
                        <div className="flex text-sm divide-x">
                            <Link to={-1} type="button" className="flex items-center px-2 py-1 space-x-1">
                                <FaArrowLeft />
                                <span>back</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <form className="my-11 max-w-2xl container mx-auto bg-[#e8e8e8] p-5" onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}


                />
                {
                    error && <p className="py-2 text-red-600 font-bold text-xl">{error}</p>
                }{
                    loading && <button className=" mt-10 mx-auto block px-16 " type="submit" disabled>
                        <span className="flex justify-center items-center gap-2">
                            Pay ${CourseDetails?.price}  <span className="animate-spin mt-1 inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" role="status" aria-label="loading"></span>
                        </span>
                    </button>
                }
                {!loading && <button className="border-green-600 bg-green-500 mt-10 mx-auto block px-16 hover:bg-green-300 transition-all active:scale-90" type="submit" disabled={!stripe || !elements || loading}>
                    Pay ${CourseDetails?.price}
                </button>}
            </form>
        </div>

    )
}

export default CheckoutForm
