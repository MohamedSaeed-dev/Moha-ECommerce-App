import banner1 from '../assets/images/banner-1.jpg'
import banner2 from '../assets/images/banner-2.jpg'
import banner3 from '../assets/images/banner-3.jpg'

const Slider = () => {
  return (
    <div className='p-4 xl:px-80 md:px-24'>
        <div className='flex overflow-x-auto overflow-y-hidden scroll items-center pb-3 gap-5'>
            <div className='relative max-h-[450px] min-w-full snap-start'>
                <img src={banner1} className='rounded h-full w-full object-cover object-right overflow-clip' alt="banner1" />
            </div>
            <div className='relative max-h-[450px] min-w-full snap-start'>
                <img src={banner2} className='rounded h-full w-full object-cover object-right overflow-clip' alt="banner2" />
            </div>
            <div className='relative max-h-[450px] min-w-full snap-start'>
                <img src={banner3} className='rounded h-full w-full object-cover object-right overflow-clip' alt="banner3" />
            </div>
        </div>
    </div>
  )
}

export default Slider