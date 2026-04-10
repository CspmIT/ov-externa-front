import { request } from '../../../utils/request'
import { IoTicket } from "react-icons/io5"
import Button from '../../../components/Button'

export const getPaymentsData = async (socioNum) => {
  const url = `${import.meta.env.VITE_APP_API_URL}/getBillsCustomer?customer=${socioNum}`
  try {
    const response = await request(url, 'get')
    const data = response.data
    
    if (!data || !Array.isArray(data)) return []

    return data.map(pay => ({
      account: pay.customer,
      date: pay.createdAt,
      comprobante: pay.id_external,
      amount: parseFloat(pay.total),
      status: 1, 
      type: 'Pago Online'
    }))
  } catch (error) {
    console.error("Error fetching payments:", error)
    throw error
  }
}

export const columnsPayments = (openModal) => [
  { header: 'Socio', accessorKey: 'account' },
  { 
    header: 'Fecha', 
    accessorKey: 'date',
    Cell: ({ cell }) => <span>{new Date(cell.getValue()).toLocaleDateString('es-AR')}</span>
  },
  { header: 'Comprobante', accessorKey: 'comprobante' },
  { 
    header: 'Importe', 
    accessorKey: 'amount',
    Cell: ({ cell }) => (
      <span className="font-bold">
        {cell.getValue().toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
      </span>
    )
  },
  {
    header: 'Acción',
    accessorKey: 'id',
    Cell: ({ row }) => (
      <Button
        props={{ class: 'bg-blue-500 rounded p-1.5 text-white' }}
        onclick={() => openModal(row.original)}
      >
        <IoTicket />
      </Button>
    )
  }
]

export const columnsPaymentsCell = (openModal) => [
  {
    header: 'Detalle del Pago',
    accessorKey: 'comprobante',
    Cell: ({ row }) => (
      <div className="text-xs">
        <p><b>Socio:</b> {row.original.account}</p>
        <p><b>Fecha:</b> {new Date(row.original.date).toLocaleDateString('es-AR')}</p>
        <p><b>Monto:</b> ${row.original.amount}</p>
      </div>
    )
  },
  {
    header: '',
    accessorKey: 'id',
    Cell: ({ row }) => (
      <Button
        props={{ class: 'bg-blue-500 rounded-full p-2 text-white' }}
        onclick={() => openModal(row.original)}
      >
        <IoTicket />
      </Button>
    )
  }
]