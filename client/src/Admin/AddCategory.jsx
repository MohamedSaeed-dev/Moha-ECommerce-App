import React, { useState } from 'react'
import Nav from './Nav'
import { useNavigate, useLocation } from 'react-router-dom';
import axiosAPI from './axiosAPI';

const AddCategory = () => {
    const [categoryName, setCategoryName] = useState('');
    const nav = useNavigate();
    const loc = useLocation();
    

    const handleAddCategory = async () => {
        await axiosAPI.post("categories/addCategory", { categoryName: categoryName }).then(response => {
            const add = {
                    type: 'ADD',
                    name: categoryName
                }
                sessionStorage.setItem("success", JSON.stringify(add));
            nav(-1)
        }).catch(e => console.log(e));
    }

    return (
        <div className='flex flex-col gap-4 lg:max-w-screen-sm'>
            <h1 className='font-bold text-xl'>Add Category</h1>
            <Nav list={["Categories", "Add Category"]} />
            <div className='flex flex-col lg:flex-row justify-between gap-5 '>
                <form className='flex flex-col w-full justify-between text-sm gap-3'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="category" className='font-semibold'>Category Name</label>
                        <input type="text" onChange={(e)=> setCategoryName(e.target.value)} className='rounded bg-transparent border border-neutral-300 hover:border-neutral-400 px-3 py-2 focus:outline-none' name='category' placeholder='Category Name' />
                    </div>
                    <button onClick={handleAddCategory} type='button' className='bg-primary text-center md:max-w-40 px-3 py-2 rounded uppercase hover:opacity-80'>Add Category</button>

                </form>
            </div>
        </div>
    )
}

export default AddCategory