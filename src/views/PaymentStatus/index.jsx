import { Button } from '@mui/material'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const PaymentStatus = () => {
    const { status } = useParams()
    const navigate = useNavigate()
    const handleHome = () => {
        navigate('/')
    }
    return (
        <div className='w-full h-full flex justify-center items-center'>
            <div>
                {status === 'success' ? (
                    <div className='text-center'>
                        <h1>Pago exitoso</h1><br />
                        <h4>Su pago ha sido aprobado y se verá reflejado en su cuenta en las próximas horas</h4>
                    </div>
                ) : (
                    <div className='text-center'>
                        <h1>Pago rechazado</h1> <br />
                        <h4>Hubo un problema con su pago, por favor intente nuevamente</h4>
                    </div>
                )}
                <div className='flex justify-center mt-10'>
                    <Button variant='contained' style={{ backgroundColor: 'rgb(252, 211, 77)' }} onClick={handleHome}>Volver al inicio</Button>
                </div>
            </div>
        </div>
    )
}

export default PaymentStatus