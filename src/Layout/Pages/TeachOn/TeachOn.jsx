import React, { useContext, useState } from 'react'
import ApplyForTeacher from './ApplyForTeacher/ApplyForTeacher'
import useGetUserData from '../../../Hooks/useGetUserData'
import { CareerHuntData } from '../../../Context/CareerHunt'
import useGetMyApplication from '../../../Hooks/useGetMyApplication'
import ApplicationUpdate from './ApplyForTeacher/ApplicationUpdate'

const TeachOn = () => {
  document.title = "CareerHunt | teach on CareerHunt"
  const { currentUser } = useContext(CareerHuntData)
  const [showForm, setShowForm] = useState(false)
  const { userData, isPending } = useGetUserData(currentUser?.useremail)
  const { myApplocations, loadin,refetch} = useGetMyApplication(currentUser?.useremail)
  return (
    <div className='container mx-auto py-7'>
      {
        (myApplocations.length > 0 && !loadin) && <div>
          <h2 className='text-2xl'>your request is <span className='text-red-600 font-bold'>{myApplocations[0].status}...</span></h2>
          {
            myApplocations[0].status !== 'pending' && <p className='font-semibold py-1'>because.... <span className='text-red-500'>{myApplocations[0].msg}</span></p>
          }
          <li className="flex flex-col py-6 sm:flex-row sm:justify-between">
            <div className="flex w-full space-x-2 sm:space-x-4">
              <img className="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500" src={myApplocations[0]?.requestedUser[0]?.profileImage} alt="profile image" />
              <div className="flex flex-col justify-between w-full pb-4">
                <div className="flex justify-between w-full pb-2 space-x-2">
                  <div className="">
                    <h3 className="text-lg font-semibold leadi sm:pr-8 py-1">{userData?.username}</h3>
                    <p className="text-sm dark:text-gray-400 font-medium"><span className='font-bold'>title :</span> {myApplocations[0]?.title}</p>
                    <p className="text-sm dark:text-gray-400 font-medium"><span className='font-bold'>category :</span> {myApplocations[0]?.category}</p>
                    <p className="text-sm dark:text-gray-400 font-medium"><span className='font-bold'>experience :</span> {myApplocations[0]?.experience}</p>
                  </div>
                </div>
                {
                  myApplocations[0].status === "rejected" && <div className="flex text-sm divide-x">
                    <button onClick={() => setShowForm(!showForm)} type="button" className="flex items-center px-2 py-1 space-x-1 bg-red-600 text-white">
                      <span>{showForm ? 'close form' : 'change'} </span>
                    </button>
                  </div>
                }

              </div>
            </div>
          </li>
        </div>
      }
      {
        (!myApplocations.length > 0 && !loadin) && <ApplyForTeacher refetch={refetch} />
      }
      {
        showForm && <ApplicationUpdate id={myApplocations[0]?._id} setShowForm={setShowForm} refetch={refetch} defaultcategory={myApplocations[0]?.category} experience={myApplocations[0]?.experience} title={myApplocations[0]?.title}></ApplicationUpdate>
      }
    </div>
  )
}

export default TeachOn
