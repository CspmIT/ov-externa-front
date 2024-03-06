export function obtenerNombreDelMes(numeroDelMes) {
    // Crear una fecha con el año 2000 (cualquier año serviría)
    // y el número del mes menos 1 (porque en JavaScript, los meses empiezan en 0)
    var fecha = new Date(2000, numeroDelMes - 1);

    // Usar toLocaleString para obtener el nombre del mes en español
    var nombreDelMes = fecha.toLocaleString('es-ES', { month: 'long' });
    
    nombreDelMes = nombreDelMes.charAt(0).toUpperCase() + nombreDelMes.slice(1);

    return nombreDelMes;
}