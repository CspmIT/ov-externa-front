import React from 'react';
import swals from '../../../../routes/swals';
import { Link } from 'react-router-dom'
import CardCustom from '../../../../components/CardCustom';
import { TextField, Button } from '@mui/material'

const StepOne = ({ onNext, onHandleData }) => {
    const confirmDatos = (action) => {
        swals({
            icon: 'warning',
            title: `¿Confirmas que ${action == 'si' ? '' : 'no '} son tus Datos Personales?`,
            html: action == 'si' ? 'Recordá que son muy importantes a fin de validar tu identidad para futuros Trámites.' : 'Una vez confirmada esta acción, pasarás a Completar tus Datos Personales y recordá que los mismos son muy importantes a fin de validar tu identidad para futuros Trámites.',
            confirm: 'Confirmar',
            cancel: 'Cancelar',
            actionConfirm:  action == 'si' ? onNext : onHandleData
        })
    }
    return (
        <div>
            <h2 className='mb-3 text-center'>Subir a Nivel 3</h2>
            {/* <img className='w-full mb-5' src='https://desarrollo.coopmorteros.coop/public/images/nivel_3/NIV_3.png' /> */}
            <div className={`flex flex-wrap w-full justify-center`}>
                <div className='w-full p-3 text-left'>
                    <b>Antes de Subir al Nivel 3, queremos que: </b>
                    <p>
                        Revises cada dato con atención y nos confirmes con el botón <b className='text-orange-500'>Naranja</b> si corresponde correctamente a los datos del socio o si por el contrario existen errores, con el botón <b className='text-indigo-600'>Violeta</b> . El éxito del proceso de validación dependerá de la exactitud de dicha información.{' '}
                    </p>
                </div>
                <div className='w-full lg:w-2/6 p-2'>

                    <CardCustom
                        className={`relative rounded-[2.5em] m-2 max-md:m-0 p-8 max-md:mt-5 transition ease-in-out duration-300 flex items-center shadowCards dark:bg-zinc-700 dark:text-gray-300 max-md:w-full`}
                    >
                        <div className='flex flex-col w-full'>
                            <p className='text-xl font-bold m-0 mb-7 text-center'>¿Son tus Datos Personales?</p>
                            <div className='grid gap-4'>
                                <TextField fullWidth label="Nombre y Apellido Completo" value='COSTAMAGNA FABIÁN NESTOR' variant="outlined" InputProps={{ readOnly: true }} />
                                <TextField fullWidth label="DNI" value='20322841' variant="outlined" InputProps={{ readOnly: true }} />
                                <TextField fullWidth label="Sexo" value='MASCULINO' variant="outlined" InputProps={{ readOnly: true }} />
                            </div>
                            <div className='w-full text-center flex flex-wrap'>
                                <div className='w-full text-center flex flex-wrap mt-4'>
                                    <div
                                        onClick={() => confirmDatos('si')}
                                        className='w-1/2 p-2'
                                    >
                                        <Button sx={{
                                            backgroundColor: '#FDBA74',
                                            color: '#7C2D12',
                                            width: '100%',
                                            '&:hover': {
                                                backgroundColor: '#FDBA74'
                                            }
                                        }} className='hoverBtn' variant="contained"><b>Sí</b></Button>
                                    </div>
                                    <div  onClick={() => confirmDatos('no')} className='w-1/2 p-2' >
                                        <Button sx={{
                                            backgroundColor: '#A5B4FC',
                                            color: '#4338CA',
                                            width: '100%',
                                            '&:hover': {
                                                backgroundColor: '#A5B4FC'
                                            }
                                        }} className='hoverBtn' variant="contained"><b>No</b></Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardCustom>
                </div>
                <div className='w-full flex justify-center mt-4'>
                    <Link to={'/Information'}>
                        <Button sx={{
                            backgroundColor: '#fef08a',
                            color: '#a16207',
                            width: '100%',
                            '&:hover': {
                                backgroundColor: '#fef08a'
                            }
                        }} className='botonPrincipal' variant="contained"><b>Ver Tutoriales Nivel 3</b></Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default StepOne;
