import React, { useState } from 'react'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'

const ServiceCard = ({ service, seeRqueriments, visibleService, setVisibleService, onSelectionChange }) => {
	const [isChecked, setChecked] = useState(true)
	const handleClick = () => {
		const newCheckedState = !isChecked
		setChecked(newCheckedState)
		onSelectionChange(service, newCheckedState)
	}

	return (
		<div onClick={handleClick} className='w-full md:w-1/4 lg:w-1/4 justify-self-center '>
			<div className='flex p-8 rounded-[2.5em] m-3 bg-white shadowCards cursor-pointer dark:bg-zinc-700 dark:text-gray-300 w-auto flex-col'>
				<div className='w-full flex justify-center items-center'>
					<h4 className='inline-flex'>{service.nombre}</h4>
					<Checkbox className='float-right' checked={isChecked} color='success' inputProps={{ 'aria-label': 'secondary checkbox' }} />
				</div>
				<div className='w-full text-center'>
					<Button
						variant='text'
						onClick={(e) => {
							e.stopPropagation()
							seeRqueriments(service, visibleService, setVisibleService)
						}}
						size='small'
						sx={{ fontSize: '12px' }}
					>
						Ver Requisitos
					</Button>
				</div>
			</div>
		</div>
	)
}

export default ServiceCard
