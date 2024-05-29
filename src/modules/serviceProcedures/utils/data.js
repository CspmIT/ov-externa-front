const typePersonArray = [
	{ id: 1, name: 'Persona Fisica' },
	{ id: 2, name: 'Persona Juridica' },
]

const sexArray = [
	{ id: 'F', name: 'Femenino' },
	{ id: 'M', name: 'Masculino' },
]

const dniArray = [
	{ id: 1, name: 'DNI' },
	{ id: 2, name: 'LC' },
	{ id: 3, name: 'LE' },
]

const daysArray = [
	{ id: '01', name: '1' },
	{ id: '02', name: '2' },
	{ id: '03', name: '3' },
	{ id: '04', name: '4' },
	{ id: '05', name: '5' },
	{ id: '06', name: '6' },
	{ id: '07', name: '7' },
	{ id: '08', name: '8' },
	{ id: '09', name: '9' },
	{ id: '10', name: '10' },
	{ id: '11', name: '11' },
	{ id: '12', name: '12' },
	{ id: '13', name: '13' },
	{ id: '14', name: '14' },
	{ id: '15', name: '15' },
	{ id: '16', name: '16' },
	{ id: '17', name: '17' },
	{ id: '18', name: '18' },
	{ id: '19', name: '19' },
	{ id: '20', name: '20' },
	{ id: '21', name: '21' },
	{ id: '22', name: '22' },
	{ id: '23', name: '23' },
	{ id: '24', name: '24' },
	{ id: '25', name: '25' },
	{ id: '26', name: '26' },
	{ id: '27', name: '27' },
	{ id: '28', name: '28' },
	{ id: '29', name: '29' },
	{ id: '30', name: '30' },
	{ id: '31', name: '31' },
]

const monthArray = [
	{ id: '01', name: 'Enero' },
	{ id: '02', name: 'Febrero' },
	{ id: '03', name: 'Marzo' },
	{ id: '04', name: 'Abril' },
	{ id: '05', name: 'Mayo' },
	{ id: '06', name: 'Junio' },
	{ id: '07', name: 'Julio' },
	{ id: '08', name: 'Agosto' },
	{ id: '09', name: 'Septiembre' },
	{ id: '10', name: 'Octubre' },
	{ id: '11', name: 'Noviembre' },
	{ id: '12', name: 'Diciembre' },
]

const impositiveSituationArray = [
	{ id: 1, name: 'IVA Responsable Inscripto' },
	{ id: 2, name: 'IVA Responsable no Inscripto' },
	{ id: 3, name: 'IVA no Responsable' },
	{ id: 4, name: 'Consumidor Final' },
	{ id: 5, name: 'IVA Sujeto Exento' },
	{ id: 6, name: 'Responsable Monotributo' },
	{ id: 7, name: 'Sujeto no Categorizado' },
]

const grossIncomeArray = [
	{ id: 1, name: 'Exento' },
	{ id: 2, name: 'Inscripto en riesgo fiscal' },
	{ id: 3, name: 'Inscripto alicuota incremento' },
	{ id: 4, name: 'Inscripto' },
	{ id: 5, name: 'No Alcanzado' },
	{ id: 5, name: 'No Inscripto' },
]

const inputsBusinessData = [
	{
		component: 'TextField',
		grid: 6,
		type: 'text',
		label: 'Razon Social',
		name: 'APELLIDOS',
	},
	{
		component: 'TextField',
		grid: 6,
		type: 'text',
		label: 'Nombre de Fantasia',
		name: 'NOMBRES',
	},
	{
		component: 'TextField',
		grid: 6,
		type: 'email',
		label: 'Correo Electronico',
		name: 'EMAIL',
	},
	{
		component: 'TextField',
		grid: 6,
		type: 'text',
		label: 'CUIT',
		name: 'NUM_DNI',
	},
	{
		component: 'Select',
		grid: 6,
		type: 'select',
		label: 'Situacion Impositiva',
		name: 'impositiveSituation',
		options: impositiveSituationArray,
	},
	{
		component: 'Select',
		grid: 6,
		type: 'select',
		label: 'Ingresos Brutos',
		name: 'grossIncome',
		options: grossIncomeArray,
	},
	{
		groupLabel: 'Fecha de alta',
		component: 'TextField',
		grid: 2,
		type: 'number',
		label: 'Dia',
		name: 'day',
	},
	{
		groupLabel: 'Fecha de alta',
		component: 'Select',
		grid: 2,
		type: 'select',
		label: 'Mes',
		name: 'month',
		options: monthArray,
	},
	{
		groupLabel: 'Fecha de alta',
		component: 'TextField',
		grid: 2,
		type: 'number',
		label: 'Año',
		name: 'year',
	},
	{
		groupLabel: 'Domicilio Fiscal',
		component: 'TextField',
		grid: 3,
		type: 'text',
		label: 'Localidad',
		name: 'location',
	},
	{
		groupLabel: 'Domicilio Fiscal',
		component: 'TextField',
		grid: 2,
		type: 'text',
		label: 'Calle',
		name: 'address',
	},
	{
		groupLabel: 'Domicilio Fiscal',
		component: 'TextField',
		grid: 1,
		type: 'text',
		label: 'Nº',
		name: 'NUMERO',
	},
	{
		groupLabel: 'Telefono celular',
		component: 'TextField',
		grid: 2,
		type: 'text',
		label: 'Caracteristica',
		name: 'characteristicCellPhone',
		start: '0',
	},
	{
		groupLabel: 'Telefono celular',
		component: 'TextField',
		grid: 4,
		type: 'text',
		label: 'Numero',
		name: 'numberCellPhone',
		start: '15',
	},
	{
		groupLabel: 'Telefono fijo',
		component: 'TextField',
		grid: 2,
		type: 'text',
		label: 'Caracteristica',
		name: 'characteristicPhone',
		start: '0',
	},
	{
		groupLabel: 'Telefono fijo',
		component: 'TextField',
		grid: 4,
		type: 'text',
		label: 'Numero',
		name: 'numberPhone',
	},
]

// Funcion para separar la fecha de alta en tres campos
const separateProcopDate = (date) => {
	if (!date) return { day: '', month: '', year: '' }
	const dateArray = date.split('-')
	return {
		day: dateArray[2].split('T')[0],
		month: dateArray[1],
		year: dateArray[0],
	}
}

export { typePersonArray, daysArray, inputsBusinessData, dniArray, sexArray, monthArray, impositiveSituationArray, grossIncomeArray, separateProcopDate }
