/* ----------------- ICONOS ----------------- */

import {
    FaAddressCard,
    FaCalendarCheck,
    FaInfoCircle,
    FaArrowAltCircleUp,
} from "react-icons/fa";

/* ----------------- ESTILOS ----------------- */

import styles from "../../components/CardBasic/Card.module.css";

/* ----------------- COMPONENTES ----------------- */
import CardCustom from "../CardCustom";
import CardBasic from "../CardBasic";
import Button from "../Button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { InvoiceDeus } from "../../utils/invoice";
function Dashboard_lvl1() {
    var level = JSON.parse(localStorage.getItem("usuario")).level;
    const [invoices, setInvoices] = useState([]);
    const [openModalHelp, setOpenModalHelp] = useState(false);
    const [amountpay, setAmountpay] = useState(0);
    const [amountTotalpay, setAmountTotalpay] = useState(0);
    const [statusModeA, setstatusModeA] = useState("");
    const [statusModeI, setstatusModeI] = useState("hidden");
    const [statusColorA, setstatusColorA] = useState(
        `dark:bg-zinc-800 bg-gray-200 `
    );
    const [statusColorI, setstatusColorI] = useState(
        `bg-white dark:bg-zinc-900`
    );
    const handleOpenModalHelp = () => setOpenModalHelp(true);
    const handleCloseModalHelp = () => setOpenModalHelp(false);
    const dropModestatus = (status) => {
        setstatusModeA(status == "active" ? "" : "hidden");
        setstatusModeI(status == "active" ? "hidden" : "");
        setstatusColorA(
            status == "active"
                ? `dark:bg-zinc-800 bg-gray-200`
                : `bg-white dark:bg-zinc-900`
        );
        setstatusColorI(
            status == "active"
                ? `bg-white dark:bg-zinc-900`
                : `dark:bg-zinc-800 bg-gray-200 `
        );
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
        <>
            <div
                className={`${styles.card} ${styles.shadowCards} bg-white dark:bg-zinc-700 w-full text-center`}
            >
                <p>
                    Hola <b>Julieta Soledad</b>, te damos la bienvenida a tu
                </p>
                <h2>Oficina Virtual</h2>
            </div>
            <div className="flex w-full flex-wrap">
                <div className="w-full md:w-1/2 lg:w-1/2">
                    <Link to={"/LevelUp2"}>
                        <CardCustom
                            className={`${styles.card} ${styles.cardHover} shadowCards dark:bg-zinc-700 dark:text-gray-300 w-auto`}
                        >
                            <div className={`${styles.cardImage} absolute`}>
                                <div
                                    className={`${styles.icon} bg-green-400 text-green-900`}
                                >
                                    <FaArrowAltCircleUp className="w-full" />
                                </div>
                            </div>
                            <div className={styles.cardContent}>
                                <div className={styles.cardTop}>
                                    <div className="w-full">
                                        Subir al <br />
                                        <span className={`text-green-500`}>
                                            Nivel 2
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </CardCustom>
                    </Link>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/2">
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
            </div>
            <div className={`w-full rounded-xl px-7 mt-10`}>
                <div className="flex w-full">
                    <div
                        onClick={() => dropModestatus("active")}
                        className={`w-1/2 p-3 rounded-t-xl cursor-pointer text-center ${statusColorA}`}
                    >
                        Nivel 1
                    </div>
                    <div
                        onClick={() => dropModestatus("inactive")}
                        className={`w-1/2 rounded-t-xl p-3 cursor-pointer text-center ${statusColorI}`}
                    >
                        Nivel 2
                    </div>
                </div>
                <div
                    className={`w-full bg-gray-200 text-xl leading-6 p-5 dark:bg-zinc-800 mb-5 justify-center ${statusModeA}`}
                    style={{
                        boxShadow: `0px 0px 15px rgba(138, 138, 138, 0.43)`,
                    }}
                >
                    <p>
                        Este Nivel es el punto de partida para comenzar a
                        Interactuar con tu Oficina Virtual.
                    </p>
                    <b>
                        <u>Beneficios: </u>
                    </b>
                    <ul className="mt-2">
                        <li> - Información Útil.</li>
                        <li> - Cargar o editar tu Currículum.</li>
                    </ul>
                    <p className="text-center mt-3">
                        Para poder tener más Beneficios te invitamos a Subir al
                        Nivel 2.
                    </p>
                </div>
                <div
                    className={`w-full bg-gray-200 text-xl leading-6 p-5 dark:bg-zinc-800 mb-5 justify-center ${statusModeI}`}
                    style={{
                        boxShadow: `0px 0px 15px rgba(138, 138, 138, 0.43)`,
                    }}
                >
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
                    <p className="text-center mt-3">
                        Para aprovechar todos estos Beneficios, Subí de Nivel
                        completando con tus Datos Personales.
                    </p>
                    <div className="w-full flex justify-center">
                        <Link to={"/LevelUp2"}>
                            <Button
                                props={{
                                    class: "text-black bg-yellow-400 hover:bg-white focus:bg-yellow-400 m-2",
                                    text: `Subir a Nivel 2`,
                                }}
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard_lvl1;
