import { useContext, useEffect, useState } from 'react'
import { request } from '../../utils/request'
import BarChar from '../../components/BarChart'
import LoaderComponent from '../../components/Loader'
import { Tab, Tabs } from '@mui/material'
import { CustomTabPanel, a11yProps } from '../../components/PanelTab'
import { UserContext } from '../../contexts/UserContext'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const MyConsumption = () => {
    const navigate = useNavigate()
    const { account } = useContext(UserContext)
    const [loading, setLoading] = useState(true)
    const [value, setValue] = useState(0)
    const [services, setServices] = useState({})
    const classTabs =
        'w-1/2 !border-solid !border-gray-200 !rounded-t-xl !max-w-full !text-base !text-black !font-bold dark:!text-zinc-200 dark:!border-gray-500'
    const classTabStatus = [
        ['!border-r-2 !bg-white !border-t-2 !border-l-2 dark:!bg-zinc-600 '],
        ['!border-b-2 !bg-slate-200 dark:!bg-zinc-800 '],
    ]
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    useEffect(() => {
        const findServicesMedibles = async () => {
            const socio = account.num
            try {
                const url = `${
                    import.meta.env.VITE_APP_API_URL
                }/getAllByAccount?id_procoop=${socio}`
                const { data } = await request(url, 'GET')
                setServices(data)
            } catch (error) {
                await Swal.fire({
                    icon: 'warning',
                    text: error,
                })
                navigate('/')
            } finally {
                setLoading(false)
            }
        }
        findServicesMedibles()
    }, [])

    return (
        <div>
            <div className={`w-auto rounded-xl px-7`}>
                <h2 className="text-center m-5">Mis Consumos</h2>
                <hr className="mb-5" />
                {loading ? (
                    <LoaderComponent />
                ) : (
                    <div>
                        <Tabs
                            indicatorColor="transparent"
                            value={value}
                            onChange={handleChange}
                            aria-label="basic tabs example"
                        >
                            {Object.keys(services).map((key, index) => (
                                <Tab
                                    key={index}
                                    className={`${classTabStatus[value]} ${classTabs}`}
                                    label={services[key].name}
                                    {...a11yProps(index)}
                                />
                            ))}
                        </Tabs>
                        <div
                            className={`border-2 border-t-0 p-5 rounded-b-2xl bg-white border-gray-200 dark:!border-gray-500 dark:!bg-zinc-600`}
                        >
                            {Object.keys(services).map((key, index) => (
                                <CustomTabPanel
                                    key={index}
                                    className={
                                        'w-full flex flex-col justify-evenly'
                                    }
                                    value={value}
                                    index={index}
                                >
                                    {Object.keys(services[key].accounts).map(
                                        (accountKey, accIndex) => (
                                            <>
                                                {accIndex % 2 ? (
                                                    <hr className="w-full mr-5 mb-5" />
                                                ) : null}
                                                <div
                                                    key={accIndex}
                                                    className="w-full flex mb-5"
                                                >
                                                    <div className="flex items-center">
                                                        <div
                                                            className={`flex flex-col mt-2 mb-3 rounded-xl p-5 bg-gray-300 dark:bg-zinc-800`}
                                                        >
                                                            <p className="m-0 text-lg space-x-6">
                                                                <b>
                                                                    Cuenta Nº:
                                                                </b>
                                                                {accountKey}
                                                            </p>
                                                            <p className="m-0 ml-3 max-sm:ml-0 text-lg space-x-6">
                                                                <b>
                                                                    Domicilio:
                                                                </b>{' '}
                                                                {
                                                                    services[
                                                                        key
                                                                    ].accounts[
                                                                        accountKey
                                                                    ]?.address
                                                                }
                                                            </p>
                                                            <p className="m-0 ml-3 max-sm:ml-0 text-lg space-x-6">
                                                                <b>Medidor:</b>{' '}
                                                                {
                                                                    services[
                                                                        key
                                                                    ].accounts[
                                                                        accountKey
                                                                    ]?.detail
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="w-3/4 h-full">
                                                        <BarChar
                                                            key={accIndex}
                                                            title={`Consumo de ${services[key].name} por mes`}
                                                            nameSeria={
                                                                services[key]
                                                                    .accounts[
                                                                    accountKey
                                                                ]?.unidad
                                                            }
                                                            consumo={services[
                                                                key
                                                            ].accounts[
                                                                accountKey
                                                            ]?.consumos.map(
                                                                (consumo) =>
                                                                    consumo.consumo
                                                            )}
                                                            periodo={services[
                                                                key
                                                            ].accounts[
                                                                accountKey
                                                            ]?.consumos.map(
                                                                (consumo) =>
                                                                    consumo.periodo
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    )}
                                </CustomTabPanel>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MyConsumption
