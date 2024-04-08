import Swal from 'sweetalert2'

const swals = (props) => {
  let claseModal = ''
  if (document.body.classList.contains('dark')) {
    claseModal = 'swalModoOscuro'
  }

  Swal.fire({
    icon: props.icon ? props.icon : '',
    title: props.title ? props.title : '',
    html: props.html ? props.html : '',
    showCloseButton: true,
    showConfirmButton: !!props.confirm,
    showCancelButton: !!props.cancel,
    confirmButtonText: props.confirm,
    cancelButtonText: props.cancel,
    customClass: {
      confirmButton: 'botonesAceptar',
      cancelButton: 'botonesCancelar',
      popup: claseModal
    },
    allowOutsideClick: props.static ? props.static : '',
    allowEscapeKey: props.static ? props.static : ''
  }).then((result) => {
    if (result.isConfirmed) {
      props.actionConfirm && props.actionConfirm()
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      props.actionCancel && props.actionCancel()
    }
  })
}

export default swals
