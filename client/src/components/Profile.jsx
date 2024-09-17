import { useContext, useState } from 'react'
import avatar from '../assets/images/avatar.jpg'
import { DataContext } from './DataContext'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { AuthContext } from '../Auth/AuthContext'
import axiosAPI from '../Admin/axiosAPI'

const Profile = () => {
  const { showProfile, updateShowProfile } = useContext(DataContext)

  const { updateUser } = useContext(AuthContext);
  const nav = useNavigate();

  

  const handleLogout = async () => {
    try {
      await axiosAPI.post("logout").then(data => {
        updateShowProfile(false);
        Cookies.remove("Bearer")
        updateUser({
          user: null,
          token: null,
        })
        nav("/login");
      });
      
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      {showProfile ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="rounded-lg shadow-lg border overflow-x-auto relative flex flex-col w-96 scroll max-h-[70vh] bg-white">
                {/*header*/}
                <div className='absolute top-3 right-5'>
                  <i className="fa-solid fa-close cursor-pointer text-red-500" onClick={() => updateShowProfile(false)}></i>
                </div>
                <div className="flex flex-col  items-center pb-3 px-5 rounded-t">
                  <img src={avatar} width={200} alt="" />
                  <div className='flex flex-col gap-1 justify-start w-full'>
                    <div className='flex flex-col gap-1 w-full'>
                      <div className='flex justify-between w-full items-center mb-2'>
                        <label htmlFor="" className='font-semibold'>Uername</label>
                      </div>
                      <input type="text" value={"moha123"} placeholder='Username' className={`bg-gray-200 rounded px-2 py-1 focus:outline-none w-full text-black`} />
                    </div>
                    <div className='flex flex-col gap-1 w-full'>
                      <label htmlFor="" className='font-semibold'>Email</label>
                      <input type="email" value={"moha123@gmail.com"} placeholder='Email' className={`bg-gray-200 rounded px-2 py-1 focus:outline-none w-full text-black`} />
                    </div>
                    <div className='flex flex-col gap-1 w-full'>
                      <label htmlFor="" className='font-semibold'>Phone</label>
                      <input type="text" value={"123456789"} placeholder='Phone' className={`bg-gray-200 rounded px-2 py-1 focus:outline-none w-full text-black`} />
                    </div>
                    <div className='flex flex-col gap-1 w-full'>
                      <label htmlFor="" className='font-semibold'>Password</label>
                      <input type="password" value={"123456789"} placeholder='Password' className={`bg-gray-200 rounded px-2 py-1 focus:outline-none w-full  text-black`} />
                    </div>
                  </div>
                  
                  
                  
                </div>
                {/*footer*/}
                <div className="flex flex-col items-center justify-end gap-3 p-6 rounded-b">
                  <button
                    className="flex items-center gap-3 bg-primary text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => updateShowProfile(false)}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                    Edit Profile
                  </button>
                </div>
                <div className='flex justify-between items-center px-5 border-xl border-t py-3'>
                  <button onClick={handleLogout} className='rounded bg-red-400 px-2 py-1 w-40 font-bold uppercase hover:opacity-80'>Logout</button>
                  <button className='rounded bg-red-400 px-2 py-1 w-40 font-bold uppercase hover:opacity-80'>Delete Account</button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}

export default Profile