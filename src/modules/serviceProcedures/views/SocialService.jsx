import {
    Alert,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormLabel,
    MenuItem,
    TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useRegForm } from '../providers/RegFormProvider';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import FormButtons from '../components/FormButtons';
import SocialServiceDetail from '../../../components/SocialServiceDetail';
import ModalAdherents from '../components/SocialService/ModalAdherents';
import ConnectionAddress from '../components/ConnectionAddress';
import { useForm } from 'react-hook-form';

const SocialService = () => {
    const [state, dispatch] = useRegForm();
    const navigate = useNavigate();
    const [question, setQuestion] = useState(true);
    const [addrress, setAddress] = useState('');
    const [hasEnergy, setHasEnergy] = useState('');
    const [markerPosition, setMarkerPosition] = useState([
        -30.71624815384811, -62.005226726953374,
    ]);
    const [adherents, setAdherents] = useState([]);
    const [open, setOpen] = useState(false);
    const step = state?.step;

    const { register, handleSubmit, errors } = useForm();

    useEffect(() => {
        if (!state?.energiaElectrica && !state?.connectionAddress) {
            setQuestion(true);
        }
    }, []);

    useEffect(() => {
        console.log(state);
        if (state?.adherents?.length > 0) {
            setAdherents(state?.adherents);
        }
    }, [state?.adherents]);

    const onSubmit = async (data) => {
        console.log(data);
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
    };

    return (
        <div>
            <form
                action=""
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col w-full gap-3"
            >
                {question && (
                    <>
                        <div className="col-span-12 flex gap-3">
                            <FormControl
                                className="w-full items-center gap-3"
                                error={errors?.residencia}
                            >
                                <TextField
                                    className="w-1/2"
                                    label="Residencia"
                                    select
                                    {...register('residencia', {
                                        required: true,
                                    })}
                                    onChange={(e) => {
                                        setAddress(e.target.value);
                                    }}
                                    defaultValue={''}
                                    error={errors?.residencia}
                                >
                                    <MenuItem value={true}>Morteros</MenuItem>
                                    <MenuItem value={false}>Otro</MenuItem>
                                </TextField>
                                {addrress === false && (
                                    <>
                                        <Alert severity="info">
                                            INFORMACION IMPORTANTE: Si usted no
                                            reside en localidades que dependen
                                            de Coopmorteros, solo podra
                                            solicitar el alta de servico de
                                            sepelio
                                        </Alert>
                                        <ConnectionAddress
                                            markerPosition={markerPosition}
                                            setMarkerPosition={
                                                setMarkerPosition
                                            }
                                            errors={errors}
                                            register={register}
                                            catastralData={false}
                                        />
                                        <div className="col-span-12- flex gap-3">
                                            <FormControl className="w-100 flex self-center ">
                                                <FormLabel>
                                                    <h4>
                                                        ¿Que servicios sociales
                                                        quiere agregar a su
                                                        cuenta?
                                                    </h4>
                                                </FormLabel>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            name="sepelio"
                                                            defaultChecked={
                                                                addrress
                                                                    ? true
                                                                    : false
                                                            }
                                                            disabled={
                                                                addrress
                                                                    ? false
                                                                    : true
                                                            }
                                                        />
                                                    }
                                                    label="Sepelio"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            name="Banco de sangre"
                                                            defaultChecked={
                                                                true
                                                            }
                                                        />
                                                    }
                                                    label="Banco de sangre"
                                                />
                                            </FormControl>
                                        </div>
                                        <div className="col-span-12 flex gap-3">
                                            <FormControl className="w-full items-center">
                                                <h4>
                                                    ¿Quiere agregar adherentes?
                                                </h4>

                                                <ModalAdherents
                                                    open={openco}
                                                    setOpen={setOpen}
                                                >
                                                    <Button
                                                        type="button"
                                                        variant="contained"
                                                        color="secondary"
                                                        onClick={() => {
                                                            setOpen(true);
                                                        }}
                                                    >
                                                        Agregar
                                                    </Button>
                                                </ModalAdherents>
                                            </FormControl>
                                        </div>
                                        <SocialServiceDetail
                                            adherentes={adherents}
                                        />
                                    </>
                                )}
                            </FormControl>
                        </div>
                        {addrress && (
                            <>
                                <div className="col-span-12 flex gap-3">
                                    <FormControl className="w-full items-center">
                                        <TextField
                                            className="w-1/2"
                                            label="¿Tiene servicio de ENERGIA ELECTRICA a su nombre?"
                                            select
                                            onChange={(e) => {
                                                setHasEnergy(e.target.value);
                                            }}
                                            defaultValue={''}
                                        >
                                            <MenuItem value={true}>Si</MenuItem>
                                            <MenuItem value={false}>
                                                No
                                            </MenuItem>
                                        </TextField>
                                    </FormControl>
                                </div>
                                {hasEnergy ? (
                                    <div className="col-span-12 flex gap-3">
                                        <FormControl className="items-center w-full">
                                            <TextField
                                                className="w-full"
                                                label="Ingrese su Nº de documento"
                                            />
                                        </FormControl>
                                        <FormControl className="items-center w-full">
                                            <TextField
                                                className="w-full"
                                                label="Ingrese su Nº de socio"
                                            />
                                        </FormControl>
                                        <FormControl className="items-center w-full">
                                            <TextField
                                                className="w-full"
                                                label="Seleccione su grupo sanguineo"
                                                select
                                                defaultValue={''}
                                            >
                                                <MenuItem value="0+">
                                                    0+
                                                </MenuItem>
                                                <MenuItem value="0-">
                                                    0-
                                                </MenuItem>
                                                <MenuItem value="A+">
                                                    A+
                                                </MenuItem>
                                                <MenuItem value="A-">
                                                    A-
                                                </MenuItem>
                                                <MenuItem value="B+">
                                                    B+
                                                </MenuItem>
                                                <MenuItem value="B-">
                                                    B-
                                                </MenuItem>
                                                <MenuItem value="AB+">
                                                    AB+
                                                </MenuItem>
                                                <MenuItem value="AB-">
                                                    AB-
                                                </MenuItem>
                                            </TextField>
                                        </FormControl>
                                    </div>
                                ) : (
                                    <ConnectionAddress
                                        markerPosition={markerPosition}
                                        setMarkerPosition={setMarkerPosition}
                                        errors={errors}
                                        register={register}
                                        catastralData={false}
                                    />
                                )}
                                <FormControl className="w-100 flex self-center ">
                                    <FormLabel>
                                        <h4>
                                            ¿Que servicios sociales quiere
                                            agregar a su cuenta?
                                        </h4>
                                    </FormLabel>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="sepelio"
                                                defaultChecked={
                                                    addrress ? true : false
                                                }
                                                disabled={
                                                    addrress ? false : true
                                                }
                                            />
                                        }
                                        label="Sepelio"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="Banco de sangre"
                                                defaultChecked={true}
                                            />
                                        }
                                        label="Banco de sangre"
                                    />
                                </FormControl>
                                <div className="col-span-12 flex gap-3">
                                    <FormControl className="w-full items-center">
                                        <h4>¿Quiere agregar adherentes?</h4>

                                        <ModalAdherents
                                            open={open}
                                            setOpen={setOpen}
                                        >
                                            <Button
                                                type="button"
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => {
                                                    setOpen(true);
                                                }}
                                            >
                                                Agregar
                                            </Button>
                                        </ModalAdherents>
                                    </FormControl>
                                </div>
                                <SocialServiceDetail adherentes={adherents} />
                            </>
                        )}
                    </>
                )}
                <FormButtons documentation={true} />
            </form>
        </div>
    );
};

export default SocialService;
