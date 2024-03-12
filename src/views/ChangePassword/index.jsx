// Importa las dependencias necesarias
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Define el componente ChangePassword
const ChangePassword = () => {
  // Recupera el token de la URL
  const { token } = useParams();
  const [savedToken, setSavedToken] = useState(null);
  const navigate = useNavigate();

  // Guarda el token en el estado del componente y redirige al usuario
  useEffect(() => {
    if (token && !savedToken) {
      setSavedToken(token);
    }
  }, [token, savedToken, navigate]);

  return (
    <div>
      <h1>Cambio de contraseña</h1>
    </div>
  );
};

export default ChangePassword;
