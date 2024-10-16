import { createContext, useContext, useEffect, useReducer } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const RegFormContext = createContext();

export const useRegForm = () => {
    return useContext(RegFormContext);
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'next':
            return { ...state, step: state.step + 1, currentStep: state.step };
        case 'back':
            return { ...state, step: state.step - 1, currentStep: state.step };
        case 'set_step':
            return { ...state, currentStep: action.data };
        case 'reset':
            return { step: 0, data: {} };
        case 'set_request_service_id':
            return { ...state, requestServiceID: action.data };
        case 'set_services_items':
            return { ...state, serviceItems: [...action.data] };
        case 'select_services':
            return { ...state, services: [...action.data] };
        case 'personal_data':
            return { ...state, personalData: { ...action.data } };
        case 'energia_electrica':
            return { ...state, energiaElectrica: { ...action.data } };
        case 'electric_files':
            return { ...state, electricFiles: { ...action.data } };
        case 'agua_potable':
            return { ...state, aguaPotable: { ...action.data } };
        case 'telecumunicaciones':
            return { ...state, telecomunicaciones: { ...action.data } };
        case 'connection_address':
            return { ...state, connectionAddress: { ...action.data } };
        case 'servicios_sociales':
            return { ...state, servicios_sociales: { ...action.data } };
        case 'adherents':
            return {
                ...state,
                adherents: [...(state.adherents || []), ...action.data],
            };
        case 'set_person':
            return { ...state, person: { ...action.data } };
        case 'reset_person':
            return { ...state, person: null };
        default:
            return state;
    }
};

const RegFormProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, {
        step: 0,
        data: {},
        requestServiceID: null,
    });

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname !== '/multiStepForm' && state?.step === 0) {
            navigate('/multiStepForm');
        }
    }, [state]);

    return (
        <RegFormContext.Provider value={[state, dispatch]}>
            {children}
        </RegFormContext.Provider>
    );
};

export default RegFormProvider;
