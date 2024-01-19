import Swal from 'sweetalert2';
const swals = (props) => {
    var claseModal = 'dark:text-gray-200 dark:bg-zinc-800 bg-white'
    Swal.fire({
        icon: `${props.icon ? props.icon : ''}`,
        title: `${props.title ? props.title : ''}`,
        html: `${props.html ? props.html : ''}`,
        customClass: {
            popup: claseModal,
        },
        showCloseButton: true,
        showConfirmButton: `${props.confirm ? true : false}`,
        showCancelButton: `${props.cancel ? true : false}`,
        confirmButtonText: `${props.confirm}`,
        cancelButtonText: `${props.cancel}`
    }).then((result) => {
        if (result.isConfirmed) {
            props.actionConfirm && props.actionConfirm();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            props.actionCancel && props.actionCancel();
        }
      });
};
  
export default swals;
  