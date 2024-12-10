import { useContext, useEffect, useState } from 'react'
import { FaCircle } from 'react-icons/fa'
import DropdownServices from '../../components/DropdownServices'
import Swal from 'sweetalert2'
import { setServiceInfo } from '../../utils/services'
import LoaderComponent from '../../components/Loader'
import { request } from '../../utils/request'
import { UserContext } from '../../contexts/UserContext'
import { useNavigate } from 'react-router-dom'

const MyServices = () => {
    const { account } = useContext(UserContext)
    const [services, setRowsServices] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        const searchData = async () => {
            const socio = account.num
            const url = `${
                import.meta.env.VITE_APP_API_URL
            }/getServiceCustomer?id_procoop=${socio}`
            try {
                const {data} = await request(url, 'get')
                setRowsServices(data)
                setIsLoading(false)
            } catch (error) {
                console.log(error)
                await Swal.fire({
                    title: 'Atencion',
                    text: error,
                    icon: 'warning',
                })
                navigate('/')
            }
        }
        searchData()
    }, [])

    return (
        <>
            {isLoading ? (
                <LoaderComponent />
            ) : (
                <>
                    <h2 className="text-center m-5">Mis Servicios</h2>
                    <div
                        className={`flex mt-2 mb-5 rounded-xl p-5 bg-gray-200 dark:bg-zinc-800`}
                    >
                        <span className="flex mr-3">
                            <FaCircle className="text-green-500 mr-2" />{' '}
                            Servicio Activo
                        </span>
                        <span className="flex mr-3">
                            <FaCircle className="text-yellow-500 mr-2" />{' '}
                            Servicio Pendiente de Conexión
                        </span>
                        <span className="flex mr-3">
                            <FaCircle className="text-red-500 mr-2" /> Servicio
                            Inactivo
                        </span>
                    </div>
                    {services && Object.entries(services).length === 0 && (
                        <h3 className="text-center">
                            No hay servicios disponibles para este socio
                        </h3>
                    )}
                    {services.map((service, index) => {
                        return (
                            <DropdownServices
                                key={index}
                                props={{
                                    icon: service.icon,
                                    color: service.color,
                                    title: service.DES_SER,
                                    accounts: service.services,
                                }}
                            />
                        )
                    })}
                </>
            )}
        </>
    )
}

export default MyServices
