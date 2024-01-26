import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react';
import Button from '../Button';
import styles from "./FileUpload.module.css";

const FileUpload = forwardRef((props, ref) => {
    const [file, setFile] = useState(null);
    const videoRef = useRef(null);
    const fileInputRef = useRef(null);
    const [videoMostrar, setvideoMostrar] = useState('hidden');
    const { name } = props;

    const handleCapture = async () => {
        try {
            const isSmallScreen = window.innerWidth < 550;

            let constraints = { video: true };

            if (isSmallScreen) {
                const devices = await navigator.mediaDevices.enumerateDevices();
                const videoDevices = devices.filter(device => device.kind === 'videoinput');
                if (videoDevices.length >= 2) {
                    constraints = { video: { deviceId: { exact: videoDevices[1].deviceId } } };
                }
            }
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setvideoMostrar('');
            }
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    };

    const handleStopCapture = () => {
        if (videoRef.current) {
            const stream = videoRef.current.srcObject;
            if (stream != null) {
                const tracks = stream.getTracks();
                tracks.forEach((track) => track.stop());
                videoRef.current.srcObject = null;
                setvideoMostrar('hidden');
            }
        }
    };

    const handleCaptureImage = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;

        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => {
            setFile(blob);
            handleStopCapture();
        }, 'image/png');
    };

    const resetFile = () => {
        setFile(null);
        setvideoMostrar('hidden');
        handleStopCapture();
    };

    const openFileInput = () => {
        handleStopCapture();
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    useImperativeHandle(ref, () => ({
        openCamera: handleCapture,
        captureImage: handleCaptureImage,
        reset: resetFile,
        openFileInput: openFileInput
    }));

    return (
        <div className='justify-center flex flex-wrap w-full'>
            <label htmlFor={`file${name}`} className="btn btn-dark mb-3"></label>
            <input
                ref={fileInputRef}
                id={`file${name}`}
                type="file"
                name={`file${name}`}
                onChange={(e) => setFile(e.target.files[0])}
                accept="image/*"
                style={{ display: 'none' }}
            />
            {file ? (
                <div >
                    <img
                        src={URL.createObjectURL(file)}
                        alt="Preview"
                        style={{ maxWidth: '100%', maxHeight: '200px' }}
                    />
                    <div className='justify-center flex w-full'>
                        <div onClick={resetFile}>
                            <Button props={{ class: 'botonesCancelar m-2', text: `Borrar Foto` }} />
                        </div>
                    </div>
                </div>
            ) : (
                <div className={`${videoMostrar} flex-wrap justify-center flex`}>
                    <video className={`${styles.video} bg-white dark:bg-zinc-900`} ref={videoRef} autoPlay playsInline style={{ maxWidth: '100%', maxHeight: '200px' }} />
                    <div className={`justify-center flex flex-wrap ${styles.btnFoto}`}>
                        <h5 className='w-full text-center md:mt-5 text-gray-500 uppercase'>TOMAR FOTO DEL {name} DEL DNI</h5>
                        <p className='w-full text-center md:hidden'>Encuadra el {name} del DNI en el marco</p>
                        <img className={`${styles.marco}`} src='https://app.coopmorteros.coop/public/images/otros/lector_DNI.png' />
                        <div id={name} onClick={handleCaptureImage}>
                            <Button props={{ class: 'bg-orange-300 text-orange-700 hoverBtn m-2', text: `Capturar ${name}` }} />
                        </div>
                        <div onClick={handleStopCapture}>
                            <Button props={{ class: 'text-indigo-700 bg-indigo-300 hoverBtn m-2', text: `Cancelar` }} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
});

export default FileUpload;



