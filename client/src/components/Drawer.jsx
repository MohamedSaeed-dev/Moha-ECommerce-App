import { DataContext } from './DataContext'
import { useContext } from 'react'
const Drawer = (props) => {
    const { showDrawer } = useContext(DataContext)
    return (
        <div className={` ${showDrawer === 'w-[350px]' ? 'w-screen' : 'w-0'} fixed inset-0 z-50 outline-none focus:outline-none`}>
            <div className={`${showDrawer} ${showDrawer === 'w-[350px]' ? 'p-4' : ''} ease-in border-r-[1px] shadow-md shadow-slate-900 bg-[#f7f7f7] flex flex-col h-full fixed z-[5555] top-0 right-0 overflow-x-hidden duration-300`}>
            {props.children}
        </div>
        </div>
    )
}

export default Drawer