import React, { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import LoaderComponent from '../../components/Loader'
import { useNavigate } from 'react-router-dom'

const PaymentWaiting = () => {
	const { payConcept, setPayConcept } = useContext(UserContext)
	const navigate = useNavigate()
	if (payConcept.length === 0) navigate('/')

	return (
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
	)
}

export default PaymentWaiting
