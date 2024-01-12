import React from 'react'
import { useState } from 'react'
import Swal from 'sweetalert2';
{/* ----------------- ICONOS ----------------- */}
import { FaRegLightbulb } from "react-icons/fa";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import { GiWashingMachine } from "react-icons/gi";
import { MdBlender } from "react-icons/md";
import { TbAirConditioning } from "react-icons/tb";
import { MdComputer } from "react-icons/md";
import { FaFaucetDrip } from "react-icons/fa6";
import { FaSoap } from "react-icons/fa";
{/* ----------------- COMPONENTES ----------------- */}
import Card from '../../components/Card';

const ConsumptionSimulator = () => {
    const detailCuenta = () => {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
        });
    }
    var number = 0;
    var numberE = 0;
    return (
        <div className='p-2 sm:pl-64 overflow-y-auto h-full bg-gray-100 dark:bg-zinc-900 dark:text-gray-300 pb-16'>
            <h2 className='text-center m-5'>Simulador de Consumo</h2>
            <hr className='mb-5' />
            <p>Te presentamos una nueva función para que puedas calcular un estimativo del consumo eléctrico.
                Para utilizarla, seleccioná dentro de cada categoría los electrodomésticos que utilizás, indicando cantidad y horas de uso diario. Luego podrás observar una barra que te mostrará tu consumo estimado según tus elecciones. </p>
            <div className={`w-full flex flex-wrap justify-center`}>
                <div onClick={() => detailCuenta()} className='w-full md:w-1/4'>
                    <Card  props={{ phone: '', title: <p>{number} kWh <br /> {numberE} Electrodomésticos</p>, subtitle: 'ILUMINACIÓN', icon: <FaRegLightbulb className='w-full' />, color: 'text-yellow-500', bgIcon: 'bg-yellow-400', colorIcon: 'text-yellow-900', widht: 'w-auto', bg: 'bg-white', positionBtn: 'absolute' }} />
                </div>
                <div onClick={() => detailCuenta()} className='w-full md:w-1/4'>
                    <Card props={{ phone: '', title: <p>{number} kWh <br /> {numberE} Electrodomésticos</p>, subtitle: 'REFRIGERACIÓN', icon: <CgSmartHomeRefrigerator className='w-full' />, color: 'text-yellow-500', bgIcon: 'bg-yellow-400', colorIcon: 'text-yellow-900', widht: 'w-auto', bg: 'bg-white', positionBtn: 'absolute' }} />
                </div>
                <div onClick={() => detailCuenta()} className='w-full md:w-1/4'>
                    <Card props={{ phone: '', title: <p>{number} kWh <br /> {numberE} Electrodomésticos</p>, subtitle: 'LINEA BLANCA', icon: <GiWashingMachine className='w-full' />, color: 'text-yellow-500', bgIcon: 'bg-yellow-400', colorIcon: 'text-yellow-900', widht: 'w-auto', bg: 'bg-white', positionBtn: 'absolute' }} />
                </div>
                <div onClick={() => detailCuenta()} className='w-full md:w-1/4'>
                    <Card props={{ phone: '', title: <p>{number} kWh <br /> {numberE} Electrodomésticos</p>, subtitle: 'COCINA', icon: <MdBlender className='w-full' />, color: 'text-yellow-500', bgIcon: 'bg-yellow-400', colorIcon: 'text-yellow-900', widht: 'w-auto', bg: 'bg-white', positionBtn: 'absolute' }} />
                </div>
                <div onClick={() => detailCuenta()} className='w-full md:w-1/4'>
                    <Card props={{ phone: '', title: <p>{number} kWh <br /> {numberE} Electrodomésticos</p>, subtitle: 'CLIMATIZACIÓN', icon: <TbAirConditioning className='w-full' />, color: 'text-yellow-500', bgIcon: 'bg-yellow-400', colorIcon: 'text-yellow-900', widht: 'w-auto', bg: 'bg-white', positionBtn: 'absolute' }} />
                </div>
                <div onClick={() => detailCuenta()} className='w-full md:w-1/4'>
                    <Card props={{ phone: '', title: <p>{number} kWh <br /> {numberE} Electrodomésticos</p>, subtitle: 'TECNOLOGÍA', icon: <MdComputer className='w-full' />, color: 'text-yellow-500', bgIcon: 'bg-yellow-400', colorIcon: 'text-yellow-900', widht: 'w-auto', bg: 'bg-white', positionBtn: 'absolute' }} />
                </div>
                <div onClick={() => detailCuenta()} className='w-full md:w-1/4'>
                    <Card props={{ phone: '', title: <p>{number} kWh <br /> {numberE} Electrodomésticos</p>, subtitle: 'CUIDADO PERSONAL', icon: <FaSoap className='w-full' />, color: 'text-yellow-500', bgIcon: 'bg-yellow-400', colorIcon: 'text-yellow-900', widht: 'w-auto', bg: 'bg-white', positionBtn: 'absolute' }} />
                </div>
                <div onClick={() => detailCuenta()} className='w-full md:w-1/4'>
                    <Card props={{ phone: '', title: <p>{number} kWh <br /> {numberE} Electrodomésticos</p>, subtitle: 'AGUA', icon: <FaFaucetDrip className='w-full' />, color: 'text-yellow-500', bgIcon: 'bg-yellow-400', colorIcon: 'text-yellow-900', widht: 'w-auto', bg: 'bg-white', positionBtn: 'absolute' }} />
                </div>
            </div>
        </div>
    )
}

export default ConsumptionSimulator 