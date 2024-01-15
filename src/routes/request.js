import axios from "axios";

const request = async (url, data) => {
  try {
    const response = await axios.post(`https://desarrollo.coopmorteros.coop/${url}`, data);
    return response.data;
  } catch (error) {
    console.error("Error al enviar la solicitud POST:", error);
  }
};

export default request;
