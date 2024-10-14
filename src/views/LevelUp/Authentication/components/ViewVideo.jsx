import React from 'react';
import { Button } from '@mui/material';
import style from '../../levelUp.module.css';

const ViewVideo = ({ videoRef, file, capture, resetFile, marco }) => {
    return (
        <>
            <img className={`${style.imagenRecuadro} ${marco} sm:hidden`} src='https://app.coopmorteros.coop/public/images/otros/lector_ROSTRO.png' />
            <div onClick={() => capture()} className={`w-1/2 sm:hidden ${marco} ${style.btnComprarSmall}`}>
                <Button sx={{
                    backgroundColor: '#FDBA74',
                    color: '#7C2D12',
                    width: '100%',
                    '&:hover': {
                        backgroundColor: '#FDBA74'
                    }
                }} className='AeromaticsRegular rounded-xl' variant="contained"><b>Capturar</b></Button>
            </div>
            {file ? (
                <>
                    <img src={URL.createObjectURL(file)} alt='Preview' style={{ maxWidth: '100%', width: 400, height: 300 }} className='mt-10' />
                    <div className='justify-center flex w-full'>
                        <div className='p-2' onClick={resetFile}>
                            <Button className='botonesCancelar rounded-xl' variant="contained"><b>Rehacer Foto</b></Button>
                        </div>
                        <div className='p-2'>
                            <Button className='botonesAceptar rounded-xl' variant="contained"><b>Autenticar</b></Button>
                        </div>
                    </div>
                </>
            ) : (
                <div className='w-full flex justify-center'>
                    <video className={`bg-gray-100 dark:bg-zinc-900 mt-10 ${style.videoCompleto}`} ref={videoRef} autoPlay playsInline />
                </div>
            )}
        </>
    );
};

export default ViewVideo;
