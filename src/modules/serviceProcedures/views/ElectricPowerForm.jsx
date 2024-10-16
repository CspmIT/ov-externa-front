import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    IconButton,
    InputLabel,
    MenuItem,
    Modal,
    Radio,
    RadioGroup,
    Select,
    TextField,
    Tooltip,
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useRegForm } from '../providers/RegFormProvider';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useTheme } from '@emotion/react';
import { request } from '../../../utils/request';
// import Swal from 'sweetalert2'
import Swal from 'sweetalert2';
import ConnectionAddress from '../components/ConnectionAddress';
import ElectricalEnergyDocumentation from '../components/ElectricalEnergy/ElectricalEnergyDocumentation';
import FormButtons from '../components/FormButtons';
const ElectricPowerForm = () => {
    const [isOwner, setIsOwner] = useState(null);
    const [markerPosition, setMarkerPosition] = useState([
        -30.71624815384811, -62.005226726953374,
    ]);
    const [open, setOpen] = useState(false);
    const [documentation, setDocumentation] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const theme = useTheme();
    const [state, dispatch] = useRegForm();
    console.log(state);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        getValues,
        formState: { errors, isValid },
    } = useForm();

    const currentStep = state?.step - 1;
    const step = state?.step;
    const typeActivity = watch('typeActivity');


    useEffect(() => {
        const getFormData = async () => {
            const baseUrl = import.meta.env.VITE_APP_API_URL;
            // Recorro services Items y obtengo el id del formulario cuando el service type sea igual al servicio actual
            const serviceItems = state?.serviceItems;
            const selectServices = state?.services;
            console.log(serviceItems);
            console.log(selectServices);
            if (!serviceItems || !selectServices) return;
            const serviceItem = serviceItems.find(
                (item) => item.service_type === selectServices[currentStep].tipo
            );
            console.log(serviceItem);
            const sendData = {
                formID: serviceItem.id_service_form,
                type: serviceItem.service_type,
            };
            await request(`${baseUrl}/getFormService`, 'POST', sendData);
            console.log(request);
        };
        getFormData();
    }, []);

    const onSubmit = async (values) => {
        if (!isValid) return;
        if (!documentation) {
            setDocumentation(true);

            // Obtengo los datos del formulario
            const connectionAddress = {
                lat: markerPosition[0],
                lng: markerPosition[1],
                provincia: values.provincia,
                city: values.city,
                street: values.street,
                numberAddress: values.numberAddress,
                circ: values.circ,
                sec: values.sec,
                man: values.man,
                par: values.par,
                ph: values.ph,
                lote: values.lote,
            };
            dispatch({ type: 'connection_address', data: connectionAddress });
            // Guardo los datos restantes del formulario
            const electricData = {
                typeProcedure: values.typeProcedure,
                typeActivity: values.typeActivity,
                meterType: values.meterType,
                residenceAddress: values.residenceAddress,
                propietarioInmueble: values.propietarioInmueble,
                nameProperty: values.nameProperty,
                lastNameProperty: values.lastNameProperty,
                numberDocProperty: values.numberDocProperty,
            };
            dispatch({ type: 'energia_electrica', data: electricData });
        } else {
            // Validar dni garante
            const files = {
                impuestoMuni: values.impuestoMuni,
                certificadoLey: values.certificadoLey,
                tituloProp: values.tituloProp,
                constanciaAfip: values.constanciaAfip,
                garantiaComercial: values.garantiaComercial,
                permisoConexion: values.permisoConexion,
                planchetaCatastral: values.planchetaCatastral,
                typeGarante: values.typeGarante,
                dniGarante: values.dniGarante,
            };
            dispatch({ type: 'electric_files', data: files });

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
        }
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        textColor: 'text.primary',
        color: 'text.primary',
        bgcolor: 'background.paper',
        border: 'none',
        borderRadius: 4,
        boxShadow: 24,
        p: 4,
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col w-full gap-3"
            >
                <div className="col-span-12 flex gap-3">
                    {!documentation ? (
                        <div className="flex flex-col w-full gap-3 items-center justify-center ">
                            <div className="w-2/3 flex justify-center items-center">
                                <FormControl
                                    className="w-3/4"
                                    error={errors.typeProcedure}
                                >
                                    <InputLabel id="typeProcedure">
                                        Tipo de tramite *
                                    </InputLabel>
                                    <Select
                                        labelId="typeProcedure"
                                        label="Tipo de tramite"
                                        id="typeProcedure"
                                        defaultValue={
                                            state?.energiaElectrica
                                                ?.typeProcedure || ''
                                        }
                                        {...register('typeProcedure', {
                                            required: true,
                                        })}
                                    >
                                        <MenuItem value="1">
                                            Nueva Alta
                                        </MenuItem>
                                        <MenuItem disabled value="2">
                                            Cambio de titularidad
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                                <Tooltip
                                    className="w-auto ms-2"
                                    placement="right"
                                    title='Si la residencia donde esta solicitando el servicio aun tiene el medidor del inquilino anterior, el tramite que debe realizar es el de "cambio de titularidad"'
                                >
                                    <IconButton>
                                        <HelpOutlineIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>
                            <div className="w-2/3 flex items-center justify-center">
                                <FormControl
                                    className="w-[79%]"
                                    error={errors.typeActivity}
                                >
                                    <InputLabel id="typeActivity">
                                        Tipo de Actividad *
                                    </InputLabel>
                                    <Select
                                        labelId="typeActivity"
                                        label="Tipo de Actividad"
                                        id="typeActivity"
                                        defaultValue={
                                            state?.energiaElectrica
                                                ?.typeActivity || ''
                                        }
                                        {...register('typeActivity', {
                                            required: true,
                                        })}
                                    >
                                        <MenuItem value="1">
                                            Residencial
                                        </MenuItem>
                                        <MenuItem value="2">
                                            Comercial o Industrial
                                        </MenuItem>
                                        <MenuItem value="3">Obra</MenuItem>
                                        <MenuItem value="4">
                                            Industria o complejo de
                                            departamentos
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            {typeActivity && (
                                <div className="w-[53%] flex gap-3">
                                    <FormControl className="w-full">
                                        <InputLabel id="meterType">
                                            Tipo de Medidor *
                                        </InputLabel>
                                        <Select
                                            labelId="meterType"
                                            error={errors.meterType}
                                            label="Tipo de Medidor"
                                            id="meterType"
                                            defaultValue={
                                                state?.energiaElectrica
                                                    ?.meterType || 1
                                            }
                                            {...register('meterType', {
                                                required: true,
                                            })}
                                        >
                                            <MenuItem value="1">
                                                Monofasico
                                            </MenuItem>
                                            <MenuItem value="2">
                                                Trifasico
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                    <Modal open={open} onClose={handleClose}>
                                        <Box sx={style}>
                                            <h4
                                                className={`text-center`}
                                                style={{
                                                    color: theme.palette.text
                                                        .primary,
                                                }}
                                            >
                                                ¿Que medidor necesito?
                                            </h4>
                                            <p
                                                style={{
                                                    color: theme.palette.text
                                                        .primary,
                                                }}
                                            >
                                                <b>Medidor Monofásico:</b>{' '}
                                                Eficiencia para Consumo
                                                Residencial y Pequeños Negocios
                                                El medidor monofásico es la
                                                elección común en hogares y
                                                pequeños negocios. Su diseño
                                                simplificado se centra en la
                                                medición de una sola fase de
                                                electricidad. Esto lo hace
                                                perfecto para aplicaciones de
                                                menor escala, como iluminación
                                                residencial, electrodomésticos y
                                                pequeñas herramientas
                                                eléctricas.
                                            </p>
                                            <p
                                                style={{
                                                    color: theme.palette.text
                                                        .primary,
                                                }}
                                            >
                                                <b>Medidor Trifásico:</b>{' '}
                                                Potencia para Grandes Demandas
                                                El medidor trifásico es una
                                                herramienta esencial en entornos
                                                industriales y comerciales con
                                                demandas eléctricas
                                                significativas. Su principal
                                                distinción radica en la
                                                capacidad para gestionar tres
                                                fases de electricidad de forma
                                                simultánea. Esto lo hace ideal
                                                para equipos y maquinaria que
                                                requieren una potencia mayor,
                                                como motores industriales,
                                                sistemas de aire acondicionado
                                                de gran escala y equipos de
                                                producción.
                                            </p>
                                        </Box>
                                    </Modal>
                                    <Button
                                        onClick={handleOpen}
                                        variant="outlined"
                                    >
                                        ¿Que medidor necesito?
                                    </Button>
                                </div>
                            )}
                            {typeActivity === '2' && (
                                <div className="w-2/3 flex mt-3 items-center justify-center">
                                    <FormControl
                                        className="w-3/4"
                                        error={errors.residenceAddress}
                                    >
                                        <FormLabel
                                            id="residence-address"
                                            className="text-center"
                                        >
                                            ¿El comercio comparte el mismo
                                            medidor que su domicilio de
                                            residencia?
                                        </FormLabel>
                                        <RadioGroup
                                            defaultValue={
                                                state?.energiaElectrica
                                                    ?.residenceAddress || ''
                                            }
                                            error={errors.residenceAddress}
                                            row
                                            aria-labelledby="residence-address"
                                            className="flex justify-center"
                                            {...register('residenceAddress', {
                                                required: true,
                                            })}
                                        >
                                            <FormControlLabel
                                                value="1"
                                                control={<Radio />}
                                                label="Si"
                                            />
                                            <FormControlLabel
                                                value="2"
                                                control={<Radio />}
                                                label="No"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            )}
                            {typeActivity && (
                                <>
                                    <ConnectionAddress
                                        errors={errors}
                                        register={register}
                                        markerPosition={markerPosition}
                                        setMarkerPosition={setMarkerPosition}
                                    />
                                    <div className="w-full flex mt-3 gap-3 items-center">
                                        <FormLabel
                                            error={Boolean(
                                                errors.propietarioInmueble
                                            )}
                                            id="propietario-inmueble"
                                            className="text-center"
                                        >
                                            ¿Eres propietario del inmueble? *
                                        </FormLabel>
                                        <RadioGroup
                                            error={errors.propietarioInmueble}
                                            row
                                            aria-labelledby="propietario-inmueble"
                                            className="flex justify-center ms-3"
                                            {...register(
                                                'propietarioInmueble',
                                                { required: true }
                                            )}
                                            onChange={(event) =>
                                                setIsOwner(event.target.value)
                                            }
                                            defaultValue={
                                                state?.energiaElectrica
                                                    ?.propietarioInmueble || ''
                                            }
                                        >
                                            <FormControlLabel
                                                value="1"
                                                control={<Radio />}
                                                label="Si"
                                            />
                                            <FormControlLabel
                                                value="2"
                                                control={<Radio />}
                                                label="No"
                                            />
                                        </RadioGroup>
                                    </div>
                                </>
                            )}

                            {typeActivity && isOwner === '2' && (
                                <div className="w-full flex gap-3 items-center justify-start">
                                    <TextField
                                        className="w-1/4"
                                        {...register('nameProperty', {
                                            required: true,
                                        })}
                                        error={errors.nameProperty}
                                        label="Nombre del propietario"
                                    ></TextField>
                                    <TextField
                                        className="w-1/4"
                                        {...register('lastNameProperty', {
                                            required: true,
                                        })}
                                        error={errors.lastNameProperty}
                                        label="Apellido del propietario"
                                    ></TextField>
                                    <TextField
                                        className="w-1/4"
                                        {...register('numberDocProperty', {
                                            required: true,
                                        })}
                                        error={errors.numberDocProperty}
                                        label="Numero de documento"
                                    ></TextField>
                                </div>
                            )}
                        </div>
                    ) : (
                        <ElectricalEnergyDocumentation
                            getValues={getValues}
                            register={register}
                            errors={errors}
                        />
                    )}
                </div>

                <FormButtons
                    documentation={documentation}
                    setDocumentation={setDocumentation}
                />
            </form>
        </div>
    );
};

export default ElectricPowerForm;
