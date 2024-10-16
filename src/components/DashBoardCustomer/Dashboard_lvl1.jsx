import { FaInfoCircle, FaArrowAltCircleUp, FaHandshake, FaRegListAlt } from 'react-icons/fa'

import styles from '../../components/CardBasic/Card.module.css'

import CardCustom from '../CardCustom'
import Button from '../Button'
import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import { UserContext } from '../../contexts/UserContext'
import StatusProcedure from '../../modules/serviceProcedures/components/StatusProcedure/StatusProcedure'

function DashboardLvl1() {
	//   var level = JSON.parse(localStorage.getItem('usuario')).level
	const { usuario } = useContext(UserContext)
	const [statusModeA, setstatusModeA] = useState('')
	const [statusModeI, setstatusModeI] = useState('hidden')
	const [statusColorA, setstatusColorA] = useState(`dark:bg-zinc-800 bg-gray-200 `)
	const [statusColorI, setstatusColorI] = useState(`bg-white dark:bg-zinc-900`)
	const dropModestatus = (status) => {
		setstatusModeA(status === 'active' ? '' : 'hidden')
		setstatusModeI(status === 'active' ? 'hidden' : '')
		setstatusColorA(status === 'active' ? `dark:bg-zinc-800 bg-gray-200` : `bg-white dark:bg-zinc-900`)
		setstatusColorI(status === 'active' ? `bg-white dark:bg-zinc-900` : `dark:bg-zinc-800 bg-gray-200 `)
	}

	return (
		<>
			<div className={`${styles.card} ${styles.shadowCards} bg-white dark:bg-zinc-700 w-full text-center`}>
				<p>
					Hola <b>{usuario.name || ''}</b>, te damos la bienvenida a tu
				</p>
				<h2>Oficina Virtual</h2>
			</div>
			<div className='flex w-full flex-wrap'>
				<div className='w-full md:w-1/4 lg:w-1/4'>
					<Link to={'/MultiStepForm'}>
						<CardCustom className={`p-8 rounded-[2.5em] m-3 flex align-middle justify-center ${styles.cardHover} shadowCards dark:bg-zinc-700 dark:text-gray-300 w-auto`}>
							<div className={styles.cardContent}>
								<div className={`${styles.cardTop} me-4`}>
									<div className='w-full'>
										Solicitar un
										<br />
										<span className={`text-yellow-500`}>Servicio</span>
									</div>
								</div>
							</div>
							<div className={`h-full`}>
								<div className={`${styles.icon} bg-yellow-400 text-yellow-900`}>
									<FaHandshake className='w-full' />
								</div>
							</div>
						</CardCustom>
					</Link>
				</div>
				<div className='w-full md:w-1/4 lg:w-1/4'>
					<Link to={'/myRequests'}>
						<CardCustom className={`p-8 rounded-[2.5em] m-3 flex align-middle justify-center ${styles.cardHover} shadowCards dark:bg-zinc-700 dark:text-gray-300 w-auto`}>
							<div className={styles.cardContent}>
								<div className={`${styles.cardTop} me-4`}>
									<div className='w-full'>
										Ver estado de
										<br />
										<span className={`text-teal-500`}>Mi tramite</span>
									</div>
								</div>
							</div>
							<div className={`h-full`}>
								<div className={`${styles.icon} bg-teal-400 text-teal-900`}>
									<FaRegListAlt className='w-full' />
								</div>
							</div>
						</CardCustom>
					</Link>
				</div>
				<div className='w-full md:w-1/4 lg:w-1/4'>
					<Link to={'/LevelUp2'}>
						<CardCustom className={`p-8 rounded-[2.5em] m-3 flex align-middle justify-center ${styles.cardHover} shadowCards dark:bg-zinc-700 dark:text-gray-300 w-auto`}>
							<div className={styles.cardContent}>
								<div className={`${styles.cardTop} me-4`}>
									<div className='w-full'>
										Subir al
										<br />
										<span className={`text-green-500`}>Nivel 2</span>
									</div>
								</div>
							</div>
							<div className={`h-full`}>
								<div className={`${styles.icon} bg-green-400 text-green-900`}>
									<FaArrowAltCircleUp className='w-full' />
								</div>
							</div>
						</CardCustom>
					</Link>
				</div>
				<div className='w-full md:w-1/4 lg:w-1/4'>
					<Link to={'/Information'}>
						<CardCustom className={`p-8 rounded-[2.5em] m-3 flex align-middle justify-center ${styles.cardHover} shadowCards dark:bg-zinc-700 dark:text-gray-300 w-auto`}>
							<div className={styles.cardContent}>
								<div className={`${styles.cardTop} me-4`}>
									<div className='w-full'>
										Informacion <br />
										<span className={`text-sky-500`}>Util</span>
									</div>
								</div>
							</div>
							<div className={`h-full`}>
								<div className={`${styles.icon} bg-sky-400 text-sky-900`}>
									<FaInfoCircle className='w-full' />
								</div>
							</div>
						</CardCustom>
					</Link>
				</div>
			</div>

			<div className={`w-full rounded-xl px-7 mt-10`}>
				<StatusProcedure estadoActual='Trámite tomado' />
			</div>
			<div className={`w-full rounded-xl px-7 mt-10`}>
				<div className='flex w-full'>
					<div onClick={() => dropModestatus('active')} className={`w-1/2 p-3 rounded-t-xl cursor-pointer text-center ${statusColorA}`}>
						Nivel 1
					</div>
					<div onClick={() => dropModestatus('inactive')} className={`w-1/2 rounded-t-xl p-3 cursor-pointer text-center ${statusColorI}`}>
						Nivel 2
					</div>
				</div>
				<div
					className={`w-full bg-gray-200 text-xl leading-6 p-5 dark:bg-zinc-800 mb-5 justify-center ${statusModeA}`}
					style={{
						boxShadow: `0px 0px 15px rgba(138, 138, 138, 0.43)`,
					}}
				>
					<p>Este Nivel es el punto de partida para comenzar a Interactuar con tu Oficina Virtual.</p>
					<b>
						<u>Beneficios: </u>
					</b>
					<ul className='mt-2'>
						<li> - Información Útil.</li>
						{/* <li> - Cargar o editar tu Currículum.</li> */}
					</ul>
					<p className='text-center mt-3'>Para poder tener más Beneficios te invitamos a Subir al Nivel 2.</p>
				</div>
				<div
					className={`w-full bg-gray-200 text-xl leading-6 p-5 dark:bg-zinc-800 mb-5 justify-center ${statusModeI}`}
					style={{
						boxShadow: `0px 0px 15px rgba(138, 138, 138, 0.43)`,
					}}
				>
					<b>
						<u>Beneficios: </u>
					</b>
					<ul className='mt-2'>
						<li> - Información Útil.</li>
						{/* <li> - Cargar o editar tu Currículum.</li> */}
						<li> - Descargar Facturas.</li>
						<li>
							<b> - Realizar Pago de Servicios.</b>
						</li>
					</ul>
					<p className='my-3'>Además podés Consultar:</p>
					<ul className='mt-2'>
						{/* <li> - Historial y Estado de tus Trámites.</li> */}
						<li> - Facturas Impagas.</li>
						<li> - Historial de Facturas.</li>
						<li> - Historial de Pagos.</li>
						<li> - Servicios adquiridos y su Estado.</li>
						<li> - Cuentas a tu cargo.</li>
						<li>
							<b> - Saldo General.</b>
						</li>
					</ul>
					<p className='text-center mt-3'>Para aprovechar todos estos Beneficios, Subí de Nivel completando con tus Datos Personales.</p>
					<div className='w-full flex justify-center'>
						<Link to={'/LevelUp2'}>
							<Button
								props={{
									class: 'text-black bg-yellow-400 hover:bg-white focus:bg-yellow-400 m-2',
									text: `Subir a Nivel 2`,
								}}
							/>
						</Link>
					</div>
				</div>
			</div>
		</>
	)
}

export default DashboardLvl1
