import Swal from 'sweetalert2';

const swals = (props) => {

    if (document.body.classList.contains("dark")) {
        var claseModal = 'swalModoOscuro';
    }else{
        var claseModal = '';
    }
   
    Swal.fire({
        icon: props.icon ? props.icon : '',
        title: props.title ? props.title : '',
        html: props.html ? props.html : '',
        showCloseButton: true,
        showConfirmButton: props.confirm ? true : false,
        showCancelButton: props.cancel ? true : false,
        confirmButtonText: props.confirm,
        cancelButtonText: props.cancel,
        customClass: {
            confirmButton: `botonesAceptar`,
            cancelButton: `botonesCancelar`,
            popup: claseModal
        },
        allowOutsideClick: props.static ? props.static : '',
        allowEscapeKey: props.static ? props.static : ''
    }).then((result) => {
        if (result.isConfirmed) {
            props.actionConfirm && props.actionConfirm();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            props.actionCancel && props.actionCancel();
        }
      });
};
  
export default swals;
  