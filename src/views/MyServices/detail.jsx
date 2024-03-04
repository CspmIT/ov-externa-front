import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { FaCircle, FaArrowLeft } from "react-icons/fa";
import ButtonAnimate from "../../components/ButtonAnimate";
import LoaderComponent from "../../components/Loader";
import BarChar from "../../components/BarChart";
import { searchDetailService } from "../../utils/services";
import CardCustom from "../../components/CardCustom";
import { Bolt } from "@mui/icons-material";
import { obtenerNombreDelMes } from "../../utils/dateFunction";
const Detail = () => {
    const initialColors = {
        bgColorClass: "",
        borderColorClass: "",
        textTitleColor: "",
        textClass: "",
        attentionText: "",
        comparacionText: "",
    };
    const location = useLocation();
    const service = location.state?.parametro;
    const cod_sum = location.state?.codSum;
    const NameService = location.state?.NameService;
    const [mesInvoice, setMesInvoice] = useState([]);
    const [datosGral, setDatosGral] = useState([]);
    const [datosGraf, setDatosGraf] = useState([]);
    const [difConsumo, setDifConsumo] = useState(null);
    const [colorsConsuption, setColorsConsuption] = useState(initialColors);
    const [unidad, setUnidad] = useState("");
    useEffect(() => {
        const DetailService = async () => {
            try {
                const body = { cod_sum, service };
                const data = await searchDetailService(body);
                setDatosGral(data.generalData ? data.generalData : data);
                setUnidad(service == 6 ? "L." : "kW/h");
                if (data.difCosumo  || data.difCosumo === 0 ) {
                    setColorsConsuption({
                        bgColorClass: difConsumo < 0 ? "!bg-red-200" : "!bg-green-100",
                        borderColorClass: difConsumo < 0 ? "border-red-400" : "border-green-400",
                        textTitleColor: difConsumo < 0 ? "text-red-500" : "text-green-500",
                        textClass: difConsumo < 0 ? "text-red-400" : "text-green-400",
                        attentionText: difConsumo < 0 ? "ATENCIÓN!" : "FELICIDADES!",
                        comparacionText: difConsumo < 0 ? "mas" : (difConsumo === 0 ? "igual ":"menos"),
                    });
                }
                if (data.graficData) {
                    setDatosGraf(data.graficData ? data.graficData : []);
                    const nameMonth = obtenerNombreDelMes(data.graficData.label.slice(-1)[0].split("/")[0]);
                    setMesInvoice(nameMonth);
                }
                setDifConsumo(data.difCosumo || data.difCosumo === 0 ? data.difCosumo : null);
            } catch (error) {
                console.error("Error al obtener datos:", error);
            }
        };
        DetailService();
    }, [difConsumo]);
    console.log(difConsumo)
    return (
        <div className={"pt-1 p-7 mr-5"}>
            {datosGral.length == 0 ? (
                <LoaderComponent />
            ) : (
                <>
                    <div className="flex relative flex-wrap p-6 w-full justify-center items-center">
                        <h2 className="text-center m-0">Servicio: {NameService}</h2>
                        <div className="absolute right-8">
                            <ButtonAnimate to="/MyServices" icon={<FaArrowLeft className="text-white text-xl" />} text={"volver"} bgIcon={"bg-blue-400 mr-5"} color={"text-white"} />
                        </div>
                    </div>
                    <CardCustom className={"p-7 mr-5"}>
                        <div className={`flex mt-2 mb-3 rounded-xl p-5 bg-gray-200 dark:bg-zinc-800`}>
                            <p className="m-0 text-lg space-x-6">
                                <b>Cuenta Nº:</b>
                                {datosGral[0].account} <b>Domicilio:</b> {datosGral[0].address} <b>Titular:</b> {datosGral[0].nameCustomer}
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
                            <div className="w-1/3 px-6">
                                {difConsumo || difConsumo === 0 ? (
                                    <CardCustom className={`relative p-5 me-4 mb-5 rounded-xl flex flex-col items-center ${colorsConsuption.bgColorClass} ${colorsConsuption.borderColorClass} border-solid border-2 `}>
                                        <label className={`text-xl font-bold ${colorsConsuption.textTitleColor}`}>{colorsConsuption.attentionText}</label>
                                        <p className={`${colorsConsuption.textClass}`}>
                                            En {mesInvoice} de 2024 consumiste {difConsumo === 0 ? "" : (`${parseFloat(difConsumo < 0 ? difConsumo * -1 : difConsumo).toFixed(2)} ${unidad}`)} <b className={`${colorsConsuption.textTitleColor}`}>{colorsConsuption.comparacionText}</b> que en {mesInvoice} de 2023.
                                        </p>
                                    </CardCustom>
                                ) : null}
                                <CardCustom className={"relative p-3 me-4 rounded-xl flex flex-col items-center bg-zinc-500  "}>
                                    <FaCircle className={`absolute right-7 ${datosGral[0].status > 0 ? (datosGral[0].status > 1 ? "text-yellow-500" : "text-green-500") : "text-red-500"} mr-2`} />
                                    <Bolt className="!text-7xl text-zinc-400 font-bold" />
                                    <p className="mt-3 text-2xl font-semibold text-white text-center">{datosGral[0].titleService}</p>
                                    <p className="mt-3 mb-0 text-lg  text-zinc-200 text-center">{datosGral[0].category}</p>
                                    <p className=" text-lg text-zinc-200 text-center">{datosGral[0].detail}</p>
                                </CardCustom>
                            </div>
                            {datosGraf.length != 0 ? (
                                <div className=" w-2/3 px-8  rounded-xl">
                                    <BarChar title={"Consumo de Energía Eléctrica por mes"} nameSeria={"kW/h"} data={datosGraf} />
                                </div>
                            ) : null}
                        </div>
                    </CardCustom>
                </>
            )}
        </div>
    );
};

export default Detail;
