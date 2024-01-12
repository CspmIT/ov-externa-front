import React from 'react'
import styles from './Card.module.css'
import { FaCircle } from "react-icons/fa";

const Card = ({ props }) => {
  return (
    <div className={`${styles.card} ${styles.cardHover} ${props.shadow == 'false' ? '' : styles.shadowCards} ${props.bg} dark:bg-zinc-700 dark:text-gray-300 ${props.phone != "" ? 'hidden sm:block' : ''} ${props.widht != "" ? props.widht : ''}`}>
      {props.statusService !== undefined && (
        <>
          <FaCircle className={`float-right mr-2 ${props.statusService == 0 ? 'text-green-500' : props.statusService == 1 ? 'text-red-500' : 'text-yellow-500'}`} />
        </>)} 
      <div className={`${styles.cardImage} ${props.positionBtn}`}>
        <div className={`${styles.icon} ${props.colorIcon} ${props.bgIcon}`} >
          {props.icon}
        </div>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.cardTop}>
          <p className='w-full'>{props.title} {props.title ? <br /> : ''} <span className={`${props.color}`}>{props.subtitle}</span></p>
        </div>
      </div>

    </div>
  )
}

export default Card