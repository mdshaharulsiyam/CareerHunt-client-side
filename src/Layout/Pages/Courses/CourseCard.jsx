import { Link } from "react-router-dom"


const CourseCard = ({ item }) => {
    return (
        <div class="group flex mb-10 flex-col h-full bg-white border border-gray-200 rounded-xl overflow-hidden shadow-2xl ">
            <div class="md:h-52 flex flex-col justify-center items-cente rounded-t-xl">
                <img className='w-full h-full object-cover' src={item?.img} alt="" />
            </div>
            <div class="p-2 md:p-6">
                <h3 class="sm:text-xl font-semibold text-sm text-gray-800 ">
                    {item?.title}
                </h3>
                <p className='pt-2 text-xs sm:text-base'><span className='hidden sm:inline'>Instructor :</span> <span className='font-semibold'>{item?.teacher?.username}</span></p>
                <p class="mt-3 text-gray-500 text-xs sm:text-base">
                    {item?.description.slice(0, 90)}.....
                </p>
                <span className='sm:text-lg text-xs pt-1 flex justify-start items-center gap-3'>
                    <p>totalenroll : ({item?.totalenroll})</p>
                    <p>price : <span className='font-bold'>${item?.price}</span></p>
                </span>
            </div>
            <div class="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 ">
                <Link to={`/details/${item._id}`} class="w-full font-bold py-3 px-4 inline-flex justify-center items-center gap-x-2 rounded-ee-xl bg-green-200 text-gray-800 shadow-sm hover:bg-green-600 disabled:opacity-50 disabled:pointer-events-none " >
                    Enroll
                </Link>
            </div>
        </div>
    )
}

export default CourseCard
