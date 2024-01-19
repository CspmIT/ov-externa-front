import React, { useRef } from 'react'
import { RiNumber1 } from "react-icons/ri";
import { RiNumber2 } from "react-icons/ri";
import { RiNumber3 } from "react-icons/ri";
import { RiNumber4 } from "react-icons/ri";
import Card from '../../components/Card';
import FileUpload from '../../components/FileUpload';
import Button from '../../components/Button';

const authenticationPhotoSID = () => {
    return (
        <div className='p-2 pb-10 sm:pl-64'>
            <h2 class="m-5">Subir a Nivel 3</h2>
            <hr />
            <p className='mt-3'>Para subir al Nivel 3, primero debemos validar tu identidad para que una vez que subas de nivel, puedas realizar cualquier tipo de trámite con total seguridad y protección de tus datos.</p>
            <h5 className='text-center p-3'>Utilizamos la Plataforma SID para comprobar la identidad de: COSTAMAGNA FABIAN NESTOR.</h5>
            <div className={`w-full flex flex-wrap justify-center`}>
                <div className="w-full md:w-1/2 xl:w-1/4">
                    <Card
                        props={{
                            phone: "",
                            title: <p className='w-1/2 md:w-3/4'>Buscá un lugar iluminado con fondo claro liso.</p>,
                            icon: <RiNumber1 className="w-full" />,
                            color: "text-yellow-500",
                            bgIcon: "bg-yellow-400",
                            colorIcon: "text-yellow-900",
                            widht: "w-auto",
                            bg: "bg-white",
                            positionBtn: "absolute",
                        }}
                    />
                </div>
                <div className="w-full md:w-1/2 xl:w-1/4">
                    <Card
                        props={{
                            phone: "",
                            title: <p className='w-1/2 md:w-3/4'>Evitá anteojos o algo que dificulte el proceso.</p>,
                            icon: <RiNumber2 className="w-full" />,
                            color: "text-yellow-500",
                            bgIcon: "bg-yellow-400",
                            colorIcon: "text-yellow-900",
                            widht: "w-auto",
                            bg: "bg-white",
                            positionBtn: "absolute",
                        }}
                    />
                </div>
                <div className="w-full md:w-1/2 xl:w-1/4">
                    <Card
                        props={{
                            phone: "",
                            title: <p className='w-1/2 md:w-3/4'>Posá con una expresión neutral.</p>,
                            icon: <RiNumber3 className="w-full" />,
                            color: "text-yellow-500",
                            bgIcon: "bg-yellow-400",
                            colorIcon: "text-yellow-900",
                            widht: "w-auto",
                            bg: "bg-white",
                            positionBtn: "absolute",
                        }}
                    />
                </div>
                <div className="w-full md:w-1/2 xl:w-1/4">
                    <Card
                        props={{
                            phone: "",
                            title: <p className='w-1/2 md:w-3/4'>Esperá hasta que validemos tu identidad.</p>,
                            icon: <RiNumber4 className="w-full" />,
                            color: "text-yellow-500",
                            bgIcon: "bg-yellow-400",
                            colorIcon: "text-yellow-900",
                            widht: "w-auto",
                            bg: "bg-white",
                            positionBtn: "absolute",
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default authenticationPhotoSID