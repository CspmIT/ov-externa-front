import React, { useState } from 'react'
import Button from '../../components/Button'
import Swal from 'sweetalert2'
import { useForm } from 'react-hook-form'
import { TextField } from '@mui/material'
import { request } from '../../utils/request'
import enojado from '/assets/img/opinion/enojado.png'
import emoji from '/assets/img/opinion/emoji.png'
import bien from '/assets/img/opinion/bien.png'
import feliz from '/assets/img/opinion/feliz.png'

const Opinion = () => {
	const [inputVisibility, setInputVisibility] = useState('hidden')
	const [score, setScore] = useState()

	const showInput = (variab) => {
		setInputVisibility(variab === score ? (inputVisibility === 'hidden' ? '' : 'hidden') : '')
		setScore(variab)
	}

	const formulario = async (data) => {
		try {
			data.score = score
			const response = await request(import.meta.env.VITE_APP_API_URL + '/addCommentary', 'post', data)
			if (response.status === 200) {
				Swal.fire({
					icon: 'success',
					title: '¡Opinión Guardada!',
					text: 'Muchas gracias',
				})
			}
		} catch (error) {
			console.error('Error en la solicitud:', error)
		}
	}

	const { register: opinionRegister, handleSubmit } = useForm()

	return (
		<div>
			<h2 className='text-center m-5'>Dejanos tu Opinión</h2>
			<hr />
			<h5 className='text-center mt-5'>¿Como fue tu experiencia en la Oficina Virtual?</h5>
			<div className='w-full flex flex-wrap justify-center'>
				<div className='md:w-1/2 w-full flex flex-wrap p-5'>
					<div onClick={() => showInput(1)} className='w-1/4 p-2'>
						<img className='w-full' src={enojado} />
					</div>
					<div onClick={() => showInput(2)} className='w-1/4 p-2'>
						<img className='w-full' src={emoji} />
					</div>
					<div onClick={() => showInput(3)} className='w-1/4 p-2'>
						<img className='w-full' src={bien} />
					</div>
					<div onClick={() => showInput(4)} className='w-1/4 p-2'>
						<img className='w-full' src={feliz} />
					</div>
				</div>
			</div>
			<form id='formInformation' onSubmit={handleSubmit(formulario)}>
				<div className={`w-full text-center px-2`} style={{ visibility: inputVisibility }}>
					<TextField className='md:w-1/2 w-full' label='Ecriba un comentario' variant='outlined' {...opinionRegister('text_opinion')} />
				</div>
				<div className={`w-full text-center`} style={{ visibility: inputVisibility }}>
					<Button props={{ class: `text-black bg-yellow-300 mt-5 hover:bg-yellow-400 focus:bg-yellow-400 m-2`, text: 'Guardar', type: 'submit' }} />
				</div>
			</form>
		</div>
	)
}

export default Opinion
