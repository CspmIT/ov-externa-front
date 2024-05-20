import { Box } from '@mui/material'
import { request } from './request'
import { Circle, FindInPage } from '@mui/icons-material'
import Button from '..//components/Button'
import Swal from 'sweetalert2'
// import axios from 'axios'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

export const columns = [
	{
		header: '',
		accessorKey: 'account',
	},
	{
		header: 'Tipo',
		accessorKey: 'type',
		size: 30,
	},
	{
		header: 'Factura',
		accessorKey: 'nrovoucher',
		AggregatedCell: ({ row }) => {
			return (
				<p className='m-0 font-bold'>
					Cuenta Nº: {row.original.account} (Tel: {row.original.phone})
				</p>
			)
		},
	},
	{
		header: 'Periodo',
		accessorKey: 'period',
		size: 30,
	},
	{
		header: 'Vencimiento',
		accessorKey: 'vto',
		size: 30,
	},
	{
		header: 'Importe',
		accessorKey: 'amount',
		size: 45,
		Cell: ({ row, cell }) => {
			const { darkMode } = useContext(UserContext)
			if (!row.original.subRows) {
				return (
					<Box
						component='span'
						sx={() => ({
							color: !darkMode ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)',
							fontWeight: 'bold',
							fontSize: '15px',
						})}
					>
						{cell.getValue()?.toLocaleString?.('es-AR', {
							style: 'currency',
							currency: 'ARS',
							minimumFractionDigits: 2,
							maximumFractionDigits: 2,
						})}
					</Box>
				)
			}
		},
	},
	{
		header: '',
		accessorKey: 'status',
		disableFilters: true,
		size: 15,
		enableGlobalFilter: false,
		Cell: ({ row }) => {
			if (!row.original.subRows) {
				return (
					<div>
						<Circle className={`${row.original?.status > 0 ? (row.original?.status === 2 ? 'text-yellow-500' : 'text-green-500') : 'text-red-500'}`} />
					</div>
				)
			}
		},
	},
	{
		header: '',
		accessorKey: 'url',
		disableFilters: true,
		enableGlobalFilter: false,
		size: 15,
		Cell: ({ row }) => {
			if (row.original.url) {
				return (
					<Button
						props={{ class: 'bg-blue-500 rounded text-center py-0.7 px-1.5 text-white ' }}
						onclick={() => {
							controlUrl(`${row.original?.url ? row.original?.url : undefined}`)
						}}
					>
						<FindInPage />
					</Button>
				)
			}
		},
	},
]
export const columnsCel = [
	{
		header: '',
		accessorKey: 'account',
		size: 5,
	},
	{
		header: 'Info Factura',
		accessorKey: 'info',
		size: 30,
		minSize: 10,
		maxSize: 30,
		AggregatedCell: ({ row }) => {
			return <p className='m-0 text-sm font-bold'>Cuenta Nº: {row.original.account}</p>
		},
		Cell: ({ cell }) => {
			const { darkMode } = useContext(UserContext)
			const amount = cell.row.original.info?.amount ?? cell.row.original.amount
			return (
				<Box
					component='span'
					sx={() => ({
						color: !darkMode ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)',
						fontWeight: 'bold',
						fontSize: '12px',
					})}
				>
					<p className='m-0'>
						<b>Tipo:</b> {cell.row.original.info?.type ?? cell.row.original.type}
					</p>
					<p className='m-0'>
						<b>Periodo:</b> {cell.row.original.info?.period ?? cell.row.original.period}
					</p>
					<p className='m-0'>
						<b>Vencimiento:</b> {cell.row.original.info?.vto ?? cell.row.original.vto}
					</p>
					<p className='m-0 text-red-500'>
						<b>Importe:</b>{' '}
						{amount.toLocaleString?.('es-AR', {
							style: 'currency',
							currency: 'ARS',
							minimumFractionDigits: 2,
							maximumFractionDigits: 2,
						})}
					</p>
				</Box>
			)
		},
	},
	{
		header: '',
		accessorKey: 'status',
		size: 10,
		enableGlobalFilter: false,
		Cell: ({ row }) => {
			if (!row.original.subRows) {
				return <Circle className={`max-sm:m-0 max-sm:text-sm ${row.original?.status > 0 ? (row.original?.status === 2 ? 'text-yellow-500' : 'text-green-500') : 'text-red-500'}`} />
			}
		},
	},
	{
		header: '',
		accessorKey: 'url',
		enableGlobalFilter: false,
		size: 10,
		Cell: ({ row }) => {
			const url = row.original.info?.url ?? row.original.url
			if (url) {
				return (
					<Button
						props={{ class: 'bg-blue-500 m-0 rounded-xl  max-sm:rounded-full max-sm:p-1.5 text-center py-0.7 px-1.5 text-white ' }}
						onclick={() => {
							controlUrl(`${url || undefined}`)
						}}
					>
						<FindInPage />
					</Button>
				)
			}
		},
	},
]

export const controlUrl = async (url) => {
	const urlConsulta = import.meta.env.VITE_APP_API_URL + '/existinvoice?url=' + url
	try {
		await request(urlConsulta, 'GET')
		// await axios({
		//   method: 'GET',
		//   url: urlConsulta,
		//   headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
		// })
		window.open(url, '_blank')
	} catch (error) {
		Swal.fire({
			icon: 'error',
			title: 'La factura aun no se encuentra disponible',
			showConfirmButton: true,
		})
	}
}

export const searchAllInvoice = async (user) => {
	const socio = user.number_customer
	const url = `${import.meta.env.VITE_APP_API_URL}/facturas?id_procoop=${socio}&all=1`
	try {
		const response = await request(url, 'get')
		if (response.status !== 200) throw new Error(response.message)
		const responseData = response.data
		const rows = []
		for (const i in responseData) {
			responseData[i].list.forEach((item) => {
				rows.push({ ...item, account: responseData[i].data.account, phone: responseData[i].data.phoneNumber })
			})
		}
		return rows
	} catch (error) {
		console.error('Error en la solicitud:', error)
	}
}

export const InvoiceDeus = async (user) => {
	const socio = user.number_customer
	const url = `${import.meta.env.VITE_APP_API_URL}/facturas?id_procoop=${socio}`
	try {
		const response = await request(url, 'GET')
		if (response.status !== 200) throw new Error('Error en la solicitud')
		const responseData = response.data
		if (responseData.length === 0) {
			return false
		}
		const rows = []
		for (const i in responseData) {
			responseData[i].list.forEach((item) => {
				rows.push({ ...item, account: responseData[i].data.account, phone: responseData[i].data.phoneNumber })
			})
		}
		return rows
	} catch (error) {
		console.error('Error en la solicitud:', error)
	}
}
export const calcValues = (table) => {
	let values = 0
	let value2 = 0
	table.getCoreRowModel().rows.forEach((element) => {
		value2 += element.original.amount
	})
	table.getSelectedRowModel().rows.forEach((element) => {
		values += element.original.amount
	})
	values = values.toFixed(2)
	value2 = value2.toFixed(2)
	return [values, value2]
}
