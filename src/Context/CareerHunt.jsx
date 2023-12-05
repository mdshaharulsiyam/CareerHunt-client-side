import { createContext, useEffect, useState } from "react"
export const CareerHuntData = createContext({})
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import app from "../Firebase/FirebaseConfig";
import Swal from "sweetalert2";
import useAxiosrequest from "../Hooks/useAxiosrequest";
import useAxiosSecure from "../Hooks/useAxiosSecure";
const auth = getAuth(app)
const CareerHunt = ({ children }) => {
    const axiosrequest = useAxiosrequest()
    const axiosecure = useAxiosSecure()
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setloading] = useState(true)
    const [search, setsearch] = useState('')
    const createNewUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const loginuser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    const searchhandel = text => {
        setsearch(text)
    }
    const provider = new GoogleAuthProvider()
    const loginwithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                const userData = {
                    profileImage: user.photoURL,
                    username: user.displayName,
                    useremail: user.email,
                    role: "student",
                    skils: ''
                }
                axiosrequest.post('/user', userData)
                    .then((res) => {
                    })
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'logged in successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
            }).catch((error) => {
                const errorMessage = error.message;
                Swal.fire(
                    'opps!!',
                    `${errorMessage}`,
                    'error'
                )
            });
    }
    const userSignOut = () => {
        signOut(auth).then(() => {
            setCurrentUser(null)
        }).catch((error) => {

        });
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userData = {
                    username: user.displayName,
                    useremail: user.email,
                    profileImage: user.photoURL
                }
                axiosecure.post('/jwt', userData)
                    .then((res) => {
                        setCurrentUser(userData)
                        setloading(false)
                    })

            } else {
                axiosecure.post('/clearjwt', currentUser)
                    .then((res) => {
                        setloading(false)
                    })
                setCurrentUser(null)
                setloading(false)
            }
        });
        return () => {
            return unsubscribe();
        }
    }, [])
    const contextData = {
        createNewUser,
        loginuser,
        loginwithGoogle,
        currentUser,
        loading,
        userSignOut,
        searchhandel,
        search
    }
    return (
        <CareerHuntData.Provider value={contextData}>
            {children}
        </CareerHuntData.Provider>
    )
}

export default CareerHunt
