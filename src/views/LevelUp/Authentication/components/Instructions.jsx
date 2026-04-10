import React from 'react';
import style from '../../levelUp.module.css';
import { Button } from '@mui/material';

const Instructions = ({ info, isSmallScreen, Stopdesenfoque }) => (
    <>
        <p className={`mt-3 hidden sm:flex`}>Para subir al Nivel 3, primero debemos validar tu identidad para que una vez que subas de nivel, puedas realizar cualquier tipo de trámite con total seguridad y protección de tus datos.</p>
        <h5 className={`text-center p-3 ${style.titleSmall} ${info}`}>Utilizamos la Plataforma SID para comprobar la identidad de: COSTAMAGNA FABIAN NESTOR.</h5>
        {isSmallScreen && (
            <div className={`w-full flex flex-wrap justify-center pr-5 ${style.textSmall} ${info}`}>
                <div className={`w-full flex flex-wrap justify-center pr-5 sm:hidden ${style.textSmall} ${info}`}>
                    <div className='w-full justify-center flex mt-7'>
                        <img className='mb-4 mt-3 mr-4 w-1/3' src='https://app.coopmorteros.coop/public/images/nivel_3/Camara1.png' />
                    </div>
                    <p className='mb-0 text-xs w-full'>
                        <span className={`bg-orange-300 text-orange-700 text-center ${style.numberSmall}`}>1</span>BUSCA UN LUGAR ILUMINADO Y CON FONDO CLARO LISO.
                    </p>
                    <p className='mb-0 text-xs w-full'>
                        <span className={`bg-orange-300 text-orange-700 text-center ${style.numberSmall}`}>2</span>EVITÁ ANTEOJOS O ALGO QUE DIFICULTE EL PROCESO.
                    </p>
                    <p className='mb-0 text-xs w-full'>
                        <span className={`bg-orange-300 text-orange-700 text-center ${style.numberSmall}`}>3</span>POSÁ CON UNA EXPRESIÓN.
                    </p>
                    <p className='mb-0 text-xs w-full'>
                        <span className={`bg-orange-300 text-orange-700 text-center ${style.numberSmall}`}>4</span>ESPERÁ HASTA QUE VALIDEMOS TU IDENTIDAD
                    </p>
                    <div className='m-5 w-1/2' onClick={() => Stopdesenfoque()}>
                        <Button sx={{
                            backgroundColor: '#FDBA74',
                            color: '#7C2D12',
                            width: '100%',
                            '&:hover': {
                                backgroundColor: '#FDBA74'
                            }
                        }} className='AeromaticsRegular rounded-xl' variant="contained"><b>Comenzar</b></Button>
                    </div>
                </div>
            </div>
        )}
    </>
);

export default Instructions;
