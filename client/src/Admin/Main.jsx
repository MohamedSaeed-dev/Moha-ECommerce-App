import React from 'react'
import Card from './Card'
import Nav from './Nav'

export const Main = () => {
  return (
    <>
      <h1 className='font-bold text-xl'>Ecommerce</h1>
      <Nav list={["Home", "Dashboard"]} />
      <div className='flex gap-4 w-full h-full flex-wrap'>
        <div className='flex gap-3 scroll-dashboard overflow-x-auto overflow-y-hidden w-full p-2'>
          <Card num={142155} title={"total orders"} desc={{percenatge: 8.5, text:"New Session Today"}} />
          <Card num={142155} title={"total orders"} desc={{percenatge: 8.5, text:"New Session Today"}} />
          <Card num={142155} title={"total orders"} desc={{percenatge: 8.5, text:"New Session Today"}} />
          <Card num={142155} title={"total orders"} desc={{percenatge: 8.5, text:"New Session Today"}} />
          <Card num={142155} title={"total orders"} desc={{percenatge: 8.5, text:"New Session Today"}} />
          <Card num={142155} title={"total orders"} desc={{percenatge: 8.5, text:"New Session Today"}} />
          <Card num={142155} title={"total orders"} desc={{percenatge: 8.5, text:"New Session Today"}} />
          <Card num={142155} title={"total orders"} desc={{percenatge: 8.5, text:"New Session Today"}} />
          <Card num={142155} title={"total orders"} desc={{percenatge: 8.5, text:"New Session Today"}} />
        </div>
        <div className='rounded shadow bg-slate-100 p-3 w-full lg:w-[49%] shadow-gray-400'>
          <div className='font-semibold text-md'>Earning Reports </div>
          <div className='flex flex-col gap-4'>
            <div className='flex gap-1 items-center w-full border-dotted pb-3 border-b-2'>
              <span className='text-sm'>Earnings Reports Last Week</span>
              <span className='rounded text-[12px] bg-primary p-1'>$18532</span>
            </div>
            <table className='flex flex-col'>
              <tr className='bg-primary bg-opacity-60 text-center rounded items-center px-4 py-2 flex justify-between'>
                <th className='w-20'>ID</th>
                <th className='w-20'>NAME</th>
                <th className='w-20'>PRICE</th>
                <th className='w-20'>QUANTITY</th>
              </tr>
              <tr className='rounded border-b-2 border-dotted text-center p-4 flex items-center justify-between'>
                <td className='w-20'>1</td>
                <td className='w-20'>Laptop</td>
                <td className='w-20'>$70</td>
                <td className='w-20'>15</td>
              </tr>
              <tr className='rounded border-b-2 border-dotted text-center p-4 flex items-center justify-between'>
                <td className='w-20'>1</td>
                <td className='w-20'>Laptop</td>
                <td className='w-20'>$70</td>
                <td className='w-20'>15</td>
              </tr>
              <tr className='rounded border-b-2 border-dotted text-center p-4 flex items-center justify-between'>
                <td className='w-20'>1</td>
                <td className='w-20'>Laptop</td>
                <td className='w-20'>$70</td>
                <td className='w-20'>15</td>
              </tr>
              <tr className='rounded border-b-2 border-dotted text-center p-4 flex items-center justify-between'>
                <td className='w-20'>1</td>
                <td className='w-20'>Laptop</td>
                <td className='w-20'>$70</td>
                <td className='w-20'>15</td>
              </tr>
              <tr className='rounded border-b-2 border-dotted text-center p-4 flex items-center justify-between'>
                <td className='w-20'>1</td>
                <td className='w-20'>Laptop</td>
                <td className='w-20'>$70</td>
                <td className='w-20'>15</td>
              </tr>
            </table>
          </div>
        </div>
        <div className='rounded shadow bg-slate-100 p-3 w-full lg:w-[49%] shadow-gray-400'>
          <div className='font-semibold text-md'>Earning Reports </div>
          <div className='flex flex-col gap-4'>
            <div className='flex gap-1 items-center w-full border-dotted pb-3 border-b-2'>
              <span className='text-sm'>Earnings Reports Last Week</span>
              <span className='rounded text-[12px] bg-primary p-1'>$18532</span>
            </div>
            <table className='flex flex-col'>
              <tr className='bg-primary bg-opacity-60 text-center rounded items-center px-4 py-2 flex justify-between'>
                <th className='w-20'>ID</th>
                <th className='w-20'>NAME</th>
                <th className='w-20'>PRICE</th>
                <th className='w-20'>QUANTITY</th>
              </tr>
              <tr className='rounded border-b-2 border-dotted text-center p-4 flex items-center justify-between'>
                <td className='w-20'>1</td>
                <td className='w-20'>Laptop</td>
                <td className='w-20'>$70</td>
                <td className='w-20'>15</td>
              </tr>
              <tr className='rounded border-b-2 border-dotted text-center p-4 flex items-center justify-between'>
                <td className='w-20'>1</td>
                <td className='w-20'>Laptop</td>
                <td className='w-20'>$70</td>
                <td className='w-20'>15</td>
              </tr>
              <tr className='rounded border-b-2 border-dotted text-center p-4 flex items-center justify-between'>
                <td className='w-20'>1</td>
                <td className='w-20'>Laptop</td>
                <td className='w-20'>$70</td>
                <td className='w-20'>15</td>
              </tr>
              <tr className='rounded border-b-2 border-dotted text-center p-4 flex items-center justify-between'>
                <td className='w-20'>1</td>
                <td className='w-20'>Laptop</td>
                <td className='w-20'>$70</td>
                <td className='w-20'>15</td>
              </tr>
              <tr className='rounded border-b-2 border-dotted text-center p-4 flex items-center justify-between'>
                <td className='w-20'>1</td>
                <td className='w-20'>Laptop</td>
                <td className='w-20'>$70</td>
                <td className='w-20'>15</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}