import React from 'react';
import { TextField, Button, InputLabel, FormControl, Select, MenuItem } from '@mui/material'
import ButtonAnimate from '../../../../components/ButtonAnimate';
import { FaArrowLeft } from "react-icons/fa";
import CardCustom from '../../../../components/CardCustom';
import FileUpload from '../../../../components/FileUpload';
import swals from '../../../../routes/swals';

const StepThree = ({ onBack, fileInputRefFrente, fileInputRefDorso }) => {

    const swalsCallback = (fileInputRef) => {
        if (fileInputRef.current) {
            fileInputRef.current.openCamera()
        }
    }

    return (
        <div>
            <h2 className='text-center mb-3'>Subir a Nivel 3 </h2>
            <div className='absolute right-6 top-20'>
                <ButtonAnimate onClick={onBack} icon={<FaArrowLeft className='text-white' />} text={'volver'} bgIcon={'bg-blue-400'} color={'text-white'} />
            </div>
            <div className={`flex flex-wrap w-full justify-center`}>
                <div className='w-full p-3 text-left'>
                    <p>Para seguir con el proceso de Subir a Nivel 3, vamos a requerir que completes tus Datos Personales: nombre completo, número de documento y sexo. </p>
                </div>
                <div className='w-full md:px-5 mb-3'>
                    <CardCustom
                        className={`relative rounded-[2.5em] m-2 max-md:m-0 p-8 max-md:mt-5 transition ease-in-out duration-300 flex items-center shadowCards dark:bg-zinc-700 dark:text-gray-300 max-md:w-full`}
                    >
                        <form id='newDateCustomer' className='w-full flex flex-wrap justify-center'>
                            <div className='w-full lg:w-1/3 p-2'>
                                <TextField fullWidth label="Nombre y Apellido Completo" variant="outlined" />
                            </div>
                            <div className='w-full lg:w-1/3 p-2'>
                                <TextField fullWidth label="DNI" variant="outlined" />
                            </div>
                            <div className='w-full lg:w-1/3 p-2'>
                                <FormControl fullWidth>
                                    <InputLabel>Sexo</InputLabel>
                                    <Select label="Sexo">
                                        <MenuItem value={1}>Femenino</MenuItem>
                                        <MenuItem value={2}>Masculino</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </form>
                    </CardCustom>
                </div>
                <p className='text-red-500 px-5'>*Las imagenes deben ser de tipo: PNG, JPG, JPEG o GIF</p>
                <div className='w-full flex flex-wrap justify-center'>
                    <div className='w-full sm:w-1/2 justify-center flex flex-wrap'>
                        <FileUpload name={`Frente`} ref={fileInputRefFrente} />
                        <div
                            onClick={() =>
                                swals({
                                    icon: 'warning',
                                    confirm: 'Tomar Foto',
                                    cancel: 'Adjuntar Foto',
                                    actionConfirm: () => swalsCallback(fileInputRefFrente),
                                    actionCancel: () => fileInputRefFrente.current && fileInputRefFrente.current.openFileInput()
                                })
                            }
                            className='justify-center flex items-end'
                        >
                            <Button className='botonesAceptar' variant="contained"><b>Foto Frente DNI</b></Button>
                        </div>
                    </div>
                    <div className='w-full sm:w-1/2 justify-center flex flex-wrap '>
                        <FileUpload name={`Dorso`} ref={fileInputRefDorso} />
                        <div
                            onClick={() =>
                                swals({
                                    icon: 'warning',
                                    confirm: 'Tomar Foto',
                                    cancel: 'Adjuntar Foto',
                                    actionConfirm: () => swalsCallback(fileInputRefDorso),
                                    actionCancel: () => fileInputRefDorso.current && fileInputRefDorso.current.openFileInput()
                                })
                            }
                            className='justify-center flex items-end'
                        >
                            <Button className='botonesAceptar' variant="contained"><b>Foto Dorso DNI</b></Button>
                        </div>
                    </div>
                </div>
                <div className='m-2 mt-5'>
                    <Button className='botonPrincipal' variant="contained"><b>Siguiente</b></Button>
                </div>
            </div>
        </div>
    );
};

export default StepThree;
