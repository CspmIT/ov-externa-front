import { useState } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { FaQuestion } from 'react-icons/fa'
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io'
import Cardstyles from '../../components/CardBasic/Card.module.css'
import CardCustom from '../../components/CardCustom'

const Information = () => {
  const [dropMode, setdropMode] = useState('hidden')
  const [iconMode, seticonMode] = useState(<IoMdArrowDropdown className='float-end' />)
  const dropModehidden = () => {
    setdropMode(dropMode === 'hidden' ? '' : 'hidden')
    seticonMode(dropMode === 'hidden' ? <IoMdArrowDropup className='float-end' /> : <IoMdArrowDropdown className='float-end' />)
  }

  return (
    <div>
      <h2 className='text-center m-5'>Información Útil</h2>
      <div onClick={() => dropModehidden()} className={`cursor-pointer mt-10 mb-5 rounded-xl p-10 bg-gray-200 dark:bg-zinc-800`}>
        <h5>Tutoriales Nivel 3{iconMode}</h5>
        <div className={`w-full flex flex-wrap justify-center ${dropMode}`}>
          <div className='w-full md:w-1/2 xl:w-1/4'>
            <CardCustom className={`relative rounded-[2.5em] m-2 p-8 max-sm:mt-3 hover:scale-95 transition ease-in-out duration-300 flex items-center shadowCards dark:bg-zinc-700 dark:text-gray-300`}>
              <div className={`absolute right-5 max-xl:right-2 p-2 rounded-full text-xl bg-yellow-400 text-yellow-900`}>
                <FaQuestion className='w-full' />
              </div>
              <div className="flex flex-col w-full">
                <p className="text-xl font-bold m-0 mb-1">¿Cómo subo a </p>
                <p className={`text-yellow-500 m-0`}>Nivel 3?</p>
              </div>
            </CardCustom>
          </div>
          <div className='w-full md:w-1/2 xl:w-1/4'>
            <a href='https://app.coopmorteros.coop/public/documentos/CambiarPlanInternet.pdf' target='_bank'>
              <CardCustom className={`relative rounded-[2.5em] m-2 p-8 max-sm:mt-3 hover:scale-95 transition ease-in-out duration-300 flex items-center shadowCards dark:bg-zinc-700 dark:text-gray-300`}>
                <div className={`absolute right-5 max-xl:right-2 p-2 rounded-full text-xl bg-yellow-400 text-yellow-900`}>
                  <FaQuestion className='w-full' />
                </div>
                <div className="flex flex-col w-full">
                  <p className="text-xl font-bold m-0 mb-1">¿Cómo cambio mi </p>
                  <p className={`text-yellow-500 m-0`}>Plan de Internet?</p>
                </div>
              </CardCustom>
            </a>
          </div>
          <div className='w-full md:w-1/2 xl:w-1/4'>
            <CardCustom className={`relative rounded-[2.5em] m-2 p-8 max-sm:mt-3 hover:scale-95 transition ease-in-out duration-300 flex items-center shadowCards dark:bg-zinc-700 dark:text-gray-300`}>
              <div className={`absolute right-5 max-xl:right-2 p-2 rounded-full text-xl bg-yellow-400 text-yellow-900`}>
                <FaQuestion className='w-full' />
              </div>
              <div className="flex flex-col w-full">
                <p className="text-xl font-bold m-0 mb-1">¿Cómo cambio mis </p>
                <p className={`text-yellow-500 m-0`}>Credenciales de WIFI?</p>
              </div>
            </CardCustom>
          </div>
          <div className='w-full md:w-1/2 xl:w-1/4'>
            <a href='https://app.coopmorteros.coop/public/documentos/ActivarPackTV.pdf' target='_bank'>
              <CardCustom className={`relative rounded-[2.5em] m-2 p-8 max-sm:mt-3 hover:scale-95 transition ease-in-out duration-300 flex items-center shadowCards dark:bg-zinc-700 dark:text-gray-300`}>
                <div className={`absolute right-5 max-xl:right-2 p-2 rounded-full text-xl bg-yellow-400 text-yellow-900`}>
                  <FaQuestion className='w-full' />
                </div>
                <div className="flex flex-col w-full">
                  <p className="text-xl font-bold m-0 mb-1">¿Cómo activo un </p>
                  <p className={`text-yellow-500 m-0`}>Pack de TV?</p>
                </div>
              </CardCustom>
            </a>
          </div>
        </div>
      </div>
      <div className='w-full flex flex-wrap justify-center'>
        <div className='w-full md:w-1/2'>
          <div className={`${Cardstyles.card} shadowCards ${Cardstyles.cardHover} bg-white dark:bg-zinc-700 w-auto `}>
            <h5>Requisitos para Altas de Servicios</h5>
            <Carousel>
              <div>
                <img src='https://app.coopmorteros.coop/public/welcome/img/requisitos_altas/PROPIETARIOS.png' />
              </div>
              <div>
                <img src='https://app.coopmorteros.coop/public/welcome/img/requisitos_altas/adicionales_COMERCIOS.png' />
              </div>
              <div>
                <img src='https://app.coopmorteros.coop/public/welcome/img/requisitos_altas/adicionales_COMERCIOS.png' />
              </div>
            </Carousel>
          </div>
        </div>
        <div className='w-full md:w-1/2'>
          <div className={`${Cardstyles.card} shadowCards ${Cardstyles.cardHover} bg-white dark:bg-zinc-700 w-auto`}>
            <h5>Requisitos para Bajas de Servicios</h5>
            <Carousel>
              <div>
                <img src='https://app.coopmorteros.coop/public/welcome/img/requisitos_altas/PROPIETARIOS.png' />
              </div>
              <div>
                <img src='https://app.coopmorteros.coop/public/welcome/img/requisitos_altas/adicionales_COMERCIOS.png' />
              </div>
              <div>
                <img src='https://app.coopmorteros.coop/public/welcome/img/requisitos_altas/adicionales_COMERCIOS.png' />
              </div>
            </Carousel>{' '}
          </div>
        </div>
        <div className='w-full md:w-1/2'>
          <CardCustom className={`relative rounded-[2.5em] m-2 p-8 max-sm:mt-3 hover:scale-95 transition ease-in-out duration-300 flex items-center shadowCards dark:bg-zinc-700 dark:text-gray-300`}>
            <div className="flex flex-col w-full">
              <p className="text-xl font-bold m-0 mb-1">Adhesión Débito / Automático / Tarjeta de Crédito</p>
            </div>
          </CardCustom>
        </div>
        <div className='w-full md:w-1/2'>
          <CardCustom className={`relative rounded-[2.5em] m-2 p-8 max-sm:mt-3 hover:scale-95 transition ease-in-out duration-300 flex items-center shadowCards dark:bg-zinc-700 dark:text-gray-300`}>
            <div className="flex flex-col w-full">
              <p className="text-xl font-bold m-0 mb-1">Adhesión Débito / Automático / Caja de Ahorro - CC</p>
            </div>
          </CardCustom>
        </div>
        <div className='w-full md:w-1/3'>
          <CardCustom className={`relative rounded-[2.5em] m-2 p-8 max-sm:mt-3 hover:scale-95 transition ease-in-out duration-300 flex items-center shadowCards dark:bg-zinc-700 dark:text-gray-300`}>
            <div className="flex flex-col w-full">
              <p className='font-bold m-0 mb-1 text-center'>
              <h4 className='font-bold'>Atención al Cliente</h4>
                <p className='m-0'>Lunes a Viernes<br /> 07:00 a 13:00hs</p>
                <a href='tel:+54-03562-402000' target='_blank' rel='noreferrer' className='text-blue-400'>(03562) - 402000</a><br />
                <a href='https://wa.me/543562670000' target='_blank' rel='noreferrer' className='text-blue-400'>(03562) - 670000</a><br />
                <a href='mailto:info@coopmorteros.coop' target='_blank' rel='noreferrer' className='text-blue-400'>info@coopmorteros.coop</a>
              </p>
            </div>
          </CardCustom>
        </div>
        <div className='w-full md:w-1/3'>
          <CardCustom className={`relative rounded-[2.5em] m-2 p-8 max-sm:mt-3 hover:scale-95 transition ease-in-out duration-300 flex items-center shadowCards dark:bg-zinc-700 dark:text-gray-300`}>
            <div className="flex flex-col w-full">
              <p className='font-bold m-0 mb-1 text-center'>
                <h4 className='font-bold'>Banco de Sangre</h4>
                <p className='m-0'>Lunes a Viernes<br /> 06:00 a 13:00hs</p>
                <a href='tel:+54-03562-402000' target='_blank' rel='noreferrer' className='text-blue-400'>(03562) - 405001</a><br />
                <a href='https://wa.me/543562670000' target='_blank' rel='noreferrer' className='text-blue-400'>(03562) - 451683</a><br />
                <a href='mailto:atencionbancodesangre@coopmorteros.coop' target='_blank' rel='noreferrer' className='text-blue-400'>atencionbancodesangre@coopmorteros.coop</a>
              </p>
            </div>
          </CardCustom>
        </div>
        <div className='w-full md:w-1/3'>
          <CardCustom className={`relative rounded-[2.5em] m-2 p-8 max-sm:mt-3 hover:scale-95 transition ease-in-out duration-300 flex items-center shadowCards dark:bg-zinc-700 dark:text-gray-300`}>
            <div className="flex flex-col w-full">
              <div className='font-bold m-0 mb-1 text-center'>
                <h4 className='font-bold'>Canal 50 </h4>
                <p className='m-0'>Lunes a Viernes<br /> 07:00 a 13:00hs</p>
                <a href='tel:+54-03562-402000' target='_blank' rel='noreferrer' className='text-blue-400 w-full'>(03562) - 403458</a><br />
                <a href='https://wa.me/543562670000' target='_blank' rel='noreferrer' className='text-blue-400 w-full'>(03562) - 411929</a><br />
                <a href='mailto:prensa@coopmorteros.coop' target='_blank' rel='noreferrer' className='text-blue-400 w-full'>prensa@coopmorteros.coop</a>
              </div>
            </div>
          </CardCustom>
        </div>
        <div className='w-full md:w-1/3'>
          <CardCustom className={`relative rounded-[2.5em] m-2 p-8 max-sm:mt-3 hover:scale-95 transition ease-in-out duration-300 flex items-center shadowCards dark:bg-zinc-700 dark:text-gray-300`}>
            <div className="flex flex-col w-full">
              <div className='font-bold m-0 mb-1 text-center'>
                <h4 className='font-bold'>Coopnet </h4>
                <a href='tel:+54-03562-402000' target='_blank' rel='noreferrer' className='text-blue-400'> (03562) - 404700 </a>
              </div>
            </div>
          </CardCustom>
        </div>
        <div className='w-full md:w-1/3'>
          <CardCustom className={`relative rounded-[2.5em] m-2 p-8 max-sm:mt-3 hover:scale-95 transition ease-in-out duration-300 flex items-center shadowCards dark:bg-zinc-700 dark:text-gray-300`}>
            <div className="flex flex-col w-full">
              <div className='font-bold m-0 mb-1 text-center'>
                <h4 className='font-bold'>Reparto </h4>
                <a href='mailto:reparto@coopmorteros.coop' target='_blank' rel='noreferrer' className='text-blue-400'> reparto@coopmorteros.coop</a>
              </div>
            </div>
          </CardCustom>
        </div>
        <div className='w-full md:w-1/3'>
          <CardCustom className={`relative rounded-[2.5em] m-2 p-8 max-sm:mt-3 hover:scale-95 transition ease-in-out duration-300 flex items-center shadowCards dark:bg-zinc-700 dark:text-gray-300`}>
            <div className="flex flex-col w-full">
              <div className='font-bold m-0 mb-1 text-center'>
                <h4 className='font-bold'>Sepelio </h4>
                <a href='tel:+54-03562-402000' target='_blank' rel='noreferrer' className='text-blue-400'>(03562) - 402625</a>
              </div>
            </div>
          </CardCustom>
        </div>
        <div className='w-full md:w-1/3'>
          <CardCustom className={`relative rounded-[2.5em] m-2 p-8 max-sm:mt-3 hover:scale-95 transition ease-in-out duration-300 flex items-center shadowCards dark:bg-zinc-700 dark:text-gray-300`}>
            <div className="flex flex-col w-full">
              <div className='font-bold m-0 mb-1 text-center'>
                <h4 className='font-bold'>Cajas </h4>
                <p className='m-0'>Lunes a Viernes <br />07:00 a 12:30hs </p>
              </div>
            </div>
          </CardCustom>
        </div>
        <div className='w-full md:w-1/3'>
          <CardCustom className={`relative rounded-[2.5em] m-2 p-8 max-sm:mt-3 hover:scale-95 transition ease-in-out duration-300 flex items-center shadowCards dark:bg-zinc-700 dark:text-gray-300`}>
            <div className="flex flex-col w-full">
              <div className='font-bold m-0 mb-1 text-center'>
                <h4 className='font-bold'>Crédito y Cobranza </h4>
                <p className='m-0'>Lunes a Viernes <br />07:00 a 12:30hs </p>
                <a href='tel:+54-03562-402000' target='_blank' rel='noreferrer' className='text-blue-400'>(03562) - 402000</a>
              </div>
            </div>
          </CardCustom>
        </div>
      </div>
      <div className={`mt-10 rounded-xl p-10 bg-gray-200 dark:bg-zinc-800`}>
        <h5>Instructivos</h5>
        <div className={`w-full flex flex-wrap justify-center`}>
          <div className='w-full md:w-1/2 xl:w-1/4'>
            <a href='https://app.coopmorteros.coop/public/documentos/RegistroV2.0.pdf' target='_bank'>
              <CardCustom className={`relative rounded-[2.5em] m-2 p-8 max-sm:mt-3 hover:scale-95 transition ease-in-out duration-300 flex items-center shadowCards dark:bg-zinc-700 dark:text-gray-300`}>
                <div className={`absolute right-5 max-xl:right-2 p-2 rounded-full text-xl bg-yellow-400 text-yellow-900`}>
                  <FaQuestion className='w-full' />
                </div>
                <div className="flex flex-col w-full">
                  <p className="text-xl font-bold m-0 mb-1">¿Cómo me </p>
                  <p className={`text-yellow-500 m-0`}>REGISTRO?</p>
                </div>
              </CardCustom>
            </a>
          </div>
          <div className='w-full md:w-1/2 xl:w-1/4'>
            <a href='https://app.coopmorteros.coop/public/documentos/SubirDeNivelV1.0.pdf' target='_bank'>
              <CardCustom className={`relative rounded-[2.5em] m-2 p-8 max-sm:mt-3 hover:scale-95 transition ease-in-out duration-300 flex items-center shadowCards dark:bg-zinc-700 dark:text-gray-300`}>
                <div className={`absolute right-5 max-xl:right-2 p-2 rounded-full text-xl bg-yellow-400 text-yellow-900`}>
                  <FaQuestion className='w-full' />
                </div>
                <div className="flex flex-col w-full">
                  <p className="text-xl font-bold m-0 mb-1">¿Cómo subo de </p>
                  <p className={`text-yellow-500 m-0`}>NIVEL?</p>
                </div>
              </CardCustom>
            </a>
          </div>
          <div className='w-full md:w-1/2 xl:w-1/4'>
            <a href='https://app.coopmorteros.coop/public/documentos/EfectuarPagosV3.0.pdf' target='_bank'>
              <CardCustom className={`relative rounded-[2.5em] m-2 p-8 max-sm:mt-3 hover:scale-95 transition ease-in-out duration-300 flex items-center shadowCards dark:bg-zinc-700 dark:text-gray-300`}>
                <div className={`absolute right-5 max-xl:right-2 p-2 rounded-full text-xl bg-yellow-400 text-yellow-900`}>
                  <FaQuestion className='w-full' />
                </div>
                <div className="flex flex-col w-full">
                  <p className="text-xl font-bold m-0 mb-1">¿Cómo realizo un </p>
                  <p className={`text-yellow-500 m-0`}>PAGO?</p>
                </div>
              </CardCustom>
            </a>
          </div>
          <div className='w-full md:w-1/2 xl:w-1/4'>
            <a href='https://app.coopmorteros.coop/public/documentos/TurnosOnlineV2.0.pdf' target='_bank'>
              <CardCustom className={`relative rounded-[2.5em] m-2 p-8 max-sm:mt-3 hover:scale-95 transition ease-in-out duration-300 flex items-center shadowCards dark:bg-zinc-700 dark:text-gray-300`}>
                <div className={`absolute right-5 max-xl:right-2 p-2 rounded-full text-xl bg-yellow-400 text-yellow-900`}>
                  <FaQuestion className='w-full' />
                </div>
                <div className="flex flex-col w-full">
                  <p className="text-xl font-bold m-0 mb-1">¿Cómo reservo un </p>
                  <p className={`text-yellow-500 m-0`}>TURNO?</p>
                </div>
              </CardCustom>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Information
