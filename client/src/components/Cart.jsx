import { useContext, useEffect, useState } from 'react'
import { DataContext } from './DataContext'
import axiosAPI from '../Admin/axiosAPI'
import { AuthContext } from '../Auth/AuthContext'

const Cart = () => {
  const { updateShowDrawer } = useContext(DataContext)
  const { user } = useContext(AuthContext);

  const [cart, setCart] = useState();
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    if (user.user) {
      axiosAPI.get(`carts/getCart/${user.user?.id}`).then(response => {
      setCart(response.data);
    })
    }
  }, [isDeleted, user.user])

  const cartItems = cart?.CartItem?.map((item, i) => {
    return (
      <CartItem key={item.id} type={'cart'} setIsDeleted={setIsDeleted} id={item.id} imgUrl={item.product?.imgUrl} name={item.product.productName} price={item.product.newPrice}/>
    )
  });

  
  return (
    <>
        <div className='flex justify-between border-b-2 border-b-primary pb-4'>
          <p className='flex items-center gap-3'> <i className="fa-solid fa-shopping-cart"></i> Shopping Cart</p>
          <i onClick={() => updateShowDrawer("w-0")} className='fa-solid fa-close cursor-pointer text-xl hover:text-primary'></i>
        </div>
        <div className='flex flex-1 flex-col scroll overflow-y-auto py-4 gap-4'>
          
        
        {cartItems}
        </div>
        <div className='flex flex-col border-t-2 border-t-primary justify-center h-52 mt-3'>
          <div className='flex justify-between pb-3'>
            <p>Subtotal:</p>
            <strong>$1.729.00</strong>
          </div>
          <div className='flex items-center w-full'>
            <button className=' border w-full h-10 hover:bg-primary border-primary flex items-center justify-evenly gap-4 rounded' type='button'> <i className="fa-solid fa-check"></i> Checkout <div></div> </button>
          </div>
        </div>
    </>
  )
}

export function CartItem({ type, id, imgUrl, name, price, setIsDeleted}) {
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(+price);


  const increaseQuantity = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      setTotalPrice(newQuantity * price);
      return newQuantity;
    });
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => {
      if (prevQuantity > 1) {
        const newQuantity = prevQuantity - 1;
        setTotalPrice(newQuantity * price);
        return newQuantity;
      }
      return prevQuantity;
    });
  };

  const deleteItemCart = async () => {
    await axiosAPI.delete(`carts/deleteCartItem/${id}`).then((response) => {
      setIsDeleted(response.data.id + 1);
    }).catch(e => {
      console.log(e);
    })
  };

  return (
    <div className='flex items-center gap-3 border-b-2 pb-3 pr-3'>
      <img src={imgUrl} width={70} alt="img" className='rounded-full' />
      <div className='flex flex-col gap-2 w-full'>
        <div className='flex justify-between'>
          <p className='text-sm longtxt1 pr-1'>{ name }</p>
          <i className="fa-solid fa-trash hover:text-red-500 cursor-pointer" onClick={deleteItemCart}></i>
        </div>
        <div className='flex justify-between'>
          {type === 'cart' ?
            (
              <div className='flex'>
                <button className='border px-2' onClick={increaseQuantity}>+</button>
                <input className='w-8 border focus:outline-none text-center text-sm' readOnly value={quantity} type="text" name={name} id={id} />
                <button className='border px-2' onClick={decreaseQuantity}>-</button>
              </div>
            ) : (
              <div>
                <button className='hover:bg-primary border border-primary rounded px-2 py-1 text-sm flex gap-3 items-center'> <i className="fa-solid fa-shopping-cart"></i> Add to cart</button>
              </div>
            )}
          <div>${Number(totalPrice).toFixed(2)}</div>
        </div>
      </div>
    </div>
  )
}

export default Cart