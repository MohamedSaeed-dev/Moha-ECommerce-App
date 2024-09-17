import React, { useContext, useReducer, useState } from 'react'
import Nav from './Nav'
import avatar from '../assets/images/avatar.jpg'
import { useNavigate } from 'react-router-dom'
import { DataContext } from '../components/DataContext'
import Cookies from 'js-cookie'
import { AuthContext } from '../Auth/AuthContext'
import axiosAPI from './axiosAPI'
import { ToastContainer, toast } from 'react-toastify'
const Profile = () => {
  const { user } = useContext(AuthContext);
  const [activate, setActivate] = useState(false)
  
  const initialValues = {
    username: user.user.username || '',
    email: user.user.email || '',
    phone: user.user.phone || '',
    imgUrl: user.user.imgUrl || '',
    password: "",
    oldPassword: "",
  }
  
  const reducer = (state, action) => {
    const { type, field, value } = action;
    switch (type) {
      case 'INPUT':
        return {
          ...state,
          [field]: value
        }
      case 'RESET':
        return initialValues
      default:
        return state;
    }
  }
  const handleAddImg = async (e) => {
        const img  = e.target.files[0]
        const base64 = await converToBase64(img)
        dispatch({
            type: "INPUT", field: e.target.name, value: base64
        })
    }

  const notify = (type, text) => {
    toast[type](text, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  const handleEditProfile = async () => {
    await axiosAPI.put(`editProfile/${user.user.id}`, state).then((response) => {
      const profile = response.data.user;
      initialValues.username = profile.username;
      initialValues.email = profile.email;
      initialValues.phone = profile.phone;
      initialValues.imgUrl = profile.imgUrl;
      initialValues.oldPassword = "";
      initialValues.password = "";
      notify("info", 'The profile is updated successfully')
    }).catch(e => {
      console.log(e);
      notify("error", 'something went wrong in update the profile')
    })
  }
  const [state, dispatch] = useReducer(reducer, initialValues);
  
  return (
    <>
      <h1 className='font-bold text-xl'>Profile</h1>
      <Nav list={["Home", "Profile"]} />
      <div className="flex flex-col max-w-screen-sm">
        <div className='flex flex-col items-center justify-center'>
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center rounded-lg cursor-pointer bg-transparent dark:hover:bg-bray-800 dark:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <img src={state.imgUrl || avatar} className='rounded-full' width={200} alt={state.imgUrl || 'avatar'} />
                        <input name='imgUrl' onChange={handleAddImg} id="dropzone-file" type="file" className="hidden" />
                    </label>
        </div>
        <div className='flex flex-col gap-1 '>
          <div className='flex flex-col gap-1'>
            <div className='flex justify-between items-center mb-2'>
              <label htmlFor="username" className='font-semibold'>Username</label>
              <button onClick={() => setActivate(!activate)} className='bg-primary px-2 py-1 rounded hover:scale-105 duration-100 ease-in text-sm uppercase text-white font-bold w-28'>{activate ? "Activate" : "DisActivate"}</button>
            </div>
            <input onChange={e => {
              dispatch({
                type: "INPUT", field: e.target.name, value: e.target.value
              })
            }} type="text" name='username' id="username" disabled={activate} value={state.username} placeholder='Username' className={`'rounded bg-transparent border border-neutral-300 hover:border-neutral-400 px-3 py-2 focus:outline-none ${activate ? 'text-gray-600' : 'text-black'}`} />
          </div>
          <div className='flex flex-col gap-1 w-full'>
            <label htmlFor="email" className='font-semibold'>Email</label>
            <input onChange={e => {
              dispatch({
                type: "INPUT", field: e.target.name, value: e.target.value
              })
            }} type="email" name='email' id='email' disabled={activate} value={state.email} placeholder='Email' className={`'rounded bg-transparent border border-neutral-300 hover:border-neutral-400 px-3 py-2 focus:outline-none ${activate ? 'text-gray-600' : 'text-black'}`} />
          </div>
          <div className='flex flex-col gap-1 w-full'>
            <label htmlFor="phone" className='font-semibold'>Phone</label>
            <input onChange={e => {
              dispatch({
                type: "INPUT", field: e.target.name, value: e.target.value
              })
            }} type="text" name='phone' id='phone' disabled={activate} value={state.phone} placeholder='Phone' className={`'rounded bg-transparent border border-neutral-300 hover:border-neutral-400 px-3 py-2 focus:outline-none ${activate ? 'text-gray-600' : 'text-black'}`} />
          </div>
          <div className='flex flex-col gap-1 w-full'>
            <label htmlFor="password" className='font-semibold'>Password</label>
            <input onChange={e => {
              dispatch({
                type: "INPUT", field: e.target.name, value: e.target.value
              })
            }} type="password" name='password' id='password' value={state.password} disabled={activate} placeholder='Password' className={`'rounded bg-transparent border border-neutral-300 hover:border-neutral-400 px-3 py-2 focus:outline-none ${activate ? 'text-gray-600' : 'text-black'}`} />
          </div>
          <div className='flex flex-col gap-1 w-full'>
            <label htmlFor="oldPassword" value={state.oldPassword} className='font-semibold'>Old Password</label>
            <input onChange={e => {
              dispatch({
                type: "INPUT", field: e.target.name, value: e.target.value
              })
            }} type="password" name='oldPassword' id='oldPassword' disabled={activate} placeholder='Old Password' className={`'rounded bg-transparent border border-neutral-300 hover:border-neutral-400 px-3 py-2 focus:outline-none ${activate ? 'text-gray-600' : 'text-black'}`} />
          </div>
        </div>
      </div>
      <button onClick={handleEditProfile} className="flex items-center justify-center max-w-48 gap-3 bg-primary text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
        <i className="fa-solid fa-pen-to-square"></i>
        Edit Profile
      </button>
      <div className='flex justify-start gap-4 items-center border-xl border-t py-3'>

        <label htmlFor="my_modal_logout" className='cursor-pointer' onClick={() => null}>
          <p className='rounded text-center bg-red-400 px-2 py-1 w-40 font-bold uppercase hover:opacity-80'>Logout</p>
        </label>
        <label htmlFor="my_modal_deleteAccount" className='cursor-pointer' onClick={() => null}>
          <p className='rounded text-center bg-red-400 px-2 py-1 w-40 font-bold uppercase hover:opacity-80'>Delete Account</p>
        </label>
      </div>

      <ModalLogout />
      <ModalDeleteAccount />
      <ToastContainer />
    </>
  )
}

const ModalLogout = () => {
  const { updateShowProfile } = useContext(DataContext);
  const { updateUser } = useContext(AuthContext);
  const nav = useNavigate();
  
  const handleLogout = async () => {
    try {
      await axiosAPI.post("logout").then( async (data) => {
        updateShowProfile(false);
        Cookies.remove("Bearer");
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
      <input type="checkbox" id="my_modal_logout" className="modal-toggle" />
      <div className="modal text-white " role="dialog">
        <div className="modal-box bg-[#f7f7f7] ">
          <h3 className="font-bold text-2xl  text-black">Logout</h3>
          <div className="divider"></div>
          <p className="py-4 text-black text-xl">- Are you sure you want to logout?</p>
          <div className="modal-action">
            <label htmlFor="my_modal_logout" onClick={handleLogout} className="bg-[#f7a0a0] hover:opacity-65 p-4 rounded-btn cursor-pointer text-xl text-black">Yes</label>
            <label htmlFor="my_modal_logout" className="bg-[#e9eaea] hover:opacity-65 p-4 rounded-btn cursor-pointer text-xl text-black ">Close</label>
          </div>
        </div>
      </div>
    </>
  )
};
const ModalDeleteAccount = () => {
  const { updateShowProfile } = useContext(DataContext);
  const { updateUser, user } = useContext(AuthContext);
  const [activate, setActivate] = useState(false)
  const nav = useNavigate();
  
  const handleDelete = async () => {
    try {
      await axiosAPI.delete(`deleteAccount/${user.user.id}`).then( async (data) => {
        updateShowProfile(false);
        Cookies.remove("Bearer");
        document.cookie = '';
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
      <input type="checkbox" id="my_modal_deleteAccount" className="modal-toggle" />
      <div className="modal text-white " role="dialog">
        <div className="modal-box bg-[#f7f7f7] ">
          <h3 className="font-bold text-2xl  text-black">Delete Account</h3>
          <div className="divider"></div>
          <p className="py-4 text-black text-xl">- Are you sure you want to delete the account?</p>
          <div className="modal-action">
            <label htmlFor="my_modal_deleteAccount" onClick={handleDelete} className="bg-[#f7a0a0] hover:opacity-65 p-4 rounded-btn cursor-pointer text-xl text-black">Yes</label>
            <label htmlFor="my_modal_deleteAccount" className="bg-[#e9eaea] hover:opacity-65 p-4 rounded-btn cursor-pointer text-xl text-black ">Close</label>
          </div>
        </div>
      </div>
    </>
  )
};

function converToBase64(img) {
    if (img !== '') {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(img);
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (err) => {
                reject(err);
            }
        })
    }
    return img;
}

export default Profile