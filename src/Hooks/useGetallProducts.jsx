import React, { useEffect, useState } from 'react'
import useAxiosrequest from './useAxiosrequest'
const axiosrequest = useAxiosrequest()
const useGetallProducts = (categoryFilter, sortBy, sortValue, seacrhValue, pageNumber, itemPerPage,setloading) => {
    const [allproducts, setallProducts] = useState([])
    useEffect(() => {
        axiosrequest.get(`/products?categoryFilter=${categoryFilter}&sortBy=${sortBy}&sortValue=${sortValue}&seacrhValue=${seacrhValue}&pageNumber=${pageNumber}&itemPerPage=${itemPerPage}`).then((data) => {
            setallProducts(data.data)
            setloading(false)
        })
    }, [categoryFilter, sortBy, sortValue, seacrhValue, pageNumber, itemPerPage])
    return [allproducts]
}

export default useGetallProducts
