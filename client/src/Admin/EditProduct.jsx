import React, { useEffect, useReducer, useState } from 'react'
import Nav from './Nav'
import { useLocation, useNavigate } from 'react-router-dom';
import axiosAPI from './axiosAPI';





const EditProduct = () => {
    const loc = useLocation();
    const { id, productName, price, quantity, discount, categoryId, description, imgUrl } = loc.state.product;
    const initialValues = {
        values: {
            id: id,
            productName: productName,
            price: price,
            quantity: quantity,
            discount: discount,
            categoryId: categoryId,
            description: description,
            imgUrl: imgUrl,
        },
        errors: {
            productName: '',
            price: '',
            categoryId: '',
        },
        isValid: true
    };

    function reducer(state, action) {
        switch (action.type) {
            case 'SET_VALUE':
                return {
                    ...state,
                    values: { ...state.values, [action.field]: action.value },
                    errors: { ...state.errors, [action.field]: '' },
                    isValid: false
                };
            case 'SET_ERROR':
                return {
                    ...state,
                    errors: { ...state.errors, [action.field]: action.error },
                    isValid: false
                };
            case 'VALIDATE':
                const errors = validate(state.values);
                if (Object.keys(errors).length === 0) {
                    return { ...state, isValid: true };
                } else {
                    return { ...state, errors, isValid: false };
                }
            default:
                return state;
        }
    }

    function validate(values) {
        const errors = {};
        if (!values.productName) {
            errors.productName = 'Product name is required';
        }
        if (!values.price) {
            errors.price = 'Price must be greater than 0';
        }
        if (!values.categoryId) {
            errors.categoryId = 'Category is required';
        }
        return errors;
    }
    const [state, dispatch] = useReducer(reducer, initialValues);
    const [categories, setCategories] = useState([])
    const nav = useNavigate();

    useEffect(() => {
        axiosAPI.get("categories/getAllCategories").then(response => {
            setCategories(response.data)
        }).catch(e => console.log(e))
    }, [])

    const categoriesOptions = categories?.map(x => {
        return (
            <option key={x.id} value={x.id}>{x.categoryName}</option>
        )
    })

    const handleChange = (event) => {
        dispatch({
            type: 'SET_VALUE',
            field: event.target.name,
            value: event.target.value
        });
    };

    const handleEditProduct = async () => {
        
        dispatch({ type: 'VALIDATE' });
        if (state.isValid) {
            await axiosAPI.put("products/editProduct", state.values).then(response => {
                const update = {
                    type: 'UPDATE',
                    name: state.values.productName
                }
                sessionStorage.setItem("success", JSON.stringify(update));
                nav(-1)
            }).catch(e => console.log(e));
        }

        
    }

    const handleAddImg = async (e) => {
        const img = e.target.files[0]
        const base64 = await converToBase64(img)
        dispatch({
            type: 'SET_VALUE',
            field: e.target.name,
            value: base64
        });
    }
    

    return (
        <>
            <h1 className='font-bold text-xl'>Edit Product</h1>
            <Nav list={["Products", "Edit Product"]} />
            <div className='flex flex-col lg:flex-row lg:w-[90%] lg:items-center lg:justify-center justify-between gap-5 '>
                <div className="flex items-center justify-center w-full lg:w-[60%] h-full">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-transparent dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        {state.values.imgUrl ? <img src={state.values.imgUrl} className='h-full w-full' alt="" /> :
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                        }
                        <input name='imgUrl' onChange={handleAddImg} id="dropzone-file" type="file" className="hidden" />
                    </label>
                </div>
                <form className='flex flex-col w-full justify-between text-sm gap-3' onSubmit={(e) => e.preventDefault()}>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="name" className='font-semibold'>Product Name</label>
                        <input type="text" value={state.values.productName} onChange={handleChange} name="productName" className='rounded bg-transparent border border-neutral-300 hover:border-neutral-400 px-3 py-2 focus:outline-none' placeholder='Product Name' />
                        {!state.isValid && <span className='text-red-400 text-sm'>{state.errors.productName}</span>}
                    </div>
                    <div className='flex flex-col lg:flex-row gap-3 items-start justify-between w-full'>
                        <div className='flex flex-col gap-2 w-full min-h-[80px]'>
                            <label htmlFor="category" className='font-semibold'>Category</label>
                            <select onChange={handleChange} name="categoryId" className='rounded cursor-pointer bg-transparent border border-neutral-300 hover:border-neutral-400 px-3 py-2 focus:outline-none'>
                                <option value="" defaultValue={""}>Select Category..</option>
                                {categoriesOptions}
                            </select>
                            {!state.isValid && <span className='text-red-400 text-sm'>{state.errors.categoryId}</span>}
                        </div>
                        <div className='flex flex-col gap-2 w-full min-h-[80px]'>
                            <label htmlFor="price" className='font-semibold'>Price</label>
                            <input onChange={handleChange} value={state.values.price} name="price" type="number" className='rounded bg-transparent border border-neutral-300 hover:border-neutral-400 px-3 py-2 focus:outline-none' placeholder='Price' />
                            {!state.isValid && <span className='text-red-400 text-[14px]'>{state.errors.price}</span>}
                        </div>
                    </div>
                    <div className='flex flex-col lg:flex-row gap-3 items-start justify-between w-full'>
                        <div className='flex flex-col gap-2 w-full min-h-[80px]'>
                            <label htmlFor="discount" className='font-semibold'>Discount %</label>
                            <input onChange={handleChange} name="discount" min={0} max={100} type="number" value={state.values.discount} className='rounded bg-transparent border border-neutral-300 hover:border-neutral-400 px-3 py-2 focus:outline-none' placeholder='Discount' />
                        </div>
                        <div className='flex flex-col gap-2 w-full min-h-[80px]'>
                            <label htmlFor="quantity" className='font-semibold'>Quantity</label>
                            <input onChange={handleChange} value={state.values.quantity} name="quantity" type="number" className='rounded bg-transparent border border-neutral-300 hover:border-neutral-400 px-3 py-2 focus:outline-none' placeholder='Quantity' />
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="description" className='font-semibold'>Description</label>
                        <textarea onChange={handleChange} value={state.values.description} name="description" className='rounded bg-transparent border border-neutral-300 hover:border-neutral-400 px-3 py-2 focus:outline-none resize-none' placeholder='Description Here...'  ></textarea>
                    </div>

                    <div className='flex gap-5'>
                        <button type='button' onClick={handleEditProduct} className='bg-primary text-center md:max-w-40 px-3 py-2 rounded uppercase hover:opacity-80'>Edit Product</button>
                        <button type='button' onClick={(e) => dispatch({ type: "SET_VALUE", field: 'imgUrl', value: '' })} className='bg-transparent border border-primary outline-primary text-center md:max-w-40 px-3 py-2 rounded uppercase hover:bg-primary'>Empty Image</button>
                    </div>
                </form>
            </div>
        </>
    )
}

function converToBase64(img) {
    if (img !== '') {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(img);
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (err) => {
                reject(err);
            }
        })
    }
    return img;
}

export default EditProduct