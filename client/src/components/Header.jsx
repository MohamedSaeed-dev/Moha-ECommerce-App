import React, { useContext, useReducer } from 'react'
import { DataContext } from './DataContext'
import {useNavigate} from 'react-router-dom'
import { AuthContext } from '../Auth/AuthContext'
import avatar from '../assets/images/avatar.jpg'
import axiosAPI from '../Admin/axiosAPI'
import Cookies from 'js-cookie'
import { ToastContainer, toast } from 'react-toastify'


const Header = () => {
    const nav = useNavigate()
    const { user } = useContext(AuthContext);
    const { updateShowDrawer, showDrawer, updateDrawer, drawer } = useContext(DataContext);
    const toggleShowCart = () => {
        if (drawer === "favourite" && showDrawer === "w-[350px]") {
            updateDrawer("cart")
            updateShowDrawer('w-[350px]')
        }
        else if (drawer === "favourite" && showDrawer === 'w-0') {
            updateDrawer("cart")
            updateShowDrawer('w-[350px]')
        }
        else if (drawer === "cart" && showDrawer === 'w-0') {
            updateShowDrawer('w-[350px]')
        }
        else if (drawer === "cart" && showDrawer === 'w-[350px]') {
            updateShowDrawer('w-0')
        }
    }
    const toggleShowFavourite = () => {
        if (drawer === "cart" && showDrawer === "w-[350px]") {
            updateDrawer("favourite")
            updateShowDrawer('w-[350px]')
        }
        else if (drawer === "cart" && showDrawer === 'w-0') {
            updateDrawer("favourite")
            updateShowDrawer('w-[350px]')
        }
        else if (drawer === "favourite" && showDrawer === 'w-0') {
            updateShowDrawer('w-[350px]')
        }
        else if (drawer === "favourite" && showDrawer === 'w-[350px]') {
            updateShowDrawer('w-0')
        }
    }

    const handleProfile = () => {
        if (!user.user) {
            nav("/login")
        }
    }

    
    return (
        <>
            <div className='p-4 flex justify-between items-center border xl:px-80 md:px-24'>
                <div className='font-extrabold text-[23px]'>Moha</div>
                <form className='rounded-lg border py-2 px-3 flex flex-row-reverse justify-between w-[60%] md:w-[60%] items-center '>
                    <i className='pl-3 fa-solid fa-search hover:text-primary cursor-pointer'></i>
                    <input type="text" placeholder='Enter your product name..' className=' placeholder:text-[11px] w-full outline-none text-sm flex-1' />
                </form>
                <div className='hidden md:flex gap-6 text-2xl'>
                    <div onClick={toggleShowCart} className='relative w-8 h-8'>
                        <i className="fa-solid fa-cart-shopping cursor-pointer hover:text-primary"></i>
                        <div className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">5</div>
                    </div>
                    <div className='relative w-8 h-8'>
                        <i onClick={toggleShowFavourite} className="fa-solid fa-heart cursor-pointer hover:text-primary"></i>
                        <div className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">5</div>
                    </div>
                    
                    <label htmlFor="modal_user_logout" onClick={handleProfile} >
                        <i className="fa-solid fa-user cursor-pointer hover:text-primary"></i>
                    </label>
                </div>
            </div>
            {user.user && <ModalProfile />}
        </>
    )
}



