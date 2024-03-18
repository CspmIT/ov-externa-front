import { FaBolt, FaCircle, FaPhone, FaTint, FaTv, FaUsers, FaWifi } from 'react-icons/fa'
import CardCustom from '../CardCustom'
import { useEffect, useState } from 'react'
function CardServiceDetail({ ...props }) {
  const [item, setItem] = useState(props.serviceItem)
  useEffect(() => {
    setItem(props.serviceItem)
  }, [props.serviceItem])
  const icono = {
    ELECTRICIDAD: <FaBolt className='p-3 bg-green-500' />,
    AGUA: <FaTint className='p-3 bg-sky-500' />,
    TELEFONO: <FaPhone className='p-3 bg-blue-500' />,
    SEPELIO: <FaUsers className='p-3 bg-amber-500 ' />,
    TV: <FaTv className='p-3 bg-purple-400 ' />,
    SENSA: <FaTv className='p-3 bg-red-500 ' />,
    INTERNET: <FaWifi className='p-3 bg-blue-500 ' />,
    'BANCO DE SANGRE': <FaTint className='p-3 bg-red-500' />
  }
  const textColor = {
    ELECTRICIDAD: 'text-green-500 ',
    AGUA: 'text-sky-500',
    TELEFONO: 'text-blue-500',
    SEPELIO: 'text-amber-500',
    TV: 'text-purple-500',
    SENSA: 'text-red-500',
    INTERNET: 'text-blue-500',
    'BANCO DE SANGRE': 'text-red-500'
  }
  return (
    <CardCustom className={`relative mb-4 h-64 p-2 rounded-[2em] flex flex-col justify-center items-center !bg-zinc-200 dark:!bg-zinc-700 dark:!text-gray-300 ${props.className}`}>
      <FaCircle className={`${item.status !== 0 ? 'animate-ping' : ''} absolute right-5 top-5 ${item.status > 0 ? (item.status > 1 ? 'text-yellow-500' : 'text-green-500') : 'text-red-500'} mr-2`} />
      <FaCircle className={`absolute right-5 top-5 ${item.status > 0 ? (item.status > 1 ? 'text-yellow-500' : 'text-green-500') : 'text-red-500'} mr-2`} />
      <div className='text-white !text-5xl  rounded-full overflow-hidden flex items-center justify-center'>{icono[item.service]}</div>
      {item.titleService ? <p className='mt-6 text-xl font-semibold text-center'>{item.titleService}</p> : null}
      {item.category ? <p className='mt-3 mb-0 text-lg   text-center'>{item.category}</p> : null}
      {props.detailService && item.address ? <p className='mt-3 mb-0 text-base   text-center'>{item.address}</p> : null}
      {item.detail ? <p className='text-lg mb-0 text-center'>{item.detail}</p> : null}
      {props.detailService && item.account ? <p className={`text-lg mb-0 ${textColor[item.service]}  absolute left-5 bottom-5`}> Cuenta Nº: {item.account}</p> : null}
    </CardCustom>
  )
}

export default CardServiceDetail
