import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useRegForm } from '../providers/RegFormProvider';
import { useNavigate } from 'react-router-dom';
import { backend } from '../../../routes/apiEndpoints';
import { request } from '../../../utils/request';
import Swal from 'sweetalert2';

const FormButtons = ({
    documentation = true,
    setDocumentation,
    getValues = undefined,
}) => {
    const navigate = useNavigate();
    const [state, dispatch] = useRegForm();
    const step = state?.step;

    useEffect(() => {
        navigate(
            `/multiStepForm/${
                state.services?.[state.currentStep]?.nombre ?? ''
            }`
        );
    }, [state.step]);

    const back = async () => {
        if (documentation && setDocumentation) {
            setDocumentation(false);
            return;
        }
        await dispatch({ type: 'back' });
    };

    const saveAndContinue = async () => {
        console.log(getValues());
        console.log(state);
        // Genero un objeto para guardar los datos del formulario registrados hasta el momento
        const data = {
            AllData: {...state},
            ServiceForm: getValues(),
        };
        console.log(data);
        try {
            const result = await request(
                `${backend.OvExterna}/returnLater`,
                'POST',
                data
            );
            console.log(result);
        } catch (error) {
            Swal.fire({
                title: 'Error',
                html: error.message,
                icon: 'error',
            });
        }
    };

    return (
        <div className="col-span-12 flex mt-3 items-center justify-center gap-3">
            <Button className="w-1/6" variant="outlined" onClick={back}>
                Volver
            </Button>
            <Button
                className="w-1/9"
                variant="contained"
                color="secondary"
                onClick={saveAndContinue}
            >
                Guardar y continuar despues
            </Button>
            {documentation !== false ? (
                <Button
                    disabled={!state?.person}
                    className="w-1/6"
                    variant="contained"
                    color="success"
                    type="submit"
                >
                    {step === state?.services?.length
                        ? 'Finalizar'
                        : 'Siguiente'}
                </Button>
            ) : (
                <Button
                    className="w-1/6"
                    variant="contained"
                    color="warning"
                    type="submit"
                >
                    Cargar documentacion
                </Button>
            )}
        </div>
    );
};

export default FormButtons;
