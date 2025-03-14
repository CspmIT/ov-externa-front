import React, { useContext, useEffect, useState } from 'react'
import LoaderComponent from '../../components/Loader'
import io from 'socket.io-client'

const PaymentWaiting = () => {
	const [statusPayment, setStatusPayment] = useState(0)
	/* const { payConcept, setPayConcept } = useContext(UserContext)
	const navigate = useNavigate()
	if (payConcept.length === 0) navigate('/') */
	const socket = io('http://localhost:4000/')
	useEffect(() => {
		socket.on('payment', (data) => {
			setStatusPayment(data.status)
		})
		if (statusPayment !== 0) {
			socket.disconnect()
		}
	}, [statusPayment])

	return (
		<>
			{statusPayment === 0 ? (
				<>
					<div className='flex relative flex-wrap w-full mt-5 justify-center items-center'>
						<h2 className='text-center max-sm:text-start max-sm:w-3/4 max-sm:text-3xl mb-5 m-0'> Esperando confirmación de pago...</h2>
					</div>
					<div className='flex flex-col h-full justify-center items-center'>
						<LoaderComponent text={false} />
						<div>
							<h4>No cierre esta ventana mientras esperamos la confirmación de su pago</h4>
						</div>
					</div>
				</>
			) : (
				<div className='flex flex-col h-full justify-center items-center'>
					{statusPayment === 1 && <h2> ¡Pago confirmado! </h2>}
					{statusPayment === 2 && <h2> ¡Pago rechazado! </h2>}
					<h4>Asasasa</h4>
				</div>
			)}
		</>
	)
}

export default PaymentWaiting
