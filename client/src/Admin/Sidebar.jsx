import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { DataContext } from '../components/DataContext';

const Sidebar = () => {
  const { showAdminDrawer, updateShowAdminDrawer } = useContext(DataContext);
  return (
    <nav className={`bg-primary gap-3 ${showAdminDrawer} md:w-60 flex flex-col h-screen md:static fixed z-[1] top-0 left-0 overflow-x-hidden `}>
      <div className=' shadow font-extrabold flex px-7 justify-between items-center  shadow-gray-400 w-full h-12'>
        <span className='tracking-[10px]'>Moha</span>
        <i onClick={()=> updateShowAdminDrawer("w-0")} className='fa-solid fa-close lg:hidden hover:text-red-400 cursor-pointer'></i>
      </div>
      <div className='flex w-full px-3 flex-col gap-3 '>
        <span className='text-[12px]'>Dashboard & Apps</span>
        <ul>
          <li className=''>
            <div className='flex gap-2 items-center'>
              <i className={`fa-solid fa-chevron-down`}></i>
              <span className='cursor-pointer font-semibold'>Admin</span>
            </div>
            <ul className={`flex ml-3 text-sm flex-col gap-3 font-semibold`}>
              <li className='px-4 w-36 rounded py-2 items-center gap-3 duration-200 ease-out cursor-pointer hover:opacity-70 flex'>
                <i className="fa-solid fa-chart-line"></i>
                <Link to={"main"}>Dashboard</Link>
              </li>              
              <NavLink title={"Products"} icon={"fa-warehouse"} />
              <NavLink title={"Categories"} icon={"fa-table-list"} />
              <NavLink title={"Orders"} icon={"fa-briefcase"} />
              <NavLink title={"Carts"} icon={"fa-cart-arrow-down"} />
              <NavLink title={"Customers"} icon={"fa-users"} />
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  )
}

const NavLink = ({title, icon}) => {
  return (
    <li className='px-4 w-36 rounded py-2 items-center gap-3 duration-200 ease-out cursor-pointer hover:opacity-70 flex'>
      <i className={`fa-solid ${icon}`}></i>
      <Link to={title.toLowerCase()}>{ title }</Link>
    </li>
  )
}

export default Sidebar