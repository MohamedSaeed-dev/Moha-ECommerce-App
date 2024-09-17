import React from 'react'
import { Link } from 'react-router-dom'

const Nav = ({ list }) => {
    // const url = {
    //     "Products":"products",
    //     "Add Product":"add-product",
    //     "Edit Product":"edit-product",
    //     "Main":"main",
    //     "Orders":"orders",
    //     "Carts":"carts",
    //     "Customers":"customers",
    // }
    const lists = list.map((x, i) => {
        return (
            <span key={i}>
                <span className='cursor-pointer hover:text-primary'> {i === list.length-1 ? <Link className='text-primary'>{x}</Link> : <Link> { x } </Link>} </span>
                <span>{i !== list.length - 1 && <span>/</span>}</span>
            </span>
        )
    })
    return (
        <div className='text-gray-500 text-[11px]'>
            <span className='cursor-pointer hover:text-primary'>Admin </span>/ {lists}
        </div>
    )
}

export default Nav