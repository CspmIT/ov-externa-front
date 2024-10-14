import React from 'react';
import { Button } from '@mui/material'
import ButtonAnimate from '../../../../components/ButtonAnimate';
import { Link } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";

const StepTwo = ({ onBack, isChecked, setIsChecked }) => {
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div>
            <h2 className='text-center mb-3'>Subir a Nivel 3 </h2>
            <div className='absolute right-6 top-20'>
                <ButtonAnimate onClick={() => {
                    onBack();
                    isChecked && handleCheckboxChange();
                }} icon={<FaArrowLeft className='text-white' />} text={'volver'} bgIcon={'bg-blue-400'} color={'text-white'} />
            </div>
            <div className={`flex flex-wrap w-full justify-center`}>
                <div className='w-full px-3 pt-10 text-left'>
                    <h5>
                        <u>TÉRMINOS Y CONDICIONES:</u>
                    </h5>
                    <p className='w-3/4'>Por medio del presente, en mi carácter de TÍTULAR DE LOS DATOS presto mi CONSENTIMIENTO para que “COOPMORTEROS” en su carácter de CESIONARIO confronte mis datos personales que se indican en párrafo siguiente con la base de datos del RENAPER, conforme a las especificaciones que a continuación se detallan: </p>
                    <h5>Datos Autorizados:</h5>
                    <p>El presente consentimiento para el tratamiento de mis datos personales alcanza a los incluidos en mi Documento Nacional de Identidad (INCLUYENDO DATOS BIOMETRICOS DE HUELLA DACTILAR Y DE RECONOCIMIENTO FACIAL) en confronte con lo que informa el web service del REGISTRO NACIONAL DE LAS PERSONAS. </p>
                    <h5>Información sobre el Tratamiento:</h5>
                    <ol className='list-decimal ps-7 leading-6'>
                        <li>Los datos serán tratados con la exclusiva finalidad de validar mi identidad y verificar la vigencia de mi Documento Nacional de Identidad para realizar el trámite correspondiente.</li>
                        <li>Los datos confrontados serán destruidos una vez verificada la validez del Documento Nacional de Identidad y validada la misma, no pudiendo ser almacenados.</li>
                        <li>Los datos son facilitados con carácter obligatorio, por cuanto es imprescindible identificar fehacientemente al titular, para asegurar el correcto proceso de identificación.</li>
                        <li>El titular de los datos podrá ejercer los derechos de acceso, rectificación y supresión de sus datos en cualquier momento y a su sola solicitud ante el RENAPER.</li>
                        <li>En cumplimiento de la Resolución AAIP Nº 14/2018, le hacemos saber que la AGENCIA DE ACCESO A LA INFORMACIÓN PÚBLICA, en su carácter de Órgano de Control de la Ley N° 25.326, tiene la atribución de atender las denuncias y reclamos que interpongan quienes resulten afectados en sus derechos por incumplimiento de las normas vigentes en materia de protección de datos personales.</li>
                    </ol>
                </div>
                <img src='https://app.coopmorteros.coop/public/images/otros/logo_renaper.png' className='w-1/2 lg:w-1/5 mt-5' />
                <div className='w-full mt-10 text-center'>
                    <input type='checkbox' id='terminosCondiciones' name='terminosCondiciones' value='' checked={isChecked} onChange={handleCheckboxChange} />
                    <label htmlFor='terminosCondiciones'> He leído y acepto los
                        <a>
                            <b>Términos y Condiciones</b>
                        </a>
                        de uso
                    </label>
                </div>
                <div className='w-full mt-2 flex justify-center'>
                    {isChecked ? (
                        <Link to={'/authentication'}>
                            <Button sx={{
                                backgroundColor: '#fef08a',
                                color: '#a16207',
                                '&:hover': {
                                    backgroundColor: '#fef08a'
                                }
                            }} className='hoverBtn' variant="contained"><b>Siguiente</b></Button>
                        </Link>
                    ) : (
                        <span className='text-gray-400'>Siguiente</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StepTwo;
