import React, { useEffect, useState } from 'react'

const Footer = () => {
    const [time, setTime] = useState();
    useEffect(() => {
        let date = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000)

        return () => {
            clearInterval(date);
        }
    })
  return (
    <div className='flex text-[12px] w-full border p-2 text-gray-500 justify-evenly'>
        <div>© 2024 Moha</div>
          <div className='text-primary'>{ time }</div>
        <div>Crafted with by Mohamed Saeed</div>
    </div>
  )
}

export default Footer