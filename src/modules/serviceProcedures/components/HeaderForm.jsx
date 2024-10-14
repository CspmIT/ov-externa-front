import { Step, StepLabel, Stepper } from '@mui/material';
import { useRegForm } from '../providers/RegFormProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const HeaderForm = () => {
    const [state] = useRegForm();
    const navigate = useNavigate();

    let color, name;
    if (state?.services) {
        color = state.services[state.step - 1]?.color;
        name = state.services[state.step - 1]?.nombre;
    }

    // Función para aplicar el estilo al icono basado en el paso activo
    const getIconStyle = (index) => {
        // Si el paso actual es mayor que el índice, el paso está completado
        const isCompleted = state.step - 1 > index;
        return {
            color: isCompleted
                ? '#007bff'
                : state.step - 1 === index
                ? color
                : '#000', // Azul para completados, color específico para el actual, negro por defecto
            fontSize: '28px',
        };
    };

    return (
        state?.services && (
            <>
                <Stepper
                    className="mb-8"
                    activeStep={state.step - 1}
                    alternativeLabel
                >
                    {state.services.map((service, index) => (
                        <Step
                            key={service.nombre}
                            completed={state.step - 1 > index}
                        >
                            <StepLabel
                                icon={service.icon}
                                style={getIconStyle(index)}
                            >
                                <span className="text-sm">
                                    {service.nombre}
                                </span>
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <h1 className="text-center text-5xl" style={{ color }}>
                    {name}
                </h1>
                {/* {name !== 'Datos Personales' && <hr style={{ borderColor: color }} className={`my-5 border-t-8`} />} */}
            </>
        )
    );
};

export default HeaderForm;
