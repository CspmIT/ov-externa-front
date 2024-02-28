import React from "react";
import { useEffect, useState } from "react";
import request from "../../routes/request";
{
  /* ----------------- ICONOS ----------------- */
}
import { FaCircle } from "react-icons/fa";
import { FaTint } from "react-icons/fa";
import { FaBolt } from "react-icons/fa";
import { IoTvSharp } from "react-icons/io5";
import { FaPhone } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaWifi } from "react-icons/fa";
{
  /* ----------------- COMPONENTES ----------------- */
}
import DropdownServices from "../../components/DropdownServices";
import axios from "axios";
import Swal from "sweetalert2";

const MyServices = () => {
  const [urlConsult, setUrlConsult] = useState("http://cooptech.com.ar:30888");
  if (import.meta.env.VITE_APP_ENTORNO == "local") {
    setUrlConsult(import.meta.env.VITE_APP_URL);
  }
  const [services, setRowsServices] = useState("");
  useEffect(() => {
    const searchData = async () => {
      const socio = "58500";
      const url = `${urlConsult}/api/getService?id_procoop=${socio}`;
      try {
        const response = await axios({
          method: "GET",
          url: url,
        });
        setRowsServices(response.data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          html: "Error al enviar la solicitud: " + error.message,
          title: "Atención!",
        });
        throw error;
      }
    };
    searchData();
  }, []);

  const setServiceInfo = (service) => {
    let icon, color, bgIcon, colorIcon, title;

    if (service === "AGUA") {
      title = "Agua Potable";
      icon = <FaTint className="float-start mr-2" />;
      color = "text-sky-600 dark:text-sky-400";
      bgIcon = "bg-sky-400";
      colorIcon = "text-sky-900";
    } else if (service === "ELECTRICIDAD") {
      title = "Energía Eléctrica";
      icon = <FaBolt className="float-start mr-2" />;
      color = "text-green-600 dark:text-green-400";
      bgIcon = "bg-green-400";
      colorIcon = "text-green-900";
    } else if (service === "INTERNET") {
      title = "Internet";
      icon = <FaWifi className="float-start mr-2" />;
      color = "text-blue-700 dark:text-blue-500";
      bgIcon = "bg-blue-600";
      colorIcon = "text-blue-950";
    } else if (service === "SENSA" || service === "BANCO DE SANGRE") {
      if (service === "SENSA") {
        title = "Sensa";
        icon = <IoTvSharp className="float-start mr-2" />;
      } else {
        title = "Banco de Sangre";
        icon = <FaTint className="float-start mr-2" />;
      }
      color = "text-red-500 dark:text-red-400";
      bgIcon = "bg-red-400";
      colorIcon = "text-red-900";
    } else if (service === "SEPELIO") {
      title = "Sepelio";
      icon = <FaUsers className="float-start mr-2" />;
      color = "text-amber-700 dark:text-amber-500";
      bgIcon = "bg-amber-600";
      colorIcon = "text-amber-900";
    } else if (service === "TELEFONO") {
      title = "Teléfono";
      icon = <FaPhone className="float-start mr-2" />;
      color = "text-blue-600 dark:text-blue-400";
      bgIcon = "bg-blue-400";
      colorIcon = "text-blue-900";
    } else if (service === "TV") {
      title = "Televisión";
      icon = <IoTvSharp className="float-start mr-2" />;
      color = "text-purple-600 dark:text-purple-400";
      bgIcon = "bg-purple-400";
      colorIcon = "text-purple-900";
    }
    return { icon, color, bgIcon, colorIcon, title };
  };

  return (
    <div className="">
      <h2 className="text-center m-5">Mis Servicios</h2>
      <hr />
      <div className={`flex mt-2 mb-5 rounded-xl p-5 bg-gray-200 dark:bg-zinc-800`}>
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
      {Object.entries(services).map(([service, serviceInfo], rowIndex) => {
        const { icon, color, bgIcon, colorIcon, title } = setServiceInfo(service);
        return <DropdownServices key={rowIndex} props={{ icon, title: title, color, bgIcon, colorIcon, accounts: serviceInfo }} />;
      })}
    </div>
  );
};

export default MyServices;
