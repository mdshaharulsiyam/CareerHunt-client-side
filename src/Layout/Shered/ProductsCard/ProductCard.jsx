import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { useNavigate } from 'react-router-dom';

const ProductCard = ({item}) => {
    const { productImage, price, rating, review, productName, _id } = item;
    const navigate = useNavigate()
    const handelProductDetails = (_id) => {
        navigate(`/productDeails/${_id}`)
    }
    return (
        <div onClick={() => handelProductDetails(_id)} className='p-2 bg-black bg-opacity-5 rounded-lg cursor-pointer hover:scale-105 transition-all'>
            <div className='w-full max-h-80 overflow-hidden bg-black relative'>
                <img className='w-full object-cover' src={productImage} alt="" />
                <p className=' rounded-lg absolute font-bold bg-black top-2 right-2 p-2 text-white bg-opacity-40'>${price}</p>
            </div>
            <h3 className='text-lg py-1 font-semibold'>{productName}</h3>
            <div className='flex justify-start items-center gap-2'>
                <Rating
                    style={{ maxWidth: 100 }}
                    readOnly
                    orientation="horizontal"
                    value={rating / review}
                /> <p className='font-extrabold'>({review})</p>
            </div>
        </div>
    )
}

export default ProductCard
