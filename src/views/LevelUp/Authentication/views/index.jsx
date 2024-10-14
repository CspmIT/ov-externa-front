import React, { useEffect, useState, useRef } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import style from '../../levelUp.module.css';
import Instructions from '../components/Instructions';
import CardStep from '../components/CardStep';
import ButtonAnimate from '../../../../components/ButtonAnimate';
import swals from '../../../../routes/swals';
import Swal from 'sweetalert2';
import ViewVideo from '../components/ViewVideo';
import * as faceapi from 'face-api.js'

const AuthenticationPhotoSID = () => {
    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const [file, setFile] = useState(null);
    const [info, setInfo] = useState('');
    const [marco, setMarco] = useState('hidden');
    const [title, setTitle] = useState('Subir a Nivel 3');

    const isSmallScreen = window.innerWidth < 550;

    const loadFaceAPI = async () => {
        try {
           await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
           await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
           await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
           await faceapi.nets.faceExpressionNet.loadFromUri('/models');
        } catch (error) {
           console.error('Error loading face-api.js models:', error);
        }
     };

    useEffect(() => {
        if (!isSmallScreen) {
            principal();
        } else {
            handleCapture();
            setTitle('');
        }
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
    };

    const abrirModal = (numeroModal) => {
        handleStopCapture();
        const fondo = numeroModal === 1 || numeroModal === 3 ? 'fondoAlertNaranja' : 'fondoAlertRosa';
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
                popup: `${fondo}`
            }
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
        handleStopCapture();
        const videoElement = document.createElement('video');
        videoElement.autoplay = true;
        videoElement.classList.add(style.videoPopUp);

        const constraints = {
            video: true
        };
        navigator.mediaDevices
            .getUserMedia(constraints)
            .then((streamObj) => {
                streamRef.current = streamObj;
                videoElement.srcObject = streamObj;
                Swal.fire({
                    html: videoElement,
                    imageUrl: `https://desarrollo.coopmorteros.coop/public/images/nivel_3/Paso_5.png`,
                    imageAlt: `Vista Previa`,
                    customClass: {
                        confirmButton: `btnlevel3`,
                        popup: `fondoAlertNaranja`
                    },
                    showCloseButton: true,
                    showConfirmButton: true,
                    confirmButtonText: `Estoy Listo`
                }).then((result) => {
                    handleStopCapture();
                    if (result.isConfirmed) {
                        setTimeout(() => {
                            handleCapture(1);
                        }, 800);
                    }
                });
            })
            .catch((error) => {
                console.error('Error accessing camera:', error);
            });
    };

    const handleCapture = async (screen) => {
        try {
            const constraints = { video: true };
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                if (screen === 1) {
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
    };

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
    };

    const handleStopCapture = () => {
        if (streamRef.current) {
            const stream = streamRef.current;
            const tracks = stream.getTracks();
            tracks.forEach((track) => track.stop());
        }
    };

    const resetFile = () => {
        setFile(null);
        handleCapture();
    };

    useEffect(() => {
        return () => {
            handleStopCapture();
        };
    }, []);

    return (
        <div>
            <Instructions info={info} isSmallScreen={isSmallScreen} Stopdesenfoque={Stopdesenfoque} />
            <CardStep onClick={abrirModal} />
            <div className='absolute right-6 top-20'>
                <Link to={'/LevelUp3'} onClick={handleStopCapture}>
                    <ButtonAnimate icon={<FaArrowLeft className='text-white' />} text={'volver'} bgIcon={'bg-blue-400'} color={'text-white'} />
                </Link>
            </div>
            <ViewVideo videoRef={videoRef} file={file} capture={capture} resetFile={resetFile} marco={marco} />
        </div>
    );
};

export default AuthenticationPhotoSID;
