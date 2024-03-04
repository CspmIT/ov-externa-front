import React, { useEffect, useState } from 'react';
import request from "../../routes/request";
import BarChart from '../../components/BarChart';
import BarChar from '../../components/BarChart';
import CardCustom from '../../components/CardCustom';
import LoaderComponent from '../../components/Loader';

const MyConsumption = () => {

    const [rows, setRows] = useState('');
    const [colorA, setcolorA] = useState('');
    const [colorE, setcolorE] = useState('');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const searchData = async () => {
            const socio = '58500';
            const url = `http://cooptech.com.ar:30888/api/getConsumo?id_procoop=${socio}`;
            try {
                const responseData = await request(url, 'get');
                setcolorA(responseData.electric.info.difConsumo < 0 ? "green" : "red");
                setcolorE(responseData.water.info.difConsumo < 0 ? "green" : "red");
                setRows(responseData);
            } catch (error) {
                console.error("Error en la solicitud:", error);
            } finally {
                setTimeout(function(){
                    setLoading(false);
                }, 1000);
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
    return (
        <div>
            <div className={`w-auto rounded-xl px-7`}>
                <h2 className='text-center m-5'>Mis Consumos</h2>
                <hr className='mb-5' />
                {loading ? (
                    <LoaderComponent />
                ) : (
                    <div>
                        <div className='flex w-full'>
                            <div onClick={() => dropModestatus('active')} className={`w-1/2 p-3 rounded-t-xl cursor-pointer text-center ${statusColorA}`}>Agua Potable</div>
                            <div onClick={() => dropModestatus('inactive')} className={`w-1/2 rounded-t-xl p-3 cursor-pointer text-center ${statusColorI}`}>Energía Eléctrica</div>
                        </div>
                        <div className={`w-full bg-gray-200 dark:bg-zinc-800 flex flex-wrap mb-5 px-24 py-5 justify-center ${statusModeI}`} style={{ boxShadow: `0px 0px 15px rgba(138, 138, 138, 0.43)` }}>
                            <div className={`flex mt-2 mb-3 rounded-xl p-5 bg-gray-100 dark:bg-zinc-800`}>
                                <p className="m-0 text-lg space-x-6">
                                    <b>Cuenta Nº:</b>
                                    {rows.electric.info.account} <b>Domicilio:</b> {rows.electric.info.addresse} <b>Medidor:</b> {rows.electric.info.NumMedidor}
                                </p>
                            </div>
                            <CardCustom className={`relative p-5 me-4 mb-5 rounded-xl flex flex-col items-center bg-${colorE}-200 border-${colorE}-400 border-solid border-2 `}>
                                <label className={`text-xl text-${colorE}-500`}>{rows.electric.info.difConsumo < 0 ? "FELICIDADES!" : "ATENCIÓN!"}</label>
                                <p className={`text-${colorE}-400`}>
                                    En Febrero de 2024 consumiste {Math.abs(rows.electric.info.difConsumo)}kW <b className={`text-${colorE}-500`}>{rows.electric.info.difConsumo < 0 ? "menos" : "mas"}</b> que en Febrero de 2023.
                                </p>
                            </CardCustom>
                            <BarChar title={"Consumo de Energía Eléctrica por mes"} nameSeria={"kW/h"} data={rows.electric} />
                        </div>
                        <div className={`w-full bg-gray-200 dark:bg-zinc-800 flex flex-wrap mb-5 px-24 py-5 justify-center ${statusModeA}`} style={{ boxShadow: `0px 0px 15px rgba(138, 138, 138, 0.43)` }}>
                            <div className={`flex mt-2 mb-3 rounded-xl p-5 bg-gray-100 dark:bg-zinc-800`}>
                                <p className="m-0 text-lg space-x-6">
                                    <b>Cuenta Nº:</b>
                                    {rows.water.info.account} <b>Domicilio:</b> {rows.water.info.addresse}<b>Medidor:</b> {rows.water.info.NumMedidor}
                                </p>
                            </div>
                            <CardCustom className={`relative p-5 me-4 mb-5 rounded-xl flex flex-col items-center bg-${colorA}-200 border-${colorA}-400 border-solid border-2 `}>
                                <label className={`text-xl text-${colorA}-500`}>{rows.water.info.difConsumo < 0 ? "FELICIDADES!" : "ATENCIÓN!"}</label>
                                <p className={`text-${colorA}-400`}>
                                    En Febrero de 2024 consumiste {Math.abs(rows.water.info.difConsumo)}m³ <b className={`text-${colorA}-500`}>{rows.water.info.difConsumo < 0 ? "menos" : "mas"}</b> que en Febrero de 2023.
                                </p>
                            </CardCustom>
                            <BarChar title={"Consumo de Agua Potable por mes"} nameSeria={"m³"} data={rows.water} />
                        </div>
             
                    </div>
                )}
            </div>
        </div>
    )
}

export default MyConsumption