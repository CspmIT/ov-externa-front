import axios from 'axios'
import { storage } from '../storage/storage'

export const request = async (url, method, data = false) => {
  try {
    const response = await axios({
      method,
      url,
      data: data || '',
      headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': '69420', Accept: 'application/json' }
    })
    return response.data
  } catch (error) {
    console.error('Error al enviar la solicitud:', error)
    throw error
  }
}

export const requestAuth = async (url, method, data) => {
  const { token } = storage.get('usuario')
  try {
    const response = await axios({
      method,
      url,
      data: data || '',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json', Authorization: 'Bearer ' + token }
    })
    return response.data
  } catch (error) {
    console.error('Error al enviar la solicitud:', error)
    throw error
  }
}
