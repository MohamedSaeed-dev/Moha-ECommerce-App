import { useContext } from "react"
import { DataContext } from "./DataContext"
import Profile from "./Profile"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../Auth/AuthContext"
import { ModalProfile } from "./Header";

const BottomBar = () => {
  const { updateShowDrawer, showDrawer, updateDrawer, drawer, updateShowProfile, showProfile } = useContext(DataContext)
  const {user} = useContext(AuthContext)
  const nav = useNavigate();
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
      <div className="md:hidden border-primary border rounded-t-xl rounded-tr-xl shadow shadow-slate-950 fixed bottom-0 w-[80%] px-5 py-2 bg-white z-50">
        <div className="flex items-center justify-around">
            <i className="fa-brands text-lg fa-microsoft cursor-pointer hover:text-primary"></i>
            <i onClick={toggleShowCart} className="fa-solid fa-cart-shopping text-lg cursor-pointer hover:text-primary"></i>
            <div onClick={()=> nav("/moha")} className="rounded-full text-lg border-primary hover:text-white cursor-pointer border h-12 w-12 flex justify-center items-center bg-primary shadow-sm hover:shadow-slate-900">
              <i className="fa-solid fa-home text-lg "></i>
            </div>
            <i onClick={toggleShowFavourite} className="fa-solid fa-heart text-lg cursor-pointer hover:text-primary"></i>
            <label htmlFor="modal_user_logout" onClick={handleProfile} >
                        <i className="fa-solid fa-user cursor-pointer hover:text-primary"></i>
                    </label>
        </div>
      </div>
      {user.user && <ModalProfile />}
    </>
  )
}

export default BottomBar