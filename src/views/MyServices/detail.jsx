import { useLocation, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import ButtonAnimate from '../../components/ButtonAnimate'
import { FaCircle, FaArrowLeft } from 'react-icons/fa'
import LoaderComponent from '../../components/Loader'
import BarChar from '../../components/BarChart'
import {
    searchDetailService,
    setServiceInfo,
    statusDifService,
} from '../../utils/services'
import CardCustom from '../../components/CardCustom'
import { obtenerNombreDelMes } from '../../utils/dateFunction'
import SocialServiceDetail from '../../components/SocialServiceDetail'
import TabService from '../../components/TabService'
import CardServiceDetail from '../../components/CardServiceDetail'
import Swal from 'sweetalert2'
import { request } from '../../utils/request'
import { set } from 'react-hook-form'
const Detail = () => {
    const initialColors = {
        bgColorClass: '',
        borderColorClass: '',
        textTitleColor: '',
        textClass: '',
        attentionText: '',
        comparacionText: '',
    }
    const location = useLocation()
    // const servicio = location.state?.parametro
    // const codSum = location.state?.codSum
    const [medidor, setMedidor] = useState('')
    const medition = location.state?.medition
    const service = location.state?.service
    const account = location.state?.account
    const domicilio = location.state?.address
    const unidad = location.state?.unidad
    const [consumption, setConsumption] = useState(null)
    const [periods, setPeriods] = useState(null)
    const [nameService, setNameService] = useState('')
    const navigate = useNavigate()
    const [mesInvoice, setMesInvoice] = useState([])
    const [datosGral, setDatosGral] = useState(null)
    const [datosGraf, setDatosGraf] = useState(null)
    const [adherentes, setAdherentes] = useState(null)
    const [serviceTv, setServiceTv] = useState(null)
    const [difConsumo, setDifConsumo] = useState(null)
    const [colorsConsuption, setColorsConsuption] = useState(initialColors)
    // const [unidad, setUnidad] = useState('')

    const calcularDiferenciaConsumos = (consumos) => {
        const primerConsumo = parseInt(consumos[0])
        const ultimoConsumo = parseInt(consumos[consumos.length - 1])
        const difConsumo = ultimoConsumo - primerConsumo
        setDifConsumo(difConsumo)
        return difConsumo
    }

    useEffect(() => {
        const getDetailConsumption = async () => {
            try {
                if (medition) {
                    const url =
                        import.meta.env.VITE_APP_API_URL +
                        '/getDetailConsumption'
                    const { data } = await request(
                        `${url}?service=${service}&account=${account}`,
                        'GET'
                    )
                    const periodos = data.map((consumption) => {
                        return consumption.periodo
                    })
                    const consumos = data.map((consumption) => {
                        return consumption.consumo
                    })
                    const mesConsumos = obtenerNombreDelMes(
                        periodos[periodos.length - 1].split('/')[0]
                    )
                    setMesInvoice(mesConsumos)
                    setMedidor(data[0].cod_med)
                    calcularDiferenciaConsumos(consumos)
                    setColorsConsuption(statusDifService(difConsumo))

                    // setUnidad('kW/h')
                    setConsumption(consumos)
                    setPeriods(periodos)
                } else {
                    setDifConsumo('No es un servicio medido')
                }
            } catch (error) {
                await Swal.fire({
                    icon: 'error',
                    title: `Oops... Tenemos problemas para recuperar los datos`,
                    showConfirmButton: true,
                })
                navigate('/MyServices')
            }
        }
        getDetailConsumption()
    }, [])

    return (
        <div className={'max-sm:p-2 max-sm:mr-0 pt-1 p-7 mr-5'}>
            {!difConsumo ? (
                <LoaderComponent />
            ) : (
                <>
                    <div className="flex relative flex-wrap max-sm:p-0 p-6 w-full justify-center items-center">
                        <h2 className="text-center max-sm:text-start max-sm:w-3/4 max-sm:text-3xl mb-5 m-0">
                            {nameService}
                        </h2>
                        <div className="absolute max-sm:right-0 max-sm:top-0 right-8">
                            <ButtonAnimate
                                to="/MyServices"
                                icon={
                                    <FaArrowLeft className="text-white text-xl" />
                                }
                                text={'volver'}
                                bgIcon={'bg-blue-400 mr-5'}
                                color={'text-white'}
                            />
                        </div>
                    </div>
                    <CardCustom className={'p-7 max-sm:p-2 dark:!bg-zinc-800'}>
                        <div
                            className={`flex max-sm:flex-col mt-2 mb-3 rounded-xl p-5 bg-zinc-200 dark:bg-zinc-700`}
                        >
                            <p className="m-0 sm:ml-3 text-lg space-x-6">
                                <b>Cuenta Nº:</b> {account}
                            </p>
                            <p className="m-0 sm:ml-3 text-lg space-x-6">
                                <b>Domicilio: </b>
                                {domicilio}
                            </p>
                            {medition && (
                                <p className="m-0 sm:ml-3 text-lg space-x-6">
                                    <b>Medidor: </b>
                                    {medidor}
                                </p>
                            )}
                        </div>
                        <div className="w-full flex mt-5 flex-wrap">
                            {medition && (
                                <div className="w-1/3 max-sm:w-full px-6">
                                    {difConsumo || difConsumo === 0 ? (
                                        <CardCustom
                                            className={`relative p-5 mb-5 rounded-xl flex flex-col items-center ${colorsConsuption.bgColorClass} ${colorsConsuption.borderColorClass} border-solid border-2 `}
                                        >
                                            <label
                                                className={`text-xl font-bold ${colorsConsuption.textTitleColor}`}
                                            >
                                                {colorsConsuption.attentionText}
                                            </label>
                                            <p
                                                className={`${colorsConsuption.textClass}`}
                                            >
                                                En {mesInvoice} de 2024
                                                consumiste{' '}
                                                {difConsumo === 0
                                                    ? ''
                                                    : `${parseFloat(
                                                          difConsumo < 0
                                                              ? difConsumo * -1
                                                              : difConsumo
                                                      ).toFixed(
                                                          2
                                                      )} ${unidad}`}{' '}
                                                <b
                                                    className={`${colorsConsuption.textTitleColor}`}
                                                >
                                                    {difConsumo < 0
                                                        ? 'menos'
                                                        : 'más'}
                                                </b>{' '}
                                                que en {mesInvoice} de 2023.
                                            </p>
                                        </CardCustom>
                                    ) : null}
                                    {/* {!serviceTv ? (
                                    <CardServiceDetail
                                        serviceItem={datosGral[0]}
                                    />
                                ) : null} */}
                                </div>
                            )}

                            {/* {serviceTv ? (

                            ) : null} */}
                            {medition ? (
                                <div className=" w-2/3 max-sm:w-full max-sm:px-0 px-8 rounded-xl">
                                    <BarChar
                                        title={'Consumo'}
                                        nameSeria={unidad}
                                        data={datosGraf}
                                        consumo={consumption}
                                        periodo={periods}
                                    />
                                </div>
                            ) : (
                                <div className="w-full ">
                                    <h1 className="text-center">
                                        Este no es un servicio medido
                                    </h1>
                                    {/* <TabService service={serviceTv} /> */}
                                </div>
                            )}
                        </div>
                    </CardCustom>
                    {adherentes ? (
                        <SocialServiceDetail adherentes={adherentes} />
                    ) : null}
                </>
            )}
        </div>
    )
}

export default Detail
