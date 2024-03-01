import axios from "axios";
import Swal from "sweetalert2";

export const searchDetailService = async (info) => {
  const urlConsulta = "http://cooptech.com.ar:30888/api/getDetailService";
  try {
    const responseData = await axios({
      method: "POST",
      url: urlConsulta,
      data: info,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = responseData.data;

    return result;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: `Oops... Tenemos problemas para recuperar los datos`, 
      showConfirmButton: true,
    });
  }
};
