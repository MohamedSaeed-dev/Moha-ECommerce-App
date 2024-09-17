import dress from '../assets/images/icons/dress.svg'
import coat from '../assets/images/icons/coat.svg'
import glasses from '../assets/images/icons/glasses.svg'
import shorts from '../assets/images/icons/shorts.svg'
import jacket from '../assets/images/icons/jacket.svg'
import watch from '../assets/images/icons/watch.svg'
import hat from '../assets/images/icons/hat.svg'

const Categories = () => {

    const categories = [
        {
            url: dress,
            title: "Dress & forck",
            number: 53
        },
        {
            url: glasses,
            title: "glasses & lens",
            number: 68
        },
        {
            url: shorts,
            title: "shorts & jeans",
            number: 84
        },
        {
            url: jacket,
            title: "jacket",
            number: 16
        },
        {
            url: watch,
            title: "watch",
            number: 27
        },
        {
            url: hat,
            title: "hat & caps",
            number: 39
        },
    ]

    const listing = categories.map((item, i) => {
        return (
        <div key={i} className='border rounded flex items-center min-w-[21rem] p-3 gap-3 snap-start'>
            <div className='w-[80px]'>
                <img src={item.url} className='bg-[#ededed] object-cover rounded border border-gray-300 p-2 ' alt="a" />
            </div>
            <div className='flex flex-col gap-3 w-full'>
                <div className='flex items-center justify-between min-w-full'>
                    <p className='uppercase font-bold'>{ item.title }</p>
                    <p className='text-[#c1c1c1]'>({item.number})</p>
                </div>
                <div className='text-primary cursor-pointer'>
                    Show all
                </div>
            </div>
        </div>
        );
    })
    
  return (
    <div className='p-4 xl:px-80 md:px-24'>
        <div className='flex items-center scroll gap-5 overflow-x-auto overflow-y-hidden text-sm'>
            {listing}
        </div>
    </div>
  )
}

export default Categories