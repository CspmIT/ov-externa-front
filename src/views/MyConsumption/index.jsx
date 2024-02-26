import React, { useEffect, useState } from 'react';
import request from "../../routes/request";
import BarChart from '../../components/BarChart';

const MyConsumption = () => {

    const [rows, setRows] = useState('');
    useEffect(() => {
        const searchData = async () => {
            const socio = '58500';
            const url = `http://cooptech.com.ar:30888/api/getConsumo?id_procoop=${socio}`;
            try {
                const responseData = await request(url, 'get');
                setRows(responseData);
            } catch (error) {
                console.error("Error en la solicitud:", error);
            }
        };
        searchData();
    }, []);

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

    console.log(rows);

    // const data = [3, 5, 2];
    // const labels = ['Bebidas', 'Indumentaria', 'Hogar'];

    return (
        <div>
            <div className={`w-auto rounded-xl px-7`}>
                <h2 className='text-center m-5'>Mis Consumos</h2>
                <hr />
                <div className='flex w-full'>
                    <div onClick={() => dropModestatus('active')} className={`w-1/2 p-3 rounded-t-xl cursor-pointer text-center ${statusColorA}`}>Energía Eléctrica</div>
                    <div onClick={() => dropModestatus('inactive')} className={`w-1/2 rounded-t-xl p-3 cursor-pointer text-center ${statusColorI}`}>Agua Potable</div>
                </div>
                <div className={`w-full bg-gray-200 dark:bg-zinc-800 flex flex-wrap mb-5 px-24 py-5 justify-center ${statusModeA}`} style={{ boxShadow: `0px 0px 15px rgba(138, 138, 138, 0.43)` }}>
                    {/* <BarChart data={data} labels={labels} /> */}
                    <BarChart data={rows.electric.data} labels={rows.electric.label} />
                </div>
                <div className={`w-full bg-gray-200 dark:bg-zinc-800 flex flex-wrap mb-5 px-24 py-5 justify-center ${statusModeI}`} style={{ boxShadow: `0px 0px 15px rgba(138, 138, 138, 0.43)` }}>
                    <BarChart data={rows.water.data} labels={rows.water.label} />
                    {/* <BarChart data={data} labels={labels} /> */}
                </div>
            </div>
        </div>
    )
}

export default MyConsumption