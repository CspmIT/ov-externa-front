import React from 'react'
{/* ----------------- ICONOS ----------------- */}
import { FaCircle } from "react-icons/fa";
import { FaTint } from "react-icons/fa";
import { FaBolt } from "react-icons/fa";
import { IoTvSharp } from "react-icons/io5";
import { FaPhone } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaWifi } from "react-icons/fa";
{/* ----------------- COMPONENTES ----------------- */}
import DropdownServices from '../../components/DropdownServices';

const MyServices = () => {
    const accountsAgua = [{ account: "458", statusService: 2, address: 'FLEMING (AL NORTE BV.25 DE MAYO) 751 ', service: 'Medidor: n° 8006112' }, { account: "8954", statusService: 0, address: 'FLEMING (AL NORTE BV.25 DE MAYO) 751 ', service: 'Medidor: n° 8006112' },
    { account: "7895", statusService: 2, address: 'FLEMING (AL NORTE BV.25 DE MAYO) 751 ', service: 'Medidor: n° 8006112' }, { account: "2231", statusService: 1, address: 'FLEMING (AL NORTE BV.25 DE MAYO) 751 ', service: 'Medidor: n° 8006112' }
    ]
    const accountsEnergia = [{ account: "333", statusService: 1, address: 'FLEMING (AL NORTE BV.25 DE MAYO) 751 ', service: 'Medidor: n° 8006112' }, { account: "8956", statusService: 0, address: 'FLEMING (AL NORTE BV.25 DE MAYO) 751 ', service: 'Medidor: n° 8006112' },
    { account: "9965", statusService: 0, address: 'FLEMING (AL NORTE BV.25 DE MAYO) 751 ', service: 'Medidor: n° 8006112' }, { account: "7410", statusService: 0, address: 'FLEMING (AL NORTE BV.25 DE MAYO) 751 ', service: 'Medidor: n° 8006112' }
    ]
    const accountsTv = [{ account: "333", statusService: 1, address: 'FLEMING (AL NORTE BV.25 DE MAYO) 751 ' }, { account: "8956", statusService: 0, address: 'FLEMING (AL NORTE BV.25 DE MAYO) 751 ' },
    { account: "9965", statusService: 2, address: 'FLEMING (AL NORTE BV.25 DE MAYO) 751 '}, { account: "7410", statusService: 0, address: 'FLEMING (AL NORTE BV.25 DE MAYO) 751 ' }
    ]
    const accountsSS = [{ account: "333", statusService: 1, address: 'FLEMING (AL NORTE BV.25 DE MAYO) 751 ', service: 'Servicio de Banco de Sangre' }, { account: "8956", statusService: 0, address: 'FLEMING (AL NORTE BV.25 DE MAYO) 751 ', service: 'Servicio de Sepelio' }
    ]
    return (
        <div className='p-2 sm:pl-64 overflow-y-auto noScrollbar h-full bg-gray-100 dark:bg-zinc-900 dark:text-gray-300 pb-28'>
            <h2 className='text-center m-5'>Mis Servicios</h2>
            <hr />
            <div className={`flex mt-2 mb-5 rounded-xl p-5 bg-gray-200 dark:bg-zinc-800`}>
                <span className='flex mr-3'><FaCircle className='text-green-500 mr-2' /> Servicio Activo</span>
                <span className='flex mr-3'><FaCircle className='text-yellow-500 mr-2' /> Servicio Pendiente de Conexión</span>
                <span className='flex mr-3'><FaCircle className='text-red-500 mr-2' /> Servicio Inactivo</span>
            </div>
            <DropdownServices props={{ icon: <FaTint className='float-start mr-2' />, title: 'Agua Potable', color: 'text-sky-600 dark:text-sky-400', bgIcon: 'bg-sky-400', colorIcon: 'text-sky-900', accounts: accountsAgua}} />
            <DropdownServices props={{ icon: <FaBolt className='float-start mr-2' />, title: 'Energía Eléctrica', color: 'text-green-600 dark:text-green-400', bgIcon: 'bg-green-400', colorIcon: 'text-green-900', accounts: accountsEnergia}} />
            <DropdownServices props={{ icon: <FaWifi   className='float-start mr-2' />, title: 'Internet', color: 'text-blue-700 dark:text-blue-500', bgIcon: 'bg-blue-600', colorIcon: 'text-blue-950', accounts: accountsTv}} />
            <DropdownServices props={{ icon: <IoTvSharp  className='float-start mr-2' />, title: 'Televisión', color: 'text-purple-600 dark:text-purple-400', bgIcon: 'bg-purple-400', colorIcon: 'text-purple-900', accounts: accountsTv}} />
            <DropdownServices props={{ icon: <FaPhone   className='float-start mr-2' />, title: 'Telefonía', color: 'text-blue-600 dark:text-blue-400', bgIcon: 'bg-blue-400', colorIcon: 'text-blue-900', accounts: accountsTv}} />
            <DropdownServices props={{ icon: <FaUsers  className='float-start mr-2' />, title: 'Servicios Sociales', color: 'text-amber-700 dark:text-amber-500', bgIcon: 'bg-amber-600', colorIcon: 'text-amber-900', accounts: accountsSS}} />
        </div>
    )
}

export default MyServices