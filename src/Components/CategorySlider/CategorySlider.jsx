import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { FaList} from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
const CategorySlider = ({ categoryData, slidesPerView, spaceBetween, handelCategory }) => {
    const location = useLocation()
    return (
        <Swiper
            slidesPerView={slidesPerView}
            spaceBetween={spaceBetween}
            pagination={{
                clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
        >
            <SwiperSlide>
                <div onClick={() => handelCategory('all')} className="bg-gray-300 p-5 my-5 mb-7 select-none text-center hover:bg-red-700 hover:text-white transition-all">
                    {location.pathname !== "/products" && <div className="h-10 w-10 mx-auto"><FaList className='w-10 h-10'/></div>}
                    <p className={`${location.pathname !== "/products" && 'pt-3'} font-bold`}>All</p>
                </div>
            </SwiperSlide>
            {
                categoryData.map(item => <SwiperSlide key={item._id}>
                    <div onClick={() => handelCategory(item.categoryName)} className="bg-gray-300 p-5 my-5 mb-7 select-none text-center hover:bg-red-700 hover:text-white transition-all">
                        {location.pathname !== "/products" && <div className="h-10 w-10 mx-auto"><img className="w-full object-cover" src={item.categoryImage} alt="" /></div>}
                        <p className={`${location.pathname !== "/products" && 'pt-3'} font-bold`}>{item.categoryName}</p>
                    </div>
                </SwiperSlide>)
            }
        </Swiper>
    )
}

export default CategorySlider
