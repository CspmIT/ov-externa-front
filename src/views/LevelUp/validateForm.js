// import Axios from 'axios'
import Swal from 'sweetalert2'
import { request } from '../../utils/request'
import Cookies from 'js-cookie'
// Funcion para obtener el socio cuando se envia el formulario
// const getCustomer = async (data) => {
// 	const numberCustomer = data.number_customer
// 	const url = import.meta.env.VITE_APP_API_URL + '/getCustomer'
// 	const res = await request(url, 'POST', { customer: numberCustomer })
// 	// const res = await Axios.post(url, { customer: numberCustomer })
// 	return res
// }

// Funcion para actualizar los datos del usuario en la db y subir de nivel
const updateLevel = async (data) => {
    const user = localStorage.getItem('usuario')
    const { sub } = JSON.parse(user)
    Object.assign(data, { id: sub })
    Object.assign(data, { level: 2 })
    const url = import.meta.env.VITE_APP_API_URL + '/upgradeLevelUser'
    const res = await request(url, 'PATCH', data)
    // const res = await Axios.patch(url, data)
    return res
}

const validateForm = async (data, navigate) => {
    try {
        const swal = await Swal.fire({
            title: '¿Deseas subir a nivel 2 con el socio?',
            text: data.last_name_customer + ' ' + data.name_customer,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Si, agregar',
            cancelButtonText: 'Cancelar',
        })

        if (swal.isConfirmed) {
            Swal.fire({
                title: 'Por favor espere...',
                text: 'Estamos ejecutando su petición',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading()
                },
            })
            const result = await updateLevel(data)
            // Muestro una alerta si se subio de nivel

            if (result.status === 200) {
                Swal.close()
                Swal.fire({
                    title: '¡Has subido al nivel 2!',
                    text: 'Te pediremos que vuelvas a iniciar sesión',
                    icon: 'success',
                    allowOutsideClick: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        localStorage.removeItem('usuario')
                        Cookies.remove('token')
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
        Swal.close()
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error,
        })
        // const { message } = error.response.data
        // const errorMessages = []

        // if (message === 'El socio no existe') {
        // 	Swal.fire({
        // 		title: 'Error',
        // 		text: message,
        // 		icon: 'error',
        // 	})
        // 	return
        // }

        // for (const i in message) {
        // 	if (i === 'user' || i === 'level') {
        // 		errorMessages.push('Ocurrio un error al intentar subir de nivel, por favor intente luego o pongase en contacto con el administrador del sistema.')
        // 		break
        // 	}
        // 	errorMessages.push(...message[i])
        // }

        // const alertMessage = errorMessages.join('\n')

        // Swal.fire({
        // 	title: 'Error',
        // 	text: alertMessage,
        // 	icon: 'error',
        // })
    }
}

export default validateForm
