import { useContext } from "react"
import { Link, NavLink, Outlet } from "react-router-dom"
import { CgProfile } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { CareerHuntData } from "../../Context/CareerHunt";
import useGetUserData from "../../Hooks/useGetUserData";
import { CiSquareQuestion } from "react-icons/ci";
import '../Dashboard/dashboard.css'
import { FaUsers } from "react-icons/fa6";
import { SiGoogleclassroom } from "react-icons/si";
import { CgAddR } from "react-icons/cg";
import { MdClass } from "react-icons/md";
import { FaMessage } from "react-icons/fa6";
const DashboardMenu = () => {
    const { currentUser, userSignOut } = useContext(CareerHuntData)
    const teachermenu = <>
        <li>
            <NavLink to={'addclasst'} rel="noopener noreferrer" className="flex items-center p-2 space-x-3 rounded-md">
                <CgAddR className="text-2xl" />
                <span>Add classes</span>
            </NavLink>
        </li>
        <li>
            <NavLink to={'myclasses'} rel="noopener noreferrer" className="flex items-center p-2 space-x-3 rounded-md">
                <SiGoogleclassroom className="text-2xl" />
                <span> myclasses</span>
            </NavLink>
        </li>
    </>
    const adminMenu = <>
        <li>
            <NavLink to={'/dashboard/request'} rel="noopener noreferrer" className="flex items-center p-2 space-x-3 rounded-md">
                <CiSquareQuestion className="text-2xl" />
                <span>teacher request</span>
            </NavLink>
        </li>
        <li>
            <NavLink to={'/dashboard/users'} rel="noopener noreferrer" className="flex items-center p-2 space-x-3 rounded-md">
                <FaUsers className="text-2xl" />
                <span>users</span>
            </NavLink>
        </li>
        <li>
            <NavLink to={'/dashboard/classes'} rel="noopener noreferrer" className="flex items-center p-2 space-x-3 rounded-md">
                <SiGoogleclassroom className="text-2xl" />
                <span>All classes</span>
            </NavLink>
        </li>
        <li>
            <NavLink to={'/dashboard/messages'} rel="noopener noreferrer" className="flex items-center p-2 space-x-3 rounded-md">
                <FaMessage className="text-2xl" />
                <span>messagess</span>
            </NavLink>
        </li>

    </>
    const { isPending, userData, refetch } = useGetUserData(currentUser?.useremail)
    return (
        <div className="h-full p-3 space-y-2 w-60 dark:bg-gray-900 dark:text-gray-100">
            <div className="md:flex items-center p-2 space-x-4 hidden">
                <img src={currentUser?.profileImage} alt="" className="w-12 h-12 rounded-full dark:bg-gray-500" />
                <div>
                    <h2 className="text-lg font-semibold">{currentUser?.username}</h2>
                    <span className="flex items-center space-x-1">
                        <p rel="noopener noreferrer" className="text-xs hover:underline dark:text-gray-400">{userData?.role}</p> <span className="h-2 w-2 rounded-full bg-green-600"></span>
                    </span>
                </div>
            </div>
            <div className="divide-y menues dark:divide-gray-700">
                <ul className="pt-2 pb-4 space-y-1 text-sm">
                    <li className="dark:bg-gray-800 dark:text-gray-50">
                        <NavLink to={'dashboard'} rel="noopener noreferrer" className="flex items-center p-2 space-x-3 rounded-md">
                            <CgProfile className="text-2xl" />
                            <span>Profile</span>
                        </NavLink>
                    </li>
                    {/* userData?.role === 'student' &&  */}
                    {
                        <li className="dark:bg-gray-800 dark:text-gray-50">
                            <NavLink to={'myenrollment'} rel="noopener noreferrer" className="flex items-center p-2 space-x-3 rounded-md">
                                <MdClass className="text-2xl" />
                                <span>MyEnrollment</span>
                            </NavLink>
                        </li>
                    }
                    {
                        (userData?.role === 'admin') && adminMenu
                    }
                    {
                        (userData?.role === 'teacher') && teachermenu
                    }
                </ul>
                <ul className="pt-4 pb-2 space-y-1 text-sm">
                    <li>
                        <Link to={'/'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                            <FaHome className="text-2xl" />
                            <span>Home</span>
                        </Link>
                    </li>
                    <li>
                        <button onClick={userSignOut} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md bg-transparent active:scale-95">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6 fill-current dark:text-gray-400">
                                <path d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z"></path>
                                <rect width="32" height="64" x="256" y="232"></rect>
                            </svg>
                            <span>Logout</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default DashboardMenu
