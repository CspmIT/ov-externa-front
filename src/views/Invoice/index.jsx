import React from 'react'
import { useEffect, useState } from "react";
import request from "../../routes/request";
{/* ----------------- ICONOS ----------------- */ }
import { FaQuestion } from "react-icons/fa";
{/* ----------------- ESTILOS ----------------- */ }
{/* ----------------- COMPONENTES ----------------- */ }
import ButtonAnimate from '../../components/ButtonAnimate'
import Tables from "../../components/Tables";

const Invoice = () => {

    const [factures, setRows] = useState([]);

    useEffect(() => {
        const searchData = async () => {
            const socio = '58500';
            const url = `http://cooptech.com.ar:30888/api/allfacturas?id_procoop=${socio}`;
            try {
                const responseData = await request(url, 'get');
                setRows(responseData);
            } catch (error) {
                console.error("Error en la solicitud:", error);
            }
        };
        searchData();
    }, []);


    return (
        <div className='flex w-full flex-wrap mt-10 justify-center rounded-xl pt-5 p-10 bg-white dark:bg-zinc-800'>
            <h3 className='w-full text-left mb-5'>Mis Facturas
                <div className='float-right'>
                    <ButtonAnimate props={{ icon: <FaQuestion className='text-white' />, text: 'Ayuda', bgIcon: 'bg-gray-400', color: 'text-white' }} />
                </div>
            </h3>
            <div className={`relative overflow-x-auto w-full round shadowCards rounded-xl`}>
                <Tables columns={['Tipo', 'Factura', 'Período', 'Vencimiento', 'importe', '!', '']} rows={factures} showCheckboxes={false} />
            </div>
        </div>
    )
}

export default Invoice