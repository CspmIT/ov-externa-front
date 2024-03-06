import React, { useEffect, useState } from "react";
import ButtonAnimate from "../ButtonAnimate";
import CardBasic from "../CardBasic";
import { LuDollarSign } from "react-icons/lu";
import { FaChartBar, FaChartPie, FaFileInvoiceDollar, FaPlus, FaQuestion, FaReceipt } from "react-icons/fa6";
import CardCustom from "../CardCustom";
import LoaderComponent from "../Loader";
import TableNew from "../TableNew";
import ButtonFloating from "../ButtonFloating";
import { Box, Modal } from "@mui/material";
import ModalHelpHome from "../ModalHelpHome";
import { FaExchangeAlt } from "react-icons/fa";
import styles from "../../components/CardBasic/Card.module.css";
import { useNavigate } from "react-router-dom";
import { InvoiceDeus, columns } from "../../utils/invoice";
function Dashboard_lvl2() {
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
        <>
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
                                navigate("/MyConsumption");
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

                <CardCustom className={"md:1/2 p-5 mt-10"}>
                    <div className="flex relative w-full">
                        <h3 className=" text-left mb-5">Facturas Impagas</h3>
                        <div className="absolute right-2 top-0">
                            {/* <div onClick={} className="float-right flex"> */}
                            <ButtonAnimate onClick={handleOpenModalHelp} icon={<FaQuestion className="text-white" />} text={"Ayuda"} bgIcon={"bg-gray-400"} color={"text-white"} />
                        </div>
                    </div>
                    {invoices.length < 1 ? (
                        <div className="flex w-full justify-center items-center">
                            <LoaderComponent />
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
                </CardCustom>
            </div>
            <Modal className="flex justify-center items-center" open={openModalHelp} onClose={handleCloseModalHelp} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
                <Box className={"w-full flex justify-center items-center"}>
                    <ModalHelpHome handleCloseModal={handleCloseModalHelp} />
                </Box>
            </Modal>
        </>
    );
}

export default Dashboard_lvl2;
