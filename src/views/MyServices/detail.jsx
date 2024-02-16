import { Link, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { FaCircle, FaBolt, FaArrowLeft } from "react-icons/fa";
import Card from '../../components/Card';
import ButtonAnimate from '../../components/ButtonAnimate';
import request from "../../routes/request";

const Detail = () => {
    const location = useLocation();
    const parametro = location.state?.parametro;
    const codSum = location.state?.codSum;
    const NameService = location.state?.NameService;
    const [datos, setRowsDatos] = useState('');
    useEffect(() => {
        const searchData = async () => {
            const data = { "cod_sum": codSum, "service": parametro };
            const url = `http://cooptech.com.ar:30888/api/getDetailService`;
            try {
                const responseData = await request(url, 'post', data);
                setRowsDatos(responseData);
            } catch (error) {
                console.error("Error en la solicitud:", error);
            }
        };
        searchData();
    }, [location]);
    
    return (
        <div>
            <h2 className='text-center m-5'>Servicio: {NameService}</h2>
            <h3 className='w-full text-left mb-5'>
                <div className='float-right'>
                    <Link to='/MyServices'>
                        <ButtonAnimate props={{ icon: <FaArrowLeft className='text-white' />, text: 'volver', bgIcon: 'bg-blue-400 mr-5', color: 'text-white' }} />
                    </Link>
                </div>
            </h3>
            <hr />
            <div className={`flex mt-2 mb-5 rounded-xl p-5 bg-gray-200 dark:bg-zinc-800`}>
                <span className='flex mr-3'><FaCircle className='text-green-500 mr-2' /> Servicio Activo</span>
                <span className='flex mr-3'><FaCircle className='text-yellow-500 mr-2' /> Servicio Pendiente de Conexión</span>
                <span className='flex mr-3'><FaCircle className='text-red-500 mr-2' /> Servicio Inactivo</span>
            </div>
            <div className='w-full flex flex-wrap'>
                <div className='w-full md:w-1/4 py-5'>
                    <Link to={{ pathname: '/detail', state: { param: 'valor_de_prueba' }}}>
                        <Card props={{ phone: '', title: <p className='text-center'> Dirección del domicilio 123 </p>, subtitle: ` Cuenta N°: 7545`, icon: <FaBolt className='float-start mr-2' />, color: 'text-green-600', bgIcon: 'bg-green-400', colorIcon: 'text-green-900', widht: 'w-auto', bg: 'bg-white', shadow: 'false', statusService: '0' }} />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Detail;
