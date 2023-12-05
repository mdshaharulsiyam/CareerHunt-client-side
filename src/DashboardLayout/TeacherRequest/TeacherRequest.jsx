
import { useLoaderData } from "react-router-dom"
import Table from "./Table/Table"
import { useEffect, useState } from "react"
import useAxiosrequest from "../../Hooks/useAxiosrequest"
const TeacherRequest = () => {
  const axiosrequest = useAxiosrequest()
  const [totalData,settotalData]=useState(0)
  useEffect(()=>{
    axiosrequest.get('/requestcount')
    .then((res)=>settotalData(res.data))
  },[])
  document.title = "CareerHunt | Dashboard Teacher Requests"
  return (
    <div>
     <Table totalData={totalData} />
    </div>
  )
}

export default TeacherRequest
