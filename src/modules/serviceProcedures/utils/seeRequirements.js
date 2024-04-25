const services = [
    'Energia Electrica',
    'Agua Potable',
    'Telecomunicaciones',
    'Servicios Sociales'
]

const seeRequirements = (service, visibleService, setVisibleService) => {
    // Ocultar el servicio anteriormente visible
    if (visibleService) {
        const previousElement = document.getElementById(
            `${visibleService}-${services.indexOf(visibleService)}`
        )
        previousElement.classList.add('hidden')
    }

    // Encuentro el servicio seleccionado
    const servicio = services.find((servicio) => servicio === service)

    if (servicio) {
        // Capturo el servicio por el que se hizo click
        const element = document.getElementById(
            `${service}-${services.indexOf(service)}`
        )
        // Muestro los requisitos del servicio seleccionado
        element.classList.toggle('hidden')
        if (service === visibleService) {
            element.classList.toggle('hidden')
            setVisibleService(null)
        } else {
            // Actualizar el servicio visible
            setVisibleService(service)
        }
    }
}

export default seeRequirements 