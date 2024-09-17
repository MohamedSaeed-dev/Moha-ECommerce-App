import React from 'react'

const Card = ({title, num, desc}) => {
  return (
    <div className='rounded flex gap-3 min-w-[30%] p-3 flex-col shadow shadow-slate-400'>
          <div className='uppercase font-bold text-sm text-gray-600'>{ title }</div>
          <div className='uppercase text-2xl font-bold'>{ num }</div>
        <div className='flex gap-1 items-center'>
              <div className='text-primary text-sm'>{ desc.percenatge }%</div>
              <div className='text-sm text-gray-500'>{ desc.text }</div>
        </div>
    </div>
  )
}

export default Card