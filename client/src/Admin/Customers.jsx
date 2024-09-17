import React, { useContext, useEffect, useState } from 'react'
import Nav from './Nav'
import { AuthContext } from '../Auth/AuthContext';
import axiosAPI from './axiosAPI';

const Customers = () => {
  const [idModal, setIdModal] = useState();
  const { user } = useContext(AuthContext);
  const [customers, setCustomers] = useState([])
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    axiosAPI.get(`customers/getAllCustomers/${user.user.id}`).then(response => setCustomers(response.data)).catch(err => console.log(err))
  }, [refresh, user.token])


  const handleBlock = async (id) => {
    await axiosAPI.put("customers/blockCustomer", { id: id }).then(response => setRefresh(!refresh)).catch(e => console.log(e))
  }

  const data = customers.map((x) => {
                return (
                  <tr key={x.id} className='bg-white border-b rounded'>
                    <td className='p-3'><input type="checkbox" name="" id="" /></td>
                    <td className='p-3 flex justify-around items-center gap-3'>
                      <img src={x.imgUrl} width={50} alt="" />
                      <span>{ x.username }</span>
                    </td>
                    <td className='p-3'>{ x.email }</td>
                    <td className='p-3'>{ x.phone }</td>
                    <td >
                      <div className='p-3 flex items-center justify-center gap-3'>
                        <button onClick={() => handleBlock(x.id)} className={`rounded ${!x.isBlocked ? 'bg-blue-400':'bg-blue-200'} px-3 p-1 cursor-pointer ${!x.isBlocked ? 'hover:text-white':''}`}> <i className='fa-solid fa-ban'></i> </button>
                        <label htmlFor="modal_delete_customer" onClick={() => setIdModal(x.id)}>
                          <i className=" rounded bg-red-400 px-3 p-2 cursor-pointer hover:text-white fa-solid fa-trash "></i>
                        </label>
                      </div>
                    </td>
                  </tr>
                )
              })

  return (
    <>
      <h1 className='font-bold text-xl'>Customers</h1>
      <Nav list={["Home", "Customers"]} />
      <div className='rounded p-3 overflow-x-auto overflow-y-auto scroll w-full bg-[#f9fafb] text-center'>
        <table className='w-full'>
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th className='min-w-52 uppercase text-sm font-semibold'>Customer</th>
              <th className='min-w-52 uppercase text-sm font-semibold'>Email</th>
              <th className='min-w-52 uppercase text-sm font-semibold'>Phone</th>
              <th className='min-w-64 uppercase text-sm font-semibold'>Operations</th>
            </tr>
          </thead>
          <tbody>
            
            {
              data
            }

          </tbody>
        </table>
      </div>

      <ModalDelete id={idModal} refresh={refresh} setRefresh={setRefresh} />
      

    </>
  )
}

const ModalDelete = ({ id, setRefresh, refresh }) => {
  const handleDeleteCustomer = async (id) => {
    await axiosAPI.post("customers/deleteCustomer", { id: id }).then(response => {
      setRefresh(!refresh)
    }).catch(e => {
      console.log(e);
    })
  }
  return (
    <>
      <input type="checkbox" id="modal_delete_customer" className="modal-toggle" />
      <div className="modal text-white " role="dialog">
        <div className="modal-box bg-[#f7f7f7] ">
          <h3 className="font-bold text-2xl  text-black">Delete Customer</h3>
          <div className="divider"></div>
          <p className="py-4  text-black text-xl">- Are you sure you want to delete this customer?</p>
          <div className="modal-action">
            <label htmlFor="modal_delete_customer" onClick={() => handleDeleteCustomer(id)} className="bg-[#f7a0a0] hover:opacity-65 p-4 rounded-btn cursor-pointer text-xl text-black">Delete</label>
            <label htmlFor="modal_delete_customer" className="bg-[#e9eaea] hover:opacity-65 p-4 rounded-btn cursor-pointer text-xl text-black ">Close</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default Customers