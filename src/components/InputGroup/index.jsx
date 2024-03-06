import React, { useState } from "react";
import styles from "./InpuGroup.module.css";

const InputGroup = ({ value, onChange, showPass, props, register}) => {
  return (
    <div className="mt-5">
      {props.label && <label className="block font-semibold ml-1 mb-2 dark:text-white">{props.label}</label>}
      <input
        {...register}
        disabled={props.disabled == 'disabled' ? props.disabled : ''}
        value={value}
        onChange={onChange}
        name={props.name}
        type={props.type}
        placeholder={props.ph}
        className="block w-full rounded-md border-0 p-1.5 text-gray-900 dark:bg-zinc-800 dark:text-gray-200 shadow-sm ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"
      />
      {showPass && (
        <button type="button" className={styles.iconeEye} onClick={showPass}>
          {props.btnIcon}
        </button>
      )}
    </div>
  );
};

export default InputGroup;
