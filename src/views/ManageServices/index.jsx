import React from 'react'
import Card from '../../components/Card';
import { IoTvSharp } from "react-icons/io5";
import { FaWifi } from "react-icons/fa";
import { Link } from 'react-router-dom';
import styles from '../../views/ManageServices/ManageServices.module.css'
import { useState } from 'react'
import { FaArrowLeft } from "react-icons/fa6";
import { FaDownload } from "react-icons/fa6";
import Button from '../../components/Button';
import ButtonAnimate from '../../components/ButtonAnimate';
import { FaUpload } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";
import { FaPhoneAlt } from "react-icons/fa";
import { FaTools } from "react-icons/fa";

const ManageServices = () => {
    const [viewoneMode, setViewoneMode] = useState('');
    const [viewtrheeMode, setViewtrheeMode] = useState('hidden');
    const [viewtwoMode, setViewtwoMode] = useState('hidden');
    const [iconMode, seticonMode] = useState('hidden');

    const hideOtherViews = (currentViewSetter, type) => {
        setViewoneMode('hidden');
        setViewtwoMode('hidden');
        setViewtrheeMode('hidden');
        currentViewSetter((currentView) => (currentView === 'hidden' ? '' : 'hidden'));

        type == 'INT' ? (
            seticonMode({
                icon: <FaWifi className='w-full' />,
                color: 'text-blue-500',
                bgIcon: 'bg-blue-400',
                colorIcon: 'text-blue-900',
                title: 'Internet',
                type: 'INT',
                activo: ['PROMOCION COOPATE - 300 MBPS'],
                datosCard: [
                    {
                        imgC: 'https://app.coopmorteros.coop/public/imagenes_packages_tv/62bada587f61c.png',
                        pay: '$111111',
                        caracteristicas: [
                            {
                                iconC: <FaDownload className='text-amber-500 mr-3' />,
                                caract: 'Velocidad de descarga: 100 MBPS'
                            },
                            {
                                iconC: <FaUpload className='text-amber-500 mr-3' />,
                                caract: 'Velocidad de subida: 10 MBPS'
                            },
                            {
                                iconC: <TbWorld className='text-amber-500 mr-3' />,
                                caract: '1 IP Pública'
                            },
                            {
                                iconC: <FaPhoneAlt className='text-amber-500 mr-3' />,
                                caract: 'Atención las 24 horas los 365 días del año'
                            },
                            {
                                iconC: <FaTools className='text-amber-500 mr-3' />,
                                caract: 'Técnicos especializados'
                            },
                            {
                                iconC: <IoTvSharp className='text-amber-500 mr-3' />,
                                caract: 'Incluye SENSA '
                            }
                        ]
                    },
                    {
                        imgC: 'https://app.coopmorteros.coop/public/imagenes_packages_tv/62bada6ce2563.png',
                        pay: '$22222',
                        caracteristicas: [
                            {
                                iconC: <FaDownload className='text-amber-500 mr-3' />,
                                caract: 'Velocidad de descarga: 300 MBPS'
                            },
                            {
                                iconC: <FaUpload className='text-amber-500 mr-3' />,
                                caract: 'Velocidad de subida: 50 MBPS'
                            },
                            {
                                iconC: <FaWifi className='text-amber-500 mr-3' />,
                                caract: 'Módem dual band WIFI 4 y WIFI 5'
                            },
                            {
                                iconC: <TbWorld className='text-amber-500 mr-3' />,
                                caract: '1 IP Pública'
                            },
                            {
                                iconC: <FaPhoneAlt className='text-amber-500 mr-3' />,
                                caract: 'Atención las 24 horas los 365 días del año'
                            },
                            {
                                iconC: <FaTools className='text-amber-500 mr-3' />,
                                caract: 'Técnicos especializados'
                            },
                            {
                                iconC: <IoTvSharp className='text-amber-500 mr-3' />,
                                caract: 'Incluye SENSA '
                            }
                        ]
                    },
                    {
                        imgC: 'https://app.coopmorteros.coop/public/imagenes_packages_tv/62badaf09c90d.png',
                        pay: '$3333',
                        caracteristicas: [
                            {
                                iconC: <FaDownload className='text-amber-500 mr-3' />,
                                caract: 'Velocidad de descarga: 60 MBPS'
                            },
                            {
                                iconC: <FaUpload className='text-amber-500 mr-3' />,
                                caract: 'Velocidad de subida: 10 MBPS'
                            },
                            {
                                iconC: <FaPhoneAlt className='text-amber-500 mr-3' />,
                                caract: 'Atención las 24 horas los 365 días del año'
                            },
                            {
                                iconC: <FaTools className='text-amber-500 mr-3' />,
                                caract: 'Técnicos especializados'
                            }
                        ]
                    }
                ]
            }
            )
        ) : (
            seticonMode({
                icon: <IoTvSharp className='w-full' />,
                color: 'text-purple-500',
                bgIcon: 'bg-purple-400',
                colorIcon: 'text-purple-900',
                title: 'Televisión',
                type: 'TV',
                activo: ['PACK FUTBOL', 'PACK ADULTOS'],
                datosCard: [
                    {
                        imgC: 'https://app.coopmorteros.coop/public/imagenes_packages_tv/62bb1768c373b.png',
                        pay: '$111111',
                        caracteristicas: [
                            {
                                iconC: 'https://app.coopmorteros.coop/public/imagenes_packages_tv/62bae278e1623.png',
                                caract: 'Canal 132'
                            },
                            {
                                iconC: 'https://app.coopmorteros.coop/public/imagenes_packages_tv/62bae2c80efe5.png',
                                caract: 'Canal 131'
                            }
                        ]
                    },
                    {
                        imgC: 'https://app.coopmorteros.coop/public/imagenes_packages_tv/62bb175b2a7f8.png',
                        pay: '$22222',
                        caracteristicas: [
                            {
                                iconC: 'https://app.coopmorteros.coop/public/imagenes_packages_tv/62bae2eba5bb0.png',
                                caract: 'Canal 800'
                            },
                            {
                                iconC: 'https://app.coopmorteros.coop/public/imagenes_packages_tv/62bae316b5dfa.png',
                                caract: 'Canal 805 '
                            }
                        ]
                    }
                ]
            }
            )
        )

    };
    const viewoneModehidden = (type) => hideOtherViews(setViewoneMode, type);
    const viewtwoModehidden = (type) => hideOtherViews(setViewtwoMode, type);
    const viewtrheeModehidden = (type) => hideOtherViews(setViewtrheeMode, type);
    return (
        <div>
            <div className={`p-2 sm:pl-64 ${viewoneMode}`}>
                <h2 className="m-5">Administrar Servicios</h2>
                <hr />
                <div className={`${styles.spanCards} flex flex-wrap justify-center mt-10`}>
                    <div onClick={() => viewtwoModehidden('INT')} className='w-full md:w-1/2 lg:w-1/4'>
                        <Card props={{ phone: '', subtitle: 'INTERNET', icon: <FaWifi className='w-full' />, color: 'text-blue-500', bgIcon: 'bg-blue-400', colorIcon: 'text-blue-900', bg: 'bg-white', positionBtn: 'absolute', widht: 'w-auto' }} />
                    </div>
                    <div onClick={() => viewtwoModehidden('TV')} className={`w-full md:w-1/2 lg:w-1/4`}>
                        <Card props={{ phone: '', subtitle: 'TELEVISION', icon: <IoTvSharp className='w-full' />, color: 'text-purple-500', bgIcon: 'bg-purple-300', colorIcon: 'text-purple-900', bg: 'bg-white', positionBtn: 'absolute', widht: 'w-auto' }} />
                    </div>
                </div>
                <div className='w-full flex justify-center mt-10'>
                    <Link to={'/Information'}>
                        <Button props={{ class: 'text-black bg-yellow-400 hover:bg-white focus:bg-yellow-400 m-2', text: `Ver Tutoriales Nivel 3` }} />
                    </Link>
                </div>
            </div>
            <div className={`p-2 sm:pl-64  ${viewtwoMode}`}>
                <h2 className="m-5">Administrar Servicios
                    <div onClick={viewoneModehidden} className='float-right'>
                        <ButtonAnimate props={{ icon: <FaArrowLeft className='text-white' />, text: 'volver', bgIcon: 'bg-blue-400 mr-5', color: 'text-white' }} />
                    </div>
                </h2>
                <hr />
                <div className={`${styles.spanCards} flex flex-wrap justify-center mt-10`}>
                    <p className='w-full text-center m-3'>Seleccioná tu cuenta del servicio de {iconMode['title']}</p>
                    <div onClick={() => viewtrheeModehidden(iconMode['type'])} className='w-full md:w-1/2 lg:w-1/4'>
                        <a><Card props={{ phone: '', title: <p className='text-center leading-6'> Cuenta N°: <b> 1657 </b> <br />  Dirección: <b> FLEMING 751 </b> </p>, icon: iconMode['icon'], color: iconMode['color'], bgIcon: iconMode['bgIcon'], colorIcon: iconMode['colorIcon'], widht: 'w-auto', bg: 'bg-white', shadow: 'false' }} /></a>
                    </div>
                    <div onClick={() => viewtrheeModehidden(iconMode['type'])} className={`w-full md:w-1/2 lg:w-1/4`}>
                        <a><Card props={{ phone: '', title: <p className='text-center leading-6'> Cuenta N°: <b> 1657 </b> <br />  Dirección: <b> FLEMING 751 </b> </p>, icon: iconMode['icon'], color: iconMode['color'], bgIcon: iconMode['bgIcon'], colorIcon: iconMode['colorIcon'], widht: 'w-auto', bg: 'bg-white', shadow: 'false' }} /></a>
                    </div>
                </div>
            </div>
            <div className={`p-2 sm:pl-64  ${viewtrheeMode}`}>
                <h2 className=" m-5">Administrar Servicios
                    <div onClick={() => viewtwoModehidden(iconMode['type'])} className='float-right'>
                        <ButtonAnimate props={{ icon: <FaArrowLeft className='text-white' />, text: 'volver', bgIcon: 'bg-blue-400 mr-5', color: 'text-white' }} />
                    </div>
                </h2>
                <hr />
                <div className={`${styles.spanCards} flex flex-wrap justify-center mt-10`}>
                    <p className='w-full text-center m-3'>{iconMode['type'] == 'TV' ? 'Paquete de ' + iconMode['title'] : iconMode['title']} activo en cuenta 1657</p>
                    {iconMode && iconMode['activo'] && iconMode['activo'].map((item, index) => (
                        <div key={index} className='w-full md:w-1/2 lg:w-1/4'>
                            <a>
                                <Card props={{
                                    phone: '',
                                    title: <p className='text-center leading-6'><b>{item}</b></p>,
                                    icon: iconMode['icon'],
                                    color: iconMode['color'],
                                    bgIcon: iconMode['bgIcon'],
                                    colorIcon: iconMode['colorIcon'],
                                    widht: 'w-auto',
                                    bg: 'bg-white',
                                    shadow: 'false'
                                }} />
                            </a>
                        </div>
                    ))}
                    <div className='w-full mt-10'>
                        <div className={`w-auto ${styles.cssTyping}`}>
                            <h4 className={`${styles.animacionCuadro} mb-1 text-white`} >
                                <strong className={`${iconMode['color']}`}>  MEJORÁ TU {iconMode['type'] == 'INT' ? 'VELOCIDAD' : 'EXPERIENCIA'}! </strong>
                            </h4><br />
                            <p className='text-center'>{iconMode['type'] == 'INT' ? 'Te recomendamos los siguientes planes: ' : 'Packs Recomendados:'}</p>
                        </div>
                    </div>
                    {iconMode && iconMode['datosCard'] && iconMode['datosCard'].map((item, index) => (
                        <div key={index} className="w-full md:w-1/4 sm:w-1/2">
                            <Card
                                props={{
                                    phone: "",
                                    subtitle: (
                                        <div className="w-full text-center">
                                            <img src={item.imgC} alt='img' className='w-full mb-5' />
                                            <p className='w-full bg-gray-100 dark:bg-zinc-800 px-4 py-2 mt-2'>{item.pay}
                                                <p className='text-sm'>Tarifa vigente Triple Play</p>
                                            </p>
                                            {iconMode['type'] == 'INT' ? (
                                                <ul className='w-full  text-base mt-5 text-left leading-6'>
                                                    {item.caracteristicas && item.caracteristicas.map((carac, caracIndex) => (
                                                        <li key={caracIndex} className='flex items-center'>{carac.iconC} {carac.caract} </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <div className='flex flex-wrap'>
                                                    <p className='text-sm text-center p-3 w-full'>Canales incluidos en el Pack:</p>
                                                    {item.caracteristicas && item.caracteristicas.map((carac, caracIndex) => (
                                                        <div key={caracIndex} className='w-1/2 p-2'>
                                                            <img src={carac.iconC} alt='img' className='w-full mb-2' />
                                                            <p key={index} className='text-sm text-center'>{carac.caract}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            <Button props={{ class: 'text-black bg-yellow-400 hover:bg-white focus:bg-yellow-400 m-2 mt-7 text-sm w-full', text: `ACTIVALO AHORA` }} />
                                        </div>
                                    ),
                                    widht: "w-auto",
                                    bg: "bg-white",
                                    positionBtn: "absolute",
                                }}
                            />
                        </div>
                    ))}

                    {iconMode["type"] == 'TV' && (
                        <div className='w-full justify-center flex flex-wrap mt-10'>
                            <hr />
                            <h2 className='text-center w-full'>SENSA</h2>
                            <Card
                                props={{
                                    phone: "",
                                    subtitle: (
                                        <div className="w-full text-center flex flex-wrap">
                                            <img src='https://app.coopmorteros.coop/public/images/otros/SENSA.png' alt='img' className='w-full' />
                                            <div className='w-1/2 p-2'>
                                                <Button props={{ class: 'text-black bg-yellow-400 hover:bg-white focus:bg-yellow-400 m-2 mt-7 text-sm w-full', text: `CREAR SENSA` }} />
                                            </div>
                                            <div className='w-1/2 p-2'>
                                                <Button props={{ class: 'text-black bg-yellow-400 hover:bg-white focus:bg-yellow-400 m-2 mt-7 text-sm w-full', text: `INICIAR SESIÓN` }} />
                                            </div>
                                        </div>
                                    ),
                                    widht: "w-1/3",
                                    bg: "bg-white",
                                    positionBtn: "absolute",
                                }}
                            />
                        </div>

                    )}
                </div>
            </div>
        </div>
    )
}

export default ManageServices