import React, { useState } from 'react'
import styles from './InpuGroup.module.css'

const InputGroup = ({ showPass, props }) => {
    const [value, setValue] = useState();
    return (
        <div className='mt-5'>
            {props.label && (
                <label className='block font-semibold ml-1 mb-2 dark:text-white'>{props.label}</label>
            )}
            <input name={props.name} type={props.type} placeholder={props.ph} className='block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' />
            {showPass && (
                <button className={styles.iconeEye} onClick={showPass}>{props.btnIcon}</button>
            )}  
        </div>
    )
}

export default InputGroup