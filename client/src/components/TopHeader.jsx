

const TopHeader = () => {
  return (
      <div className="flex justify-between items-center text-[#787878] text-[12px] p-3 xl:px-80 md:px-24">
          <div className="md:flex justify-between items-center hidden gap-2">
              <i className="fa-brands fa-facebook bg-[#ededed] p-1 rounded cursor-pointer hover:bg-primary hover:text-white"></i>
              <i className="fa-brands fa-twitter bg-[#ededed] p-1 rounded cursor-pointer hover:bg-primary hover:text-white"></i>
              <i className="fa-brands fa-instagram bg-[#ededed] p-1 rounded cursor-pointer hover:bg-primary hover:text-white"></i>
              <i className="fa-brands fa-linkedin bg-[#ededed] p-1 rounded cursor-pointer hover:bg-primary hover:text-white"></i>
          </div>
          <div><span className="font-[500]">FREE SHIPPING</span> THIS WEEK ORDER OVER - $55</div>
          <div>
              <select name="" id="">
                  <option value="">USD $</option>
                  <option value="">EUR $</option>
              </select>
              <select name="" id="">
                  <option value="">English</option>
                  <option value="">Arabic</option>
              </select>
          </div>
    </div>
  )
}

export default TopHeader