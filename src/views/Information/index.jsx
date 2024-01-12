import React from 'react'
import { useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { useTranslation } from 'react-i18next';
{/* ----------------- ICONOS ----------------- */}
import { FaQuestion } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
{/* ----------------- ESTILOS ----------------- */}
import Cardstyles from '../../components/Card/Card.module.css'
{/* ----------------- COMPONENTES ----------------- */}
import Card from '../../components/Card';



const Information = () => {

  const { t } = useTranslation();

  const [dropMode, setdropMode] = useState('hidden')
  const [iconMode, seticonMode] = useState(<IoMdArrowDropdown className='float-end' />)
  const dropModehidden = () => {
    setdropMode(dropMode == "hidden" ? "" : "hidden");
    seticonMode(dropMode == "hidden" ? <IoMdArrowDropup className='float-end' /> : <IoMdArrowDropdown className='float-end' />);
  }

  return (
    <div className='p-2 sm:pl-64 overflow-y-auto h-full bg-gray-100 dark:bg-zinc-900 dark:text-gray-300 pb-16'>
      <h2 className='text-center m-5'>Información Útil</h2>
      <div onClick={() => dropModehidden()} className={`cursor-pointer mt-10 mb-5 rounded-xl p-10 bg-gray-200 dark:bg-zinc-800`}>
        <h5>Tutoriales Nivel 3
          {iconMode}
        </h5>
        <div className={`w-full flex flex-wrap justify-center ${dropMode}`}>
          <div className='w-full md:w-1/4'>
            <a href='https://app.coopmorteros.coop/public/documentos/SubirNivel3.pdf' target='_bank'> <Card props={{ phone: '', title: '¿Cómo subo a ', subtitle: 'Nivel 3?', icon: <FaQuestion className='w-full' />, color: 'text-yellow-500', bgIcon: 'bg-yellow-400', colorIcon: 'text-yellow-900', widht: 'w-auto', bg: 'bg-white', positionBtn: 'absolute' }} /></a>
          </div>
          <div className='w-full md:w-1/4'>
            <a href='https://app.coopmorteros.coop/public/documentos/CambiarPlanInternet.pdf' target='_bank'> <Card props={{ phone: '', title: '¿Cómo cambio mi ', subtitle: 'Plan de Internet?', icon: <FaQuestion className='w-full' />, color: 'text-yellow-500', bgIcon: 'bg-yellow-400', colorIcon: 'text-yellow-900', widht: 'w-auto', bg: 'bg-white', positionBtn: 'absolute' }} /></a>
          </div>
          <div className='w-full md:w-1/4'>
            <a href='https://app.coopmorteros.coop/public/documentos/CambiarCredencialesWiFi.pdf' target='_bank'> <Card props={{ phone: '', title: '¿Cómo cambio mis ', subtitle: 'Credenciales de WIFI?', icon: <FaQuestion className='w-full' />, color: 'text-yellow-500', bgIcon: 'bg-yellow-400', colorIcon: 'text-yellow-900', widht: 'w-auto', bg: 'bg-white', positionBtn: 'absolute' }} /></a>
          </div>
          <div className='w-full md:w-1/4'>
            <a href='https://app.coopmorteros.coop/public/documentos/ActivarPackTV.pdf' target='_bank'>  <Card props={{ phone: '', title: '¿Cómo activo un ', subtitle: 'Pack de TV?', icon: <FaQuestion className='w-full' />, color: 'text-yellow-500', bgIcon: 'bg-yellow-400', colorIcon: 'text-yellow-900', widht: 'w-auto', bg: 'bg-white', positionBtn: 'absolute' }} /></a>
          </div>
        </div>
      </div>
      <div className='w-full flex flex-wrap justify-center'>
        <div className='w-full md:w-1/2'>
          <div className={`${Cardstyles.card} ${Cardstyles.shadowCards} ${Cardstyles.cardHover} bg-white dark:bg-zinc-700 w-auto `}>
            <h5>Requisitos para Altas de Servicios</h5>
            <Carousel>
              <div>
                <img src="https://app.coopmorteros.coop/public/welcome/img/requisitos_altas/PROPIETARIOS.png" />
              </div>
              <div>
                <img src="https://app.coopmorteros.coop/public/welcome/img/requisitos_altas/adicionales_COMERCIOS.png" />
              </div>
              <div>
                <img src="https://app.coopmorteros.coop/public/welcome/img/requisitos_altas/adicionales_COMERCIOS.png" />
              </div>
            </Carousel>
          </div>
        </div>
        <div className='w-full md:w-1/2'>
          <div className={`${Cardstyles.card} ${Cardstyles.shadowCards} ${Cardstyles.cardHover} bg-white dark:bg-zinc-700 w-auto`}>
            <h5>Requisitos para Bajas de Servicios</h5>
            <Carousel>
              <div>
                <img src="https://app.coopmorteros.coop/public/welcome/img/requisitos_altas/PROPIETARIOS.png" />
              </div>
              <div>
                <img src="https://app.coopmorteros.coop/public/welcome/img/requisitos_altas/adicionales_COMERCIOS.png" />
              </div>
              <div>
                <img src="https://app.coopmorteros.coop/public/welcome/img/requisitos_altas/adicionales_COMERCIOS.png" />
              </div>
            </Carousel>          </div>
        </div>
        <div className='w-full md:w-1/2'>
          <Card props={{ phone: '', title: <span>Adhesión Débito / Automático / Tarjeta de Crédito</span>, widht: 'w-auto', bg: 'bg-white', positionBtn: 'absolute' }} />
        </div>
        <div className='w-full md:w-1/2'>
          <Card props={{ phone: '', title: <span>Adhesión Débito / Automático / Caja de Ahorro - CC</span>, widht: 'w-auto', bg: 'bg-white', positionBtn: 'absolute' }} />
        </div>
        <div className='w-full md:w-1/3'>
          <Card props={{
            phone: '', subtitle: <p className="w-full text-center leading-6">
              <h4><b>Atención al Cliente</b></h4>
              Lunes a Viernes<br />
              <i className="fas fa-clock pr-1"></i> 07:00 a 13:00hs
              <br />
              <a href="tel:+54-03562-402000" target="_blank" className='text-blue-400'>(03562) - 402000</a>
              <br />
              <a href="https://wa.me/543562670000" target="_blank" className='text-blue-400'>(03562) - 670000</a>
              <br />
              <a href="mailto:info@coopmorteros.coop" target="_blank" className='text-blue-400'> info@coopmorteros.coop </a>
            </p>, widht: 'w-auto', bg: 'bg-white', positionBtn: 'absolute'
          }} />
        </div>
        <div className='w-full md:w-1/3'>
          <Card props={{
            phone: '', subtitle: <p className="w-full text-center leading-6">
              <h4><b>Banco de Sangre </b></h4>
              Lunes a Viernes<br />
              <i className="fas fa-clock pr-1"></i> 06:00 a 13:00hs
              <br />
              <a href="tel:+54-03562-402000" target="_blank" className='text-blue-400'> (03562) - 405001 </a>
              <br />
              <a href="https://wa.me/543562670000" target="_blank" className='text-blue-400'> (03562) - 451683 </a>
              <br />
              <a href="mailto:atencionbancodesangre@coopmorteros.coop" target="_blank" className='text-blue-400'>  atencionbancodesangre@coopmorteros.coop  </a>
            </p>, widht: 'w-auto', bg: 'bg-white', positionBtn: 'absolute'
          }} />
        </div>
        <div className='w-full md:w-1/3'>
          <Card props={{
            phone: '', subtitle: <p className="w-full text-center leading-6">
              <h4><b>Canal 50</b></h4>
              Lunes a Viernes<br />
              <i className="fas fa-clock pr-1"></i> 07:00 a 13:00hs
              <br />
              <a href="tel:+54-03562-402000" target="_blank" className='text-blue-400'> (03562) - 403458 </a>
              <br />
              <a href="https://wa.me/543562670000" target="_blank" className='text-blue-400'> (03562) - 411929 </a>
              <br />
              <a href="mailto:prensa@coopmorteros.coop" target="_blank" className='text-blue-400'>   prensa@coopmorteros.coop   </a>
            </p>, widht: 'w-auto', bg: 'bg-white', positionBtn: 'absolute'
          }} />
        </div>
        <div className='w-full md:w-1/3'>
          <Card props={{
            phone: '', subtitle: <p className="w-full text-center leading-6">
              <h4><b>Coopnet</b></h4>
              <a href="tel:+54-03562-402000" target="_blank" className='text-blue-400'> (03562) - 404700 </a>
            </p>, widht: 'w-auto', bg: 'bg-white', positionBtn: 'absolute'
          }} />
        </div>
        <div className='w-full md:w-1/3'>
          <Card props={{
            phone: '', subtitle: <p className="w-full text-center leading-6">
              <h4><b>Reparto </b></h4>
              <a href="mailto:reparto@coopmorteros.coop" target="_blank" className='text-blue-400'>reparto@coopmorteros.coop</a>
            </p>, widht: 'w-auto', bg: 'bg-white', positionBtn: 'absolute'
          }} />
        </div>
        <div className='w-full md:w-1/3'>
          <Card props={{
            phone: '', subtitle: <p className="w-full text-center leading-6">
              <h4><b>Sepelio  </b></h4>
              <a href="tel:+54-03562-402000" target="_blank" className='text-blue-400'> (03562) - 402625 </a>
            </p>, widht: 'w-auto', bg: 'bg-white', positionBtn: 'absolute'
          }} />
        </div>
        <div className='w-full md:w-1/3'>
          <Card props={{
            phone: '', subtitle: <p className="w-full text-center leading-6">
              <h4><b>Cajas</b></h4>
              Lunes a Viernes<br />
              <i className="fas fa-clock pr-1"></i> 07:00 a 12:30hs
            </p>, widht: 'w-auto', bg: 'bg-white', positionBtn: 'absolute'
          }} />
        </div>
        <div className='w-full md:w-1/3'>
          <Card props={{
            phone: '', subtitle: <p className="w-full text-center leading-6">
              <h4><b>Crédito y Cobranza </b></h4>
              Lunes a Viernes<br />
              <i className="fas fa-clock pr-1"></i> 07:00 a 12:30hs
              <br />
              <a href="tel:+54-03562-402000" target="_blank" className='text-blue-400'>(03562) - 402000 </a>
            </p>, widht: 'w-auto', bg: 'bg-white', positionBtn: 'absolute'
          }} />
        </div>
      </div>
      <div className={`mt-10 rounded-xl p-10 bg-gray-200 dark:bg-zinc-800`}>
        <h5>Instructivos</h5>
        <div className={`w-full flex flex-wrap justify-center`}>
          <div className='w-full md:w-1/4'>
            <a href='https://app.coopmorteros.coop/public/documentos/RegistroV2.0.pdf' target='_bank'><Card props={{ phone: '', title: '¿Cómo me ', subtitle: 'REGISTRO?', icon: <FaQuestion className='w-full' />, color: 'text-yellow-500', bgIcon: 'bg-yellow-400', colorIcon: 'text-yellow-900', widht: 'w-auto', bg: 'bg-white', positionBtn: 'absolute' }} /></a>
          </div>
          <div className='w-full md:w-1/4'>
            <a href='https://app.coopmorteros.coop/public/documentos/SubirDeNivelV1.0.pdf' target='_bank'> <Card props={{ phone: '', title: '¿Cómo subo de ', subtitle: 'NIVEL?', icon: <FaQuestion className='w-full' />, color: 'text-yellow-500', bgIcon: 'bg-yellow-400', colorIcon: 'text-yellow-900', widht: 'w-auto', bg: 'bg-white', positionBtn: 'absolute' }} /></a>
          </div>
          <div className='w-full md:w-1/4'>
            <a href='https://app.coopmorteros.coop/public/documentos/EfectuarPagosV3.0.pdf' target='_bank'> <Card props={{ phone: '', title: '¿Cómo realizo un ', subtitle: 'PAGO?', icon: <FaQuestion className='w-full' />, color: 'text-yellow-500', bgIcon: 'bg-yellow-400', colorIcon: 'text-yellow-900', widht: 'w-auto', bg: 'bg-white', positionBtn: 'absolute' }} /></a>
          </div>
          <div className='w-full md:w-1/4'>
            <a href='https://app.coopmorteros.coop/public/documentos/TurnosOnlineV2.0.pdf' target='_bank'> <Card props={{ phone: '', title: '¿Cómo reservo un ', subtitle: 'TURNO?', icon: <FaQuestion className='w-full' />, color: 'text-yellow-500', bgIcon: 'bg-yellow-400', colorIcon: 'text-yellow-900', widht: 'w-auto', bg: 'bg-white', positionBtn: 'absolute' }} /></a>
          </div>
        </div>
      </div>
    </div>


  )
}

export default Information