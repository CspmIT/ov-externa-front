import axios from "axios";

const request = async (url, method, data) => {
  try {
    const response = await axios({
      method: method,
      url: url,
      data: data ? data : '',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
    });
    return response.data;
  } catch (error) {
    console.error("Error al enviar la solicitud:", error);
    throw error;
  }
};

export default request;

