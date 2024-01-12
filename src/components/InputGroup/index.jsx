import React, { useState } from 'react'
import styles from './InpuGroup.module.css'

const InputGroup = ({ showPass, props }) => {
    const [value, setValue] = useState();
    return (
        <div className={`mt-5`}>
            {props.label && (
                <label className='block font-semibold ml-1 mb-2 dark:text-white'>{props.label}</label>
            )}
            <input name={props.name} type={props.type} placeholder={props.ph} className='block w-full dark:bg-zinc-700 dark:text-gray-200 rounded-md border-0 p-2.5 text-gray-900 shadow placeholder:text-gray-400 sm:text-sm sm:leading-6' />
            {showPass && (
                <button className={styles.iconeEye} onClick={showPass}>{props.btnIcon}</button>
            )}  
        </div>
    )
}

export default InputGroup