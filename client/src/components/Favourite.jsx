import { useContext } from 'react'
import { DataContext } from './DataContext'
import { CartItem } from './Cart'

const Favourite = () => {
  const { updateShowDrawer } = useContext(DataContext)
  return (
     <>
        <div className='flex justify-between border-b-2 border-b-primary pb-4'>
          <p className='flex items-center gap-3'> <i className="fa-solid fa-heart"></i> Favourite Products</p>
          <i onClick={() => updateShowDrawer("w-0")} className='fa-solid fa-close cursor-pointer text-xl hover:text-primary'></i>
        </div>
        <div className='flex flex-1 flex-col scroll overflow-y-auto py-4 gap-4'>
          <CartItem type={'favourite'} />
        </div>
        <div className='flex flex-col border-t-2 border-t-primary justify-center h-52 mt-3'>
          <div className='flex justify-between pb-3'>
            <p>Subtotal:</p>
            <strong>$1.729.00</strong>
          </div>
          <div className='flex items-center w-full'>
            <button className=' border w-full h-10 hover:bg-primary border-primary flex items-center justify-evenly gap-4 rounded' type='button'> <i className="fa-solid fa-shopping-cart"></i> Add all to cart <div></div> </button>
          </div>
        </div>
    </>
  )
}

export default Favourite