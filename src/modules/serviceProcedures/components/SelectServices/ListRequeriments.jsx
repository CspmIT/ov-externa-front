import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'

const listRequeriments = ({ servicio }) => {
  const resquisitos = [
    {
      name: 'Energia Electrica',
      type: 'Alta Residencial',
      items: [
        'Propietario: escritura de propiedad, boleto de compraventa u otro título que acredite titularidad',
        'Garantía personal (socio sin deuda con CoopMorteros)',
        'Impuesto donde figure la denominación catastral del domicilio',
        'Inquilino: contrato de locación',
        'DNI',
        'No poseer ningún tipo de deuda con CoopMorteros',
        'Abonar la cuota de socio si es nuevo socio (se cobra con la primera factura)',
        'Abonar tasa de conexión (se cobra con la primera factura)'
      ]
    },
    {
      name: 'Energia Electrica',
      type: 'Alta Comercial o Industrial',
      items: [
        'Propietario: escritura de propiedad, boleto de compraventa u otro título que acredite titularidad',
        'Garantía personal (socio sin deuda con CoopMorteros)',
        'Impuesto donde figure la denominación catastral del domicilio',
        'Inquilino: contrato de locación',
        'DNI',
        'No poseer ningún tipo de deuda con CoopMorteros',
        'Abonar la cuota de socio si es nuevo socio (se cobra con la primera factura)',
        'Abonar tasa de conexión (se cobra con la primera factura)'
      ]
    },
    {
      name: 'Energia Electrica',
      type: 'Requisitos Alta Obra',
      items: [
        'Propietario: escritura de propiedad, boleto de compraventa u otro título que acredite titularidad',
        'Garantía personal (socio sin deuda con CoopMorteros)',
        'Impuesto donde figure la denominación catastral del domicilio',
        'Inquilino: contrato de locación',
        'DNI',
        'No poseer ningún tipo de deuda con CoopMorteros',
        'Abonar la cuota de socio si es nuevo socio (se cobra con la primera factura)',
        'Abonar tasa de conexión (se cobra con la primera factura)'
      ]
    },
    {
      name: 'Telecomunicaciones',
      type: 'Requisitos Alta Residencial',
      items: [
        'DNI',
        'Nuevo socio: abonar la cuota de socio (se cobra con la primera factura)',
        'Jubilados: recibo de cobro de jubilación o tarjeta +65',
        'Zona rural o suburbana: aprobar factibilidad técnica',
        'Garantía personal (socio sin deuda con Coopmorteros)',
        'No poseer ningún tipo de deuda con Coopmorteros (ni personal, ni la propiedad)',
        'Impuesto donde figure la denominación catastral del domicilio (si ya posee el servicio de energía eléctrica, no es necesario)'
      ]
    },
    {
      name: 'Telecomunicaciones',
      type: 'Requisitos Alta Comercial',
      items: [
        'DNI',
        'Nuevo socio: abonar la cuota de socio (se cobra con la primera factura)',
        'Garantía personal (socio sin deuda con Coopmorteros, recibo de sueldo o responsable inscripto o monotributista)',
        'Impuesto donde figure la denominación catastral del domicilio (si ya posee el servicio de energía eléctrica, no es necesario)',
        'No poseer ningún tipo de deuda con Coopmorteros (ni personal, ni la propiedad)',
        'En personas jurídicas: contrato constitutivo y poder general o especial'
      ]
    },
    {
      name: 'Telecomunicaciones',
      type: 'Cambio de domicilio',
      items: [
        'DNI',
        'No poseer ningún tipo de deuda con Coopmorteros (ni personal, ni la propiedad)',
        'Zona rural o suburbana: aprobar factibilidad técnica en el nuevo domicilio',
        'Impuesto donde figure la denominación catastral del domicilio nuevo',
        'Coordinar fecha y hora para el retiro de los equipos en el domicilio anterior y la instalación en el nuevo domicilio'
      ]
    },
    {
      name: 'Agua Potable',
      type: 'Requisitos Alta Residencial',
      items: [
        'Impuesto municipal',
        'DNI',
        'No registrar deuda en acueducto',
        'Garantía personal (socio sin deuda con Coopmorteros)',
        'No poseer ningún tipo de deuda con Coopmorteros (ni personal, ni la propiedad)',
        'Si no tiene otro servicio previo: título de propiedad, contrato de locación u otro',
        'Nuevo socio: abonar la cuota de socio (se cobra con la primera factura)',
        'Factibilidad técnica aprobada (ver los requisitos aquí)',
        'Obra nueva: completar la planilla de servicio con croquis de la instalación hecho por profesional matriculado (descargar aquí)'
      ]
    },
    {
      name: 'Agua Potable',
      type: 'Requisitos Alta Comercial',
      items: [
        'DNI',
        'Impuesto Municipal',
        'No registrar deuda en acueducto',
        'En personas jurídicas: contrato constitutivo y poder general o especial* no poseer ningún tipo de deuda con CoopMorteros (ni personal, ni la propiedad)',
        'Garantía personal (socio sin deuda con CoopMorteros)',
        'Si no tiene otro servicio previo: título de propiedad, contrato de locación u otro',
        'Nuevo socio: abonar la cuota de socio (se cobra con la primera factura)',
        'Factibilidad técnica aprobada (ver los requisitos aquí)',
        'Obra nueva: completar la planilla de servicio con croquis de la instalación hecho por profesional matriculado (descargar aquí)'
      ]
    },
    {
      name: 'Agua Potable',
      type: 'Requisitos Baja',
      items: [
        'El titular o apoderado debe presentarse en el Centro de Atención al Cliente para firmar la baja',
        'No poseer deudas (se coordina el pago del último consumo que se obtiene una vez retirado el medidor del domicilio, para eso el titular puede dejar un anticipo de dinero a cuenta para pagar la última factura, o bien transferir la factura)'
      ]
    }
  ]

  return (
    <div>
      {resquisitos
        .filter((resquisito) => resquisito.name === servicio)
        .map((resquisito, index) => (
          <Accordion key={index} className='w-full bg-white p-3 rounded-md'>
            <AccordionSummary>{resquisito.type}</AccordionSummary>
            <AccordionDetails>
              <ul className='ms-5'>
                {resquisito.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </AccordionDetails>
          </Accordion>
        ))}
    </div>
  )
}

export default listRequeriments
