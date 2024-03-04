import React from "react";
import { useEffect, useState } from "react";
{
    /* ----------------- ICONOS ----------------- */
}
import { FaQuestion } from "react-icons/fa";
{
    /* ----------------- COMPONENTES ----------------- */
}
import ButtonAnimate from "../../components/ButtonAnimate";
import TableNew from "../../components/TableNew";
import LoaderComponent from "../../components/Loader";
import { columns, searchAllInvoice } from "../../utils/invoice";
import { Modal } from "@mui/material";
import ModalHelpHome from "../../components/ModalHelpHome";

const Invoice = () => {
    const [invoice, setInvoices] = useState([]);
    const [openModalHelp, setOpenModalHelp] = useState(false);
    const handleOpenModalHelp = () => setOpenModalHelp(true);
    const handleCloseModalHelp = () => setOpenModalHelp(false);
    useEffect(() => {
        const allInvoice = async () => {
            try {
                const data = await searchAllInvoice();
                setInvoices(data);
            } catch (error) {
                console.error("Error al obtener datos:", error);
            }
        };
        allInvoice();
    }, []);

    return (
        <div className="flex w-full flex-wrap mt-10 justify-center rounded-xl pt-5 p-10 bg-white dark:bg-zinc-800">
            <div className="flex relative w-full">
                <h3 className=" text-left mb-5">Mis Facturas</h3>
                <div className="absolute right-2 top-0">
                    <ButtonAnimate onClick={handleOpenModalHelp} icon={<FaQuestion className="text-white" />} text={"Ayuda"} bgIcon={"bg-gray-400"} color={"text-white"} />
                </div>
            </div>
            {invoice.length > 0 ? (
                <div className={`relative overflow-x-auto w-full round  rounded-xl`}>
                    <TableNew data={invoice} columns={columns} groupBy={"account"} />
                </div>
            ) : (
                <LoaderComponent />
            )}
            <Modal className="flex justify-center items-center" open={openModalHelp} onClose={handleCloseModalHelp} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <ModalHelpHome handleCloseModal={handleCloseModalHelp} />
            </Modal>
        </div>
    );
};

export default Invoice;
