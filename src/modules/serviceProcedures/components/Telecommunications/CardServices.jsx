import { Checkbox, Paper } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import { useState } from 'react'

const CardServices = ({ title, service, handleChangeTotal, handleChangeTotalDelete, currentService }) => {
	const servicesCod = [55, 59, 84, 100, 117]
	const [isDisabled, setIsDisabled] = useState(false)
	const [selected, setSelected] = useState(-1)

	// Obtengo todos los cod_ser del array service
	const codCat = service.map((service) => service.COD_CAT)
	// Agrego la opcion no quiero este servicio a los servicios que se pueden agregar
	if (!codCat.includes(0)) {
		const skipService = { COD_SER: 9, DES_CAT: 'NO QUIERO ESTE SERVICIO', DES_SER: 'NO QUIERO ESTE SERVICIO', PRE_UNI: 0, COD_CAT: 0 }
		if (service[0].COD_SER === 9) {
			service.push(skipService)
		}
		if (service[0].COD_SER === 55) {
			skipService.COD_SER = 55
			service.push(skipService)
		}
		if (service[0].COD_SER === 10) {
			skipService.COD_SER = 10
			service.push(skipService)
		}
	}

	const handleCheckboxChange = (e, service) => {
		if (e.target.checked) {
			if (service.COD_CAT !== 0) {
				handleChangeTotal({ name: service.DES_SER, description: service.DES_CAT, value: service.PRE_UNI })
			}
			currentService(service.COD_SER)
			console.log(service.COD_SER)
			setSelected(service.COD_CAT)
			setIsDisabled(true)
		} else {
			currentService(service.COD_SER)
			handleChangeTotalDelete({ name: service.DES_SER, description: service.DES_CAT, value: service.PRE_UNI })
			setSelected(-1)
			setIsDisabled(false)
		}
	}

	return (
		<Paper elevation={3} className='w-full p-4'>
			<h4 className='text-center'>{title}</h4>
			{service.map((service, index) => (
				<div key={index} className='flex flex-row items-center justify-between mb-3'>
					<h5>{servicesCod.includes(service.COD_SER) ? service.DES_SER : service.DES_CAT}</h5>
					<Checkbox
						icon={<AddBoxOutlinedIcon />}
						checkedIcon={<AddBoxIcon />}
						sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }}
						onChange={(e) => handleCheckboxChange(e, service)}
						disabled={isDisabled && selected !== service.COD_CAT && service.COD_SER !== 84}
					/>
				</div>
			))}
		</Paper>
	)
}

export default CardServices
