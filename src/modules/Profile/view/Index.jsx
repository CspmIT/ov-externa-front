import { useEffect, useState } from 'react'
import { Tab, Tabs, Box } from '@mui/material'
import { request } from '../../../utils/request'
import { separateProcopDate } from '../../serviceProcedures/utils/data'
import { CustomTabPanel, a11yProps } from '../../../components/PanelTab'
import DataProfile from '../components/DataProfile'
import EditProfile from '../components/EditProfile'
import ChangePasswordProfile from '../components/ChangePasswordProfile'

function Profile() {
	const getUserDataProfile = async () => {
		// Obtengo los datos del usuario
		const url = import.meta.env.VITE_APP_API_URL + '/dataUserProfile'
		const response = await request(url, 'GET')
		// const response = await Axios.post(url, { user: id })
		return response.data
	}
	// const { setUsuario, usuario } = useContext(UserContext)

	const [userData, setUserData] = useState({})

	const caractCellPhone = (data) => {
		const number = data?.PersonData?.cell_phone?.split(' ')
		if (number.length > 1) {
			return number[0]
		} else {
			return ''
		}
	}
	const numbCellPhone = (data) => {
		const number = data?.PersonData?.cell_phone?.split(' ')
		if (number.length > 1) {
			return number[1]
		} else {
			return number[0] || ''
		}
	}
	const caractFixedPhone = (data) => {
		if (data.PersonData.fixed_phone) {
			const number = data?.PersonData?.fixed_phone?.split(' ')
			if (number.length > 1) {
				return number[0]
			}
		}
		return ''
	}
	const numbFixedPhone = (data) => {
		if (data.PersonData.fixed_phone) {
			const number = data?.PersonData?.fixed_phone?.split(' ')
			if (number.length > 1) {
				return number[1]
			} else {
				return number[0] || ''
			}
		}
		return ''
	}
	// Función obtener los datos del usuario y cargarlos en el formulario.
	const fetchData = async () => {
		const data = await getUserDataProfile()
		const Address = { ...data.PersonData.Person_Address[0].Address }
		const birthdate = data.PersonData.Person_physical?.born_date || data.PersonData.Person_legal?.date_registration
		const { day, month, year } = separateProcopDate(birthdate)
		const user = {
			type_person: data.type_person,
			email: data.PersonData.email,
			...data.PersonData.Person_physical,
			...data.PersonData.Person_legal,
			name: data.PersonData.Person_physical?.name || data.PersonData.Person_legal?.social_raeson,
			last_name: data.PersonData.Person_physical?.last_name || data.PersonData.Person_legal?.fantasy_name,
			caractCellPhone: caractCellPhone(data),
			numbCellPhone: numbCellPhone(data),
			caractFixedPhone: caractFixedPhone(data),
			numbFixedPhone: numbFixedPhone(data),
			cell_phone: data.PersonData.cell_phone,
			fixed_phone: data.PersonData.fixed_phone?.length > 4 ? data.PersonData.fixed_phone : null,
			address: `${Address?.street?.name} ${Address?.number_address}, ${Address?.city?.des_loc}, ${Address?.state?.des_pro}`,
			number_address: Address?.number_address,
			born_date: `${year}-${month}-${day}`,
			day,
			month,
			year,
			floor: Address?.floor,
			dpto: Address?.dpto,
			city: Address?.city?.id,
			street: Address?.street?.id,
			state: Address?.state?.cod_pro,
		}
		delete user.num_dni
		delete user.cuit
		setUserData(user)
	}
	useEffect(() => {
		fetchData()
	}, [])
	const [value, setValor] = useState(0)

	const handleChange = (event, newValue) => {
		setValor(newValue)
	}

	const classTabs = 'w-1/2 !border-solid !border-gray-200 !rounded-t-xl !max-w-full !text-base !text-black !font-bold dark:!text-zinc-200 dark:!border-gray-700'
	const classTabStatus = [['!border-r-2 !bg-white !border-t-2 !border-l-2 dark:!bg-zinc-800 '], ['!border-b-2 !bg-gray-200 dark:!bg-zinc-900 ']]

	const [editProfile, setEditProfile] = useState(0)

	return (
		<div className='px-3'>
			<h2 className='text-center m-5'>Mi perfil</h2>
			<hr className='mb-5' />

			<Box sx={{ width: '100%' }}>
				<Tabs aria-label='Opciones del Perfil' variant='fullWidth' indicatorColor='transparent' value={value} onChange={handleChange}>
					<Tab className={`${classTabs} ${classTabStatus[value === 0 ? 0 : 1]}`} {...a11yProps(0)} label='Datos Personales' />
					<Tab
						className={classTabs + ' ' + classTabStatus[value === 1 ? 0 : 1]}
						{...a11yProps(1)}
						onClick={() => {
							if (editProfile) {
								setEditProfile(!editProfile)
							}
						}}
						label='Seguridad'
					/>
				</Tabs>
				<div className='bg-white border-2 border-t-0 pt-4 pb-8 px-4 rounded-b-2xl border-zinc-200 dark:!border-gray-700 dark:!bg-zinc-800'>
					<CustomTabPanel className={`${editProfile ? 'hidden' : ''}`} value={value} index={0}>
						<DataProfile editProfile={editProfile} userData={userData} setEditProfile={setEditProfile} setValor={setValor} />
					</CustomTabPanel>
					<CustomTabPanel className={`${editProfile ? '' : 'hidden'}`} value={value} index={0}>
						<EditProfile value={value} editProfile={editProfile} userData={userData} setEditProfile={setEditProfile} setValor={setValor} fetchData={fetchData} />
					</CustomTabPanel>
					<CustomTabPanel value={value} index={1}>
						<ChangePasswordProfile />
					</CustomTabPanel>
				</div>
			</Box>
		</div>
	)
}

export default Profile
