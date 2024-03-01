import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { FaCircle, FaBolt, FaArrowLeft } from "react-icons/fa";
import ButtonAnimate from "../../components/ButtonAnimate";
import LoaderComponent from "../../components/Loader";
import BarChar from "../../components/BarChart";
import { searchDetailService } from "../../utils/services";
import CardCustom from "../../components/CardCustom";
import { Bolt } from "@mui/icons-material";
const Detail = () => {
    const location = useLocation();
    const service = location.state?.parametro;
    const cod_sum = location.state?.codSum;
    const NameService = location.state?.NameService;
    const [datos, setDatos] = useState([]);
    const unusedVariable = `border-red-400 border-green-400 bg-red-200 bg-green-200`;
    const [consuption, setConsuption] = useState("");
    useEffect(() => {
        const DetailService = async () => {
            try {
                const body = { cod_sum, service };
                const data = await searchDetailService(body);
                const color = datos.difCosumo < 0 ? "red" : "green";
                setConsuption(color);
                setDatos(data);
            } catch (error) {
                console.error("Error al obtener datos:", error);
            }
        };
        DetailService();
    }, [consuption]);
    return (
        <CardCustom>
            {datos.length == 0 ? (
                <LoaderComponent />
            ) : (
                <>
                    <div className="flex flex-wrap p-6 w-full justify-center items-center">
                        <h2 className="text-center m-0">Servicio: {NameService}</h2>
                        <div className="absolute right-8">
                            <ButtonAnimate to="/MyServices" icon={<FaArrowLeft className="text-white text-xl" />} text={"volver"} bgIcon={"bg-blue-400 mr-5"} color={"text-white"} />
                        </div>
                    </div>

                    <div className={`flex mt-2 mb-3 rounded-xl p-5 bg-gray-200 dark:bg-zinc-800`}>
                        <p className="m-0 text-lg space-x-6">
                            <b>Cuenta Nº:</b>
                            {datos.generalData[0].account} <b>Domicilio:</b> {datos.generalData[0].address} <b>Titular:</b> {datos.generalData[0].nameCustomer}
                        </p>
                    </div>

                    <div className={`flex mt-2 mb-3 rounded-xl p-5 bg-gray-200 dark:bg-zinc-800`}>
                        <span className="flex mr-3">
                            <FaCircle className="text-green-500 mr-2" /> Servicio Activo
                        </span>
                        <span className="flex mr-3">
                            <FaCircle className="text-yellow-500 mr-2" /> Servicio Pendiente de Conexión
                        </span>
                        <span className="flex mr-3">
                            <FaCircle className="text-red-500 mr-2" /> Servicio Inactivo
                        </span>
                    </div>
                    <div className="w-full flex mt-5 flex-wrap">
                        <div className="w-1/4 px-6">
                            <CardCustom className={`relative p-5 me-4 mb-5 rounded-xl flex flex-col items-center bg-${consuption}-200 border-${consuption}-400 border-solid border-2 `}>
                                <label className={`text-xl text-${consuption}-500`}>{datos.difCosumo < 0 ? "ATENCIÓN!" : "FELICIDADES!"}</label>
                                <p className={`text-${consuption}-400`}>
                                    En Febrero de 2024 consumiste 192kW <b className={`text-${consuption}-500`}>{datos.difCosumo < 0 ? "mas" : "menos"}</b> que en Febrero de 2023.
                                </p>
                            </CardCustom>
                            <CardCustom className={"relative p-3 me-4 rounded-xl flex flex-col items-center bg-zinc-500  "}>
                                <FaCircle className={`absolute right-7 ${datos.generalData[0].status > 0 ? (datos.generalData[0].status > 1 ? "text-yellow-500" : "text-green-500") : "text-red-500"} mr-2`} />
                                <Bolt className="!text-7xl text-zinc-400 font-bold" />
                                <p className="mt-3 text-2xl font-semibold text-white text-center">{datos.generalData[0].titleService}</p>
                                <p className="mt-3 mb-0 text-lg  text-zinc-200 text-center">{datos.generalData[0].category}</p>
                                <p className=" text-lg text-zinc-200 text-center">{datos.generalData[0].detail}</p>
                            </CardCustom>
                        </div>
                        {datos.graficData ? (
                            <div className=" w-3/4 px-8  rounded-xl">
                                <BarChar title={"Consumo de Energía Eléctrica por mes"} nameSeria={"kW/h"} data={datos.graficData} />
                            </div>
                        ) : undefined}
                    </div>
                </>
            )}
        </CardCustom>
    );
};

export default Detail;
