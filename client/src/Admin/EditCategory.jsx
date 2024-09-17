import React, { useState } from 'react'
import Nav from './Nav'
import { useLocation, useNavigate } from 'react-router-dom';
import axiosAPI from './axiosAPI';

const EditCategory = () => {
    const location = useLocation();
    const nav = useNavigate();
    const { id, categoryName } = location.state;
    const [newCategoryName, setNewCategoryName] = useState(categoryName);
    const handleEditCategory = async () => {
        await axiosAPI.put("categories/editCategory", { id: id, categoryName: newCategoryName }).then(response => {
            const update = {
                    type: 'UPDATE',
                    name: newCategoryName
                }
                sessionStorage.setItem("success", JSON.stringify(update));
            nav(-1)
        }).catch(error => console.log(error))
    }
    return (
        <div className='flex flex-col gap-4 lg:max-w-screen-sm'>
            <h1 className='font-bold text-xl'>Edit Category</h1>
            <Nav list={["Categories", "Edit Category"]} />
            <div className='flex flex-col lg:flex-row justify-between gap-5 '>
                <form className='flex flex-col w-full justify-between text-sm gap-3'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="category" className='font-semibold'>Category Name</label>
                        <input type="text" value={newCategoryName} onChange={(e)=> setNewCategoryName(e.target.value)} className='rounded bg-transparent border border-neutral-300 hover:border-neutral-400 px-3 py-2 focus:outline-none' name='category' placeholder='Category Name' />
                    </div>
                    <button type='button' onClick={handleEditCategory} className='bg-primary text-center md:max-w-40 px-3 py-2 rounded uppercase hover:opacity-80'>Edit Category</button>

                </form>
            </div>
        </div>
    )
}

export default EditCategory