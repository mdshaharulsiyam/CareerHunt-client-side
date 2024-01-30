import { useContext, useState } from "react"
import { Outlet } from "react-router-dom"
import { CareerHuntData } from "../../Context/CareerHunt";
import useGetUserData from "../../Hooks/useGetUserData";
import './dashboard.css'
import DashboardMenu from "../DashboardMenu/DashboardMenu";
const Dashboard = () => {
    const { currentUser } = useContext(CareerHuntData)
    const { isPending, userData, refetch } = useGetUserData(currentUser?.useremail)
    const [isChecked, setChecked] = useState(false);
    const handleMenuClick = () => {
        setChecked(!isChecked);
    };
    return (
        <div className='text-left md:flex justify-start items-start gap-5 container mx-auto min-h-screen'>
            <div className="md:hidden flex justify-between items-center">
                <div className="flex items-center p-2 space-x-4">
                    <img src={currentUser?.profileImage} alt="" className="w-12 h-12 rounded-full " />
                    <div>
                        <h2 className="text-lg font-semibold">{currentUser?.username}</h2>
                        <span className="flex items-center space-x-1">
                            <p rel="noopener noreferrer" className="text-xs hover:underline ">{userData?.role}</p> <span className="h-2 w-2 rounded-full bg-green-600"></span>
                        </span>
                    </div>
                </div>
                <label className={`btn btn-circle swap swap-rotate ${isChecked ? 'checked' : ''}`}>
                    <input type="checkbox" checked={isChecked}  />
                    <svg
                        className="swap-off fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 512 512"
                        onClick={handleMenuClick}
                    >
                        <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                    </svg>
                    <svg
                        className="swap-on fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 512 512"
                        onClick={handleMenuClick}
                    >
                        <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                    </svg>
                </label>
            </div>
            <div className={`md:h-auto overflow-hidden md:overflow-auto ${!isChecked ? ' h-[.01px]' : ' h-[550px] '} menushow`}>
                <DashboardMenu />
            </div>
            <div className="flex-grow border-l-2 min-h-screen shadow-2xl">
                <Outlet />
            </div>
        </div>
    )
}

export default Dashboard
