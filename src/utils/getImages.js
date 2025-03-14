import axios from 'axios'
import { backend } from '../routes/apiEndpoints'

export async function getImage(imageName, credentials) {
    const urlImage = `${backend.Archivos}/getImg/${credentials.bucket}/${imageName}`
    const image = await axios({
        method: 'GET',
        url: urlImage,
        withCredentials: true,
        headers: {
            accesskey: credentials.accessKey,
            secretkey: credentials.secretKey,
            Accept: 'image/*', // o el tipo de contenido que esperas recibir
        },
        responseType: 'blob', // para manejar archivos binarios
    })

    return URL.createObjectURL(image.data)
}
