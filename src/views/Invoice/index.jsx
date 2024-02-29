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

const Invoice = () => {
  const [invoice, setInvoices] = useState([]);


  useEffect(() => {
    const allInvoice = async () => {
      try {
        const data = await searchAllInvoice();
        setInvoices(data);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };
    allInvoice(); 
  }, []);


  return (
    <div className="flex w-full flex-wrap mt-10 justify-center rounded-xl pt-5 p-10 bg-white dark:bg-zinc-800">
      <h3 className="w-full text-left mb-5">
        Mis Facturas
        <div className="float-right">
          <ButtonAnimate props={{ icon: <FaQuestion className="text-white" />, text: "Ayuda", bgIcon: "bg-gray-400", color: "text-white" }} />
        </div>
      </h3>
      {invoice.length > 0 ? (
        <div className={`relative overflow-x-auto w-full round  rounded-xl`}>
          <TableNew data={invoice} columns={columns}  groupBy={"account"} />
        </div>
      ) : (
        <LoaderComponent />
      )}
    </div>
  );
};

export default Invoice;
