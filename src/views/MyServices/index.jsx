import { useEffect, useState } from "react";
{
    /* ----------------- ICONOS ----------------- */
}
import { FaCircle } from "react-icons/fa";
{
    /* ----------------- COMPONENTES ----------------- */
}
import DropdownServices from "../../components/DropdownServices";
import axios from "axios";
import Swal from "sweetalert2";
import { setServiceInfo } from "../../utils/services";

const MyServices = () => {
    const [services, setRowsServices] = useState("");
    useEffect(() => {
        const searchData = async () => {
            const socio = "51010";
            const url = `http://cooptech.com.ar:30888/api/getService?id_procoop=${socio}`;
            try {
                const response = await axios({
                    method: "GET",
                    url: url,
                });
                let newData = [];
                for (let service in response.data) {
                    for (let key in response.data[service]) {
                        let obj = response.data[service][key];
                        obj.service = service; 
                        if (!newData[service]) {
                            newData[service] = []; 
                        }
                        newData[service].push(obj);
                    }
                }
                setRowsServices(newData);
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


    return (
        <>
            <h2 className="text-center m-5">Mis Servicios</h2>
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
        </>
    );
};

export default MyServices;
