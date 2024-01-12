import React from 'react'
import { useState } from 'react'
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import Cardstyles from '../../components/Card/Card.module.css'
import Card from '../../components/Card';
import { Link } from "react-router-dom";

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
                    {props.accounts.map((item, index) => (
                        item.statusService !== 1 && (
                            <div key={item.account} className='w-full md:w-1/4 py-5'>
                                <a><Card props={{ phone: '', title: <p className='text-center'> {item.address} <br /> {item.service ? item.service : ''}  </p>, subtitle: ` Cuenta N°: ${item.account}`, icon: props.icon, color: props.color, bgIcon: props.bgIcon, colorIcon: props.colorIcon, widht: 'w-auto', bg: 'bg-white', shadow: 'false', statusService: item.statusService }} /></a>
                            </div>
                        )
                    ))}
                </div>
                <div className={`w-full bg-gray-200 dark:bg-zinc-800 flex flex-wrap mb-5 justify-center ${statusModeI}`} style={{ boxShadow: `0px 0px 15px rgba(138, 138, 138, 0.43)` }}>
                    {props.accounts.map((item, index) => (
                        item.statusService === 1 && (
                            <div key={item.account} className='w-full md:w-1/4 py-5'>
                                <Link to='/detail'>
                                    <a><Card props={{ phone: '', title: <p className='text-center'> {item.address} <br /> {item.service ? item.service : ''}  </p>, subtitle: ` Cuenta N°: ${item.account}`, icon: props.icon, color: props.color, bgIcon: props.bgIcon, colorIcon: props.colorIcon, widht: 'w-auto', bg: 'bg-white', shadow: 'false', statusService: item.statusService }} /></a>
                                </Link>
                            </div>
                        )
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DropdownServices