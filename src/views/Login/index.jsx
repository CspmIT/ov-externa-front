import React, { useState } from 'react'
import { Link } from 'react-router-dom';
{/* ----------------- ICONOS ----------------- */}
import { TbEye, TbEyeClosed } from "react-icons/tb";
{/* ----------------- COMPONENTES ----------------- */}
import InputGroup from '../../components/InputGroup'
import Button from '../../components/Button';

const Login = () => {
    const [pass, setPass] = useState("password");
    const [iconEye, setIconEye] = useState(<TbEye />);
    const showPassword = () => {
        setPass(pass == "password" ? "text" : "password");
        setIconEye(pass == "password" ? <TbEyeClosed /> : <TbEye />);
    }
    return (
        <div className='flex flex-row h-full justify-center items-center'>
            <div className="w-full md:1/2 p-5 flex justify-center">
                <div className='w-full md:w-1/2'>
                    <img className="mx-auto h-24 w-auto md:hidden" src="https://app.coopmorteros.coop/public/images/logos/Iso_OfiVirtual_Logo_Recortado.png?random=6582f0b2a7340" alt="Your Company" />
                    <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">Iniciar Sesión </h2>
                    <InputGroup props={{ label: 'Email', ph: "Ingrese un Email", type: 'email', req: true }} />
                    <InputGroup showPass={showPassword} props={{ label: 'Contraseña', ph: "Ingrese una Contraseña", type: pass, req: true, btnIcon: iconEye }} />
                    <div className='w-full flex justify-center'>
                        <Button props={{ class: 'text-black bg-yellow-300 hover:bg-yellow-400 focus:bg-yellow-400 m-2', text: "Ingresar" }} />
                        <Link to={'/Register'}>
                            <Button props={{ class: 'text-black bg-white hover:bg-yellow-400 focus:bg-yellow-400 m-2', text: "Registrarme" }} />
                        </Link>
                    </div>
                </div>
            </div>
            <div className='w-0 md:w-3/6 h-full flex justify-center bg-[#c1c7cc]'>
                <div className='w-full h-full bg-[url("assets/gifs/login.gif")] bg-cover'></div>
            </div>
        </div>
    )
}

export default Login