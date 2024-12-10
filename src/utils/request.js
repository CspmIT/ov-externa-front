import axios from 'axios'

export const statusBack = async () => {
    const url = import.meta.env.VITE_APP_API_URL + '/status'
    try {
        await axios({ method: 'GET', url: url })
        console.log('execute')
    } catch (error) {
        throw error
    }
}

export const request = async (url, method, data = false) => {
    if (!url || !method) {
        throw new Error('URL o método no proporcionados')
    }
    try {
        const response = await axios({
            method,
            url,
            data: data || {},
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
        return response
    } catch (error) {
        if (error.response.status === 500) {
            let messageError = ''
            const errors = error.response.data
            for (const key in errors) {
                if (Object.hasOwnProperty.call(errors, key)) {
                    messageError += ' ' + errors[key].message
                }
            }
            throw messageError
        } else {
            throw error.response.data
        }
    }
}
export const requestApiExt = async (url, method, data = false) => {
    if (!url || !method) {
        throw new Error('URL o método no proporcionados')
    }

    try {
        const response = await axios({
            method,
            url,
            data: data || {},
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
        return response
    } catch (error) {
        console.error(
            'Error al enviar la solicitud:',
            error.response ? error.response.data : error.message
        )
        throw error
    }
}

export const requestFiles = async (url, method, data = false) => {
    if (!url || !method) {
        throw new Error('URL o método no proporcionados')
    }

    try {
        const response = await axios({
            method,
            url,
            data: data || {},
            headers: {
                'Content-Type': 'multipart/form-data',
                Accept: 'application/json',
            },
        })
        return response
    } catch (error) {
        console.error(
            'Error al enviar la solicitud:',
            error.response ? error.response.data : error.message
        )
        throw error
    }
}
