import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from '@mui/material';
import { useRegForm } from '../providers/RegFormProvider';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import ConnectionAddress from '../components/ConnectionAddress';
import Swal from 'sweetalert2';
import FormButtons from '../components/FormButtons';
import { request } from '../../../utils/request';
import { backend } from '../../../routes/apiEndpoints';

const DrinkingWaterForm = () => {
    const [state, dispatch] = useRegForm();
    const currentStep = state?.step - 1;
    const navigate = useNavigate();
    const step = state?.step;
    const { register, formState: errors, handleSubmit, getValues } = useForm();
    const [connectionState, setConnectionState] = useState('');
    const [markerPosition, setMarkerPosition] = useState([
        -30.71624815384811, -62.005226726953374,
    ]);
    const [documentation, setDocumentation] = useState(false);
    const [sameDirection, setSameDirection] = useState(false);
    const [firstData, setFirstData] = useState(true);

    const onSubmit = async (data) => {
        if(data.sameDirection){
            // Paso el estado de connexion y el connection address del estado global.
            const { sameDirection, connectionState} = data;
            serviceRequest, form_data, connection_address_tmp
            const objToSend = {
                serviceRequest: state?.serviceRequest,
                form_data: {sameDirection, connectionState},
                connection_address_tmp: state?.connectionAddress
            }
            const response = await request('POST', backend.OvExterna, objToSend);
        }else{
            console.log('Se envia el formulario completo para validar los datos de conexion');
        }
        if (step === state?.services.length) {
            const response = await Swal.fire({
                title: 'Atención',
                text: '¿Desea finalizar la solicitud de servicios?',
                icon: 'info',
                confirmButtonText: 'Si',
                showCancelButton: true,
                cancelButtonText: 'No',
            });

            if (response.isConfirmed) {
                Swal.fire({
                    title: 'Solicitud de servicios',
                    text: 'La solicitud se envio correctamente. Verificaremos los datos y nos pondremos en contacto.',
                    icon: 'success',
                    confirmButtonText: 'Okey',
                });
                dispatch({ type: 'reset' });
                navigate('/');
            }
            return;
        }
        dispatch({ type: 'next' });
        navigate(`/multiStepForm/${state?.services[step].nombre}`);
    };
    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col w-full gap-3"
            >
                <div className="col-span-12 flex gap-3">
                    <div className="flex flex-col w-full gap-3 items-center justify-center ">
                        <div className="w-2/3 flex justify-center items-center">
                            <input type="hidden" {...register('sameDirection')} value={sameDirection} />
                            <FormControl
                                className="w-3/4"
                                error={errors.conectionState}
                            >
                                <InputLabel id="conectionState">
                                    ¿La vivienda tiene conexión de Agua Potable?
                                </InputLabel>
                                <Select
                                    labelId="conectionState"
                                    label="¿La vivienda tiene conexión de Agua Potable?"
                                    id="conectionState"
                                    defaultValue={
                                        state?.aguaPotable?.conectionState || ''
                                    }
                                    {...register('connectionState', {
                                        required: true,
                                        onChange: (e) => {
                                            setConnectionState(e.target.value);
                                            if (
                                                e.target.value === '1' &&
                                                state?.connectionAddress
                                            ) {
                                                Swal.fire({
                                                    title: 'Atención',
                                                    text: 'Detectamos que ya completo los datos de conexión en el formulario anterior. ¿Desea utilizar los mismos datos?',
                                                    icon: 'info',
                                                    confirmButtonText:
                                                        'Aceptar',
                                                    showCancelButton: true,
                                                    cancelButtonText:
                                                        'No, cargar datos nuevos',
                                                }).then((result) => {
                                                    if (result.isConfirmed) {
                                                        setMarkerPosition([
                                                            state
                                                                ?.connectionAddress
                                                                ?.lat,
                                                            state
                                                                ?.connectionAddress
                                                                ?.lng,
                                                        ]);
                                                        setDocumentation(true);
                                                        sameDirection(true);
                                                    } else {
                                                        setFirstData(false);
                                                    }
                                                });
                                            }
                                        },
                                    })}
                                >
                                    <MenuItem value="1">Si</MenuItem>
                                    <MenuItem value="2">No</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        {connectionState === '1' && (
                            <ConnectionAddress
                                errors={errors}
                                register={register}
                                markerPosition={markerPosition}
                                setMarkerPosition={setMarkerPosition}
                                useData={firstData}
                            />
                        )}
                    </div>
                </div>
                <FormButtons
                    setDocumentation={setDocumentation}
                    documentation={documentation}
                    getValues={getValues}
                />
            </form>
        </>
    );
};

export default DrinkingWaterForm;
