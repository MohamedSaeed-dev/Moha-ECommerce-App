import payments from '../assets/images/payment.png'
const Footer = () => {
    const brands = [
        {
            name: "fashion",
            list: ["T-Shirt", "Shirts", "Shorts & Jeans", "Jackets", "Dess & Frock", "Innerwear", "Hosiery"]
        },
        {
            name: "footwear",
            list: ["Sport", "Formal", "Boots", "Casual", "Cowboy Shoes", "Safety Shoes", "Party Wear Shoes", "Branded", "Firstcopy", "Long Shoes"]
        },
        {
            name: "jewellery",
            list: ["Necklace", "Earrings", "Couple Rings", "Pendants", "Crystal", "Bangles", "Bracelets", "Nosepin", "Chain", "Earrings", "Couple Rings"]
        },
        {
            name: "cosmetics",
            list: ["Shampoo", "Bodywash", "Facewash", "Makeup kit", "Liner", "Lipstick", "Perfume", "Body soap", "Scrup", "Hair Gel", "Hair Colors", "Hair Dye", "Sunscreen", "Skin Loson", "Liner", "Lipstick"]
        },
    ]

    // const listing = brands.map((item, i) => {
    //     return (
    //         <div key={i} className="flex">
    //             <div className="text-[#999999] uppercase">{item.name} :</div>
    //             <div className="flex justify-evenly items-center gap-4">
    //                 {item.list.map((x, y) => {
    //                     return (
    //                             <span key={y} className="text-[#636363] hover:text-[#999999] cursor-pointer after:content-['|'] after:inline"> { x } </span>
    //                     )
    //                 })}
    //             </div>
    //         </div>
    //     )
    // })

  return (
    <div className="bg-[#212121] xl:px-80 md:px-24 py-7 px-3 text-sm pb-14 md:pb-6">
        <div className="flex flex-col gap-2 border-b-[1px] border-neutral-600 p-3">
            <p className="text-primary uppercase font-bold">Brand Directory</p>
            <div>
                <div className="flex">
                    <div className="text-[#999999] uppercase">Fashion : </div>
                    <div className="flex justify-evenly items-center gap-4"></div>
                </div>
            </div>
        </div>
        <div className="flex flex-row flex-wrap lg:flex-nowrap items-center lg:flex-row justify-between border-b-[1px] border-neutral-600 gap-4 py-7 px-3 ">
            <div className="flex flex-col w-52 gap-3 lg:min-w-40">
                <p className="text-white font-bold before:absolute before:w-14 before:bg-primary before:content-[''] before:bottom-0 before:left-0 before:h-[1px] h-7 relative">POPULAR CATEGORIES</p>
                <ul className="list-none flex flex-col gap-1">
                    <li className="hover:text-primary text-[#636363] cursor-pointer">Fashion</li>
                    <li className="hover:text-primary text-[#636363] cursor-pointer">Electronic</li>
                    <li className="hover:text-primary text-[#636363] cursor-pointer">Cosmetics</li>
                    <li className="hover:text-primary text-[#636363] cursor-pointer">Health</li>
                    <li className="hover:text-primary text-[#636363] cursor-pointer">Watches</li>
                </ul>
            </div>
            <div className="flex flex-col w-52 gap-3 lg:min-w-28">
                <p className="text-white font-bold before:absolute before:w-14 before:bg-primary before:content-[''] before:bottom-0 before:left-0 before:h-[1px] h-7 relative">PRODUCTS</p>
                <ul className="list-none flex flex-col gap-1">
                    <li className="hover:text-primary text-[#636363] cursor-pointer">Fashion</li>
                    <li className="hover:text-primary text-[#636363] cursor-pointer">Electronic</li>
                    <li className="hover:text-primary text-[#636363] cursor-pointer">Cosmetics</li>
                    <li className="hover:text-primary text-[#636363] cursor-pointer">Health</li>
                    <li className="hover:text-primary text-[#636363] cursor-pointer">Watches</li>
                </ul>
            </div>
            <div className="flex flex-col w-52 gap-3 lg:min-w-28">
                <p className="text-white font-bold before:absolute before:w-14 before:bg-primary before:content-[''] before:bottom-0 before:left-0 before:h-[1px] h-7 relative">OUR COMPANY</p>
                <ul className="list-none flex flex-col gap-1">
                    <li className="hover:text-primary text-[#636363] cursor-pointer">Fashion</li>
                    <li className="hover:text-primary text-[#636363] cursor-pointer">Electronic</li>
                    <li className="hover:text-primary text-[#636363] cursor-pointer">Cosmetics</li>
                    <li className="hover:text-primary text-[#636363] cursor-pointer">Health</li>
                    <li className="hover:text-primary text-[#636363] cursor-pointer">Watches</li>
                </ul>
            </div>
            <div className="flex flex-col w-52 gap-3 lg:min-w-28">
                
                <p className="text-white font-bold before:absolute before:w-14 before:bg-primary before:content-[''] before:bottom-0 before:left-0 before:h-[1px] h-7 relative">SERVICES</p>
                <ul className="list-none flex flex-col gap-1">
                    <li className="hover:text-primary text-[#636363] cursor-pointer">Fashion</li>
                    <li className="hover:text-primary text-[#636363] cursor-pointer">Electronic</li>
                    <li className="hover:text-primary text-[#636363] cursor-pointer">Cosmetics</li>
                    <li className="hover:text-primary text-[#636363] cursor-pointer">Health</li>
                    <li className="hover:text-primary text-[#636363] cursor-pointer">Watches</li>
                </ul>
            </div>
            <div className="flex flex-col w-52 gap-3">
                <p className="text-white font-bold before:absolute before:w-14 before:bg-primary before:content-[''] before:bottom-0 before:left-0 before:h-[1px] h-7 relative">CONTACT</p>
                <ul className="list-none flex flex-col gap-1">
                    <li className="flex gap-2 items-start hover:text-primary text-[#636363] text-wrap cursor-pointer">
                        <i className="fa-solid fa-location-dot"></i>
                        <p>419 State 414 Rte Beaver Dams, New York(NY), 14812, USA</p>
                    </li>
                    <li className="flex gap-2 items-center hover:text-primary text-[#636363] cursor-pointer">
                        <i className="fa-solid fa-phone"></i>
                        <p>+96777539608</p>
                    </li>
                    <li className="flex gap-2 items-center hover:text-primary text-[#636363] cursor-pointer">
                        <i className="fa-solid fa-envelope"></i>
                        <p>mohamedsaeed@gmail.Com</p>
                    </li>
                </ul>
            </div>
        </div> 
        <div className="flex flex-col items-center gap-3 pt-7 px-3">
            <img src={payments} alt="" />
            <p className='text-md text-primary'>Copyright © Moha All Rights Reserved.</p>
        </div>
    </div>
  )
}

export default Footer