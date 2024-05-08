const services = [
    'Energia Electrica',
    'Agua Potable',
    'Telecomunicaciones',
    'Servicios Sociales'
]

/**
 * Esta función maneja la visualización de los requisitos de un servicio en particular.
 * 
 * @param {string} service - El servicio seleccionado.
 * @param {string} visibleService - El servicio que actualmente es visible.
 * @param {function} setVisibleService - Función para establecer el servicio visible.
 */
const seeRequirements = (service, visibleService, setVisibleService) => {
    // Si hay un servicio visible, lo oculta.
    if (visibleService) {
        const previousElement = document.getElementById(
            `${visibleService}-${services.indexOf(visibleService)}`
        )
        previousElement.classList.add('hidden')
    }

    // Busca el servicio seleccionado en la lista de servicios.
    const servicio = services.find((servicio) => servicio === service)

    if (servicio) {
        // Obtiene el elemento del servicio seleccionado.
        const element = document.getElementById(
            `${service}-${services.indexOf(service)}`
        )
        // Muestra u oculta los requisitos del servicio seleccionado.
        element.classList.toggle('hidden')
        if (service === visibleService) {
            // Si el servicio seleccionado es el mismo que el servicio visible, lo oculta y establece el servicio visible a null.
            element.classList.toggle('hidden')
            setVisibleService(null)
        } else {
            // Si el servicio seleccionado es diferente al servicio visible, establece el servicio seleccionado como el servicio visible.
            setVisibleService(service)
        }
    }
}

export default seeRequirements 