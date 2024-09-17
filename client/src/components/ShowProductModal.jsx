
import not_found from '../assets/images/not_found.jpg'
const ShowProductModal = ({ show, setShow }) => {
  const product = show.data;
  return (
    <>
      {show.status && (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="rounded-lg shadow-lg px-5 pt-5 border relative flex flex-col w-96 lg:w-full bg-white">
                {/*header*/}
                {product.discount && <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 p-5 border-white rounded-full -top-2 -end-2 -left-2 dark:border-gray-900">{ product.discount }%</div>}
                <div className='absolute top-3 right-5'>
                  <i className="fa-solid fa-close cursor-pointer text-red-500" onClick={() => setShow({ status: null, show: false })}></i>
                </div>
                <div className="flex flex-col lg:flex-row lg:gap-4 items-center pb-3 px-5 border-b border-solid border-blueGray-200 rounded-t">
                  <img src={product.imgUrl || not_found} width={50} alt={product.productName || "avatar"} className='w-48  rounded-full object-cover hover:scale-110 transition-all' />
                  <div className='flex flex-col justify-between gap-2'>
                    <div className='flex items-center gap-4'>
                      <h3 className="text-3xl font-semibold">{product.productName}</h3>
                      <div>-</div>
                      <div>{product.Category.categoryName}</div>
                    </div>
                    <div>
                      <div>Price: <strong>${product.newPrice}</strong> <del>${product.price}</del></div>
                      <div>Quantity: <strong>{product.quantity} Pcs</strong></div>
                    </div>
                    <div className=''>
                      <i className="fa-solid fa-star text-gold"></i>
                      <i className="fa-solid fa-star text-gold"></i>
                      <i className="fa-solid fa-star text-gold"></i>
                      <i className="fa-regular fa-star text-gold"></i>
                      <i className="fa-regular fa-star text-gold"></i>
                    </div>
                  </div>
                  
                  
                  
                </div>
              
                <div className="relative p-3 flex-auto">
                  <strong>Description</strong>
                  <p className="my-2 longtxt2 text-blueGray-500 text-md leading-relaxed">
                    {product.description ? product.description : 'No description provided!'}
                  </p>
                </div>
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-3 p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="flex items-center gap-3 bg-transparent outline outline-1 hover:bg-primary outline-primary p-4 rounded-btn cursor-pointer text-md text-black"
                    type="button"
                    onClick={() => null}>
                    <i className="fa-solid fa-heart"></i>
                    Add to favourite
                  </button>
                  <button
                    className="flex items-center gap-3 bg-primary hover:opacity-65 p-4 rounded-btn cursor-pointer text-md text-black"
                    type="button"
                    onClick={() => setShow(false)}
                  >
                    <i className="fa-solid fa-shopping-cart"></i>
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
}

export default ShowProductModal