import React, { useState } from 'react'
import InputGroup from '../../components/InputGroup'
import Button from '../../components/Button'
import enojado from '../../../public/assets/img/opinion/enojado.png'

const index = () => {
	const [input, setInput] = useState('hidden')
	//   const [enviar, setEnviar] = useState([])

	const showInput = () => {
		setInput(input === '' ? 'hidden' : '')
	}

	return (
		<div>
			<h2 className='text-center m-5'>Dejanos tu Opinión</h2>
			<hr />
			<h5 className='text-center mt-5'>¿Como fue tu experiencia en la Oficina Virtual?</h5>
			<div className='w-full flex flex-wrap justify-center'>
				<div className='w-1/2 flex flex-wrap p-5'>
					<div onClick={() => showInput()} className='w-1/4 p-2'>
						<img className='w-full' src={enojado} />
					</div>
					<div onClick={() => showInput()} className='w-1/4 p-2'>
						<img className='w-full' src='assets/img/opinion/emoji.png' />
					</div>
					<div onClick={() => showInput()} className='w-1/4 p-2'>
						<img className='w-full' src='/assets/img/opinion/bien.png' />
					</div>
					<div onClick={() => showInput()} className='w-1/4 p-2'>
						<img className='w-full' src='/assets/img/opinion/feliz.png' />
					</div>
				</div>
				<div className={`w-2/3 text-center ${input}`}>
					<InputGroup
						props={{
							name: 'lastNameRegister',
							ph: 'Ayudanos a mejorar ingresando tu comentario...',
							type: 'text',
							req: true,
							value: 4,
						}}
					/>
					<Button
						props={{
							class: 'text-black bg-yellow-300 mt-5 hover:bg-yellow-400 focus:bg-yellow-400 m-2',
							text: 'Enviar',
							type: 'button',
						}}
					/>
				</div>
			</div>
		</div>
	)
}

export default index
