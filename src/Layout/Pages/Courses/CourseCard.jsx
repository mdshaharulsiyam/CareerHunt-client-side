import { Link } from "react-router-dom"


const CourseCard = ({ item }) => {
    return (
        <div class="group flex mb-10 flex-col h-full bg-white border border-gray-200 rounded-xl overflow-hidden shadow-2xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <div class="md:h-52 flex flex-col justify-center items-cente rounded-t-xl">
                <img className='w-full h-full object-cover' src={item?.img} alt="" />
            </div>
            <div class="p-2 md:p-6">
                <h3 class="sm:text-xl font-semibold text-sm text-gray-800 dark:text-gray-300 dark:hover:text-white">
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
            <div class="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
                <Link to={`/details/${item._id}`} class="w-full font-bold py-3 px-4 inline-flex justify-center items-center gap-x-2 rounded-ee-xl bg-green-200 text-gray-800 shadow-sm hover:bg-green-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 hover:text-white transition-all dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" >
                    Enroll
                </Link>
            </div>
        </div>
    )
}

export default CourseCard
