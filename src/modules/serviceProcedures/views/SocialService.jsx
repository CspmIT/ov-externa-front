import { Button } from '@mui/material';
import React, { useState } from 'react';

const SocialService = () => {
    const [documentation, setDocumentation] = useState(false);
    return (
        <>
            <form action="" className="flex flex-col w-full gap-3">
                <div className="col-span-12 flex gap-3">
                    <div className="flex flex-col w-full gap-3 items-center justify-center "></div>
                    <div className="col-span-12 flex mt-3 items-center justify-center gap-3">
                        <Button
                            className="w-1/6"
                            variant="outlined"
                            onClick={() => {
                                if (documentation) {
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
                        <Button
                            className="w-1/9"
                            variant="contained"
                            color="secondary"
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
                                {step === state?.services.length
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
                </div>
            </form>
        </>
    );
};

export default SocialService;
