import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../contexts/UserContext'
import Home from '../Home'
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Button } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { request } from '../../utils/request'

const PayMethods = () => {
	const { payConcept, account } = useContext(UserContext)
	const [payMethods, setPayMethods] = useState([])
	const [payLink, setPayLink] = useState([])
	const total = payConcept.reduce((acc, concept) => acc + parseFloat(concept.amount), 0)
	const getPayMethods = async () => {
		const dataMethods = await request(import.meta.env.VITE_APP_API_URL + '/payMethods', 'GET')
		if (dataMethods.status !== 200) throw new Error('Error en consulta')
		if (dataMethods.data.length === 0) throw new Error('No se encontraron metodos de pago')
		if (dataMethods.data.length === 1) getLinkPayment(dataMethods.data[0].id_method)
		setPayMethods(dataMethods.data)
	}
	if (payConcept.length === 0) {
		return <Home />
	}
	const getLinkPayment = async (method) => {
		const linkPayment = await request(import.meta.env.VITE_APP_API_URL + '/payLink', 'POST', { total, account, method, bills: payConcept })
		setPayLink([linkPayment.data.url])
	}
	const openLink = async (index) => {
		window.open(payLink[index], '_blank')
	}
	useEffect(() => {
		getPayMethods()
	}, [])
	return (
		<>
			<div className='flex relative flex-wrap w-full mt-5 justify-center items-center'>
				<h2 className='text-center max-sm:text-start max-sm:w-3/4 max-sm:text-3xl mb-5 m-0'> Resumen de pago</h2>
			</div>
			<div className='flex flex-row w-full flex-wrap mt-5 justify-center rounded-xl pt-5 p-10 bg-white dark:bg-zinc-800'>
				<a>¿Necesitas ayuda para realizar el pago? Haz clic aquí</a>
				<div className='w-5/6'>
					<b className='text-2xl underline'>Concepto</b>
					{payConcept.map((concept, index) => (
						<div key={index} className='w-full my-5'>
							<p className='text-lg'>
								Factura {concept.type} {concept.id} - Periodo {concept.period}
							</p>
						</div>
					))}
				</div>
				<div className='w-1/6'>
					<b className='text-2xl underline'>Total</b>
					{payConcept.map((concept, index) => (
						<div key={index} className='w-full my-5'>
							<p className='text-lg'>$ {parseFloat(concept.amount).toFixed(2)}</p>
						</div>
					))}
				</div>
				<div className='w-5/6'></div>
				<div className='w-1/6'>
					<div className='md:w-2/3 w-full mb-3'>
						<hr />
					</div>
					<b className='text-xl'>$ {parseFloat(total).toFixed(2)}</b>
				</div>
				{payMethods.length === 1 ? (
					<div className='w-full flex flex-row justify-center'>
						<Button onClick={() => openLink(0)} variant='contained' style={{ backgroundColor: 'rgb(252, 211, 77)' }}>
							Ir a pagar
						</Button>
					</div>
				) : (
					<div className='text-center w-full md:w-1/2 my-5'>
						<h3 className='mb-10'>Seleccione un metodo de pago</h3>
						{payMethods.map((method, index) => (
							<Accordion key={index}>
								<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel${index}-content`} id={`panel${index}-header`}>
									<img src={`${method.PaysMethod.logo}`} alt='PayFun' className='w-32' />
								</AccordionSummary>
								<AccordionDetails className='text-start'>
									<ul>
										<li>12 cuotas sin interés</li>
										<li>Descuento con bancos seleccionados</li>
									</ul>
								</AccordionDetails>
								<AccordionActions>
									<Button variant='contained' style={{ backgroundColor: 'rgb(252, 211, 77)', color: 'black' }}>
										Pagar con {method.PaysMethod.name}
									</Button>
								</AccordionActions>
							</Accordion>
						))}
					</div>
				)}
			</div>
		</>
	)
}

export default PayMethods
