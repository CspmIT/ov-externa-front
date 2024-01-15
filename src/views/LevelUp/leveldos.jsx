import React from 'react'
{/* ----------------- COMPONENTES ----------------- */ }
import InputGroup from '../../components/InputGroup';
import SelectGroup from '../../components/SelectGroup';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';

const leveldos = () => {
    var usuario = 'Julieta';
    var provincias = [{ id: 1, name: 'Buenos Aires' }, { id: 2, name: 'Buenos Aires-GBA' }, { id: 3, name: 'Capital Federal' },
    { id: 4, name: 'Catamarca' }, { id: 5, name: 'Chaco' }, { id: 6, name: 'Chubut' }, { id: 7, name: 'Córdoba' },
    { id: 8, name: 'Corrientes' }, { id: 9, name: 'Entre Ríos' }, { id: 10, name: 'Formosa' }]

    return (
        <div className='p-2 pb-10 sm:pl-64'>
            <div className='flex flex-wrap w-full'>
                <p className='py-10 leading-7'>
                    Hola {usuario}, estás a unos pasos de subir al Nivel 2. Para esto, te vamos a pedir una serie de datos necesarios para validar tu identidad y así poder usar tu Oficina Virtual aprovechando todos los beneficios.
                    <br />
                    Uno de los datos más importantes y obligatorio es tu número de socio, ya que ingresando el mismo, podrás acceder a todas tus cuentas como así también todos tus servicios.
                    <br />
                    A continuación, verás una imagen del encabezado de tu factura. El número de socio podés obtenerlo desde la misma, tal como lo muestra la imagen.
                </p>
                <div className='w-full flex justify-center mb-10'>
                    <img className='w-full md:w-3/4' src='https://app.coopmorteros.coop/public/images/otros/Factura.jpg' />
                </div>
                <form id='formRegister' onSubmit={''} className='w-full flex flex-wrap p-7'>
                    <div className='w-full md:w-1/2 lg:w-1/4 p-2'>
                        <InputGroup props={{ name: 'numberCustomer', label: 'N° Socio', ph: "Ingrese su N° de Socio", type: 'text', req: true, value: 4 }} />
                    </div>
                    <div className='w-full md:w-1/2 lg:w-1/4 p-2'>
                        <SelectGroup props={{ name: 'documentType', label: 'Tipo Doc.', req: true, options: [{ id: 1, name: 'CUIL' }, { id: 2, name: 'CUIT' }, { id: 3, name: 'DNI' }, { id: 4, name: 'LC' }, { id: 5, name: 'LE' }] }} />
                    </div>
                    <div className='w-full md:w-1/2 lg:w-1/4 p-2'>
                        <InputGroup props={{ name: 'documentNumber', label: 'Nº Doc.', ph: "Ingrese su N° de Documento", type: 'number', req: true, value: 4 }} />
                    </div>
                    <div className='w-full md:w-1/2 lg:w-1/4 p-2'>
                        <SelectGroup props={{ name: 'sex', label: 'Sexo', req: true, options: [{ id: 1, name: 'Femenino' }, { id: 2, name: 'Masculino' }] }} />
                    </div>
                    <div className='w-full md:w-1/2 lg:w-1/3 p-2'>
                        <SelectGroup props={{ name: 'stateID', label: 'Provincia', req: true, options: provincias }} />
                    </div>
                    <div className='w-full md:w-1/2 lg:w-1/3 p-2'>
                        <SelectGroup props={{ name: 'cityID', label: 'Localidad', req: true, options: provincias }} />
                    </div>
                    <div className='w-full md:w-1/2 lg:w-1/3 p-2'>
                        <InputGroup props={{ name: 'address', label: 'Dirección', ph: "Apellido", type: 'text', req: true, value: 4 }} />
                    </div>
                    <div className="w-1/2 md:w-1/4 p-2 mt-5">
                        <label className='block font-semibold ml-1 mb-2 dark:text-white'>Número de Celular</label>
                        <div className="flex">
                            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                0
                            </span>
                            <input type="text" name='caractPhone' className="block rounded-none rounded-e-md dark:bg-zinc-700 dark:text-gray-200 shadow border-0 p-2.5 text-gray-900 w-full placeholder:text-gray-400 sm:text-sm sm:leading-6" placeholder="Caract. (Sin el 0)" />
                        </div>
                    </div>
                    <div className="w-1/2 md:w-1/4 p-2 mt-5">
                        <div className="flex mt-7">
                            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                15
                            </span>
                            <input type="text" name='numberPhone' id="website-admin" className="block rounded-none rounded-e-md dark:bg-zinc-700 dark:text-gray-200 shadow border-0 p-2.5 text-gray-900 w-full placeholder:text-gray-400 sm:text-sm sm:leading-6" placeholder="Número (Sin el 15)" />
                        </div>
                    </div>
                    <div className='w-full md:w-1/2 lg:w-1/4 p-2'>
                        <InputGroup props={{ name: 'birthday', label: 'Fecha de Nacimiento', type: 'date', req: true, value: 4 }} />
                    </div>

                    <div className='w-full flex justify-center'>
                        <Button props={{ class: 'text-black bg-yellow-300 hover:bg-yellow-400 focus:bg-yellow-400 m-2', text: "Enviar", type: 'submit' }} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default leveldos