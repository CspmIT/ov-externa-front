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
import { Box, Modal } from "@mui/material";
import ModalHelpHome from "../../components/ModalHelpHome";
import CardCustom from "../../components/CardCustom";

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
        <div>
            <div className="flex relative w-full">
                <h2 className="text-center w-full m-5">Mis Facturas</h2>
                <div className="absolute right-5 top-5">
                    <ButtonAnimate onClick={handleOpenModalHelp} icon={<FaQuestion className="text-white" />} text={"Ayuda"} bgIcon={"bg-gray-400"} color={"text-white"} />
                </div>
            </div>
            <CardCustom className={"md:1/2 p-5 mt-5 mr-5"}>
                {invoice.length > 0 ? (
                    <div className={`relative overflow-x-auto w-full round  rounded-xl`}>
                        <TableNew data={invoice} columns={columns} groupBy={"account"} />
                    </div>
                ) : (
                    <LoaderComponent />
                )}
            </CardCustom>
            <Modal className="flex justify-center items-center" open={openModalHelp} onClose={handleCloseModalHelp} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
                <Box className={"w-full flex justify-center items-center"}>
                    <ModalHelpHome handleCloseModal={handleCloseModalHelp} />
                </Box>
            </Modal>
        </div>
    );
};

export default Invoice;
