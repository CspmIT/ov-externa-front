export function formatToArgentinePeso(value) {
	return new Intl.NumberFormat('es-AR', {
		style: 'currency',
		currency: 'ARS',
		minimumFractionDigits: 2,
	}).format(value)
}
