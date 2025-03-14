import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Button } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { request } from '../../utils/request'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { Wallet, initMercadoPago } from '@mercadopago/sdk-react'
import LoaderComponent from '../../components/Loader'

const PayMethods = () => {
	initMercadoPago('TEST-4bc41165-0753-4820-9c96-31085c50fe3c')
	const navigate = useNavigate()
	const { payConcept, account } = useContext(UserContext)
	// SI NO HAY FACTURAS SELECCIONADAS REDIRIJO AL HOME
	if (payConcept.length === 0) navigate('/')
	const [payMethods, setPayMethods] = useState([])
	const [payLink, setPayLink] = useState([])
	const [linkMp, setLinkMp] = useState(false)
	const [loading, setLoading] = useState(true)
	const total = payConcept.reduce((acc, concept) => acc + parseFloat(concept.amount), 0)

	// BUSCO TODOS LOS METODOS DE PAGO QUE TIENE HABILITADOS LA EMPRESA
	const getPayMethods = async () => {
		const dataMethods = await request(import.meta.env.VITE_APP_API_URL + '/payMethods', 'GET')
		if (dataMethods.status !== 200) throw new Error('Error en consulta')
		if (dataMethods.data.length === 0) throw new Error('No se encontraron metodos de pago')
		// SI LA EMPRESA SOLO TIENE UN PAGO Y ESTE ES MERCADO PAGO GENERO EL BOTON AL MOSTRAR LA VENTANA
		if (dataMethods.data.length === 1 && dataMethods.data[0].id_method === 1) checkMethod(dataMethods.data[0])
		setPayMethods(dataMethods.data)
	}

	// OBTENGO EL LINK DE PAGO DE LA FACTURA Y REDIRIJO A LA PAGINA DE PAGO (EXCEPTO QUE SEA MERCADO PAGO)
	const handleGetLink = async (method, index) => {
		const link = payLink[index] || (await getLinkPayment(method.id_method, index))
		window.open(link, '_blank')
		paymentStatusWindow()
	}
	const getLinkPayment = async (method, index) => {
		try {
			const linkPayment = await request(import.meta.env.VITE_APP_API_URL + '/payLink', 'POST', { total, account, method, bills: payConcept })
			const links = [...payLink]
			links[index] = linkPayment.data.url
			setPayLink(links)
			setLoading(false)
			return linkPayment.data.url
		} catch (e) {
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'No se pudo realizar el pago, intente nuevamente',
			})
			throw new Error(e.message)
		}
	}
	// FUNCION PARA GENERAR EL BOTON DE PAGO DE MERCADO PAGO CUANDO SE ABRA EL ACORDEON DE MERCADO PAGO
	const checkMethod = async (method) => {
		if (method.id_method !== 1 || linkMp) return
		const preference = await getLinkPayment(1, 0)
		setLinkMp(preference)
	}
	const paymentStatusWindow = () => {
		// SI SE USA EL SOCKET MAS ADELANTE USAREMOS ESTA
		// navigate('/payWaiting')
		navigate('/')
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
				{loading && <LoaderComponent text={'Cargando metodos de pago'} />}
				{payMethods.length === 1 ? (
					<div className='w-full flex flex-row justify-center mt-5'>
						{payMethods[0].id_method === 1 && linkMp && (
							<span onClick={paymentStatusWindow}>
								<Wallet initialization={{ preferenceId: linkMp, redirectMode: 'blank' }} customization={{ texts: { valueProp: 'practicality' } }} />
							</span>
						)}
						{payMethods[0].id_method !== 1 && (
							<Button onClick={() => handleGetLink(payMethods[0], 0)} variant='contained' style={{ backgroundColor: 'rgb(252, 211, 77)' }}>
								Ir a pagar
							</Button>
						)}
					</div>
				) : (
					<div className='text-center w-full md:w-1/2 my-5'>
						<h3 className='mb-10'>Seleccione un metodo de pago</h3>
						{payMethods.map((method, index) => (
							<Accordion key={index}>
								<AccordionSummary onClick={() => checkMethod(method)} expandIcon={<ExpandMoreIcon />} aria-controls={`panel${index}-content`} id={`panel${index}-header`}>
									<img src={`${method.PaysMethod.logo}`} alt={method.PaysMethod.name} className='w-32' />
								</AccordionSummary>
								<AccordionDetails className='text-start'>
									<ul>
										<li>12 cuotas sin interés</li>
										<li>Descuento con bancos seleccionados</li>
									</ul>
								</AccordionDetails>
								<AccordionActions>
									{method.id_method !== 1 && (
										<Button onClick={() => handleGetLink(method, index)} variant='contained' style={{ backgroundColor: 'rgb(252, 211, 77)', color: 'black' }}>
											Pagar con {method.PaysMethod.name}
										</Button>
									)}
									{method.id_method === 1 && !linkMp && <LoaderComponent text={false} />}
									{method.id_method === 1 && linkMp && (
										<span onClick={paymentStatusWindow}>
											<Wallet initialization={{ preferenceId: linkMp, redirectMode: 'blank' }} customization={{ texts: { valueProp: 'practicality' } }} />
										</span>
									)}
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
