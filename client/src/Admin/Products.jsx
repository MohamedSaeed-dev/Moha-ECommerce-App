import React, { useCallback, useEffect, useMemo, useState } from 'react'
import not_found from '../assets/images/not_found.jpg'
import Nav from './Nav'
import { Link } from 'react-router-dom';
import axiosAPI from './axiosAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Pagination } from './Category';
const Products = () => {
    const [idModal, setIdModal] = useState({id:null, name:null});
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const pageSize = 1;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    
    useEffect(() => {
        axiosAPI.get(`products/getAllproducts?page=${currentPage}&pageSize=${pageSize}`).then(response => {
            setProducts(response.data.products);
            setTotalPages(response.data.totalpages);    
        }).catch(err => console.log(err))
    }, [refresh, currentPage])
    
    useEffect(() => {
        axiosAPI.get("categories/getAllCategories").then(response => {
            setCategories(response.data.categories)
        }).catch(e => console.log(e))
    }, [])

    

    const handlNextPage = () => {
        setCurrentPage(prev => prev + 1);
    }

    const handlPreviousPage = () => {
        setCurrentPage(prev => prev - 1);
    }

    const notify = useCallback((type, action, name) => {
        action = action.toLowerCase();
        toast[type](`The ${name} is ${action === 'add' ? `${action}ed`:`${action}d`} successfully`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }, []);

    useEffect(() => {
        const success = sessionStorage.getItem("success");
        const successObj = JSON.parse(success);
        if (successObj?.type === 'UPDATE') {
            notify('info', successObj?.type,successObj?.name);
        } else if (successObj?.type === 'ADD') {
            notify('success', successObj?.type,successObj?.name);
        } else if (successObj?.type === 'DELETE') {
            notify('error', successObj?.type,successObj?.name);
        }

        sessionStorage.removeItem("success");
    }, [notify, refresh]);


    const filtering = useMemo(() => {
        return products.filter((product) => {
            const nameMatch = searchTerm ? product.productName.toLowerCase().includes(searchTerm.toLowerCase()) : true;
            const categoryMatch = selectedCategory ? product.Category.categoryName.includes(selectedCategory) : true;
            return nameMatch && categoryMatch;
        });
    }, [products, searchTerm, selectedCategory]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedCategory]);

    const allproducts = filtering?.map(x => {
        return (
            <tr key={x.id} className='bg-white border-b rounded'>
                <td className='p-3'><input type="checkbox" name="" id="" /></td>
                <td className='p-3 flex justify-between items-center gap-3'>
                    <img src={x.imgUrl || not_found} width={80} height={80} alt={x.productName} className='rounded-full' />
                    <div className='text-center w-full' >
                        <span>{x.productName}</span>
                    </div>
                </td>
                <td className='p-3'>{x.Category.categoryName}</td>
                <td className='p-3'>{x.price}$</td>
                <td className='p-3'>{x.quantity}</td>
                <td >
                    <div className='p-3 flex items-center justify-center gap-3'>
                        <Link state={{ product: x}} to='edit-product' className='rounded bg-blue-400 px-3 p-1 cursor-pointer hover:text-white'> <i className='fa-solid fa-edit'></i> </Link>
                        <label htmlFor="modal_delete_product" onClick={() => setIdModal({
                            id: x.id,
                            name: x.productName,
                        })}>
                            <i className=" rounded bg-red-400 px-3 p-2 cursor-pointer hover:text-white fa-solid fa-trash "></i>
                        </label>
                    </div>
                </td>
            </tr>
        )
    })


    const allcategories = categories?.map(x => {
        return (
            <option key={x.id} value={x.categoryName}>{ x.categoryName }</option>
        )
    })
    return (
        <>
            <h1 className='font-bold text-xl'>Products</h1>
            <Nav list={["Home", "Products"]} />
            <div className='flex gap-3 justify-between items-center'>
                <select onChange={(e)=> setSelectedCategory(e.target.value)} className='p-2 rounded w-[50%] border border-gray-300 bg-transparent focus:outline-none' id="">
                    <option value="" defaultValue={""} >All Category</option>
                    {allcategories}
                </select>
                <input onChange={e =>setSearchTerm(e.target.value)} type="search" placeholder='Search...' className='rounded border hover:outline outline-1 outline-neutral-500-600 border-gray-300 bg-transparent focus:outline-none py-2 px-4 w-[50%]' name="" id="" />
            </div>
            <Link to={'add-product'} className='bg-primary text-center md:max-w-40 px-3 py-2 rounded uppercase hover:opacity-80'>Add Product</Link>

            <div className='rounded p-3 overflow-x-auto overflow-y-auto scroll w-full bg-[#f9fafb] text-center'>
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th><input onChange={null} type="checkbox" /></th>
                            <th className='min-w-52 uppercase text-sm font-semibold'>Product</th>
                            <th className='min-w-52 uppercase text-sm font-semibold'>Category</th>
                            <th className='min-w-52 uppercase text-sm font-semibold'>Price</th>
                            <th className='min-w-52 uppercase text-sm font-semibold'>Quantity</th>
                            <th className='min-w-64 uppercase text-sm font-semibold'>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {
              filtering.length > 0 ? allproducts :
              <tr>
                <td colSpan="6">
                  <div className="flex justify-center items-center font-bold text-xl pt-5">
                    No Such Products!
                  </div>
                </td>
              </tr>
            }
                        
                    </tbody>
                </table>
                <Pagination currentPage={currentPage} handleNextPage={handlNextPage} handlePreviousPage={handlPreviousPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
            </div>

            <ModalDelete data={idModal} refresh={refresh} setRefresh={setRefresh} />
            <ToastContainer />

        </>
    )

}

const ModalDelete = ({ data, setRefresh, refresh }) => {
  const handleDeleteCustomer = async (id) => {
      await axiosAPI.delete(`products/deleteProduct/${id}`).then(response => {
        const deleteData = {
                    type: 'DELETE',
                    name: data?.name
                }
                sessionStorage.setItem("success", JSON.stringify(deleteData));
      setRefresh(!refresh)
    }).catch(e => {
      console.log(e);
    })
  }
  return (
    <>
      <input type="checkbox" id="modal_delete_product" className="modal-toggle" />
      <div className="modal text-white " role="dialog">
        <div className="modal-box bg-[#f7f7f7] ">
          <h3 className="font-bold text-2xl  text-black">Delete Product</h3>
          <div className="divider"></div>
          <p className="py-4  text-black text-xl">- Are you sure you want to delete this product?</p>
          <div className="modal-action">
            <label htmlFor="modal_delete_product" onClick={() => handleDeleteCustomer(data?.id)} className="bg-[#f7a0a0] hover:opacity-65 p-4 rounded-btn cursor-pointer text-xl text-black">Delete</label>
            <label htmlFor="modal_delete_product" className="bg-[#e9eaea] hover:opacity-65 p-4 rounded-btn cursor-pointer text-xl text-black ">Close</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default Products