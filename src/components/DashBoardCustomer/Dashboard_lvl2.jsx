import React, { useEffect, useState } from "react";
import ButtonAnimate from "../ButtonAnimate";
import { LuDollarSign } from "react-icons/lu";
import { FaChartBar, FaFileInvoiceDollar, FaPlus, FaQuestion, FaReceipt } from "react-icons/fa6";
import CardCustom from "../CardCustom";
import LoaderComponent from "../Loader";
import TableNew from "../TableNew";
import ButtonFloating from "../ButtonFloating";
import { Box, Modal } from "@mui/material";
import ModalHelpHome from "../ModalHelpHome";
import { Link } from "react-router-dom";
import { InvoiceDeus, columns, columnsCel } from "../../utils/invoice";
import { FaExchangeAlt } from "react-icons/fa";
function Dashboard_lvl2() {
    const [invoices, setInvoices] = useState([]);
    const [columnsTable, setColumnsTable] = useState([]);
    const [openModalHelp, setOpenModalHelp] = useState(false);
    const [amountpay, setAmountpay] = useState(0);
    const [amountTotalpay, setAmountTotalpay] = useState(0);
    const handleOpenModalHelp = () => setOpenModalHelp(true);
    const handleCloseModalHelp = () => setOpenModalHelp(false);

    useEffect(() => {
        const invoiceList = async () => {
            try {
                const data = await InvoiceDeus();
                let dataTable = [];
                if (window.innerWidth < 768) {
                    dataTable = data.map((item) => ({
                        account: item.account,
                        info: { ...item },
                    }));
                    setColumnsTable(columnsCel)
                } else {
                    dataTable = data;
                    setColumnsTable(columns)
                }
                setInvoices(data);
            } catch (error) {
                console.log("Error al obtener datos:", error);
            }
        };
        invoiceList();
    }, [screen.width]);
    const handleAmountPay = (amount) => {
        setAmountpay(amount[0]);
        setAmountTotalpay(amount[1]);
    };
    return (
        <>
            <div className="w-full px-2 max-sm:px-0">
                <div className={`relative rounded-[2.5em] p-8 shadowCards bg-white dark:bg-zinc-700 w-full flex flex-wrap sm:hidden`}>
                    <img src="https://app.coopmorteros.coop/public/images/logos/Iso_OfiVirtual_Texto_Recortada.png" className="w-full" />
                    <div className="pt-4 w-3/4 mt-2">
                        <p className="mb-2">
                            NIVEL: <b>3</b>
                        </p>
                        <p className="mb-2">
                            N° de Socio: <b>58500</b>
                        </p>
                        <p className="mb-2">COSTAMAGNA FABIAN NESTOR</p>
                    </div>
                    <div className="pt-4 w-1/4">
                        <div className="m-1 justify-center flex">
                            <ButtonAnimate icon={<FaExchangeAlt className="text-white" />} text={"Socio"} bgIcon={"bg-emerald-600"} color={"text-white"} animation={"false"} />
                        </div>
                        <div className="mt-2 justify-center flex">
                            <ButtonAnimate icon={<FaPlus className="text-white" />} text={"Seleccionar Socio"} bgIcon={"bg-amber-300"} color={"text-white"} animation={"false"} />
                        </div>
                    </div>
                </div>
                <div className="flex  flex-wrap ">
                    <Link className="w-1/5 min-w-44 max-sm:w-full">
                        <CardCustom className={`relative rounded-[2.5em] m-2 max-sm:m-0 p-8 max-sm:mt-5 hover:scale-95 transition ease-in-out duration-300 flex items-center shadowCards dark:bg-zinc-700 dark:text-gray-300 max-sm:w-full`}>
                            <div className={`bg-red-400 text-red-900 text-xl absolute right-5 max-xl:right-2 max-sm:right-7 p-2 rounded-full`}>
                                <LuDollarSign className="w-full" />
                            </div>
                            <div className="flex flex-col w-full">
                                <p className="text-xl font-bold m-0 mb-1">SALDO</p>
                                <p className={`text-red-500 m-0`}>${amountTotalpay}</p>
                            </div>
                        </CardCustom>
                    </Link>
                    <Link to={"/Invoice"} className="w-1/5 min-w-44 max-sm:hidden">
                        <CardCustom className={`relative rounded-[2.5em] m-2 p-8 max-sm:mt-3 hover:scale-95 transition ease-in-out duration-300 flex items-center shadowCards dark:bg-zinc-700 dark:text-gray-300`}>
                            <div className={`absolute right-5 max-xl:right-2 p-2 rounded-full text-xl bg-yellow-400 text-yellow-900`}>
                                <FaFileInvoiceDollar className="w-full" />
                            </div>
                            <div className="flex flex-col w-full">
                                <p className="text-xl font-bold m-0 mb-1">Mis</p>
                                <p className={`text-yellow-500 m-0`}>FACTURAS</p>
                            </div>
                        </CardCustom>
                    </Link>
                    <Link to={"/Payments"} className="w-1/5 min-w-44 max-sm:hidden">
                        <CardCustom className={`relative rounded-[2.5em] m-2 p-8 max-sm:mt-3 hover:scale-95 transition ease-in-out duration-300 flex items-center shadowCards dark:bg-zinc-700 dark:text-gray-300`}>
                            <div className={`absolute right-5 max-xl:right-2 p-2 rounded-full text-xl bg-blue-400 text-blue-900`}>
                                <FaReceipt className="w-full" />
                            </div>
                            <div className="flex flex-col w-full">
                                <p className="text-xl font-bold m-0 mb-1">Mis</p>
                                <span className={`text-blue-500 m-0`}>PAGOS</span>
                            </div>
                        </CardCustom>
                    </Link>
                    <Link to={"/MyServices"} className="w-1/5 min-w-44 max-sm:hidden">
                        <CardCustom className={`relative rounded-[2.5em] m-2 p-8 max-sm:mt-3 hover:scale-95 transition ease-in-out duration-300 flex items-center shadowCards dark:bg-zinc-700 dark:text-gray-300`}>
                            <div className={`absolute right-5 max-xl:right-2 p-2 rounded-full text-xl bg-sky-400 text-sky-900`}>
                                <FaReceipt className="w-full" />
                            </div>
                            <div className="flex flex-col w-full">
                                <p className="text-xl font-bold m-0 mb-1">Mis</p>
                                <span className={`text-sky-500 m-0`}>SERVICIOS</span>
                            </div>
                        </CardCustom>
                    </Link>
                    <Link to={"/MyConsumption"} className="w-1/5 min-w-44 max-sm:hidden">
                        <CardCustom className={`relative rounded-[2.5em] m-2 p-8 max-sm:mt-3 hover:scale-95 transition ease-in-out duration-300 flex items-center shadowCards dark:bg-zinc-700 dark:text-gray-300`}>
                            <div className={`absolute right-5 max-xl:right-2 p-2 rounded-full text-xl bg-pink-400 text-pink-900`}>
                                <FaChartBar className="w-full" />
                            </div>
                            <div className="flex flex-col w-full">
                                <p className="text-xl font-bold m-0 mb-1">Mis</p>
                                <span className={`text-pink-500 m-0`}>CONSUMOS</span>
                            </div>
                        </CardCustom>
                    </Link>
                </div>

                <CardCustom className={"md:1/2 p-5 max-sm:p-2 max-sm:py-5 mt-10"}>
                    <div className="flex relative w-full">
                        <h3 className=" text-left mb-5">Facturas Impagas</h3>
                        <div className="absolute right-2 top-0">
                            <ButtonAnimate onClick={handleOpenModalHelp} icon={<FaQuestion className="text-white" />} text={"Ayuda"} bgIcon={"bg-gray-400"} color={"text-white"} />
                        </div>
                    </div>
                    {invoices.length < 1 ? (
                        <div className="flex w-full justify-center items-center">
                            <LoaderComponent />
                        </div>
                    ) : (
                        <div className={`relative overflow-x-auto w-full rounded-xl`}>
                            <TableNew data={invoices} columns={columnsTable} groupBy={"account"} checkbox={true} amountPay={handleAmountPay} />
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
