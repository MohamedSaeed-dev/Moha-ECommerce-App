import pic1 from '../assets/images/products/1.jpg'
import pic2 from '../assets/images/products/2.jpg'
import pic3 from '../assets/images/products/3.jpg'
import pic4 from '../assets/images/products/4.jpg'
import pic5 from '../assets/images/products/clothes-1.jpg'
import pic6 from '../assets/images/products/clothes-2.jpg'
import pic7 from '../assets/images/products/clothes-3.jpg'
import pic8 from '../assets/images/products/clothes-4.jpg'



const NewArrivals = () => {
    const products1 = [
        {
            url: pic1,
            name: "Relaxed Short Full Sleeves",
            category: "Clothes",
            price: "45.00",
            discount: "12.00"
        },
        {
            url: pic2,
            name: "MEN Yarn",
            category: "Winter Wear",
            price: "61.00",
            discount: "11.00"
        },
        {
            url: pic3,
            name: "Girls Pink Embro",
            category: "Clothes",
            price: "61.00",
            discount: "9.00"
        },
        {
            url: pic4,
            name: "Mens Winter",
            category: "Winter Wear",
            price: "32.00",
            discount: "20.00"
        },
    ]

    const products2 = [
        {
            url: pic5,
            name: "Black Foral",
            category: "Clothes",
            price: "76.00",
            discount: "25.00"
        },
        {
            url: pic6,
            name: "Mens Winter",
            category: "Jacket",
            price: "50.00",
            discount: "25.00"
        },
        {
            url: pic7,
            name: "Pure Garment",
            category: "Mens Fashion",
            price: "68.00",
            discount: "31.00"
        },
        {
            url: pic8,
            name: "Better Basics",
            category: "Shorts",
            price: "20.00",
            discount: "10.00"
        },
    ]

    const listing = products1.map((item, i) => {
        return (
                <div key={i} className='rounded border flex items-center h-20'>
                    <div className='w-[80px]'>
                        <img src={item.url} className='object-cover bg-transparent p-2 ' alt="a" />
                    </div>
                    <div className='flex flex-col items-start'>
                    <p className='font-bold longtxt'>{ item.name }</p>
                    <p className='text-[#c1c1c1] hover:text-primary cursor-pointer'>{ item.category }</p>
                        <div className='flex gap-2'>
                        <p className='text-primary font-semibold'>${ item.price }</p>
                        <del className='text-[#c1c1c1]'>${ item.discount }</del>
                        </div>
                    </div>
                </div>
        )
    })

    const listing2 = products2.map((item, i) => {
        return (
                <div key={i} className='rounded border flex items-center h-20'>
                    <div className='w-[80px]'>
                        <img src={item.url} className='object-cover bg-transparent p-2 ' alt="a" />
                    </div>
                    <div className='flex flex-col items-start'>
                    <p className='font-bold longtxt'>{ item.name }</p>
                    <p className='text-[#c1c1c1] hover:text-primary cursor-pointer'>{ item.category }</p>
                        <div className='flex gap-2'>
                        <p className='text-primary font-semibold'>${ item.price }</p>
                        <del className='text-[#c1c1c1]'>${ item.discount }</del>
                        </div>
                    </div>
                </div>
        )
    })
  return (
        <div className='flex flex-col mt-3 md:w-[32%]'>
            <p className='border-b-[1px] pb-3 font-bold'>New Arrivals</p>
            <div className='flex gap-4 mt-4 scroll overflow-x-auto'>
              <div className='snap-start md:min-w-full flex flex-col gap-3'>{ listing }</div>
              <div className='snap-start md:min-w-full flex flex-col gap-3'>{ listing2 }</div>
            </div>
        </div>
  )
}

export default NewArrivals