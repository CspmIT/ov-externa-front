import React, { useContext, useEffect, useState } from 'react'
import ButtonAnimate from '../ButtonAnimate'
import { LuDollarSign } from 'react-icons/lu'
import { FaChartBar, FaFileInvoiceDollar, FaQuestion, FaReceipt, FaUser } from 'react-icons/fa6'
import CardCustom from '../CardCustom'
import LoaderComponent from '../Loader'
import TableNew from '../TableNew'
import ButtonFloating from '../ButtonFloating'
import { Box, Modal } from '@mui/material'
import ModalHelpHome from '../ModalHelpHome'
import { Link } from 'react-router-dom'
import { InvoiceDeus, columns, columnsCel } from '../../utils/invoice'
import { UserContext } from '../../contexts/UserContext'
import ModalSocio from '../ModalSocio'
function DashboardLvl2() {
	const [invoices, setInvoices] = useState([])
	const [columnsTable, setColumnsTable] = useState([])
	const [openModalHelp, setOpenModalHelp] = useState(false)
	const [openModalSocio, setOpenModalSocio] = useState(false)
	const [amountpay, setAmountpay] = useState(0)
	const [amountTotalpay, setAmountTotalpay] = useState(0)
	const handleOpenModalHelp = () => setOpenModalHelp(true)
	const handleCloseModalHelp = () => setOpenModalHelp(false)
	const handleOpenModalSocio = () => setOpenModalSocio(true)
	const handleCloseModalSocio = () => setOpenModalSocio(false)
	const { usuario, account, setPayConcept } = useContext(UserContext)

	const [widthPhone, setWidthPhone] = useState(window.innerWidth <= 768)
	const changeScreen = () => {
		setWidthPhone(window.innerWidth <= 768)
	}
	const handlePayMethod = () => { }
	useEffect(() => {
		window.addEventListener('resize', changeScreen)
		return () => {
			window.removeEventListener('resize', changeScreen)
		}
	}, [])

	useEffect(() => {
		if (account.length !== 0 && account.active) {
			const invoiceList = async () => {
				try {
					const data = await InvoiceDeus(account)
					let dataTable = []
					if (widthPhone) {
						if (typeof data === 'object') {
							dataTable = data.map((item) => ({
								account: item.account,
								...item,
							}))
						}
						setColumnsTable(columnsCel)
					} else {
						dataTable = data
						setColumnsTable(columns)
					}
					dataTable.sort((a, b) => {
						if (b.status < a.status) return 1;
						if (b.status > a.status) return -1;
						return 0;
					});
					setInvoices(dataTable)
				} catch (error) {
					console.log('Error al obtener datos:', error)
				}
			}
			invoiceList()
		}
	}, [widthPhone, account])
	const handleAmountPay = (amount) => {
		setAmountpay(amount[0])
		setAmountTotalpay(amount[1])
		setPayConcept(amount[2])
	}

	return (
		<>
			<div className='w-full px-2 max-md:px-3'>
				<div className={`relative rounded-[2.5em] p-8 shadowCards bg-white dark:bg-zinc-700 w-full flex flex-wrap md:hidden`}>
					<img src='https://app.coopmorteros.coop/public/images/logos/Iso_OfiVirtual_Texto_Recortada.png' className='w-full' />
					<div className='pt-4 w-3/4 mt-2'>
						<p className='mb-2'>
							NIVEL: <b>{account.level}</b>
						</p>
						<p className='mb-2'>
							N° de Socio: <b>{account.num}</b>
						</p>
						<p className='mb-2'>{account.name}</p>
					</div>
					<div className='pt-4 w-1/4 flex items-center justify-center'>
						<div className='justify-center flex'>
							<ButtonAnimate onClick={() => handleOpenModalSocio()} icon={<FaUser className='text-white' />} text={'Socio'} bgIcon={'bg-emerald-600'} color={'text-white'} animation={'false'} />
						</div>
						{/* <div className='mt-2 justify-center flex'>
							<ButtonAnimate icon={<FaPlus className='text-white' />} text={'Seleccionar Socio'} bgIcon={'bg-amber-300'} color={'text-white'} animation={'false'} />
						</div> */}
					</div>
				</div>
				<div className='flex flex-wrap '>
					<Link className='w-1/5 min-w-44 max-md:w-full'>
						<CardCustom
							className={`relative rounded-[2.5em] m-2 max-md:m-0 p-8 max-md:mt-5 hover:scale-95 transition ease-in-out duration-300 flex items-center shadowCards dark:bg-zinc-700 dark:text-gray-300 max-md:w-full`}
						>
							<div className={`bg-red-400 text-red-900 text-xl absolute right-5 max-xl:right-2 max-md:right-7 p-2 rounded-full`}>
								<LuDollarSign className='w-full' />
							</div>
							<div className='flex flex-col w-full'>
								<p className='text-xl font-bold m-0 mb-1'>SALDO</p>
								<p className={`text-red-500 m-0`}>${amountTotalpay}</p>
							</div>
						</CardCustom>
					</Link>
					<Link to={'/Invoice'} className='w-1/5 min-w-44 max-md:hidden'>
						<CardCustom className={`relative rounded-[2.5em] m-2 p-8 max-md:mt-3 hover:scale-95 transition ease-in-out duration-300 flex items-center shadowCards dark:bg-zinc-700 dark:text-gray-300`}>
							<div className={`absolute right-5 max-xl:right-2 p-2 rounded-full text-xl bg-yellow-400 text-yellow-900`}>
								<FaFileInvoiceDollar className='w-full' />
							</div>
							<div className='flex flex-col w-full'>
								<p className='text-xl font-bold m-0 mb-1'>Mis</p>
								<p className={`text-yellow-500 m-0`}>FACTURAS</p>
							</div>
						</CardCustom>
					</Link>
					<Link to={'/Payments'} className='w-1/5 min-w-44 max-md:hidden'>
						<CardCustom className={`relative rounded-[2.5em] m-2 p-8 max-md:mt-3 hover:scale-95 transition ease-in-out duration-300 flex items-center shadowCards dark:bg-zinc-700 dark:text-gray-300`}>
							<div className={`absolute right-5 max-xl:right-2 p-2 rounded-full text-xl bg-blue-400 text-blue-900`}>
								<FaReceipt className='w-full' />
							</div>
							<div className='flex flex-col w-full'>
								<p className='text-xl font-bold m-0 mb-1'>Mis</p>
								<span className={`text-blue-500 m-0`}>PAGOS</span>
							</div>
						</CardCustom>
					</Link>
					<Link to={'/MyServices'} className='w-1/5 min-w-44 max-md:hidden'>
						<CardCustom className={`relative rounded-[2.5em] m-2 p-8 max-md:mt-3 hover:scale-95 transition ease-in-out duration-300 flex items-center shadowCards dark:bg-zinc-700 dark:text-gray-300`}>
							<div className={`absolute right-5 max-xl:right-2 p-2 rounded-full text-xl bg-sky-400 text-sky-900`}>
								<FaReceipt className='w-full' />
							</div>
							<div className='flex flex-col w-full'>
								<p className='text-xl font-bold m-0 mb-1'>Mis</p>
								<span className={`text-sky-500 m-0`}>SERVICIOS</span>
							</div>
						</CardCustom>
					</Link>
					<Link to={'/MyConsumption'} className='w-1/5 min-w-44 max-md:hidden'>
						<CardCustom className={`relative rounded-[2.5em] m-2 p-8 max-md:mt-3 hover:scale-95 transition ease-in-out duration-300 flex items-center shadowCards dark:bg-zinc-700 dark:text-gray-300`}>
							<div className={`absolute right-5 max-xl:right-2 p-2 rounded-full text-xl bg-pink-400 text-pink-900`}>
								<FaChartBar className='w-full' />
							</div>
							<div className='flex flex-col w-full'>
								<p className='text-xl font-bold m-0 mb-1'>Mis</p>
								<span className={`text-pink-500 m-0`}>CONSUMOS</span>
							</div>
						</CardCustom>
					</Link>
				</div>

				<CardCustom className={'md:1/2 p-5 max-md:p-2 max-md:py-5 mt-10'}>
					<div className='flex relative w-full'>
						<h3 className=' text-left mb-5'>Facturas Impagas</h3>
						<div className='absolute right-2 top-0'>
							<ButtonAnimate onClick={handleOpenModalHelp} icon={<FaQuestion className='text-white' />} text={'Ayuda'} bgIcon={'bg-gray-400'} color={'text-white'} />
						</div>
					</div>
					{columnsTable.length < 1 ? (
						<div className='flex w-full justify-center items-center'>
							<LoaderComponent />
						</div>
					) : (
						<div className={`relative overflow-x-auto w-full rounded-xl`}>
							<TableNew widthPhone data={invoices} columns={columnsTable} groupBy={'account'} checkbox={true} amountPay={handleAmountPay} />
						</div>
					)}
					{amountpay > 0 ? (
						<Link to={'/payMethods'}>
							<ButtonFloating>
								<p className='p-0 m-0'>Pagar</p>
								<p className='p-0 m-0'>$ {amountpay}</p>
							</ButtonFloating>
						</Link>
					) : null}
				</CardCustom>
			</div>
			<Modal className='flex justify-center items-center' open={openModalHelp} onClose={handleCloseModalHelp} aria-labelledby='parent-modal-title' aria-describedby='parent-modal-description'>
				<Box className={'w-full flex justify-center items-center'}>
					<ModalHelpHome handleCloseModal={handleCloseModalHelp} />
				</Box>
			</Modal>
			<Modal className='flex justify-center items-center !z-50' open={openModalSocio} onClose={handleCloseModalSocio} aria-labelledby='parent-modal-title' aria-describedby='parent-modal-description'>
				<Box className={'w-full flex justify-center items-center'}>
					<ModalSocio handleCloseModal={handleCloseModalSocio} />
				</Box>
			</Modal>
		</>
	)
}

export default DashboardLvl2
