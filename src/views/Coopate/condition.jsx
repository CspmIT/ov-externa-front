import React from 'react'
import Button from '../../components/Button'
import { useState } from 'react'
import { Link } from 'react-router-dom';

const condition = () => {

  const CheckedUser = true; //buscar en bd si tiene chequeado los terminos de coopate 

  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="p-2 sm:pl-64">
      <img width="100%" src="https://app.coopmorteros.coop/public/images/coopate/Header.png" alt="" />
      <hr />
      <div className="flex flex-wrap justify-center mt-5 mb-10">
        <div className="w-full mb-2 pl-5 pr-5">
          <span><b><u>REGLAMENTO DEL PROGRAMA DE BENEFICIOS COOPATE Y POLITICA DE PRIVACIDAD </u></b></span>
          <p className="text-justify">
            <br />
            El ingreso al Sitio Web, así como su posterior utilización implica la aceptación de los Términos y Condiciones y la Política de Privacidad por parte de los usuarios de CoopMorteros, quienes al hacerlo declaran comprender su contenido. En caso de no aceptar el Reglamento, los Términos y Condiciones ni la Política de Privacidad debe abstenerse de utilizar el Sitio Web.
            <br />
          </p>
        </div>
        <div className="w-full pl-5 pr-5">
          <div id="terminosleermas">
            <h5>Modificación Unilateral</h5>
            <p>
              <br />
              CoopMorteros se reserva el derecho de, en cualquier momento y sin necesidad de previo aviso, modificar o eliminar el contenido, estructura, diseño, servicios y Condiciones de acceso y/o uso de este Sitio Web. <br />
            </p>
            <h5> Uso del Sitio Web </h5>
            <p>
              <br />
              El ingreso y utilización de este Sitio Web se encuentra sujeto a la legislación argentina. El usuario se compromete a usar el Sitio Web y sus servicios y Contenidos sin contravenir la legislación aplicable, la buena fe y el orden público. En consecuencia, queda prohibido todo uso con fines ilícitos o que perjudiquen o impidan, puedan dañar y/o sobrecargar, de cualquier forma, la utilización o el normal funcionamiento del Sitio Web o que directa o indirectamente atenten contra el mismo o contra cualquier derecho de un tercero. <br />
            </p>
            <h5> Propiedad Intelectual y Uso de los Contenidos </h5>
            <p className="text-justify">
              <br />
              CoopMorteros es titular del dominio https://app.coopmorteros.coop/ y posee los derechos de propiedad intelectual y cualquier otro derecho sobre el contenido del Sitio Web, el cual se compone por imágenes, videos, audio, marcas, designaciones, diseños, logos, frases publicitarias, documentos, código fuente, entre otros (en adelante el “Contenido”). El Contenido no podrá ser utilizado por persona distinta a CoopMorteros sin su previa y expresa autorización. Las Personas Usuarias podrán realizar copias del contenido únicamente cuando estuvieren autorizados a tal efecto o bien cuando se trate de contenido que CoopMorteros se encuentre obligado a comunicar al público por la normativa vigente. Cualquier reproducción y uso en contrario del contenido se encuentra expresamente prohibido. <br />
            </p>
            <h5> Limitaciones de responsabilidad </h5>
            <p className="text-justify">
              <br />
              El acceso al Sitio Web y cualquier uso de la información contenida en el mismo es exclusiva responsabilidad del usuario. CoopMorteros no se responsabiliza por las posibles consecuencias, daños o perjuicios que puedan derivarse por dicho acceso o uso de información.

              CoopMorteros no se responsabiliza por daños ocasionados por virus, programas maliciosos o lesivos en los Contenidos y/o cualquier otro agente que pueda llegar a infectar o afectar de cualquier modo el o los sistemas de computación utilizados por el usuario.

              Asimismo, CoopMorteros no se responsabiliza por la falta de disponibilidad, continuidad, acceso, mantenimiento y efectivo funcionamiento del Sitio Web y/o de sus servicios y/o la actualización, exactitud, exhaustividad, pertinencia, actualidad y fiabilidad de sus Contenidos, cualquiera sea la causa, las dificultades o problemas técnicos o de otra naturaleza que lo originen. De igual manera, no se responsabiliza por la recepción, obtención, almacenamiento, difusión y/o transmisión, por parte de las Personas Usuarias de los Contenidos del Sitio Web. <br />
            </p>
            <h5> Ley Aplicable - Jurisdicción </h5>
            <p className="text-justify">
              <br />
              En el supuesto de controversias, serán aplicables las leyes vigentes en la República Argentina y tendrá competencia la Justicia Ordinaria con asiento en la Ciudad de Morteros, Pcia de Córdoba excluyendo cualquier otro fuero y/o jurisdicción. <br />
            </p>
            <h5> Contacto </h5>
            <p className="text-justify">
              <br />
              En caso de que tengas preguntas, comentarios y/o sugerencias respecto de este Sitio Web, podés enviarnos un whatsapp al 3562 67-0000 CoopMorteros , Urquiza 17 – Morteros, Pcia de Córdoba, 2024.
            </p>
            <span><b><u>Términos y Condiciones Generales del Programa COOPATE de CoopMorteros </u></b></span>
            <ol className='ml-5'>
              <li className="mt-3">
                Programa de Beneficios, es un programa para usuarios de CoopMorteros que abonan las facturas de los servicios y/o productos que posee el usuario en la cooperativa a la fecha del 1er vencimiento, la cual se encuentra especificado en la factura, a través de la Oficina Virtual, con los medios de pagos habilitados en la plataforma.
              </li>
              <li className="mt-3">
                El ingreso al Sitio Web, así como su posterior utilización implica la aceptación de los Términos y Condiciones y la Política de Privacidad por parte de los usuarios de CoopMorteros, quienes al hacerlo declaran comprender su contenido. En caso de no aceptar los Términos y Condiciones ni la Política de Privacidad debe abstenerse de utilizar el Sitio Web.
              </li>
              <li className="mt-3">
                Participantes: podrán participar del programa quienes cumplan con los siguientes requisitos:
                <ul className='ml-3 list-disc'>
                  <li>personas físicas, que sean socios activos de CoopMorteros,</li>
                  <li>ser usuario Nivel 3 de oficina virtual,</li>
                  <li>pago a término de las facturas generadas (antes del 1er vencimiento) por oficina virtual y por los medios de pago habilitados en la misma.</li>
                  <li>que acepten los términos y condiciones a través de la Oficina virtual o de los canales que en el futuro se habiliten.</li>
                </ul>
              </li>
              <li className="mt-3">El programa COOPATE consiste en cumplir antes del 1er vencimiento de la factura, con el pago de todas las facturas o comprobantes emitidas por CoopMorteros generadas y visibles en la oficina virtual, a cambio de la obtención de beneficios otorgados por CoopMorteros y/o comercios adheridos al programa, los cuales se obtendrán por sistema de canje en la plataforma de CoopMorteros. </li>
              <li className="mt-3">Beneficios. Los beneficios consisten en dos tipos:
                <ul className='ml-3'>
                  <li>a). Beneficios otorgados por CoopMorteros, los cuales consisten en: <br />
                    <span className='ml-5'>a1). Servicio de Internet de 300 MBps, al precio de 100 MBps., este beneficio es mensual, se comienza a computar desde la activación por parte del usuario, el cual debe optar por el mismo al momento de abonar las facturas y cuyo vencimiento opera a los 90 días de su activación.</span> <br />
                    <span className='ml-5'>a2). Paquete de futbol bonificado, este beneficio es mensual, se comienza a computar desde la activación por parte del usuario, el cual debe optar por el mismo al momento de abonar las facturas y cuyo vencimiento opera a los 30 días de su activación.</span> <br />
                    Estos beneficios a1 y a2, comenzaran a gozarse desde la activación del beneficio o sea desde que el usuario hace la opción y por el plazo indicado supra. La activación de uno de ellos excluye la posibilidad de obtener el otro, se podrá optar por uno de los beneficios al momento del pago de las facturas en la plataforma. Estos beneficios se activarán a los usuarios que tengan servicios contratados en CoopMorteros de Internet de 100 MBps y TV exclusivamente.- Por lo cual solo estos usuarios podrán gozar de estos beneficios.
                  </li>
                  <li> b). Beneficios otorgados por comercios adheridos: estos beneficios serán realizados por canje por el usuario y se habilitaran una vez realizado el pago de las facturas en las condiciones pactadas en el presente, los beneficios dependen de cada comercio como así también la validez de los mismos.- Estos beneficios una vez activados en la oficina virtual caducan en el plazo de 7 días corridos, vencido este plazo el usuario no podrá canjearlo en el comercio.- El usuario podrá tener activo en simultaneo hasta 4 (cuatro) beneficios otorgado por los comercios adheridos.- Cuando el usuario elija y active en la oficina virtual un beneficio otorgado por comercio recibirá un voucher con código QR que le permitirá acceder al mismo y el cual debe ser presentado al comercio en el momento de hacer efectivo el canje. A partir del momento en que activa el beneficio en la oficina virtual, el usuario contará con un plazo de 7 (días) días corridos para efectivizar el canje del voucher en el comercio indicado, pasado este plazo el beneficio figura vencido y el voucher pierde validez para ser canjeado. Luego de que activa el beneficio en la oficina virtual, el usuario contará con un plazo de dos (dos) días corridos para reclamar por la falta de recepción del voucher, vencido dicho plazo no podrá solicitar el reenvío o la devolución. CoopMorteros no se responsabiliza por canjes no utilizados ni por las consecuencias del uso de los mismos. La vigencia del beneficio y/o servicio estará sujeta a la negociación de CoopMorteros con las empresas seleccionadas. Este beneficio podrá ser utilizado por usuario de CoopMorteros que tenga servicios contratados de energía eléctrica convencional (está excluido el prepago), telefonía, Tv, Internet, servicios Sociales (Sepelio-Banco de Sangre), Agua Potable. <br />
                    Todos los beneficios otorgados ya sea por Comercios Adheridos o por CoopMorteros, están sujetos a disponibilidad. <br />
                    Los beneficios a y b podrán utilizarse mensualmente en forma conjunta, la elección de uno no excluye la posibilidad de obtener el otro. <br />
                    Los canjes no son transferibles a ninguna otra persona ni entidad, bajo ningún título o causa (fallecimiento, incapacidad, etc.) y tampoco podrá ser transferido a otro usuario, salvo expreso consentimiento de CoopMorteros. </li>
                </ul>
              </li>
              <li className="mt-3">En caso de no ser posible la utilización del servicio y/o beneficio solicitado, por causas ajenas a la voluntad de CoopMorteros, los beneficios no serán reemplazados por otros de igual o similar valor, no asumiendo responsabilidad CoopMorteros por este hecho. </li>
              <li className="mt-3">CoopMorteros no será responsable de los perjuicios que pueda sufrir el beneficiario del beneficio y/o servicio, ocasionados por los productos o servicios seleccionados por el usuario o por quienes se encuentren encargados de brindar el servicio. Los productos, beneficios o servicios seleccionados por los usuarios estarán sujetos únicamente a la garantía del prestador de los servicios. </li>
              <li className="mt-3">CoopMorteros, se reserva el derecho de rechazar la participación de usuarios en el programa, que en algún momento hayan registrado incumplimientos con alguno de los servicios de CoopMorteros. </li>
              <li className="mt-3"> El Programa no es acumulable con otros Programas que ofrezca CoopMorteros</li>
              <li className="mt-3">La fecha de inicio del presente programa es el 02/10/2023.</li>
              <li className="mt-3">Los beneficios del Programa COOPATE no tienen valor monetario alguno, no pueden ser canjeados por dinero en efectivo.</li>
              <li className="mt-3">Informacion: Los usuarios podrán consultar las bases y condiciones del Programa ingresando a la página web… https://app.coopmorteros.coop/ o comunicándose con el Centro de Atención Telefónica whatsapp 3562 67-0000.</li>
              <li className="mt-3"> Modificaciones: CoopMorteros podrá modificar, agregar, reemplazar o cancelar los beneficios publicados en la sección COOPATE, sin previo aviso y tendrán vigencia a partir del día que se hayan actualizado y publicado en los términos y condiciones.</li>
              <li className="mt-3"> Consideraciones Generales:
                <ul className='ml-3'>
                  <li>a). CoopMorteros no se responsabiliza por los cupones no presentados en los comercios, ni por los cupones rechazados por estar incorrectos ni por aquellos presentados fuera de fecha o vencidos</li>
                  <li>b). La participación en el Programa está sujeta a términos, condiciones, reglamentos, disposiciones de política y procedimientos establecidos por CoopMorteros. Todo incumplimiento del Reglamento del Programa, todo abuso de los derechos del mismo, toda conducta contraria por parte del/los usuarios/s en forma individual o colectiva en detrimento de los intereses de CoopMorteros, podrá resultar en la anulación de los beneficios, sin derecho a reclamo por parte del/los usuarios.</li>
                  <li>c). Los Beneficios obtenidos y canjeados, deben ser utilizados de acuerdo con las condiciones del Programa. CoopMorteros no se hace responsable por beneficios y/o servicios perdidos o no utilizados total o parcialmente. </li>
                  <li>d). Toda actitud fraudulenta relacionada con el programa, atribuidos al usuario, tendrá por resultado la exclusión al usuario del programa de beneficios COOPATE. </li>
                </ul>
              </li>
              <li className="mt-3"> VIGENCIA: La vigencia del Programa es a partir del 02/10/2023. CoopMorteros se reserva el derecho de cancelar este Programa, previo aviso a los usuarios con 30 días de anticipación a la fecha de cancelación. </li>
              <li className="mt-3"> La participación en el Programa implica el conocimiento y aceptación por los usuarios, de todos los Términos y Condiciones establecidas en este Reglamento. </li>
            </ol>
          </div>
        </div>

        {CheckedUser && (
          <div className="w-full text-center mt-6">
            <input type="checkbox" id="terminosCondiciones" name="terminosCondiciones" value="" checked={isChecked} onChange={handleCheckboxChange} />
            <label for="terminosCondiciones"> He leído y acepto los <a type="button" data-toggle="modal" data-target="#modalterminos_commerce"><u><b>Términos y Condiciones</b></u></a> de uso</label>
            <br />
            <div className='w-full mt-2 flex justify-center'>
              {isChecked ? (
                <Link to={'/Coopate'}>
                  <Button props={{ class: 'botonPrincipal m-2', text: `Siguiente` }} />
                </Link>
              ) : (
                <span className="text-gray-400">Siguiente</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default condition