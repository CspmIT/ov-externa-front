import { useContext, useEffect, useState } from 'react'
import { FaQuestion } from 'react-icons/fa'
import ButtonAnimate from '../../components/ButtonAnimate'
import TableNew from '../../components/TableNew'
import LoaderComponent from '../../components/Loader'
import { columns, columnsCel, searchAllInvoice } from '../../utils/invoice'
import { Box, Modal } from '@mui/material'
import ModalHelpHome from '../../components/ModalHelpHome'
import CardCustom from '../../components/CardCustom'
import { UserContext } from '../../contexts/UserContext'

const Invoice = () => {
	const [invoice, setInvoices] = useState(undefined)
	const [columnsTable, setColumnsTable] = useState([])
	const [loadError, setLoadError] = useState(false)
	const [openModalHelp, setOpenModalHelp] = useState(false)
	const handleOpenModalHelp = () => setOpenModalHelp(true)
	const handleCloseModalHelp = () => setOpenModalHelp(false)
	const { account } = useContext(UserContext)
	useEffect(() => {
		if (account.length !== 0) {
			const allInvoice = async () => {
				try {
					const data = await searchAllInvoice(account)
					setColumnsTable(window.innerWidth < 768 ? columnsCel : columns)
					// undefined = fallo la consulta al servidor de facturas
					if (!Array.isArray(data)) {
						setLoadError(true)
						setInvoices([])
						return
					}
					setLoadError(false)
					const dataTable =
						window.innerWidth < 768
							? data.map((item) => ({
									account: item.account,
									info: { ...item },
							  }))
							: data
					setInvoices(dataTable)
				} catch (error) {
					console.log('Error al obtener datos:', error)
					setLoadError(true)
					setInvoices([])
				}
			}
			allInvoice()
		}
	}, [account])

	return (
		<div>
			<div className='flex relative w-full'>
				<h2 className='text-center w-full m-5'>Mis Facturas</h2>
				<div className='absolute right-5 top-5'>
					<ButtonAnimate onClick={handleOpenModalHelp} icon={<FaQuestion className='text-white' />} text={'Ayuda'} bgIcon={'bg-gray-400'} color={'text-white'} />
				</div>
			</div>
			<CardCustom className={'md:1/2 max-sm:p-0 max-sm:py-3 max-sm:m-0 p-5 mt-5 mr-5'}>
                {invoice === undefined ? (
                    <LoaderComponent />
                ) : loadError ? (
					<div className={`relative overflow-x-auto w-full round  rounded-xl text-center`}>
						<h1>En este momento no podemos mostrar tus facturas</h1>
						<p>El servicio de facturación no está disponible. Volvé a intentar en unos minutos.</p>
					</div>
				) :
				invoice?.length > 0 ? (
					<div className={`relative overflow-x-auto w-full round  rounded-xl`}>
						<TableNew data={invoice} columns={columnsTable} groupBy={'account'} />
					</div>
				) : (
					<div className={`relative overflow-x-auto w-full round  rounded-xl text-center`}>
                        <h1>No se encontraron facturas</h1>
					</div>
				)}
			</CardCustom>
			<Modal className='flex justify-center items-center' open={openModalHelp} onClose={handleCloseModalHelp} aria-labelledby='parent-modal-title' aria-describedby='parent-modal-description'>
				<Box className={'w-full flex justify-center items-center'}>
					<ModalHelpHome handleCloseModal={handleCloseModalHelp} />
				</Box>
			</Modal>
		</div>
	)
}

export default Invoice
