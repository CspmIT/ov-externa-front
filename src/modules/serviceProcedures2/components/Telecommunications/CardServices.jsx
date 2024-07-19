import { Button, Paper } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add'

const CardServices = ({ title, service, handleChangeTotal }) => {
	const servicesCod = [55, 59, 84, 100, 117]
	return (
		<Paper elevation={3} variant='outlined' className='w-1/3 p-4'>
			<h4 className='text-center'>{title || service[0].DES_SER}</h4>
			{service.map((service, index) => (
				<div key={index} className='flex flex-row items-center gap-3 justify-between mb-3'>
					<h5>{servicesCod.includes(service.COD_SER) ? service.DES_SER : service.DES_CAT}</h5>
					<Button variant='outlined' color='primary' onClick={() => handleChangeTotal({ name: service.DES_SER, description: service.DES_CAT, value: service.PRE_UNI })}>
						<AddIcon />
					</Button>
				</div>
			))}
		</Paper>
	)
}

export default CardServices
