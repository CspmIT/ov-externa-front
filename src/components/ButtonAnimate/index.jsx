import React from 'react'
import styles from './ButtonAnimate.module.css'

const ButtonAnimate = ({props}) => {
    return (
        <button className={`${styles.BtnAnimate} ${props.bgIcon} ${props.animation ? '' : styles.HoverAnimate}`}>
            <div className={`${styles.sign}`}>
                {props.icon}
            </div>
            <div className={`${styles.text} ${props.color}`}>{props.text}</div>
        </button>
    )
}

export default ButtonAnimate