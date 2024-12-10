// import axios from 'axios'
import Swal from 'sweetalert2'
import { FaBolt, FaPhone, FaTint, FaTv, FaUsers, FaWifi } from 'react-icons/fa'
import { request } from './request'
export const searchDetailService = async (info) => {
  const urlConsulta = import.meta.env.VITE_APP_API_URL + '/getDetailService'
  try {
    const responseData = await request(urlConsulta, 'POST', info)
    if (responseData.status !== 200) throw new Error(responseData.message)
    // const responseData = await axios({
    //   method: 'POST',
    //   url: urlConsulta,
    //   data: info,
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    const result = responseData.data

    return result
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: `Oops... Tenemos problemas para recuperar los datos`,
      showConfirmButton: true
    })
  }
}

export const statusDifService = (difConsumo) => {
  return {
    bgColorClass: difConsumo > 0 ? '!bg-red-200' : '!bg-green-100',
    borderColorClass: difConsumo > 0 ? 'border-red-400' : 'border-green-400',
    textTitleColor: difConsumo > 0 ? 'text-red-500' : 'text-green-600',
    textClass: difConsumo > 0 ? 'text-red-400' : 'text-green-500',
    attentionText: difConsumo > 0 ? 'ATENCIÓN!' : 'FELICIDADES!',
    comparacionText: difConsumo > 0 ? 'mas' : difConsumo === 0 ? 'igual ' : 'menos'
  }
}

export const setServiceInfo = (service) => {
  // let icon, color, bgIcon, colorIcon, title;
  const config = {
    AGUA: {
      title: 'Agua Potable',
      icon: <FaTint className='float-start mr-2' />,
      color: 'text-sky-600 dark:text-sky-400',
      bgIcon: 'bg-sky-400',
      colorIcon: 'text-sky-900'
    },
    ELECTRICIDAD: {
      title: 'Energía Eléctrica',
      icon: <FaBolt className='float-start mr-2' />,
      color: 'text-green-600 dark:text-green-400',
      bgIcon: 'bg-green-400',
      colorIcon: 'text-green-900'
    },
    INTERNET: {
      title: 'Internet',
      icon: <FaWifi className='float-start mr-2' />,
      color: 'text-blue-700 dark:text-blue-500',
      bgIcon: 'bg-blue-600',
      colorIcon: 'text-blue-950'
    },
    SENSA: {
      title: 'Sensa',
      icon: <FaTv className='float-start mr-2' />,
      color: 'text-red-500 dark:text-red-400',
      bgIcon: 'bg-red-400',
      colorIcon: 'text-red-900'
    },
    'BANCO DE SANGRE': {
      title: 'Banco de Sangre',
      icon: <FaTint className='float-start mr-2' />,
      color: 'text-red-500 dark:text-red-400',
      bgIcon: 'bg-red-400',
      colorIcon: 'text-red-900'
    },
    SEPELIO: {
      title: 'Sepelio',
      icon: <FaUsers className='float-start mr-2' />,
      color: 'text-amber-700 dark:text-amber-500',
      bgIcon: 'bg-amber-600',
      colorIcon: 'text-amber-900'
    },
    TELEFONO: {
      title: 'Teléfono',
      icon: <FaPhone className='float-start mr-2' />,
      color: 'text-blue-600 dark:text-blue-400',
      bgIcon: 'bg-blue-400',
      colorIcon: 'text-blue-900'
    },
    TV: {
      title: 'Televisión',
      icon: <FaTv className='float-start mr-2' />,
      color: 'text-purple-600 dark:text-purple-400',
      bgIcon: 'bg-purple-400',
      colorIcon: 'text-purple-900'
    }
  }

  return config[service]
}
