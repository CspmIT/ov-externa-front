const typePersonArray = [
    { id: 1, name: 'Persona Fisica' },
    { id: 2, name: 'Persona Juridica' }
]

const sexArray = [
    { id: 'F', name: 'Femenino' },
    { id: 'M', name: 'Masculino' },
]

const dniArray = [
    { id: 1, name: 'DNI' },
    { id: 2, name: 'LC' },
    { id: 3, name: 'LE' }
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
    { id: '12', name: 'Diciembre' }
]

const impositiveSituationArray = [
    { id: 1, name: 'IVA Responsable Inscripto' },
    { id: 2, name: 'IVA Responsable no Inscripto' },
    { id: 3, name: 'IVA no Responsable' },
    { id: 4, name: 'IVA Sujeto Exento' },
    { id: 5, name: 'Consumidor Final' },
    { id: 6, name: 'Responsable Monotributo' },
    { id: 7, name: 'Proveedor del Exterior' },
    { id: 8, name: 'Cliente del Exterior' },
    { id: 9, name: 'IVA Liberado – Ley Nº 19.640' },
    { id: 10, name: 'IVA Responsable Inscripto – Agente de Percepción' },
    { id: 11, name: 'Pequeño Contribuyente Eventual' },
    { id: 12, name: 'Monotributista Social' },
    { id: 13, name: 'Pequeño Contribuyente Eventual Social' }
]

const grossIncomeArray = [
    { id: 1, name: 'Exento' },
    { id: 2, name: 'Inscripto en riesgo fiscal' },
    { id: 3, name: 'Inscripto alicuota incremento' },
    { id: 4, name: 'Inscripto' },
    { id: 5, name: 'No Alcanzado' },
    { id: 5, name: 'No Inscripto' }
]

const inputsPersonalData = [
    {
        component: 'TextField',
        grid: 8,
        type: 'text',
        label: 'Nombres y Apellidos',
        name: 'APELLIDOS'
    },
    {
        component: 'TextField',
        grid: 6,
        type: 'email',
        label: 'Correo Electronico',
        name: 'EMAIL'
    },
    {
        component: 'Select',
        grid: 6,
        type: 'select',
        label: 'Genero',
        name: 'SEXO',
        options: sexArray
    },
    {
        component: 'Select',
        grid: 2,
        type: 'select',
        label: 'Tipo de documento',
        name: 'TIP_DNI',
        options: dniArray
    },
    {
        component: 'TextField',
        grid: 4,
        type: 'text',
        label: 'N° de documento',
        name: 'NUM_DNI'
    },
    {
        component: 'TextField',
        grid: 2,
        type: 'number',
        label: 'Dia',
        name: 'day'
    },
    {
        component: 'Select',
        grid: 2,
        type: 'select',
        label: 'Mes',
        name: 'month',
        options: monthArray
    },
    {
        component: 'TextField',
        grid: 2,
        type: 'number',
        label: 'Año',
        name: 'year'
    },
    {
        component: 'TextField',
        grid: 2,
        type: 'text',
        label: 'Caracteristica',
        name: 'characteristicCellPhone',
        start: '0'
    },
    {
        component: 'TextField',
        grid: 4,
        type: 'text',
        label: 'Numero',
        name: 'TELEFONO',
        start: '15'
    },
    {
        groupLabel: 'Telefono fijo',
        component: 'TextField',
        grid: 2,
        type: 'text',
        label: 'Caracteristica',
        name: 'characteristicPhone',
        start: '0'
    },
    {
        groupLabel: 'Telefono fijo',
        component: 'TextField',
        grid: 4,
        type: 'text',
        label: 'Numero',
        name: 'numberPhone',
        start: '15'
    }
]

const inputsBusinessData = [
    {
        component: 'TextField',
        grid: 6,
        type: 'text',
        label: 'Razon Social',
        name: 'APELLIDOS'
    },
    {
        component: 'TextField',
        grid: 6,
        type: 'text',
        label: 'Nombre de Fantasia',
        name: 'NOMBRES'
    },
    {
        component: 'TextField',
        grid: 6,
        type: 'email',
        label: 'Correo Electronico',
        name: 'EMAIL'
    },
    {
        component: 'TextField',
        grid: 6,
        type: 'text',
        label: 'CUIT',
        name: 'NUM_DNI'
    },
    {
        component: 'Select',
        grid: 6,
        type: 'select',
        label: 'Situacion Impositiva',
        name: 'impositiveSituation',
        options: impositiveSituationArray
    },
    {
        component: 'Select',
        grid: 6,
        type: 'select',
        label: 'Ingresos Brutos',
        name: 'grossIncome',
        options: grossIncomeArray
    },
    {
        groupLabel: 'Fecha de alta',
        component: 'TextField',
        grid: 2,
        type: 'number',
        label: 'Dia',
        name: 'day'
    },
    {
        groupLabel: 'Fecha de alta',
        component: 'Select',
        grid: 2,
        type: 'select',
        label: 'Mes',
        name: 'month',
        options: monthArray
    },
    {
        groupLabel: 'Fecha de alta',
        component: 'TextField',
        grid: 2,
        type: 'number',
        label: 'Año',
        name: 'year'
    },
    {
        groupLabel: 'Domicilio Fiscal',
        component: 'TextField',
        grid: 3,
        type: 'text',
        label: 'Localidad',
        name: 'location'
    },
    {
        groupLabel: 'Domicilio Fiscal',
        component: 'TextField',
        grid: 2,
        type: 'text',
        label: 'Calle',
        name: 'address'
    },
    {
        groupLabel: 'Domicilio Fiscal',
        component: 'TextField',
        grid: 1,
        type: 'text',
        label: 'Nº',
        name: 'NUMERO'
    },
    {
        groupLabel: 'Telefono celular',
        component: 'TextField',
        grid: 2,
        type: 'text',
        label: 'Caracteristica',
        name: 'characteristicCellPhone',
        start: '0'
    },
    {
        groupLabel: 'Telefono celular',
        component: 'TextField',
        grid: 4,
        type: 'text',
        label: 'Numero',
        name: 'numberCellPhone',
        start: '15'
    },
    {
        groupLabel: 'Telefono fijo',
        component: 'TextField',
        grid: 2,
        type: 'text',
        label: 'Caracteristica',
        name: 'characteristicPhone',
        start: '0'
    },
    {
        groupLabel: 'Telefono fijo',
        component: 'TextField',
        grid: 4,
        type: 'text',
        label: 'Numero',
        name: 'numberPhone'
    }
]

export { typePersonArray, inputsPersonalData, inputsBusinessData }