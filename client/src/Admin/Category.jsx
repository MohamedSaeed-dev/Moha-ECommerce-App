import { Link } from 'react-router-dom'
import Nav from './Nav'
import { useCallback, useEffect, useMemo, useState } from 'react';
import axiosAPI from './axiosAPI';
import { ToastContainer, toast } from 'react-toastify';
const Category = () => {
  const [idModal, setIdModal] = useState();
  const [refresh, setRefresh] = useState(false);

  const [allCategories, setAllCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const pageSize = 2;

  useEffect(() => {
    const fetchData = async () => {
      await axiosAPI.get(`categories/getAllCategories?page=${currentPage}&pageSize=${pageSize}`).then(response => {
        setAllCategories(response.data.categories);
        setTotalPages(response.data.totalPages);
      }).catch(err => {
        console.log(err)
      });
    };
    fetchData()
  }, [refresh, currentPage]);

  
  const filter = useMemo(() => {
    return allCategories.filter(x => {
      const search = searchTerm ? x.categoryName.toLowerCase().includes(searchTerm.toLowerCase()) : true;
      return search;
    })
  }, [allCategories, searchTerm])

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);


  const notify = useCallback((type, action, name) => {
    action = action.toLowerCase();
    toast[type](`The ${name} is ${action === 'add' ? `${action}ed` : `${action}d`} successfully`, {
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
      notify('info', successObj?.type, successObj?.name);
    } else if (successObj?.type === 'ADD') {
      notify('success', successObj?.type, successObj?.name);
    } else if (successObj?.type === 'DELETE') {
      notify('error', successObj?.type, successObj?.name);
    }

    sessionStorage.removeItem("success");
  }, [notify, refresh]);
  

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const data = filter?.map(x => {
    return (
      <tr key={x.id} className='bg-white border-b rounded'>
        <td className='p-3'><input type="checkbox" name="" id="" /></td>
        <td className='p-3 flex justify-center items-center gap-3'>
          <span>{x.categoryName}</span>
        </td>
        <td className='p-3'>
          <span>{x.Products.length}</span>
        </td>
        <td >
          <div className='p-3 flex items-center justify-center gap-3'>
            <Link state={{ id: x.id.toString(), categoryName: x.categoryName.toString() }} to='edit-category' className='rounded bg-blue-400 px-3 p-1 cursor-pointer hover:text-white'> <i className='fa-solid fa-edit'></i> </Link>
            <label htmlFor="modal_delete_category" onClick={() => setIdModal({
              id: x.id,
              name: x.categoryName,
            })}>
              <i className=" rounded bg-red-400 px-3 p-2 cursor-pointer hover:text-white fa-solid fa-trash "></i>
            </label>
          </div>
        </td>
      </tr>
    )
  })


  return (
    <>
      <h1 className='font-bold text-xl'>Categories</h1>
      <Nav list={["Home", "Categories"]} />
      <div className='flex items-center justify-between gap-4'>
        <Link to={'add-category'} className='bg-primary text-center md:max-w-40 px-3 py-2 rounded uppercase hover:opacity-80'>Add Category</Link>
        <input onChange={e => setSearchTerm(e.target.value)} type="search" placeholder='Search...' className='rounded border hover:outline outline-1 outline-neutral-500-600 border-gray-300 bg-transparent focus:outline-none py-2 px-4 w-[50%]' name="" id="" />
      </div>
      <div className='rounded flex flex-col p-3 overflow-x-auto overflow-y-auto scroll w-full bg-[#f9fafb] text-center'>
        <table className='w-full'>
          <thead>
            <tr>
              <th><input onChange={null} type="checkbox" /></th>
              <th className='min-w-52 uppercase text-sm font-semibold'>Category</th>
              <th className='min-w-52 uppercase text-sm font-semibold'>Products</th>
              <th className='min-w-64 uppercase text-sm font-semibold'>Operations</th>
            </tr>
          </thead>
          <tbody>
            {
              filter.length > 0 ? data :
              <tr>
                <td colSpan="4">
                  <div className="flex justify-center items-center font-bold text-xl pt-5">
                    No Such Categories!
                  </div>
                </td>
              </tr>
            }
          </tbody>
        </table>
        <Pagination handlePreviousPage={handlePreviousPage} setCurrentPage={setCurrentPage} currentPage={currentPage} handleNextPage={handleNextPage} totalPages={totalPages} />
      </div>
      <ModalDelete data={idModal} refresh={refresh} setRefresh={setRefresh} />
      <ToastContainer />
    </>
  )
};

const ModalDelete = ({ data, setRefresh, refresh }) => {
  const handleDeleteCategory= async (id) => {
    await axiosAPI.delete(`categories/deleteCategory/${id}`).then(response => {
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
      <input type="checkbox" id="modal_delete_category" className="modal-toggle" />
      <div className="modal text-white " role="dialog">
        <div className="modal-box bg-[#f7f7f7] ">
          <h3 className="font-bold text-2xl  text-black">Delete Category</h3>
          <div className="divider"></div>
          <p className="py-4  text-black text-xl">- Are you sure you want to delete this Category?</p>
          <div className="modal-action">
            <label htmlFor="modal_delete_category" onClick={() => handleDeleteCategory(data?.id)} className="bg-[#f7a0a0] hover:opacity-65 p-4 rounded-btn cursor-pointer text-xl text-black">Delete</label>
            <label htmlFor="modal_delete_category" className="bg-[#e9eaea] hover:opacity-65 p-4 rounded-btn cursor-pointer text-xl text-black ">Close</label>
          </div>
        </div>
      </div>
    </>
  )
}


export const Pagination = ({ handlePreviousPage, setCurrentPage, currentPage, handleNextPage, totalPages }) => {
  let pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i)
  };

  const handleGoTo = (page) => {
    setCurrentPage(page)
  }

  return (
    <nav aria-label="Page navigation example" className='mt-8'>
      <ul className="inline-flex -space-x-px text-base h-10">
        <li>
          <button onClick={handlePreviousPage} disabled={currentPage === 1} className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</button>
        </li>
        {
          pages.map(page => {
          return (
            <li key={page}>
              <button onClick={() => handleGoTo(page)} className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 border border-gray-300 ${page === currentPage ? 'bg-gray-200 text-gray-700': ''} hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>{page}</button>
            </li>
          )
          })
        }
        <li>
          <button onClick={handleNextPage} disabled={currentPage === totalPages} className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</button>
        </li>
      </ul>
    </nav>
  )
};

export default Category