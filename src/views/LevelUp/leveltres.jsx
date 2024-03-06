// import React from 'react'
import React, { useRef } from 'react';
import CardBasic from '../../components/CardBasic'
import InputGroup from '../../components/InputGroup'
import Button from '../../components/Button'
import { Link } from 'react-router-dom'
import swals from "../../routes/swals";
import SelectGroup from '../../components/SelectGroup'
import { useState } from 'react'
import ButtonAnimate from '../../components/ButtonAnimate'
import { FaArrowLeft } from 'react-icons/fa'
import FileUpload from '../../components/FileUpload';


const leveltres = () => {
    const [viewoneMode, setViewoneMode] = useState('');
    const [viewtrheeMode, setViewtrheeMode] = useState('hidden');
    const [viewtwoMode, setViewtwoMode] = useState('hidden');
    const hideOtherViews = (currentViewSetter) => {
        setViewoneMode('hidden');
        setViewtwoMode('hidden');
        setViewtrheeMode('hidden');
        currentViewSetter((currentView) => (currentView === 'hidden' ? '' : 'hidden'));
        setIsChecked(false);
    }
    const viewoneModehidden = () => hideOtherViews(setViewoneMode);
    const viewtwoModehidden = () => hideOtherViews(setViewtwoMode);
    const viewtrheeModehidden = () => hideOtherViews(setViewtrheeMode);

    const handleVolver = () => {
        viewoneModehidden()
        handleResetFileFrente(fileInputRefFrente);
        handleResetFileDorso(fileInputRefDorso);
        var formulario = document.getElementById("newDateCustomer");
        for (var i = 0; i < formulario.elements.length; i++) {
            var elemento = formulario.elements[i];
            if (elemento.type != "button" && elemento.type != "submit") {
                elemento.value = "";
            }
        }
    };

    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const fileInputRefFrente = useRef(null);
    const fileInputRefDorso = useRef(null);

    const handleResetFileFrente = (fileUploadRef) => {
        if (fileUploadRef.current) {
            fileUploadRef.current.reset();
        }
    };
    const handleResetFileDorso = (fileUploadRef) => {
        if (fileUploadRef.current) {
            fileUploadRef.current.reset();
        }
    };

    const swalsCallback = (fileInputRef) => {
        if (fileInputRef.current) {
            fileInputRef.current.openCamera();
        }
    };

    return (
        <div>
            <div className={`${viewoneMode}`}>
                <h2 className="text-left mb-3">Subir a Nivel 3</h2>
                <hr />
                {/* <img className='w-full mb-5' src='https://desarrollo.coopmorteros.coop/public/images/nivel_3/NIV_3.png' /> */}
                <div className={`flex flex-wrap w-full justify-center`}>
                    <div className='w-full p-3 text-left'>
                        <b>Antes de Subir al Nivel 3, queremos que: </b>
                        <p>Revises cada dato con atención y nos confirmes con el botón <b className='text-orange-500'>Naranja</b>  si corresponde correctamente a los datos del socio o si por el contrario existen errores, con el botón <b className='text-indigo-600'>Violeta</b> . El éxito del proceso de validación dependerá de la exactitud de dicha información. </p>
                    </div>
                    <div className='w-full lg:w-2/6 p-2'>
                        <CardBasic
                            props={{
                                phone: "",
                                subtitle: (
                                    <div className="w-full text-center leading-6">
                                        <h4>
                                            <b>¿Son tus Datos Personales?</b>
                                        </h4>
                                        <InputGroup value="COSTAMAGNA FABIÁN NESTOR" props={{ label: "Nombre y Apellido Completo", type: "text", disabled: 'disabled' }} />
                                        <InputGroup value="20322841" props={{ label: "DNI", type: "text", disabled: 'disabled' }} />
                                        <InputGroup value="MASCULINO" props={{ label: "Sexo", type: "text", disabled: 'disabled' }} />
                                        <div className="w-full text-center flex flex-wrap">
                                            <div className="w-full text-center flex flex-wrap">
                                                <div onClick={() => swals({
                                                    icon: 'warning',
                                                    title: '¿Confirmas que son tus Datos Personales?',
                                                    html: 'Recordá que son muy importantes a fin de validar tu identidad para futuros Trámites.',
                                                    confirm: 'Confirmar',
                                                    cancel: 'Cancelar',
                                                    actionConfirm: viewtwoModehidden
                                                })} className='w-1/2 p-2'>
                                                    <Button props={{ class: ' bg-orange-300 text-orange-700 hoverBtn m-2 mt-7 text-sm w-full', text: `Sí` }} />
                                                </div>
                                                <div onClick={() => swals({
                                                    icon: 'warning',
                                                    title: '¿Confirmas que no son tus Datos Personales?',
                                                    html: 'Una vez confirmada esta acción, pasarás a Completar tus Datos Personales y recordá que los mismos son muy importantes a fin de validar tu identidad para futuros Trámites.',
                                                    confirm: 'Confirmar',
                                                    cancel: 'Cancelar',
                                                    actionConfirm: viewtrheeModehidden
                                                })} className='w-1/2 p-2'>
                                                    <Button props={{ class: 'text-indigo-700 bg-indigo-300 hoverBtn m-2 mt-7 text-sm w-full', text: `No` }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ),
                                widht: "w-auto",
                                bg: "bg-white",
                                positionBtn: "absolute",
                                hover: 'false'
                            }}
                        />
                    </div>
                    <div className='w-full flex justify-center'>
                        <Link to={'/Information'}>
                            <Button props={{ class: 'text-black botonPrincipal m-2', text: `Ver Tutoriales Nivel 3` }} />
                        </Link>
                    </div>
                </div>
            </div>
            <div className={`${viewtwoMode}`}>
                <h2 className="text-left mb-3">Subir a Nivel 3 <div onClick={() => viewoneModehidden()} className='float-right'>
                    <ButtonAnimate props={{ icon: <FaArrowLeft className='text-white' />, text: 'volver', bgIcon: 'bg-blue-400 mr-5', color: 'text-white' }} />
                </div></h2>
                <hr />
                <div className={`flex flex-wrap w-full justify-center  ${viewtwoMode}`}>
                    <div className='w-full px-3 pt-10 text-left'>
                        <h5><u>TÉRMINOS Y CONDICIONES:</u></h5>
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
                    <img src='https://desarrollo.coopmorteros.coop/public/images/otros/logo_renaper.png' className='w-1/2 lg:w-1/5 mt-5' />
                    <div className="w-full mt-10 text-center">
                        <input type="checkbox" id="terminosCondiciones" name="terminosCondiciones" value="" checked={isChecked} onChange={handleCheckboxChange} />
                        <label for="terminosCondiciones"> He leído y acepto los <a><b>Términos y Condiciones</b></a> de uso</label>
                    </div>
                    <div className='w-full mt-2 flex justify-center'>
                        {isChecked ? (
                            <Link to={'/authentication'}>
                                <Button props={{ class: 'botonPrincipal m-2', text: `Siguiente` }} />
                            </Link>
                        ) : (
                            <span className="text-gray-400">Siguiente</span>
                        )}
                    </div>
                </div>
            </div>
            <div className={`${viewtrheeMode}`}>
                <h2 className="text-left mb-3">Subir a Nivel 3 <div onClick={() => handleVolver()} className='float-right'>
                    <ButtonAnimate props={{ icon: <FaArrowLeft className='text-white' />, text: 'volver', bgIcon: 'bg-blue-400 mr-5', color: 'text-white' }} />
                </div></h2>
                <hr />
                <div className={`flex flex-wrap w-full justify-center ${viewtrheeMode}`}>
                    <div className='w-full p-3 text-left'>
                        <p>Para seguir con el proceso de Subir a Nivel 3, vamos a requerir que completes tus Datos Personales: nombre completo, número de documento y sexo. </p>
                    </div>
                    <div className='w-full md:px-5 mb-3'>
                        <CardBasic
                            props={{
                                phone: "",
                                subtitle: (
                                    <form id='newDateCustomer' className="w-full flex flex-wrap justify-center">
                                        <div className='w-full lg:w-1/3 p-2'>
                                            <InputGroup props={{ id: 'nameNew', name: 'nameNew', label: "Nombre y Apellido Completo", type: "text", ph: 'Ingresa tu Nombre Completo' }} />
                                        </div>
                                        <div className='w-full lg:w-1/3 p-2'>
                                            <InputGroup props={{ id: 'dniNew', name: 'dniNew', label: "DNI", type: "text", ph: 'Ingresa tu DNI (sin puntos)' }} />
                                        </div>
                                        <div className='w-full lg:w-1/3 p-2'>
                                            <SelectGroup props={{ id: 'sexNew', name: 'sexNew', label: 'Sexo', req: true, options: [{ id: 1, name: 'Femenino' }, { id: 2, name: 'Masculino' }] }} />
                                        </div>
                                    </form>
                                ),
                                widht: "w-full m-0",
                                bg: "bg-white",
                                positionBtn: "absolute",
                                hover: 'false'
                            }}
                        />
                    </div>
                    <p className='text-red-500 px-5'>*Las imagenes deben ser de tipo: PNG, JPG, JPEG o GIF</p>
                    <div className='w-full flex flex-wrap justify-center'>
                        <div className='w-1/2 justify-center flex flex-wrap'>
                            <FileUpload name={`Frente`} ref={fileInputRefFrente} />
                            <div onClick={() => swals({
                                icon: 'warning',
                                confirm: 'Tomar Foto',
                                cancel: 'Adjuntar Foto',
                                actionConfirm: () => swalsCallback(fileInputRefFrente),
                                actionCancel: () => fileInputRefFrente.current && fileInputRefFrente.current.openFileInput(),
                            })} className='justify-center flex items-end'>
                                <Button props={{ class: 'botonesAceptar m-2', text: `Foto Frente DNI` }} />
                            </div>
                        </div>
                        <div className='w-1/2 justify-center flex flex-wrap '>
                            <FileUpload name={`Dorso`} ref={fileInputRefDorso} />
                            <div onClick={() => swals({
                                icon: 'warning',
                                confirm: 'Tomar Foto',
                                cancel: 'Adjuntar Foto',
                                actionConfirm: () => swalsCallback(fileInputRefDorso),
                                actionCancel: () => fileInputRefDorso.current && fileInputRefDorso.current.openFileInput(),
                            })} className='justify-center flex items-end'>
                                <Button props={{ class: 'botonesAceptar m-2', text: `Foto Dorso DNI` }} />
                            </div>
                        </div>
                    </div>
                    <Button props={{ class: 'botonPrincipal m-2 mt-5', text: `Siguiente` }} />
                </div>
            </div>
        </div>
    )
}

export default leveltres