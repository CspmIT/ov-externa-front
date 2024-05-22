export function obtenerNombreDelMes(numeroDelMes) {
	// Crear una fecha con el año 2000 (cualquier año serviría)
	// y el número del mes menos 1 (porque en JavaScript, los meses empiezan en 0)
	const fecha = new Date(2000, numeroDelMes - 1)

	// Usar toLocaleString para obtener el nombre del mes en español
	let nombreDelMes = fecha.toLocaleString('es-ES', { month: 'long' })

	nombreDelMes = nombreDelMes.charAt(0).toUpperCase() + nombreDelMes.slice(1)

	return nombreDelMes
}

export const formatDateForInput = (date) => {
	// Suponiendo que date es la cadena de fecha en formato ISO 8601
	const isoDateString = date
	// Convertirlo a un objeto Date
	const dateObject = new Date(isoDateString)
	// Extraer el año, mes y día como números
	const year = dateObject.getFullYear()
	const month = dateObject.getMonth() + 1 // getMonth() devuelve 0-11
	const day = dateObject.getDate()
	// Agregar ceros a la izquierda si es necesario para el mes y el día
	const formattedMonth = month.toString().padStart(2, '0')
	const formattedDay = day.toString().padStart(2, '0')
	// Combinarlos en el formato "yyyy-MM-dd"
	const formattedDate = `${year}-${formattedMonth}-${formattedDay}`
	return formattedDate
}
