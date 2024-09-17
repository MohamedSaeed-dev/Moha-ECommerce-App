
import {Outlet} from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'
const Layout = () => {
    return (
        <div className='flex w-full h-full bg-[#eef0fc]'>
            <Sidebar />
            <div className='flex h-screen justify-between gap-5 w-full flex-col'>
                <Header />
                <main className='p-3 gap-4 overflow-y-auto scroll-dashboard w-full h-full flex flex-col'>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    )
}

export default Layout