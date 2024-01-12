import React from 'react'
{/* ----------------- COMPONENTES ----------------- */ }
import InputGroup from '../../components/InputGroup';
import SelectGroup from '../../components/SelectGroup';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';

const leveldos = () => {
    var usuario = 'Julieta';
    var provincias = [{id: 1, name: 'Buenos Aires'}, {id: 2, name: 'Buenos Aires-GBA'}, {id: 3, name: 'Capital Federal'}, 
    {id: 4, name: 'Catamarca'}, {id: 5, name: 'Chaco'}, {id: 6, name: 'Chubut'}, {id: 7, name: 'Córdoba'}, 
    {id: 8, name: 'Corrientes'}, {id: 9, name: 'Entre Ríos'}, {id: 10, name: 'Formosa'}]

    return (
        <div className='p-2 pb-10 sm:pl-64 overflow-y-auto h-full bg-gray-100 dark:bg-zinc-900 dark:text-gray-300 mb-10'>
            <div className='flex flex-wrap w-full'>
                <p className='py-10 leading-7'>
                    Hola {usuario}, estás a unos pasos de subir al Nivel 2. Para esto, te vamos a pedir una serie de datos necesarios para validar tu identidad y así poder usar tu Oficina Virtual aprovechando todos los beneficios.
                    <br />
                    Uno de los datos más importantes y obligatorio es tu número de socio, ya que ingresando el mismo, podrás acceder a todas tus cuentas como así también todos tus servicios.
                    <br />
                    A continuación, verás una imagen del encabezado de tu factura. El número de socio podés obtenerlo desde la misma, tal como lo muestra la imagen.
                </p>
                <div className='w-full flex justify-center mb-10'>
                    <img className='w-3/4' src='https://app.coopmorteros.coop/public/images/otros/Factura.jpg' />
                </div>
                <form id='formRegister' onSubmit={''} >
                    <div className='w-full flex flex-wrap'>
                        <InputGroup props={{ name: 'numberCustomer', label: 'N° Socio', ph: "Ingrese su N° de Socio", type: 'text', req: true, value: 4 }} />
                        <SelectGroup props={{ name: 'documentType', label: 'Tipo Doc.', req: true, options: [{ id: 1, name: 'CUIL' }, { id: 2, name: 'CUIT' }, { id: 3, name: 'DNI' }, { id: 4, name: 'LC' }, { id: 5, name: 'LE' }] }} />
                        <InputGroup props={{ name: 'documentNumber', label: 'Nº Doc.', ph: "Ingrese su N° de Documento", type: 'number', req: true, value: 4 }} />
                        <SelectGroup props={{ name: 'sex', label: 'Sexo', req: true, options: [{ id: 1, name: 'Femenino' }, { id: 2, name: 'Masculino' }] }} />
                        <SelectGroup props={{ name: 'sex', label: 'Sexo', req: true, options: provincias }} />
                        <InputGroup props={{ name: 'lastNameRegister', label: 'Apellido', ph: "Apellido", type: 'text', req: true, value: 4 }} />
                        <InputGroup props={{ name: 'emailRepeatRegister', label: 'Email', ph: "Ingrese un Email", type: 'email', req: true, value: 4 }} />
                        <InputGroup props={{ name: 'passRepeatRegister', label: 'Repetir Contraseña', ph: "Ingrese Nuevamente una Contraseña", req: true, value: 4 }} />
                    </div>
                    <div className='w-full flex justify-center'>
                        <Button props={{ class: 'text-black bg-yellow-300 hover:bg-yellow-400 focus:bg-yellow-400 m-2', text: "Registrarme", type: 'submit' }} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default leveldos