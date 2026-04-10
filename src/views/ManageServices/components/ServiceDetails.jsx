import CardCustom from '../../../components/CardCustom';
import { FaDownload, FaUpload, FaWifi, FaPhoneAlt, FaTools } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { IoTvSharp } from "react-icons/io5";
import { useEffect, useState } from 'react';
import { datosInt, datosTV } from '../utils/object';
import { Button } from '@mui/material';
import ButtonAnimate from '../../../components/ButtonAnimate';
import { FaArrowLeft } from 'react-icons/fa6';
import Swal from 'sweetalert2';

const ServiceDetails = ({ typeService, onBack }) => {
    const [datos, setDatos] = useState({});

    useEffect(() => {
        setDatos(typeService == 'TV' ? datosTV : datosInt)
        console.log(datosTV);
    }, [typeService]);

    const activePaquete = () => {
        Swal.fire({
            title: "¿Confirmas el Cambio de Plan de Internet?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            cancelButtonText: `Cancelar`
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Perfecto, el cambio se realizó de manera correcta. Puede tardar hasta 30min en verse reflejado", "", "success");
            }
        });
    }

    const getIcon = (icon) => {
        switch (icon) {
            case 'download':
                return <FaDownload className='text-amber-500 mr-3' />;
            case 'upload':
                return <FaUpload className='text-amber-500 mr-3' />;
            case 'wifi':
                return <FaWifi className='text-amber-500 mr-3' />;
            case 'world':
                return <TbWorld className='text-amber-500 mr-3' />;
            case 'phone':
                return <FaPhoneAlt className='text-amber-500 mr-3' />;
            case 'tools':
                return <FaTools className='text-amber-500 mr-3' />;
            case 'tv':
                return <IoTvSharp className='text-amber-500 mr-3' />;
            default:
                return null;
        }
    };
    return (
        <div className='flex flex-wrap justify-center'>
            <h2 className="m-5 w-full">Detalles del Servicio</h2>
            <div className='absolute right-6 top-20'>
                <ButtonAnimate onClick={onBack} icon={<FaArrowLeft className='text-white' />} text={'volver'} bgIcon={'bg-blue-400'} color={'text-white'} />
            </div>
            <hr />
            <p className='w-full text-center m-3'>{typeService === 'TV' ? 'Paquetes de ' + 'TV' : 'Internet'} activos en cuenta 1657</p>
            {/* Paquetes activos */}
            <div className="w-full md:w-1/4 sm:w-1/2 mx-3">
                <CardCustom
                    className={`relative rounded-[2.5em] m-2 max-md:m-0 p-8 max-md:mt-5 hover:scale-95 transition ease-in-out duration-300 flex items-center shadowCards dark:bg-zinc-700 dark:text-gray-300 max-md:w-full`}
                >
                    <div className={`${typeService == 'INT' ? 'bg-blue-400' : 'bg-purple-400'} ${typeService == 'INT' ? 'text-blue-900' : 'text-purple-900'} text-xl p-2 rounded-full`}>
                        {typeService == 'INT' ? (
                            <FaWifi />
                        ) : (
                            <IoTvSharp />
                        )}
                    </div>
                    <div className='flex w-full items-center mx-3 justify-start'>
                        <p className='text-center leading-6 m-0'> RESIDENCIAL 300 MEGAS </p>
                    </div>
                </CardCustom>
            </div>
            <p className='w-full text-center m-3'>Te recomendamos los siguientes planes: </p>
            {/* Paquetes disponibles */}
            {Array.isArray(datos) && datos.map((item, index) => (
                <div key={item.id || index} className="w-full md:w-1/4 sm:w-1/2 mx-3">
                    <CardCustom
                        className={`relative rounded-[2.5em] m-2 max-md:m-0 p-8 max-md:mt-5 transition ease-in-out duration-300 flex items-center shadowCards dark:bg-zinc-700 dark:text-gray-300 max-md:w-full`}
                    >
                        <div className='flex flex-col w-full'>
                            <div className="text-center">
                                <img src={item.imgC} alt='img' className='w-full mb-5' />
                                <p className='bg-gray-100 px-4 py-2 mt-2'>{item.pay}</p>
                                <p className='text-sm'>Tarifa vigente Triple Play</p>
                                <ul className='text-left my-5'>
                                    {item.caracteristicas?.map((carac, caracIndex) => (
                                        <li key={caracIndex} className='flex items-center'>{typeService == 'TV' ? <img width={'30%'} className='me-5 my-2' src={carac.iconC} /> : getIcon(carac.iconC)} {carac.caract}</li>
                                    ))}
                                </ul>
                                <Button onClick={() => activePaquete()} className='AeromaticsRegular rounded-xl botonPrincipal' variant="contained"><b>ACTIVALO AHORA</b></Button>
                            </div>
                        </div>
                    </CardCustom>
                </div>
            ))}

            {typeService == 'INT' ? (
                <a style={{ background: '#ff7400' }} class="btn text-white flex flex-wrap justify-center cursor-pointer fixed right-10 bottom-20 rounded-md p-3" onClick={() => abrir_modal_credenciales(16757)}>
                    <FaWifi />
                    <p className='w-full text-center m-0 mt-1'>Mi WiFi</p>
                </a>
            ) : (
                <hr />,
                <div className="w-full justify-center flex flex-wrap mx-3">
                    <h2 className='m-2 w-full text-center'>SENSA</h2>
                    <CardCustom
                        className={`relative justify-center md:w-1/3 sm:w-1/2 rounded-[2.5em] m-2 gap-2 max-md:m-0 p-8 max-md:mt-5 transition ease-in-out duration-300 flex flex-wrap items-center shadowCards dark:bg-zinc-700 dark:text-gray-300 max-md:w-full`}
                    >
                        <img src='https://app.coopmorteros.coop/public/images/otros/SENSA.png' alt='img' className='w-full mb-5' />
                        <Button sx={{
                                backgroundColor: '#F56565',
                                color: '#862929',
                                '&:hover': {
                                    backgroundColor: '#F56565'
                                }
                            }} className='AeromaticsRegular w-[48%] rounded-xl ' variant="contained"><b>Crear SENSA</b></Button>
                        <Button sx={{
                                backgroundColor: '#F56565',
                                color: '#862929',
                                '&:hover': {
                                    backgroundColor: '#F56565'
                                }
                            }} className='AeromaticsRegular w-[48%] rounded-xl' variant="contained"><b>Iniciar Sesión</b></Button>
                    </CardCustom>
                </div>
            )}

        </div>
    )
};

export default ServiceDetails;
