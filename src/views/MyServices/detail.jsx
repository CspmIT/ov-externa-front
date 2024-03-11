import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ButtonAnimate from "../../components/ButtonAnimate";
import { FaCircle, FaArrowLeft } from "react-icons/fa";
import LoaderComponent from "../../components/Loader";
import BarChar from "../../components/BarChart";
import { searchDetailService, setServiceInfo, statusDifService } from "../../utils/services";
import CardCustom from "../../components/CardCustom";
import { obtenerNombreDelMes } from "../../utils/dateFunction";
import SocialServiceDetail from "../../components/SocialServiceDetail";
import TabService from "../../components/TabService";
import CardServiceDetail from "../../components/CardServiceDetail";
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
    const [nameService, setNameService] = useState("");
    const navigate = useNavigate();
    const [mesInvoice, setMesInvoice] = useState([]);
    const [datosGral, setDatosGral] = useState(null);
    const [datosGraf, setDatosGraf] = useState(null);
    const [adherentes, setAdherentes] = useState(null);
    const [serviceTv, setServiceTv] = useState(null);
    const [difConsumo, setDifConsumo] = useState(null);
    const [colorsConsuption, setColorsConsuption] = useState(initialColors);
    const [unidad, setUnidad] = useState("");

    useEffect(() => {
        const DetailService = async () => {
            try {
                const body = { cod_sum, service };
                const data = await searchDetailService(body);
                if (data) {
                    setDatosGral(data?.generalData ? data.generalData : data);
                    setUnidad(service == 6 ? "m³" : "kW/h");
                    const serviceInfo = setServiceInfo(data[0]?.service ?? data.generalData[0].service);
                    console.log(serviceInfo)
                    setNameService(serviceInfo.title);
                    if (data.difCosumo || data.difCosumo === 0) {
                        setColorsConsuption(statusDifService(difConsumo));
                    }
                    if (data.graficData) {
                        setDatosGraf(data.graficData ? data.graficData : []);
                        const nameMonth = obtenerNombreDelMes(data.graficData.label.slice(-1)[0].split("/")[0]);
                        setMesInvoice(nameMonth);
                        setDifConsumo(data.difCosumo || data.difCosumo === 0 ? data.difCosumo : null);
                    }
                    if (data.adheridos) {
                        setAdherentes(data.adheridos);
                    }
                    if (data[0]?.service == "TV") {
                        setServiceTv(data);
                    }
                } else {
                    navigate("/MyServices");
                }
            } catch (error) {
                console.error("Error al obtener datos:", error);
                navigate("/MyServices");
            }
        };
        DetailService();
    }, [difConsumo]);
    return (
        <div className={"max-sm:p-2 max-sm:mr-0 pt-1 p-7 mr-5"}>
            {!datosGral ? (
                <LoaderComponent />
            ) : (
                <>
                    <div className="flex relative flex-wrap max-sm:p-0 p-6 w-full justify-center items-center">
                        <h2 className="text-center max-sm:text-start max-sm:w-3/4 max-sm:text-3xl mb-5 m-0">{nameService}</h2>
                        <div className="absolute max-sm:right-0 max-sm:top-0 right-8">
                            <ButtonAnimate to="/MyServices" icon={<FaArrowLeft className="text-white text-xl" />} text={"volver"} bgIcon={"bg-blue-400 mr-5"} color={"text-white"} />
                        </div>
                    </div>
                    <CardCustom className={"p-7 max-sm:p-2 dark:!bg-zinc-800"}>
                        <div className={`flex max-sm:flex-col mt-2 mb-3 rounded-xl p-5 bg-zinc-200 dark:bg-zinc-700`}>
                            <p className="m-0 sm:ml-3 text-lg space-x-6">
                                <b>Cuenta Nº:</b> {datosGral[0].account}
                            </p>
                            <p className="m-0 sm:ml-3 text-lg space-x-6">
                                <b>Domicilio:</b> {datosGral[0].address}
                            </p>
                            <p className="m-0 sm:ml-3 text-lg space-x-6">
                                <b>Titular:</b> {datosGral[0].nameCustomer}
                            </p>
                        </div>

                        <div className={`flex max-sm:flex-col mt-2 mb-3 rounded-xl p-5 bg-zinc-200 dark:bg-zinc-700`}>
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
                            <div className="w-1/3 max-sm:w-full px-6">
                                {difConsumo || difConsumo === 0 ? (
                                    <CardCustom className={`relative p-5 mb-5 rounded-xl flex flex-col items-center ${colorsConsuption.bgColorClass} ${colorsConsuption.borderColorClass} border-solid border-2 `}>
                                        <label className={`text-xl font-bold ${colorsConsuption.textTitleColor}`}>{colorsConsuption.attentionText}</label>
                                        <p className={`${colorsConsuption.textClass}`}>
                                            En {mesInvoice} de 2024 consumiste {difConsumo === 0 ? "" : `${parseFloat(difConsumo < 0 ? difConsumo * -1 : difConsumo).toFixed(2)} ${unidad}`} <b className={`${colorsConsuption.textTitleColor}`}>{colorsConsuption.comparacionText}</b> que en {mesInvoice} de 2023.
                                        </p>
                                    </CardCustom>
                                ) : null}
                                {!serviceTv ? <CardServiceDetail serviceItem={datosGral[0]} /> : null}
                            </div>
                            {serviceTv ? (
                                <div className="w-full">
                                    <TabService service={serviceTv} />
                                </div>
                            ) : null}
                            {datosGraf ? (
                                <div className=" w-2/3 max-sm:w-full max-sm:px-0 px-8 rounded-xl">
                                    <BarChar title={"Consumo de Energía Eléctrica por mes"} nameSeria={unidad} data={datosGraf} />
                                </div>
                            ) : null}
                        </div>
                    </CardCustom>
                    {adherentes ? <SocialServiceDetail adherentes={adherentes} /> : null}
                </>
            )}
        </div>
    );
};

export default Detail;
