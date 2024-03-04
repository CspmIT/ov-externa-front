import React, { useEffect } from "react";
import { useState } from "react";
/* ----------------- ICONOS ----------------- */

import { LuDollarSign } from "react-icons/lu";
import { FaChartPie, FaPlus } from "react-icons/fa6";
import { FaFileInvoiceDollar, FaReceipt, FaChartBar, FaQuestion, FaExchangeAlt, FaAddressCard, FaCalendarCheck, FaInfoCircle, FaArrowAltCircleUp } from "react-icons/fa";

/* ----------------- ESTILOS ----------------- */

import styles from "../../components/CardBasic/Card.module.css";

/* ----------------- COMPONENTES ----------------- */

import CardBasic from "../../components/CardBasic";
import ButtonAnimate from "../../components/ButtonAnimate";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import TableNew from "../../components/TableNew";
import ButtonFloating from "../../components/ButtonFloating";
import ModalHelpHome from "../../components/ModalHelpHome";
import { Modal } from "@mui/material";
import { columns, InvoiceDeus } from "../../utils/invoice";
import LoaderComponent from "../../components/Loader";
const Home = () => {
    var level = JSON.parse(localStorage.getItem("usuario")).level;
    const [invoices, setInvoices] = useState([]);
    const [openModalHelp, setOpenModalHelp] = useState(false);
    const [amountpay, setAmountpay] = useState(0);
    const [amountTotalpay, setAmountTotalpay] = useState(0);
    const [statusModeA, setstatusModeA] = useState("");
    const [statusModeI, setstatusModeI] = useState("hidden");
    const [statusColorA, setstatusColorA] = useState(`dark:bg-zinc-800 bg-gray-200 `);
    const [statusColorI, setstatusColorI] = useState(`bg-white dark:bg-zinc-900`);
    const handleOpenModalHelp = () => setOpenModalHelp(true);
    const handleCloseModalHelp = () => setOpenModalHelp(false);
    const dropModestatus = (status) => {
        setstatusModeA(status == "active" ? "" : "hidden");
        setstatusModeI(status == "active" ? "hidden" : "");
        setstatusColorA(status == "active" ? `dark:bg-zinc-800 bg-gray-200` : `bg-white dark:bg-zinc-900`);
        setstatusColorI(status == "active" ? `bg-white dark:bg-zinc-900` : `dark:bg-zinc-800 bg-gray-200 `);
    };
    const navigate = useNavigate();
    useEffect(() => {
        const invoiceList = async () => {
            try {
                const data = await InvoiceDeus();
                setInvoices(data);
            } catch (error) {
                console.error("Error al obtener datos:", error);
            }
        };

        invoiceList(); // Llama a la función asíncrona inmediatamente
    }, []);
    const handleAmountPay = (amount) => {
        setAmountpay(amount[0]);
        setAmountTotalpay(amount[1]);
    };

    return (
        <div className="flex flex-wrap w-full">
            {level == 1 ? (
                <>
                    <div className={`${styles.card} ${styles.shadowCards} bg-white dark:bg-zinc-700 w-full text-center`}>
                        <p>
                            Hola <b>Julieta Soledad</b>, te damos la bienvenida a tu
                        </p>
                        <h2>Oficina Virtual</h2>
                    </div>
                    <div className="flex w-full flex-wrap">
                        <div className="w-full md:w-1/2 lg:w-1/4">
                            <Link to={"/LevelUp2"}>
                                <CardBasic
                                    props={{
                                        phone: "",
                                        title: "Subir al",
                                        subtitle: "Nivel 2",
                                        icon: <FaArrowAltCircleUp className="w-full" />,
                                        color: "text-green-500",
                                        bgIcon: "bg-green-400",
                                        colorIcon: "text-green-900",
                                        bg: "bg-white",
                                        positionBtn: "absolute",
                                        widht: "w-auto",
                                    }}
                                />
                            </Link>{" "}
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/4">
                            <Link to={"/Information"}>
                                <CardBasic
                                    props={{
                                        phone: "hidden",
                                        title: "Información",
                                        subtitle: "Útil",
                                        icon: <FaInfoCircle className="w-full" />,
                                        color: "text-sky-500",
                                        bgIcon: "bg-sky-300",
                                        colorIcon: "text-sky-900",
                                        bg: "bg-white",
                                        positionBtn: "absolute",
                                        widht: "w-auto",
                                    }}
                                />
                            </Link>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/4">
                            <Link to={"/LevelUp2"}>
                                <CardBasic
                                    props={{
                                        phone: "hidden",
                                        title: "Mi",
                                        subtitle: "Curriculum",
                                        icon: <FaAddressCard className="w-full" />,
                                        color: "text-red-500",
                                        bgIcon: "bg-red-300",
                                        colorIcon: "text-res-900",
                                        bg: "bg-white",
                                        positionBtn: "absolute",
                                        widht: "w-auto",
                                    }}
                                />
                            </Link>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/4">
                            <Link to={"/LevelUp2"}>
                                <CardBasic
                                    props={{
                                        phone: "hidden",
                                        title: "Turnos",
                                        subtitle: "Online",
                                        icon: <FaCalendarCheck className="w-full" />,
                                        color: "text-blue-500",
                                        bgIcon: "bg-blue-300",
                                        colorIcon: "text-blue-900",
                                        bg: "bg-white",
                                        positionBtn: "absolute",
                                        widht: "w-auto",
                                    }}
                                />
                            </Link>
                        </div>
                    </div>
                    <div className={`w-full rounded-xl px-7 mt-10`}>
                        <div className="flex w-full">
                            <div onClick={() => dropModestatus("active")} className={`w-1/2 p-3 rounded-t-xl cursor-pointer text-center ${statusColorA}`}>
                                Nivel 1
                            </div>
                            <div onClick={() => dropModestatus("inactive")} className={`w-1/2 rounded-t-xl p-3 cursor-pointer text-center ${statusColorI}`}>
                                Nivel 2
                            </div>
                        </div>
                        <div className={`w-full bg-gray-200 text-xl leading-6 p-5 dark:bg-zinc-800 mb-5 justify-center ${statusModeA}`} style={{ boxShadow: `0px 0px 15px rgba(138, 138, 138, 0.43)` }}>
                            <p>Este Nivel es el punto de partida para comenzar a Interactuar con tu Oficina Virtual.</p>
                            <b>
                                <u>Beneficios: </u>
                            </b>
                            <ul className="mt-2">
                                <li> - Información Útil.</li>
                                <li> - Cargar o editar tu Currículum.</li>
                            </ul>
                            <p className="text-center mt-3">Para poder tener más Beneficios te invitamos a Subir al Nivel 2.</p>
                        </div>
                        <div className={`w-full bg-gray-200 text-xl leading-6 p-5 dark:bg-zinc-800 mb-5 justify-center ${statusModeI}`} style={{ boxShadow: `0px 0px 15px rgba(138, 138, 138, 0.43)` }}>
                            <b>
                                <u>Beneficios: </u>
                            </b>
                            <ul className="mt-2">
                                <li> - Información Útil.</li>
                                <li> - Cargar o editar tu Currículum.</li>
                                <li> - Descargar Facturas.</li>
                                <li>
                                    <b> - Realizar Pago de Servicios.</b>
                                </li>
                            </ul>
                            <p className="my-3">Además podés Consultar:</p>
                            <ul className="mt-2">
                                <li> - Historial y Estado de tus Trámites.</li>
                                <li> - Facturas Impagas.</li>
                                <li> - Historial de Facturas.</li>
                                <li> - Historial de Pagos.</li>
                                <li> - Servicios adquiridos y su Estado.</li>
                                <li> - Cuentas a tu cargo.</li>
                                <li>
                                    <b> - Saldo General.</b>
                                </li>
                            </ul>
                            <p className="text-center mt-3">Para aprovechar todos estos Beneficios, Subí de Nivel completando con tus Datos Personales.</p>
                            <div className="w-full flex justify-center">
                                <Link to={"/LevelUp2"}>
                                    <Button props={{ class: "text-black bg-yellow-400 hover:bg-white focus:bg-yellow-400 m-2", text: `Subir a Nivel 2` }} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="w-full pe-5">
                    <div className="flex w-full flex-wrap md:1/2">
                        <div className={`${styles.card} shadowCards bg-white dark:bg-zinc-700 w-full flex flex-wrap sm:hidden`}>
                            <img src="https://app.coopmorteros.coop/public/images/logos/Iso_OfiVirtual_Texto_Recortada.png" className="w-full" />
                            <div className="pt-4 w-3/4">
                                <p>
                                    NIVEL: <b>3</b>
                                </p>
                                <p>
                                    N° de Socio: <b>58500</b>
                                </p>
                                <p>COSTAMAGNA FABIAN NESTOR</p>
                            </div>
                            <div className="pt-4 w-1/4">
                                <div className="m-1 justify-center flex">
                                    <ButtonAnimate props={{ icon: <FaExchangeAlt className="text-white" />, text: "Socio", bgIcon: "bg-emerald-600", color: "text-white", animation: "false" }} />
                                </div>
                                <div className="m-1 justify-center flex">
                                    <ButtonAnimate props={{ icon: <FaPlus className="text-white" />, text: "Seleccionar Socio", bgIcon: "bg-amber-300", color: "text-white", animation: "false" }} />
                                </div>
                            </div>
                        </div>
                        <CardBasic
                            props={{
                                phone: "",
                                title: "SALDO",
                                subtitle: `$${amountTotalpay}`,
                                icon: <LuDollarSign className="w-full" />,
                                color: "text-red-500",
                                bgIcon: "bg-red-400",
                                colorIcon: "text-red-900",
                                bg: "bg-white",
                                positionBtn: "absolute",
                            }}
                        />
                        <CardBasic
                            props={{
                                onclick: () => {
                                    navigate("/Invoice");
                                },
                                phone: "hidden",
                                title: "Mis",
                                subtitle: "FACTURAS",
                                icon: <FaFileInvoiceDollar className="w-full" />,
                                color: "text-yellow-500",
                                bgIcon: "bg-yellow-300",
                                colorIcon: "text-yellow-900",
                                bg: "bg-white",
                                positionBtn: "absolute",
                            }}
                        />
                        <CardBasic
                            props={{
                                onclick: () => {
                                    navigate("/Payments");
                                },
                                phone: "hidden",
                                title: "Mis",
                                subtitle: "PAGOS",
                                icon: <FaReceipt className="w-full" />,
                                color: "text-blue-500",
                                bgIcon: "bg-blue-300",
                                colorIcon: "text-blue-900",
                                bg: "bg-white",
                                positionBtn: "absolute",
                            }}
                        />
                        <CardBasic
                            props={{
                                onclick: () => {
                                    navigate("/MyServices");
                                },
                                phone: "hidden",
                                title: "Mis",
                                subtitle: "SERVICIOS",
                                icon: <FaChartPie className="w-full" />,
                                color: "text-sky-500",
                                bgIcon: "bg-sky-300",
                                colorIcon: "text-sky-900",
                                bg: "bg-white",
                                positionBtn: "absolute",
                            }}
                        />
                        <CardBasic
                            props={{
                                onclick: () => {
                                    navigate("/MyServices");
                                },
                                phone: "hidden",
                                title: "Mis",
                                subtitle: "CONSUMOS",
                                icon: <FaChartBar className="w-full" />,
                                color: "text-pink-500",
                                bgIcon: "bg-pink-300",
                                colorIcon: "text-pink-900",
                                bg: "bg-white",
                                positionBtn: "absolute",
                            }}
                        />
                    </div>

                    <div className="flex w-full justify-between md:1/2 flex-wrap mt-10  rounded-xl p-10 bg-white dark:bg-zinc-700">
                        <div className="flex relative w-full">
                            <h3 className=" text-left mb-5">Facturas Impagas</h3>
                            <div className="absolute right-2 top-0">
                                {/* <div onClick={} className="float-right flex"> */}
                                <ButtonAnimate onClick={handleOpenModalHelp} icon={<FaQuestion className="text-white" />} text={"Ayuda"} bgIcon={"bg-gray-400"} color={"text-white"} />
                            </div>
                        </div>
                        {invoices.length < 1 ? (
                          <div className="flex w-full justify-center items-center">
                            <LoaderComponent/>
                          </div>
                        ) : (
                            <div className={`relative overflow-x-auto w-full rounded-xl`}>
                                <TableNew data={invoices} columns={columns} groupBy={"account"} checkbox={true} amountPay={handleAmountPay} />
                            </div>
                        )}
                        {amountpay > 0 ? (
                            <ButtonFloating>
                                <p className="p-0 m-0">Pagar</p>
                                <p className="p-0 m-0">$ {amountpay}</p>
                            </ButtonFloating>
                        ) : null}
                    </div>
                </div>
            )}
            <Modal className="flex justify-center items-center" open={openModalHelp} onClose={handleCloseModalHelp} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <ModalHelpHome handleCloseModal={handleCloseModalHelp} />
            </Modal>
        </div>
    );
};

export default Home;
