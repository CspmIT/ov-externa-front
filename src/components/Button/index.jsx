import React from 'react';

const Button = ({ type, props }) => {
  return (
    <button type={type} className={`${props.class} py-2.5 px-4 font-semibold AeromaticsRegular rounded-xl shadow-md`}>
      {props.text}
    </button>
  );
};

export default Button;