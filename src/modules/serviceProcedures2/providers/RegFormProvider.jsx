import { createContext, useContext, useReducer } from 'react';

const RegFormContext = createContext();

export const useRegForm = () => {
	return useContext(RegFormContext);
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'next':
			return { ...state, step: state.step + 1 };
		case 'back':
			return { ...state, step: state.step - 1 };
		case 'reset':
			return { step: 0, data: {} };
		case 'select_services':
			return { ...state, services: { ...action.selectedServices } };
		case 'personal_data':
			return { ...state, personalData: { ...action.data } };
		case 'energia_electrica':
			return { ...state, energiaElectrica: { ...action.data } };
		case 'agua_potable':
			return { ...state, aguaPotable: { ...action.data } };
		case 'telecumunicaciones':
			return { ...state, telecomunicaciones: { ...action.data } };
		case 'servicios_sociales':
			return { ...state, servicios_sociales: { ...action.data } };
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
	});

	return <RegFormContext.Provider value={[state, dispatch]}>{children}</RegFormContext.Provider>;
};

export default RegFormProvider;
