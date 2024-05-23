import { useRegForm } from '../providers/RegFormProvider'

const HeaderForm = () => {
	const [state] = useRegForm()
	return state?.services && <h1 className='text-center text-2xl'>Formulario de {state.services[state.step - 1]?.nombre}</h1>
}

export default HeaderForm
