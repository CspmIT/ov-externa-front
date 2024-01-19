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
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });

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
                            <Button props={{ class: 'text-white border border-red-500 bg-gradient-to-b from-red-500 to-red-900 m-2', text: `Borrar Foto` }} />
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
                            <Button props={{ class: 'text-white border border-orange-500 bg-gradient-to-b from-orange-500 to-orange-900 m-2', text: `Capturar ${name}` }} />
                        </div>
                        <div onClick={handleStopCapture}>
                            <Button props={{ class: 'text-white border border-purple-500 bg-gradient-to-b from-purple-500 to-purple-900 m-2', text: `Cancelar` }} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
});

export default FileUpload;



