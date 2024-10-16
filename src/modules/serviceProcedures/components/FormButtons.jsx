import React from 'react';
import { Button } from '@mui/material';
import { useRegForm } from '../providers/RegFormProvider';
import { useNavigate } from 'react-router-dom';

const FormButtons = ({ documentation = true, setDocumentation }) => {
    const navigate = useNavigate();
    const [state, dispatch] = useRegForm();
    const currentStep = state?.step - 1;
    const step = state?.step;
    console.log(state);
    return (
        <div className="col-span-12 flex mt-3 items-center justify-center gap-3">
            <Button
                className="w-1/6"
                variant="outlined"
                onClick={() => {
                    if (documentation && setDocumentation) {
                        setDocumentation(false);
                        return;
                    }
                    dispatch({ type: 'back' });
                    navigate(
                        `/multiStepForm/${
                            state?.services[currentStep - 1].nombre
                        }`
                    );
                }}
            >
                Volver
            </Button>
            <Button className="w-1/9" variant="contained" color="secondary">
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
