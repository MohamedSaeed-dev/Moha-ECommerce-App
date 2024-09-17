import not_found from '../assets/images/not_found.jpg'
import ShowProductModal from './ShowProductModal'
import { useContext, useEffect, useState } from 'react'
import axiosAPI from '../Admin/axiosAPI'
import { AuthContext } from '../Auth/AuthContext'

const NewProduct = () => {
    const [show, setShow] = useState(false);
    const [products, setProducts] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        axiosAPI.get("products/getAllProducts").then(response => {
            setProducts(response.data.products)
        }).catch(err => console.log(err))
    }, [])

    const addToCart = async (userId, productId) => {
        await axiosAPI.post("carts/addToCart", { userId: userId, productId: productId }).then(
            response => console.log(response.data)
        ).catch(err => console.log(err))
    }

    const listing = products.map((item, i) => {
        return (
            <div key={i} className="flex relative flex-col w-72 h-80 justify-between parent cursor-pointer text-[12px] p-2 items-center rounded-lg border shadow-lg hover:shadow-gray-400 ">
                {item.discount && <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 p-4 border-white rounded-full -top-2 -end-2 -left-2 dark:border-gray-900">{ item.discount }%</div>}
                <div className='bg-white z-10 absolute child top-3 right-3 flex-col gap-[4px] hidden transition ease-in delay-150 duration-300 hover:translate-x-0'>
                    <div onClick={() => addToCart(user.user.id, item.id)} title='Add to cart' className='border rounded p-[4px] hover:text-primary'>
                        <i className='fa-solid fa-shopping-cart'></i>
                    </div>
                    <div title='Add to favourite' className='border rounded p-[4px] hover:text-primary'>
                        <i className='fa-solid fa-heart'></i>
                    </div>
                    <div onClick={() => setShow({status:true, data:item})} title='Show the product' className='border rounded p-[4px] hover:text-primary'>
                        <i className='fa-solid fa-eye'></i>
                    </div>
                </div>
                <img src={item.imgUrl || not_found} width={70} alt={item.productName} className='w-48  rounded-full object-cover hover:scale-110 transition-all' />
                <div className='flex flex-col'>
                    <p className='text-primary text-sm cursor-pointer'>{item.productName}</p>
                    <p className='text-[#c1c1c1] cursor-pointer hover:text-neutral-600'>Mens winter leather jackets</p>
                    <div className=''>
                        <i className="fa-solid fa-star text-gold"></i>
                        <i className="fa-solid fa-star text-gold"></i>
                        <i className="fa-solid fa-star text-gold"></i>
                        <i className="fa-regular fa-star text-gold"></i>
                        <i className="fa-regular fa-star text-gold"></i>
                    </div>
                    <div className='flex gap-2'>
                        <p className='text-primary text-sm font-semibold'>${item.newPrice}</p>
                        <del className='text-[#c1c1c1]'>${item.price}</del>
                    </div>
                </div>
            </div>
        )
    })
    return (
        <>
            <div className="flex flex-col  p-4 xl:px-80 md:px-24">
                <p className="border-b-[1px] pb-3 font-bold">New Products</p>
                <div className="flex flex-col items-center justify-center sm:flex-row flex-wrap mt-4 gap-3">
                    {listing}
                </div>
            </div>
            <ShowProductModal show={show} setShow={setShow} />
        </>
    )
}

export default NewProduct