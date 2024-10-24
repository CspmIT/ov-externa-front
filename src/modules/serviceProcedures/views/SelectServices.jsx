import { useEffect, useState } from 'react';
import ServiceCard from '../components/SelectServices/ServiceCard';
import { useNavigate } from 'react-router-dom';
import ListRequeriments from '../components/ListRequeriments';
import Button from '@mui/material/Button';
import seeRqueriments from '../utils/seeRequirements';
import { useRegForm } from '../providers/RegFormProvider';
import Swal from 'sweetalert2';
import { request } from '../../../utils/request';
import { formatDateForInput } from '../../../utils/dateFunction';

const SelectServices = ({ services }) => {
    const [visibleService, setVisibleService] = useState(null);
    const [selectedServices, setSelectedServices] = useState([...services]);
    const [state, dispatch] = useRegForm();
    useEffect(() => {
        if (state?.services) {
            dispatch({ type: 'reset' });
        }
        const fetchData = async () => {
            try {
                if (!state?.services) {
                    const baseUrl = import.meta.env.VITE_APP_API_URL;
                    const url = `${baseUrl}/getRequestsByUser`;
                    const response = await request(url, 'POST');
                    const serviceRequest = response.data[0];
                    if (serviceRequest) {
                        const dateFormated = formatDateForInput(
                            serviceRequest.createdAt,
                            true
                        );
                        Swal.fire({
                            icon: 'question',
                            title: 'Atencion',
                            html: `Encontramos la siguiente solicitud de la fecha: <b>${dateFormated}</b> <br>
							Los servicios solicitados son: <br>
							${serviceRequest.ServiceItems.map((item) => `<b>${item.service_name}</b>`).join(
                                ', '
                            )}. <br> 
							¿Desea continuar con ella?`,
                            showCancelButton: true,
                            confirmButtonText: 'Si, seguir con esta solicitud',
                            cancelButtonText: 'Cancelar',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                // Armo el objeto con los servicios seleccionados
                                const { ServiceItems } = serviceRequest;

                                const selectedServicesRequest =
                                    ServiceItems.map((item) => ({
                                        nombre: item.service_name,
                                        tipo: item.service_type,
                                        id_form: item.id_service_form,
                                    }));

                                // Verificar si 'Datos Personales' ya está en la lista de servicios seleccionados
                                const personalDataExists =
                                    selectedServicesRequest.some(
                                        (service) =>
                                            service.nombre ===
                                                'Datos Personales' &&
                                            service.tipo === 0
                                    );

                                // Si 'Datos Personales' no está en la lista, agregarlo
                                if (!personalDataExists) {
                                    selectedServicesRequest.unshift({
                                        nombre: 'Datos Personales',
                                        tipo: 0,
                                    });
                                }
                                // Ordenar los servicios seleccionados por tipo
                                selectedServicesRequest.sort(
                                    (a, b) => a.tipo - b.tipo
                                );
                                dispatch({
                                    type: 'set_request',
                                    data: serviceRequest
                                })
                                dispatch({
                                    type: 'set_request_service_id',
                                    data: serviceRequest.id,
                                });
                                dispatch({
                                    type: 'set_services_items',
                                    data:  ServiceItems 
                                })
                                dispatch({
                                    type: 'select_services',
                                    data: selectedServicesRequest,
                                });
                                dispatch({
                                    type: 'set_person',
                                    data: serviceRequest.person_data
                                })
                                dispatch({type: 'set_step', data: serviceRequest.step})
                                navigate(`/multiStepForm/${selectedServicesRequest[serviceRequest.step].nombre}`);
                            }
                        });
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const handleSelectService = (service) => {
        // Crear una copia de selectedServices para evitar la mutación directa
        const newSelectedServices = [...selectedServices];

        // Buscar el índice del servicio en la lista
        const index = newSelectedServices.findIndex(
            (s) => s.nombre === service.nombre && s.tipo === service.tipo
        );

        if (index !== -1) {
            // Si el servicio ya está en la lista, quitarlo
            newSelectedServices.splice(index, 1);
        } else {
            // Si el servicio no está en la lista, agregarlo
            newSelectedServices.push(service);
        }

        // Actualizar selectedServices con la nueva lista
        setSelectedServices(newSelectedServices);
    };
    const navigate = useNavigate();

    const onSubmit = async () => {
        if (!state?.services) {
            dispatch({ type: 'reset' });

            if (selectedServices.length === 0) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: 'Debes seleccionar al menos un servicio para continuar.',
                });
                return;
            }

            // Verificar si 'Datos Personales' ya está en la lista de servicios seleccionados
            const personalDataExists = selectedServices.some(
                (service) =>
                    service.nombre === 'Datos Personales' && service.tipo === 0
            );

            // Si 'Datos Personales' no está en la lista, agregarlo
            if (!personalDataExists) {
                selectedServices.unshift({
                    nombre: 'Datos Personales',
                    tipo: 0,
                });
            }
            // Ordenar los servicios seleccionados por tipo
            selectedServices.sort((a, b) => a.tipo - b.tipo);

            // Genero un registro en la DB con los servicios seleccionados
            const baseUrl = import.meta.env.VITE_APP_API_URL;
            const url = `${baseUrl}/createRequestService`;
            const sendData = { services: selectedServices };
            try {
                const data = await request(url, 'POST', sendData);
                dispatch({
                    type: 'set_request_service_id',
                    data: data.data.id,
                });

                dispatch({
                    type: 'set_request',
                    data: data.data
                })

                dispatch({type: 'set_step', data: data.data.step})
            } catch (error) {
                const { message } = error.response.data;
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: message,
                });
                return;
            }
        }

        dispatch({ type: 'select_services', data: selectedServices });
        navigate(`/multiStepForm/Datos Personales`);
    };
    return (
        <div>
            <h2 className="text-center m-5">
                Marca los servicios que deseas dar de alta
            </h2>
            <div className="flex w-full flex-wrap">
                {services.map((service, index) => (
                    <ServiceCard
                        key={index}
                        service={service}
                        onSelectionChange={handleSelectService}
                        seeRqueriments={seeRqueriments}
                        visibleService={visibleService}
                        setVisibleService={setVisibleService}
                    />
                ))}
            </div>
            <div className="mt-5 flex justify-center">
                <Button
                    variant="contained"
                    color="success"
                    className="!bg-green-400 w-1/2"
                    onClick={onSubmit}
                >
                    Solicitar Servicios
                </Button>
            </div>

            <div className="m-5">
                {services.map((service, index) => (
                    <div
                        key={index}
                        id={`${service.nombre}-1`}
                        className="w-full bg-white p-3 rounded-md hidden"
                    >
                        <h4 className="text-center">{service.nombre}</h4>
                        <ListRequeriments servicio={service.nombre} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SelectServices;
