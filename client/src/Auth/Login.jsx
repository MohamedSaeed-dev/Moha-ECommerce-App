import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState,  } from 'react'
import login_vector from '../assets/images/login-vector.jpg'
import Cookies from 'js-cookie';
import { AuthContext } from './AuthContext';
import axiosAPI from '../Admin/axiosAPI';
const Login = () => {
  const { updateUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const [hide, setHide] = useState(true)
  const nav = useNavigate();

  const [userNameError, setUserNameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [serverError, setServerError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    let username = formData.username
    let password = formData.password
    const usernameValid = handlUsername(username);
    const passwordValid = handlePassword(password);
      if (!usernameValid && !passwordValid) {
        await axiosAPI.post("login", formData).then(response => {
          Cookies.remove("Bearer")
          Cookies.set('Bearer', response.data.accessToken);
          updateUser({ user: response.data.user, token: response.data.accessToken });
          if (response.data.user.role === "ADMIN") {
            nav("/dashboard", { replace: true });
          }
          else if (response.data.user.role === "USER") {
            nav("/moha", { replace: true })
          }
        }).catch(e => {
          const err = e.response;
          const status = [400, 401, 402, 403, 404]
          status.includes(Number(err.status)) ? setServerError(err.data.message) : setServerError('');
        });
        
      
      }
    


  }
  
  const handlUsername = (username) => {
    if (username === '') {
      setUserNameError("username is required")
      return true;
    }
    else if (username.length < 5) {
      setUserNameError("username must be more than 5 character")
      return true;
    }
    setUserNameError('')
    return false;
  }

  const handlePassword = (password) => {
    if (password === '') {
      setPasswordError("password is required")
      return true;
    }
    else if (password.length < 7) {
      setPasswordError("password must be more than 7 characters")
      return true;
    }
    setPasswordError('')
    return false;
  }

  return (
    <>
      <div className="flex h-screen justify-center items-center">
        <div className="hidden lg:flex w-1/2 items-center justify-center bg-white text-black">
          <div className="max-w-md text-center">
            <img src={login_vector} alt="logo" />
          </div>
        </div>

        <div className='bg-gray-100 h-screen gap-3 flex flex-col justify-center items-center w-full lg:w-1/2'>
          <h1 className='font-bold text-2xl '>Login to <span className='text-primary'>Moha</span></h1>
          <p className='text-[13px] text-gray-400'>Come back to Our Community with all time access and free</p>
          <div className='flex flex-col gap-3 items-center'>
            <button className='bg-[#f9fafb] hover:outline-primary outline-none focus:outline-gray-200 justify-center rounded p-2 flex items-center gap-4 w-72'>
              <i className='fa-brands fa-google text-primary'></i>
              Login with Google
            </button>
            <button className='bg-[#f9fafb] hover:outline-primary outline-none focus:outline-gray-200 justify-center rounded p-2 flex items-center gap-4 w-72'>
              <i className='fa-brands fa-facebook text-primary'></i>
              Login with Facebook
            </button>
          </div>
          <p className='text-gray-400 text-[13px]'>Or with Username</p>
          <span className='text-red-400 text-sm'>{ serverError }</span>
          <form action="" onSubmit={handleSubmit} className='flex flex-col items-start w-72 justify-start gap-3'>
            <div className='flex flex-col gap-2 w-full'>
              <label htmlFor="username" className='font-semibold'>Username</label>
              <span className='text-red-400 text-sm'>{ userNameError }</span>
              <input type="text" onChange={(e) => setFormData({...formData, username: e.target.value})} className='w-full rounded bg-white border focus:outline-gray-200 text-sm px-4 py-2' name="username" id="username" placeholder='Username'/>
            </div>
            <div className='flex flex-col gap-2 w-full'>
              <label htmlFor="password" className='font-semibold'>Password</label>
              <span className='text-red-400 text-sm'>{ passwordError }</span>
              <div className='flex items-center border rounded focus-within:border-primary relative'>
                <input type={hide ? "password" : "text"} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className='w-full rounded pr-10 bg-white focus:outline-none text-sm px-4 py-2' name="password" id="password" placeholder='Password' />
                <i onClick={() => setHide(!hide)} className={` ${hide ? 'fa-eye' : 'fa-eye-slash'} fa-solid absolute right-1 bg-primary cursor-pointer active:border-gray-400 hover:opacity-80 border p-1 rounded`}></i>
              </div>
            </div>
            <button className='bg-primary hover:scale-105 duration-200 ease-out text-white w-full rounded py-2'>Sign Up</button>
          </form>
          <p className='text-sm text-gray-500'>Don't have an account? <Link to="/signup" className='underline text-primary'>Signup</Link> </p>
        </div>

      </div>
    </>
  )
}

export default Login