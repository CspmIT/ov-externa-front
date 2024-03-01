import React from 'react'
import styles from './ButtonAnimate.module.css'
import { NavLink } from 'react-router-dom'

const ButtonAnimate = ({...props}) => {
    return (
        <NavLink to={props.to ?? ""} className={`${styles.BtnAnimate} ${props.bgIcon} ${props.animation ? '' : styles.HoverAnimate}`}>
            <span className={`${styles.sign}`}>
                {props.icon}
            </span>
            <span className={`${styles.text} ${props.color}`}>{props.text}</span>
        </NavLink>
    )
}

export default ButtonAnimate