export const ModalProfile = () => {
    const { user } = useContext(AuthContext);

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
    };

    const initialValues = {
        username: user.user.username || '',
        email: user.user.email || '',
        phone: user.user.phone || '',
        imgUrl: '',
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
        const img = e.target.files[0]
        const base64 = await converToBase64(img)
        dispatch({
            type: "INPUT", field: e.target.name, value: base64
        })
    };

    const [state, dispatch] = useReducer(reducer, initialValues);
    return (
        <>
            <input type="checkbox" id="modal_user_logout" className="modal-toggle" />
            <div className="modal text-white " role="dialog">
                <div className="modal-box flex gap-4 flex-col w-[90%] bg-[#f7f7f7] ">
                        <h1 className='text-black text-3xl font-extrabold'>Profile</h1>
                    <div className="flex flex-col text-black items-center pb-3 px-5 rounded-t">
                        <div className='flex flex-col items-center justify-center'>
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center rounded-lg cursor-pointer bg-transparent dark:hover:bg-bray-800 dark:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <img src={state.imgUrl || avatar} className='rounded-full' width={200} alt={state.imgUrl || 'avatar'} />
                                <input name='imgUrl' onChange={handleAddImg} id="dropzone-file" type="file" className="hidden" />
                            </label>
                        </div>
                        <div className='flex flex-col gap-1 justify-start w-full'>
                            <div className='flex flex-col gap-1 w-full'>
                                <label htmlFor="username" className='font-semibold'>Username</label>
                                <input onChange={e => {
                                    dispatch({
                                        type: "INPUT", field: e.target.name, value: e.target.value
                                    })
                                }} type="text" id='username' defaultValue={state.username} placeholder='Username' className={`rounded bg-neutral-200 border border-neutral-300 hover:border-neutral-400 px-3 py-2 focus:outline-none ${null ? 'text-gray-600' : 'text-black'}`} />
                            </div>
                            <div className='flex flex-col gap-1 w-full'>
                                <label htmlFor="email" className='font-semibold'>Email</label>
                                <input onChange={e => {
                                    dispatch({
                                        type: "INPUT", field: e.target.name, value: e.target.value
                                    })
                                }} type="email" id='email' defaultValue={state.email} placeholder='Email' className={`rounded bg-neutral-200 border border-neutral-300 hover:border-neutral-400 px-3 py-2 focus:outline-none ${null ? 'text-gray-600' : 'text-black'}`} />
                            </div>
                            <div className='flex flex-col gap-1 w-full'>
                                <label htmlFor="phone" className='font-semibold'>Phone</label>
                                <input onChange={e => {
                                    dispatch({
                                        type: "INPUT", field: e.target.name, value: e.target.value
                                    })
                                }} type="text" id='phone' defaultValue={state.phone} placeholder='Phone' className={`rounded bg-neutral-200 border border-neutral-300 hover:border-neutral-400 px-3 py-2 focus:outline-none ${null ? 'text-gray-600' : 'text-black'}`} />
                            </div>
                            <div className='flex flex-col gap-1 w-full'>
                                <label htmlFor="password" className='font-semibold'>Password</label>
                                <input onChange={e => {
                                    dispatch({
                                        type: "INPUT", field: e.target.name, value: e.target.value
                                    })
                                }} type="password" id='password' defaultValue={state.password} placeholder='Password' className={`rounded bg-neutral-200 border border-neutral-300 hover:border-neutral-400 px-3 py-2 focus:outline-none ${null ? 'text-gray-600' : 'text-black'}`} />
                            </div>
                            <div className='flex flex-col gap-1 w-full'>
                                <label htmlFor="oldpassword" className='font-semibold'>Old password</label>
                                <input onChange={e => {
                                    dispatch({
                                        type: "INPUT", field: e.target.name, value: e.target.value
                                    })
                                }} type="password" id='oldpassword' defaultValue={state.oldPassword} placeholder='Old Password' className={`rounded bg-neutral-200 border border-neutral-300 hover:border-neutral-400 px-3 py-2 focus:outline-none ${null ? 'text-gray-600' : 'text-black'}`} />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between px-5 gap-3 text-black">
                        <div className='flex'>
                            <label htmlFor="modal_user_logout" onClick={handleEditProfile} className="bg-primary hover:opacity-65 p-4 rounded-btn cursor-pointer text-md text-black">Update Account</label>
                        </div>
                        <div className='flex gap-3'>
                            <label htmlFor="my_modal_logout" onClick={() => null} className="bg-[#f7a0a0] hover:opacity-65 p-4 rounded-btn cursor-pointer text-md text-black">Logout</label>
                            <label htmlFor="modal_user_logout" className="bg-[#d0d3d3] hover:opacity-65 p-4 rounded-btn cursor-pointer text-md text-black ">Close</label>
                        </div>
                    </div>
                </div>
            </div>
            <ModalLogout />
            <ToastContainer />
        </>
    )
}

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

const ModalLogout = () => {
    const { updateShowProfile } = useContext(DataContext);
    const { updateUser } = useContext(AuthContext);
    const nav = useNavigate();
  
    const handleLogout = async () => {
        try {
            await axiosAPI.post("logout").then((data) => {
                updateShowProfile(false);
                Cookies.remove("Bearer")
                updateUser({
                    user: null,
                    token: null,
                })
                nav("/login", {replace: true});
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
                    <p className="py-4  text-black text-xl">- Are you sure you want to logout?</p>
                    <div className="modal-action">
                        <label htmlFor="my_modal_logout" onClick={handleLogout} className="bg-[#f7a0a0] hover:opacity-65 p-4 rounded-btn cursor-pointer text-xl text-black">Yes</label>
                        <label htmlFor="my_modal_logout" className="bg-[#e9eaea] hover:opacity-65 p-4 rounded-btn cursor-pointer text-xl text-black ">Close</label>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Header