// import { Button, Card, CardContent } from '@mui/material'
import { LuAlertCircle, LuCheck, LuChevronRight, LuFileText, LuFlag, LuThumbsUp, LuUserCheck } from 'react-icons/lu'

// function StatusProcedure({ estadoActual = 'Trámite tomado' }) {
// 	const pasos = [
// 		{ estado: 'Trámite enviado', icono: <LuFileText className='h-6 w-6' />, descripcion: 'Su solicitud ha sido recibida.' },
// 		{ estado: 'Trámite tomado', icono: <LuUserCheck className='h-6 w-6' />, descripcion: 'Un agente está revisando su solicitud.' },
// 		{ estado: 'Trámite pendiente de correcciones', icono: <LuAlertCircle className='h-6 w-6' />, descripcion: 'Se requieren ajustes en su solicitud.' },
// 		{ estado: 'Trámite aprobado', icono: <LuThumbsUp className='h-6 w-6' />, descripcion: 'Su solicitud ha sido aprobada.' },
// 		{ estado: 'Trámite finalizado', icono: <LuFlag className='h-6 w-6' />, descripcion: 'El proceso ha concluido exitosamente.' },
// 	]

// 	const esPasoCompleto = (paso) => {
// 		return pasos.findIndex((p) => p.estado === paso) <= pasos.findIndex((p) => p.estado === estadoActual)
// 	}

// 	const estadoActualIndex = pasos.findIndex((p) => p.estado === estadoActual)
// 	const descripcionActual = pasos[estadoActualIndex]?.descripcion

// 	return (
// 		<Card className='w-full  mx-auto'>
// 			<div className='mt-5'>
// 				<h2 className='text-2xl font-bold text-center'>Progreso de la Solicitud</h2>
// 			</div>
// 			<CardContent className='pb-6'>
// 				<div className='relative p-6 overflow-hidden rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20'>
// 					<div className='absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]'></div>
// 					<ol className='relative flex items-center justify-between w-full'>
// 						{pasos.map((paso, index) => (
// 							<li key={paso.estado} className={`flex flex-col items-center ${esPasoCompleto(paso.estado) ? 'text-primary' : 'text-muted-foreground'}`}>
// 								<div
// 									className={`relative flex items-center justify-center w-12 h-12 rounded-full border-2 ${esPasoCompleto(paso.estado) ? 'bg-primary border-primary' : 'bg-background border-muted'} ${
// 										paso.estado === estadoActual ? 'ring-4 ring-offset-2 ring-offset-background ring-primary/30' : ''
// 									}`}
// 								>
// 									{esPasoCompleto(paso.estado) ? <LuCheck className='h-6 w-6 text-primary-foreground' /> : paso.icono}
// 									{index < pasos.length - 1 && <div className={`absolute top-1/2 left-full w-full h-0.5 -translate-y-1/2 ${esPasoCompleto(pasos[index + 1].estado) ? 'bg-primary' : 'bg-muted'}`} />}
// 								</div>
// 								<span className='mt-2 text-sm font-medium text-center max-w-[80px] leading-tight'>{paso.estado}</span>
// 							</li>
// 						))}
// 					</ol>
// 				</div>
// 				<div className='mt-6 text-center'>
// 					<p className='text-xl font-semibold text-primary'>{estadoActual}</p>
// 					<p className='mt-2 text-md text-muted-foreground'>{descripcionActual}</p>
// 				</div>
// 			</CardContent>
// 			<p className='sr-only' role='status' aria-live='polite'>
// 				Estado actual de la solicitud: {estadoActual}. {descripcionActual}
// 			</p>
// 		</Card>
// 	)
// }

// export default StatusProcedure

import React from 'react'
import { Card, CardContent, Typography, Stepper, Step, StepLabel, ThemeProvider, createTheme } from '@mui/material'
import { styled } from '@mui/material/styles'
// import { Check, FileText, UserCheck, AlertCircle, ThumbsUp, Flag } from 'lucide-react'

const theme = createTheme({
	palette: {
		primary: {
			main: '#3b82f6', // Tailwind blue-500
		},
		secondary: {
			main: '#10b981', // Tailwind emerald-500
		},
	},
	typography: {
		fontFamily: '"Inter", sans-serif',
	},
})

const CustomStepIcon = styled('div')(({ theme, ownerState }) => ({
	color: ownerState.active ? theme.palette.primary.main : theme.palette.text.disabled,
	display: 'flex',
	height: 32,
	width: 32,
	borderRadius: '50%',
	justifyContent: 'center',
	alignItems: 'center',
	border: `2px solid ${ownerState.active ? theme.palette.primary.main : theme.palette.grey[300]}`,
	backgroundColor: ownerState.active ? theme.palette.primary.light : 'transparent',
	transition: 'all 0.3s ease',
}))

const CustomStepConnector = styled('span')(({ theme, ownerState }) => ({
	display: 'block',
	borderColor: ownerState.completed ? theme.palette.primary.main : theme.palette.grey[300],
	borderTopStyle: 'solid',
	borderTopWidth: 2,
	marginLeft: 8,
	marginRight: 8,
	flex: 1,
	transition: 'border-color 0.3s ease',
}))

const estadosSolicitud = [
	{ label: 'Trámite enviado', icon: LuFileText },
	{ label: 'Trámite tomado', icon: LuUserCheck },
	{ label: 'Trámite pendiente de correcciones', icon: LuAlertCircle },
	{ label: 'Trámite aprobado', icon: LuThumbsUp },
	{ label: 'Trámite finalizado', icon: LuFlag },
]

export default function StatusProcedure({ estadoActual = 'Trámite pendiente de correcciones' }) {
	// const estadoActual = 'Trámite tomado'
	const activeStep = estadosSolicitud.findIndex((estado) => estado.label === estadoActual)

	return (
		<ThemeProvider theme={theme}>
			<Card className='w-full  mx-auto shadow-lg rounded-xl overflow-hidden'>
				<CardContent className='p-6 bg-gradient-to-br from-blue-50 to-indigo-50'>
					<Typography variant='h5' component='h2' className='mb-6 font-bold text-gray-800 text-center'>
						Progreso de la Solicitud
					</Typography>
					<Stepper activeStep={activeStep} alternativeLabel className='px-4'>
						{estadosSolicitud.map((estado, index) => {
							const StepIcon = estado.icon
							return (
								<Step key={estado.label}>
									<StepLabel
										StepIconComponent={({ active, completed }) => (
											<CustomStepIcon ownerState={{ active, completed }}>
												{completed ? <LuCheck className='w-5 h-5 text-white' /> : <StepIcon className={`w-5 h-5 ${active ? 'text-white' : 'text-gray-400'}`} />}
											</CustomStepIcon>
										)}
										className='flex flex-col items-center'
									>
										<Typography variant='body2' className='mt-2 text-center font-medium text-gray-700'>
											{estado.label}
										</Typography>
									</StepLabel>
									{index < estadosSolicitud.length - 1 && <CustomStepConnector ownerState={{ completed: index < activeStep }} className='hidden sm:block' />}
								</Step>
							)
						})}
					</Stepper>
					<div className='mt-8 p-4 bg-white rounded-lg shadow-inner'>
						<Typography variant='body1' className='text-center text-gray-700'>
							Estado actual: <span className='font-semibold text-primary'>{estadoActual}</span>
						</Typography>
					</div>
				</CardContent>
			</Card>
		</ThemeProvider>
	)
}
