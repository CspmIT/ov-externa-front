import { FaBolt, FaCircle, FaPhone, FaTint, FaTv, FaUsers, FaWifi } from "react-icons/fa";
import CardCustom from "../CardCustom";
import { useEffect, useState } from "react";
function CardServiceDetail({ ...props }) {
    const [item, setItem] = useState(props.serviceItem);
    useEffect(() => {
        setItem(props.serviceItem);
    }, [props.serviceItem]);
    const icono = {
        ELECTRICIDAD: <FaBolt className="p-3 bg-green-500" />,
        AGUA: <FaTint className="p-3 bg-sky-500" />,
        TELEFONO: <FaPhone className="p-3 bg-blue-500" />,
        SEPELIO: <FaUsers className="p-3 bg-amber-500 " />,
        TV: <FaTv className="p-3 bg-purple-400 " />,
        SENSA: <FaTv className="p-3 bg-red-500 " />,
        INTERNET: <FaWifi className="p-3 bg-blue-500 " />,
        "BANCO DE SANGRE": <FaTint className="p-3 bg-red-500" />,
    };
    return (
        <CardCustom className={"relative mb-4 h-64 p-2 rounded-xl flex flex-col justify-center items-center !bg-zinc-500 dark:!bg-zinc-400"}>
            <FaCircle className={`absolute right-5 top-5 ${item.status > 0 ? (item.status > 1 ? "text-yellow-500" : "text-green-500") : "text-red-500"} mr-2`} />
            <div className="text-white !text-6xl  rounded-full overflow-hidden flex items-center justify-center">{icono[item.service]}</div>
            <p className="mt-6 text-2xl font-semibold text-white text-center">{item.titleService}</p>
            <p className="mt-3 mb-0 text-lg  text-zinc-200 text-center">{item.category}</p>
            <p className=" text-lg text-zinc-200 text-center">{item.detail}</p>
        </CardCustom>
    );
}

export default CardServiceDetail;
