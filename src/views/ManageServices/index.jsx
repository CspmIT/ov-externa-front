import React from 'react'
import Card from '../../components/Card';
import { IoTvSharp } from "react-icons/io5";
import { FaWifi } from "react-icons/fa";
import { Link } from 'react-router-dom';
import styles from '../../views/ManageServices/ManageServices.module.css'

import Button from '../../components/Button';

const ManageServices = () => {
    return (
        <div className='p-2 pb-10 sm:pl-64 overflow-y-auto h-full bg-gray-100 dark:bg-zinc-900 dark:text-gray-300 mb-10'>
            <h2 className="text-center m-5">Administrar Servicios</h2>
            <hr />
            <div className={`${styles.spanCards} flex flex-wrap justify-center h-1/3 items-center`}>
                <div className='w-full md:w-1/2 lg:w-1/4'>
                    <Card props={{ phone: '', subtitle: 'INTERNET', icon: <FaWifi className='w-full' />, color: 'text-blue-500', bgIcon: 'bg-blue-400', colorIcon: 'text-blue-900', bg: 'bg-white', positionBtn: 'absolute', widht: 'w-auto' }} />
                </div>
                <div className={`w-full md:w-1/2 lg:w-1/4`}>
                    <Card props={{ phone: '', subtitle: 'TELEVISION', icon: <IoTvSharp className='w-full' />, color: 'text-purple-500', bgIcon: 'bg-purple-300', colorIcon: 'text-purple-900', bg: 'bg-white', positionBtn: 'absolute', widht: 'w-auto' }} />
                </div>
            </div>
            <div className='w-full flex justify-center mt-5'>
                <Link to={'/Information'}>
                    <Button props={{ class: 'text-black bg-yellow-400 hover:bg-white focus:bg-yellow-400 m-2', text: `Ver Tutoriales Nivel 3` }} />
                </Link>
            </div>
            <div className={`${styles.spanCards} flex flex-wrap justify-center h-1/3 items-center`}>
                <p className='w-full text-center m-3'>Seleccioná tu cuenta del servicio de Televisión</p>
                <div className='w-full md:w-1/2 lg:w-1/4'>
                    <a><Card props={{ phone: '', title: <p className='text-center leading-6'> Cuenta N°: <b> 1657 </b> <br />  Dirección: <b> FLEMING 751 </b> </p>, icon: <FaWifi className='w-full' />, color: 'text-blue-500', bgIcon: 'bg-blue-400', colorIcon: 'text-blue-900', widht: 'w-auto', bg: 'bg-white', shadow: 'false' }} /></a>
                </div>
                <div className={`w-full md:w-1/2 lg:w-1/4`}>
                    <a><Card props={{ phone: '', title: <p className='text-center leading-6'> Cuenta N°: <b> 1657 </b> <br />  Dirección: <b> FLEMING 751 </b> </p>, icon: <IoTvSharp className='w-full' />, color: 'text-purple-500', bgIcon: 'bg-purple-300', colorIcon: 'text-purple-900', widht: 'w-auto', bg: 'bg-white', shadow: 'false' }} /></a>
                </div>
            </div>
        </div>
    )
}

export default ManageServices