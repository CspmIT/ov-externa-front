import React from 'react'
import { useEffect, useState } from "react";
import request from "../../routes/request";
{/* ----------------- ICONOS ----------------- */ }
import { FaQuestion } from "react-icons/fa";
{/* ----------------- ESTILOS ----------------- */ }
{/* ----------------- COMPONENTES ----------------- */ }
import ButtonAnimate from '../../components/ButtonAnimate'
import TableInvoice from '../../components/TableNew';

const Invoice = () => {

    const [invoice, setInvoice] = useState([]);

    useEffect(() => {
        const searchData = async () => {
            const socio = '58500';
            const url = `http://localhost:8000/api/allfacturas?id_procoop=${socio}`;
            // const url = `http://cooptech.com.ar:30888/api/allfacturas?id_procoop=${socio}`;
            try {
                const responseData = await request(url, 'get');
                const rows = [];
                for (const i in responseData) {
                  responseData[i].list.forEach((item) => {
                    rows.push({ ...item, account: responseData[i].data.account });
                  });
                }
                setInvoice(rows);
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
            <div className={`relative overflow-x-auto w-full round  rounded-xl`}>
                <TableInvoice data={invoice} groupBy={'account'} />    
            </div>
        </div>
    )
}

export default Invoice