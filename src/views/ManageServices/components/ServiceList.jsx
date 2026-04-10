import React from 'react';
import ButtonAnimate from '../../../components/ButtonAnimate';
import { FaArrowLeft } from 'react-icons/fa6';
import CardCustom from '../../../components/CardCustom';
import { FaWifi } from 'react-icons/fa';
import { IoTvSharp } from 'react-icons/io5';
import { accounts } from '../utils/object'

const ServiceList = ({ type, onBack, onClick }) => {
    return (
        <div>
            <h2 className="m-5">Administrar Servicios</h2>
            <div className='absolute right-6 top-20'>
                <ButtonAnimate onClick={onBack} icon={<FaArrowLeft className='text-white' />} text={'volver'} bgIcon={'bg-blue-400'} color={'text-white'} />
            </div>
            <hr />
            <p className='w-full text-center m-3'>Seleccioná tu cuenta del servicio de {type == 'INT' ? 'Internet' : 'Television'}</p>
            <div className="flex flex-wrap justify-center mt-10">
                {accounts.map((item, key) => (
                    <div key={key} className='w-full md:w-1/2 lg:w-1/4' onClick={onClick}>
                        <CardCustom
                            className={`relative cursor-pointer rounded-[2.5em] m-2 max-md:m-0 p-8 max-md:mt-5 hover:scale-95 transition ease-in-out duration-300 flex flex-wrap items-center shadowCards dark:bg-zinc-700 dark:text-gray-300 max-md:w-full`}
                        >
                            <div className='w-full flex justify-center mb-3'>
                                <div className={`${type == 'INT' ? 'bg-blue-400' : 'bg-purple-400'} ${type == 'INT' ? 'text-blue-900' : 'text-purple-900'} text-xl p-2 rounded-full`}>
                                    {type == 'INT' ? (
                                        <FaWifi />
                                    ) : (
                                        <IoTvSharp />
                                    )}
                                </div>
                            </div>
                            <div className='flex flex-col w-full'>
                                <p className='text-center leading-6'> Cuenta N°: <b> {item.account}</b> <br />  Dirección: <b> {item.address} </b> </p>
                            </div>
                        </CardCustom>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default ServiceList;
