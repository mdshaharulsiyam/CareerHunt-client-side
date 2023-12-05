
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm';
import { Navigate, useParams } from 'react-router-dom';
import useGetSIngleEnrolmentData from '../../../Hooks/useGetSIngleEnrolmentData';
import { useContext } from 'react';
import { CareerHuntData } from '../../../Context/CareerHunt';
import useGetUserData from '../../../Hooks/useGetUserData';
const stripePromise = loadStripe(import.meta.env.VITE_Payment_API);
document.title = "CareerHunt | Payment"
const Payment = () => {
    const { currentUser } = useContext(CareerHuntData)
    const params = useParams()
    const { userData } = useGetUserData(currentUser?.useremail)
    const { loading, singleenroll, refetch } = useGetSIngleEnrolmentData(currentUser?.useremail, params.id,userData?._id)
    if (singleenroll.length > 0) {
        return <Navigate to={'/dashboard/myenrollment'}></Navigate>
    }
    return (
        <>
            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        </>
    )
}

export default Payment
