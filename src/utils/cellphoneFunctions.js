/**
 * Esta función separa un número de teléfono celular en sus componentes característicos y numéricos.
 *
 * @param {string} cellphone - El número de teléfono celular a separar. Se espera que el número de teléfono esté en el formato "característica número".
 * @returns {Object} Un objeto con las propiedades 'characteristic' y 'number'. Si no se proporciona un número de teléfono, ambas propiedades estarán vacías.
 *
 * @example
 * // returns { characteristic: '3562', number: '459440' }
 * separateCellPhone('3562 459440')
 */
export function separateCellPhone(cellphone) {
	if (!cellphone) return { characteristic: '', number: '' }
	const cellphoneArray = cellphone.split(' ')
	return {
		characteristic: cellphoneArray[0],
		number: cellphoneArray[1],
	}
}
