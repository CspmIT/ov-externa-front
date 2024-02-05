import React, { useEffect, useRef, useState } from 'react'
import { RiNumber1 } from "react-icons/ri";
import { RiNumber2 } from "react-icons/ri";
import { RiNumber3 } from "react-icons/ri";
import { RiNumber4 } from "react-icons/ri";
import Card from '../../components/Card';
import swals from '../../routes/swals';
import Swal from 'sweetalert2';
import ButtonAnimate from '../../components/ButtonAnimate';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import style from './levelUp.module.css'
import * as faceapi from 'face-api.js';
import Button from '../../components/Button';

const authenticationPhotoSID = () => {
    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const [file, setFile] = useState(null);
    const [info, setInfo] = useState('');
    const [marco, setMarco] = useState('hidden');
    const [title, settitle] = useState('Subir a Nivel 3');

    const isSmallScreen = window.innerWidth < 550;

    const loadFaceAPI = async () => {
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
            await faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
            await faceapi.nets.faceRecognitionNet.loadFromUri('/models')
    };

    useEffect(() => {
        !isSmallScreen ? principal() : handleCapture();
        isSmallScreen ? settitle('') : '';
    }, []);

    const principal = () => {
        swals({
            icon: 'warning',
            html: 'A continuación, podes visualizar un tutorial de los pasos a seguir para realizar el escaneo de tu rostro, si deseas leerlos seleccioná Continuar, sino Omitir',
            confirm: 'Continuar',
            cancel: 'Omitir',
            static: false,
            actionConfirm: () => abrirModal(1),
            actionCancel: () => abrirModalCamara()
        });
    }

    const abrirModal = (numeroModal) => {
        handleStopCapture()
        var fondo = numeroModal == 1 || numeroModal == 3 ? 'fondoAlertNaranja' : 'fondoAlertRosa';
        Swal.fire({
            imageUrl: `https://desarrollo.coopmorteros.coop/public/images/nivel_3/Paso_${numeroModal}.png`,
            imageAlt: `Paso ${numeroModal}`,
            showCloseButton: false,
            showConfirmButton: true,
            confirmButtonText: `Siguiente`,
            allowOutsideClick: false,
            customClass: {
                content: 'text-center',
                confirmButton: `btnlevel3`,
                popup: `${fondo}`,
            },
        }).then((result) => {
            if (result.isConfirmed) {
                if (numeroModal < 4) {
                    abrirModal(numeroModal + 1);
                } else {
                    abrirModalCamara();
                }
            }
        });
    };

    const abrirModalCamara = () => {
        handleStopCapture()
        const videoElement = document.createElement('video');
        videoElement.autoplay = true;
        videoElement.classList.add(style.videoPopUp);

        const constraints = {
            video: true
        };
        navigator.mediaDevices.getUserMedia(constraints)
            .then((streamObj) => {
                streamRef.current = streamObj;
                videoElement.srcObject = streamObj;
                Swal.fire({
                    html: videoElement,
                    imageUrl: `https://desarrollo.coopmorteros.coop/public/images/nivel_3/Paso_5.png`,
                    imageAlt: `Vista Previa`,
                    customClass: {
                        confirmButton: `btnlevel3`,
                        popup: `fondoAlertNaranja`,
                    },
                    showCloseButton: true,
                    showConfirmButton: true,
                    confirmButtonText: `Estoy Listo`
                }).then((result) => {
                    handleClose()
                    if (result.isConfirmed) {
                        setTimeout(() => {
                            handleCapture(1);
                        }, 800)
                    }
                });
            })
            .catch((error) => {
                console.error('Error accessing camera:', error);
            });
    };

    const handleClose = () => {
        handleStopCapture();
    }

    const handleCapture = async (screen) => {
        try {
            let constraints = { video: true };
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                if (screen == 1) {
                    setTimeout(() => {
                        performFacialRecognition();
                    }, 400);
                } else {
                    videoRef.current.classList.add(style.desenfoque);
                }
            }
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    };

    const Stopdesenfoque = async () => {
        if (videoRef.current) {
            videoRef.current.classList.remove(style.desenfoque);
        }
        if (isSmallScreen) {
            setInfo('hidden');
            setMarco('');
        }
        setTimeout(() => {
            performFacialRecognition();
        }, 400);
    }

    const performFacialRecognition = async () => {
        try {
            await loadFaceAPI();

            const intervalId = setInterval(async () => {
                const videoElement = videoRef.current;
                if (!videoElement) {
                    return;
                }
                const detections = await faceapi.detectAllFaces(videoElement, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();

                if (detections.length > 0) {
                    capture(intervalId);
                }
            }, 100);

        } catch (error) {
            console.error('Error loading face-api.js models:', error);
        }
    };

    const capture = (intervalId = false) => {
        const videoElement = videoRef.current;
        if (!videoElement) {
            return;
        }
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(async (blob) => {
            setFile(blob);
        }, 'image/png');

        if (intervalId !== false) {
            clearInterval(intervalId);
        }

        handleStopCapture();
        isSmallScreen ? setMarco('hidden') : '';
    };

    const resetFile = () => {
        setFile(null);
        isSmallScreen ? setMarco('') : '';
        handleCapture(1)
    };

    const handleStopCapture = () => {
        if (streamRef.current) {
            const tracks = streamRef.current.getTracks();
            tracks.forEach(track => track.stop());
            streamRef.current = null;
        }
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
    };

    return (
        <div className='p-2 pb-10 sm:pl-64 pt-20'>
            <h2 className={`text-left mb-3`}> {title}
                <Link to={'/LevelUp3'} onClick={handleStopCapture}>
                    <div className={`float-right ${style.btnSmall}`}>
                        <ButtonAnimate props={{ icon: <FaArrowLeft className='text-white' />, text: 'volver', bgIcon: 'bg-blue-400 mr-5', color: 'text-white' }} />
                    </div>
                </Link>
            </h2>
            <hr />
            <p className='mt-3 hidden sm:flex'>Para subir al Nivel 3, primero debemos validar tu identidad para que una vez que subas de nivel, puedas realizar cualquier tipo de trámite con total seguridad y protección de tus datos.</p>
            <h5 className={`text-center p-3 ${style.titleSmall} ${info}`}>Utilizamos la Plataforma SID para comprobar la identidad de: COSTAMAGNA FABIAN NESTOR.</h5>
            <div className={`w-full flex flex-wrap justify-center pr-5 sm:hidden ${style.textSmall} ${info}`}>
                <div class="w-full justify-center flex mt-7">
                    <img className='mb-4 mt-3 mr-4 w-1/3' src='https://app.coopmorteros.coop/public/images/nivel_3/Camara1.png' />
                </div>
                <p className='mb-0 text-xs w-full'><span className={`bg-orange-300 text-orange-700 text-center ${style.numberSmall}`}>1</span>BUSCA UN LUGAR ILUMINADO Y CON FONDO CLARO LISO.</p>
                <p className='mb-0 text-xs w-full'><span className={`bg-orange-300 text-orange-700 text-center ${style.numberSmall}`}>2</span>EVITÁ ANTEOJOS O ALGO QUE DIFICULTE EL PROCESO.</p>
                <p className='mb-0 text-xs w-full'><span className={`bg-orange-300 text-orange-700 text-center ${style.numberSmall}`}>3</span>POSÁ CON UNA EXPRESIÓN.</p>
                <p className='mb-0 text-xs w-full'><span className={`bg-orange-300 text-orange-700 text-center ${style.numberSmall}`}>4</span>ESPERÁ HASTA QUE VALIDEMOS TU IDENTIDAD</p>
                <div className='w-1/2' onClick={() => Stopdesenfoque()}>
                    <Button props={{ class: 'bg-orange-300 w-full AeromaticsRegular text-orange-700 m-2 rounded-xl shadow-md', text: `Comenzar` }} />
                </div>
            </div>
            <img className={`${style.imagenRecuadro} ${marco} sm:hidden`} src='https://app.coopmorteros.coop/public/images/otros/lector_ROSTRO.png' />
            <div onClick={() => capture()} className={`w-1/2 sm:hidden ${marco} ${style.btnComprarSmall}`}>
                <Button props={{ class: 'bg-orange-300 w-full AeromaticsRegular text-orange-700 m-2 rounded-xl shadow-md', text: `Capturar` }} />
            </div>
            <div className={`w-full  flex-wrap justify-center hidden sm:flex`}>
                <div onClick={() => abrirModal(1)} className="w-full md:w-1/2 xl:w-1/4">
                    <Card
                        props={{
                            phone: "",
                            title: <p className='w-1/2 md:w-3/4'>Buscá un lugar iluminado con fondo claro liso.</p>,
                            icon: <RiNumber1 className="w-full" />,
                            color: "text-yellow-500",
                            bgIcon: "fondoPrincipal",
                            colorIcon: "colorPrincipal",
                            widht: "w-auto",
                            bg: "bg-white",
                            positionBtn: "absolute",
                        }}
                    />
                </div>
                <div onClick={() => abrirModal(2)} className="w-full md:w-1/2 xl:w-1/4">
                    <Card
                        props={{
                            phone: "",
                            title: <p className='w-1/2 md:w-3/4'>Evitá anteojos o algo que dificulte el proceso.</p>,
                            icon: <RiNumber2 className="w-full" />,
                            color: "text-yellow-500",
                            bgIcon: "fondoPrincipal",
                            colorIcon: "colorPrincipal",
                            widht: "w-auto",
                            bg: "bg-white",
                            positionBtn: "absolute",
                        }}
                    />
                </div>
                <div onClick={() => abrirModal(3)} className="w-full md:w-1/2 xl:w-1/4">
                    <Card
                        props={{
                            phone: "",
                            title: <p className='w-1/2 md:w-3/4'>Posá con una expresión neutral.</p>,
                            icon: <RiNumber3 className="w-full" />,
                            color: "text-yellow-500",
                            bgIcon: "fondoPrincipal",
                            colorIcon: "colorPrincipal",
                            widht: "w-auto",
                            bg: "bg-white",
                            positionBtn: "absolute",
                        }}
                    />
                </div>
                <div onClick={() => abrirModal(4)} className="w-full md:w-1/2 xl:w-1/4">
                    <Card
                        props={{
                            phone: "",
                            title: <p className='w-1/2 md:w-3/4'>Esperá hasta que validemos tu identidad.</p>,
                            icon: <RiNumber4 className="w-full" />,
                            color: "text-yellow-500",
                            bgIcon: "fondoPrincipal",
                            colorIcon: "colorPrincipal",
                            widht: "w-auto",
                            bg: "bg-white",
                            positionBtn: "absolute",
                        }}
                    />
                </div>
            </div>
            <div className={`w-full flex flex-wrap justify-center`}>
                {file ? (
                    <div >
                        <img
                            src={URL.createObjectURL(file)}
                            alt="Preview"
                            style={{ maxWidth: '100%', width: 400, height: 300 }}
                            className='mt-10'
                        />
                        <div className='justify-center flex w-full'>
                            <div onClick={resetFile}>
                                <Button props={{ class: 'botonesCancelar m-2', text: `Rehacer Foto` }} />
                            </div>
                            <div>
                                <Button props={{ class: 'botonesAceptar m-2', text: `Autenticar` }} />
                            </div>
                        </div>
                    </div>
                ) : (
                    <video className={`bg-gray-100 dark:bg-zinc-900 mt-10 ${style.videoCompleto}`} ref={videoRef} autoPlay playsInline />
                )}
            </div>
        </div>
    )
}

export default authenticationPhotoSID