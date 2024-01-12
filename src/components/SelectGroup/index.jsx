import React, { useState } from 'react'

const SelectGroup = ({ showPass, props }) => {
    const [value, setValue] = useState();
    return (
        <div className='mt-5'>
            {props.label && (
                <label className='block font-semibold ml-1 mb-2 dark:text-white'>{props.label}</label>
            )}
            <select name={props.name} className='block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'>
            <option value=''>Seleccionar...</option>
            {props.options.map((item, index) => (
                <option value={item.id}>{item.name}</option>
            ))}
            </select>
        </div>
    )
}

export default SelectGroup