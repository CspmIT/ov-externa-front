import React from 'react'
import { useState } from 'react'
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import Cardstyles from '../../components/Card/Card.module.css'
import Card from '../../components/Card';
import {useNavigate } from 'react-router-dom';

const DropdownServices = ({ props }) => {
    const [dropMode, setdropMode] = useState('hidden')
    const [iconMode, seticonMode] = useState(<IoMdArrowDropdown className='float-end text-gray-900 dark:text-gray-200' />)
    const dropModehidden = () => {
        setdropMode(dropMode == "hidden" ? "" : "hidden");
        seticonMode(dropMode == "hidden" ? <IoMdArrowDropup className='float-end text-gray-900  dark:text-gray-200' /> : <IoMdArrowDropdown className='float-end text-gray-900  dark:text-gray-200' />);
    }

    const [statusModeA, setstatusModeA] = useState('')
    const [statusModeI, setstatusModeI] = useState('hidden')
    const [statusColorA, setstatusColorA] = useState(`dark:bg-zinc-800 bg-gray-200 `)
    const [statusColorI, setstatusColorI] = useState(`bg-white dark:bg-zinc-900`)
    const dropModestatus = (status) => {
        setstatusModeA(status == "active" ? "" : "hidden");
        setstatusModeI(status == "active" ? "hidden" : "");
        setstatusColorA(status == "active" ? `dark:bg-zinc-800 bg-gray-200` : `bg-white dark:bg-zinc-900`);
        setstatusColorI(status == "active" ? `bg-white dark:bg-zinc-900` : `dark:bg-zinc-800 bg-gray-200 `);
    }


    const Inactive = Object.entries(props.accounts).filter(([item, index]) => index.status === 0);
    const Active = Object.entries(props.accounts).filter(([item, index]) => index.status !== 0);
    
    const navigate = useNavigate();
    const handleDetalleClick = (parametro, codSum, NameService) => {
        navigate("/detail", { state: { parametro, codSum, NameService }});
    };


    return (
        <div>
            <div onClick={() => dropModehidden()} className={`${Cardstyles.card} ${props.color} ${Cardstyles.hoverCardFijas} w-auto cursor-pointer mb-3 p-8 bg-white dark:bg-zinc-700`} style={{ boxShadow: `2px 2px 2px` }}>
                <h5> {props.icon} {props.title}
                    {iconMode}
                </h5>
            </div>
            <div className={`w-auto rounded-xl px-7 ${dropMode}`}>
                <div className='flex w-full'>
                    <div onClick={() => dropModestatus('active')} className={`w-1/2 p-3 rounded-t-xl cursor-pointer text-center ${statusColorA}`}>ACTIVOS</div>
                    <div onClick={() => dropModestatus('inactive')} className={`w-1/2 rounded-t-xl p-3 cursor-pointer text-center ${statusColorI}`}>INACTIVOS</div>
                </div>
                <div className={`w-full bg-gray-200 dark:bg-zinc-800 flex flex-wrap mb-5 justify-center ${statusModeA}`} style={{ boxShadow: `0px 0px 15px rgba(138, 138, 138, 0.43)` }}>
                    {Active.length > 0 ? (
                        Active.map(([item, index], rowIndex) => (
                            <div key={index.account} className='w-full md:w-1/4 py-5'>
                                <a onClick={() => handleDetalleClick(index.numService, index.account, props.title)}><Card props={{ phone: '', title: <p className='text-center'> {index.address} <br /> {index.detail ? index.detail : ''}  </p>, subtitle: ` Cuenta N°: ${index.account}`, icon: props.icon, color: props.color, bgIcon: props.bgIcon, colorIcon: props.colorIcon, widht: 'w-auto', bg: 'bg-white', shadow: 'false', statusService: index.status }} /></a>
                            </div>
                        ))
                    ) : (
                        <p className='mt-10'>No tienes Cuentas Activas</p>
                    )}
                </div>
                <div className={`w-full bg-gray-200 dark:bg-zinc-800 flex flex-wrap mb-5 justify-center ${statusModeI}`} style={{ boxShadow: `0px 0px 15px rgba(138, 138, 138, 0.43)` }}>
                    {Inactive.length > 0 ? (
                        Inactive.map(([item, index], rowIndex) => (
                            <div key={index.account} className='w-full md:w-1/4 py-5'>
                                <a onClick={() => handleDetalleClick(index.numService, index.account, props.title)}><Card props={{ phone: '', title: <p className='text-center'> {index.address} <br /> {index.detail ? index.detail : ''}  </p>, subtitle: ` Cuenta N°: ${index.account}`, icon: props.icon, color: props.color, bgIcon: props.bgIcon, colorIcon: props.colorIcon, widht: 'w-auto', bg: 'bg-white', shadow: 'false', statusService: index.status }} /></a>
                            </div>
                        ))
                    ) : (
                        <p className='mt-10'>No tienes Cuentas Inactivas</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default DropdownServices