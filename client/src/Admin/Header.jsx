import React, { useContext } from 'react'
import { DataContext } from '../components/DataContext'
import { Link } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext';

const Header = () => {
  const { updateShowAdminDrawer } = useContext(DataContext);
  const { user } = useContext(AuthContext);
  return (
    <header className='p-4 shadow w-full h-12 sticky top-0 bg-[#eef0fc] filter shadow-gray-200 border-b text-gray-600 flex justify-between'>
      <i onClick={() => updateShowAdminDrawer("w-60")} className='fa-solid cursor-pointer lg:hidden fa-bars hover:text-primary'></i>
      <i className='hidden lg:block'></i>
      <div className='flex gap-4 sm:mr-8 mr-2 '>
        <i className='fa-solid cursor-pointer hover:text-primary fa-search'></i>
        <i onClick={() => window.document.documentElement.classList.toggle("dark")} className='fa-solid cursor-pointer hover:text-primary fa-moon'></i>
        <i className='fa-solid cursor-pointer hover:text-primary fa-bell'></i>
        <div className='flex items-center gap-3'>
          <Link to={"profile"} className='fa-solid cursor-pointer hover:text-primary fa-user'></Link>
          <div>
            <p className='text-sm cursor-pointer'>{user.user.username}</p>
            <p className='text-[10px] cursor-pointer'>Admin</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header