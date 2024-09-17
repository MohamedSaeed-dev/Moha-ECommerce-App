import { Link, useNavigate } from 'react-router-dom'
import login_vector from '../assets/images/login-vector.jpg'
import { useContext, useState } from 'react'
import Cookies from 'universal-cookie'
import { AuthContext } from './AuthContext'
import axiosAPI from '../Admin/axiosAPI'
const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    role: ''
  })

  const [hide, setHide] = useState(true)
  const nav = useNavigate();
  const { updateUser } = useContext(AuthContext);
  const [userNameError, setUserNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [serverError, setServerError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    let username = formData.username
    let password = formData.password
    let email = formData.email
    let phone = formData.phone

    const usernameValid = handlUsername(username);
    const passwordValid = handlePassword(password);
    const emailValid = handleEmail(email);
    const phoneValid = handlePhone(phone);
    const cookie = new Cookies();

      if (!usernameValid && !passwordValid && !emailValid && !phoneValid) {
        await axiosAPI.post("signup", formData).then(response => {
          cookie.set("Bearer", response.data.accessToken)
        updateUser({ user: response.data.user, token: cookie.get("Bearer") });
        if (response.data.user.role === "ADMIN") {
          nav("/dashboard")
        }
        else if (response.data.user.role === "USER") {
          nav("/moha")
        }
        }).catch(e => {
          const err = e.response.data;
          const status = [400, 401, 402, 403, 404]
          status.includes(err.status) ? setServerError(err.message) : serverError('');
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

  const handleEmail = (email) => {
    if (email === '') {
      setEmailError("email is required")
      return true;
    }
    else if (!email.endsWith(".com") && !email.includes("@")) {
      setEmailError("check email format")
      return true;
    }
    setEmailError('')
    return false;
  }

  const handlePhone = (phone) => {
    if (phone === '') {
      setPhoneError("phone is required")
      return true;
    }
    else if (phone.length < 9) {
      setPhoneError("check your phone number")
      return true;
    }
    setPhoneError('')
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
          <h1 className='font-bold text-2xl '>Sign Up to <span className='text-primary'>Moha</span></h1>
          <p className='text-[13px] text-gray-400'>Join to Our Community with all time access and free</p>
          <div className='flex flex-col gap-3 items-center'>
            <button className='bg-[#f9fafb] hover:outline-primary outline-none focus:outline-gray-200 justify-center rounded p-2 flex items-center gap-4 w-72'>
              <i className='fa-brands fa-google text-primary'></i>
              Sign Up with Google
            </button>
            <button className='bg-[#f9fafb] hover:outline-primary outline-none focus:outline-gray-200 justify-center rounded p-2 flex items-center gap-4 w-72'>
              <i className='fa-brands fa-facebook text-primary'></i>
              Sign Up with Facebook
            </button>
          </div>
          <p className='text-gray-400 text-[13px]'>Or with Email and Username</p>
          <span className='text-red-400 text-sm'>{ serverError }</span>
          <form action="" className='flex flex-col items-start w-72 justify-start gap-3' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-2 w-full'>
              <label htmlFor="username" className='font-semibold'>Username</label>
              <span className='text-red-400 text-sm'>{ userNameError }</span>
              <input type="text" onChange={(e) => setFormData({ ...formData, username: e.target.value })} className='w-full rounded bg-white border focus:outline-gray-200 text-sm px-4 py-2' name="username" id="username" placeholder='Username' />
            </div>
            <div className='flex flex-col gap-2 w-full'>
              <label htmlFor="email" className='font-semibold'>Email</label>
              <span className='text-red-400 text-sm'>{ emailError }</span>
              <input type="email" onChange={(e)=> setFormData({ ...formData, email: e.target.value })}  className='w-full rounded bg-white border focus:outline-gray-200 text-sm px-4 py-2' name="email" id="email" placeholder='Email' />
            </div>
            <div className='flex flex-col gap-2 w-full'>
              <label htmlFor="phone" className='font-semibold'>Phone Number</label>
              <span className='text-red-400 text-sm'>{ phoneError }</span>
              <input type="text" onChange={(e)=> setFormData({ ...formData, phone: e.target.value })}  className='w-full rounded bg-white border focus:outline-gray-200 text-sm px-4 py-2' name="phone" id="phone" placeholder='Phone Number' />
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
          <p className='text-sm text-gray-500'>Already have an account? <Link to="/login" className='underline text-primary'>Login</Link> </p>
        </div>

      </div>
    </>
  )
}

export default SignUp