export function obtenerNombreDelMes(numeroDelMes) {
	// Crear una fecha con el año 2000 (cualquier año serviría)
	// y el número del mes menos 1 (porque en JavaScript, los meses empiezan en 0)
	const fecha = new Date(2000, numeroDelMes - 1)

	// Usar toLocaleString para obtener el nombre del mes en español
	let nombreDelMes = fecha.toLocaleString('es-ES', { month: 'long' })

	nombreDelMes = nombreDelMes.charAt(0).toUpperCase() + nombreDelMes.slice(1)

	return nombreDelMes
}
/**
 * Función para validar una fecha.
 *
 * @param {number} anio - El año a validar.
 * @param {number} mes - El mes a validar.
 * @param {number} dia - El día a validar.
 * @returns {boolean|string} - Devuelve true si la fecha es válida, de lo contrario devuelve un mensaje de error.
 */
export function validarFecha(anio, mes, dia) {
	// Crear una fecha con la fecha recibida
	const fechaIngresada = new Date(`${anio}/${mes}/${dia} `)

	// Si el mes de la fecha creada no coincide con el mes ingresado, la fecha no es válida
	if (fechaIngresada.getMonth() + 1 !== parseInt(mes)) return 'El dia ingresado no es válido'

	// Si la fecha ingresada es válida, devolver true
	return true
}
