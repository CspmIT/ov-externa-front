// import Axios from 'axios'
import Swal from 'sweetalert2'
import { request } from '../../utils/request'
// Funcion para obtener el socio cuando se envia el formulario
const getCustomer = async (data) => {
	const numberCustomer = data.number_customer
	const url = import.meta.env.VITE_APP_API_URL + '/getCustomer'
	const res = await request(url, 'POST', { customer: numberCustomer })
	// const res = await Axios.post(url, { customer: numberCustomer })
	return res
}

// Funcion para actualizar los datos del usuario en la db y subir de nivel
const updateLevel = async (data) => {
	const user = localStorage.getItem('usuario')
	const { sub } = JSON.parse(user)
	Object.assign(data, { id: sub })
	Object.assign(data, { level: 2 })
	const url = import.meta.env.VITE_APP_API_URL + '/upgradeLevelUser'
	const res = await request(url, 'PATCH', data)
	// const res = await Axios.patch(url, data)
	return res.data
}

const validateForm = async (data, navigate) => {
	try {
		const nombreSocio = await getCustomer(data)
		if (nombreSocio.status !== 200) {
			throw new Error(nombreSocio.error)
		}
		// Muestro una alerta con el nombre del socio
		const swal = await Swal.fire({
			title: '¿Este es el socio que deseas agregar?',
			text: nombreSocio.data,
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: 'Si, agregar',
			cancelButtonText: 'Cancelar',
		})

		if (swal.isConfirmed) {
			const result = await updateLevel(data)
			// Muestro una alerta si se subio de nivel
			if (result.message) {
				Swal.fire({
					title: '¡Has subido al nivel 2!',
					text: 'Te pediremos que vuelvas a iniciar sesión',
					icon: 'success',
					allowOutsideClick: false,
				}).then((result) => {
					if (result.isConfirmed) {
						localStorage.removeItem('usuario')
						// Cierro la sesion del usuario
						navigate('/Login')
						window.location.reload()
					}
				})
			} else {
				throw new Error(result.error)
			}
		}
	} catch (error) {
		const { message } = error.response.data
		const errorMessages = []

		if (message === 'El socio no existe') {
			Swal.fire({
				title: 'Error',
				text: message,
				icon: 'error',
			})
			return
		}

		for (const i in message) {
			if (i === 'user' || i === 'level') {
				errorMessages.push('Ocurrio un error al intentar subir de nivel, por favor intente luego o pongase en contacto con el administrador del sistema.')
				break
			}
			errorMessages.push(...message[i])
		}

		const alertMessage = errorMessages.join('\n')

		Swal.fire({
			title: 'Error',
			text: alertMessage,
			icon: 'error',
		})
	}
}

export default validateForm
