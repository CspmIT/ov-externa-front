import React, { useState } from "react";
import { Link } from "react-router-dom";
{
  /* ----------------- ICONOS ----------------- */
}
import { TbEye, TbEyeClosed } from "react-icons/tb";
{
  /* ----------------- COMPONENTES ----------------- */
}
import InputGroup from "../../components/InputGroup";
import Button from "../../components/Button";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pass, setPass] = useState("password");
  const [iconEye, setIconEye] = useState(<TbEye />);
  const showPassword = () => {
    setPass(pass == "password" ? "text" : "password");
    setIconEye(pass == "password" ? <TbEyeClosed /> : <TbEye />);
  };
  const handleChangeMail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://desarrollo.coopmorteros.coop/TestReact/prueba", {
        email,
        password,
      });
      if (response.data === "Error") {
        alert("No existe el usuario");
        return;
      }
      localStorage.setItem("usuario", JSON.stringify(response.data));
      window.location.reload();
    } catch (error) {
      console.error("Error al enviar la solicitud POST:", error);
    }
  };
  return (
    <div className="flex flex-row h-full justify-center items-center">
      <div className="w-full md:1/2 p-5 flex justify-center">
        <div className="w-full md:w-1/2">
          <img className="mx-auto h-24 w-auto md:hidden" src="https://app.coopmorteros.coop/public/images/logos/Iso_OfiVirtual_Logo_Recortado.png?random=6582f0b2a7340" alt="Your Company" />
          <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">Iniciar Sesión </h2>
          <form onSubmit={handleSubmit}>
            <InputGroup value={email} onChange={handleChangeMail} props={{ label: "Email", ph: "Ingrese un Email", type: "email", req: true }} />
            <InputGroup
              value={password}
              onChange={handleChangePassword}
              showPass={showPassword}
              props={{ label: "Contraseña", ph: "Ingrese una Contraseña", type: pass, req: true, btnIcon: iconEye }}
            />
            <div className="w-full flex justify-center">
              <Button props={{ class: "text-black bg-yellow-300 hover:bg-yellow-400 focus:bg-yellow-400 m-2", text: "Ingresar", type: "submit" }} />

              <Link to={"/Register"}>
                <Button props={{ class: "text-black bg-white hover:bg-yellow-400 focus:bg-yellow-400 m-2", text: "Registrarme" }} />
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div className="w-0 md:w-3/6 h-full flex justify-center bg-[#c1c7cc]">
        <div className='w-full h-full bg-[url("assets/gifs/login.gif")] bg-cover'></div>
      </div>
    </div>
  );
};

export default Login;
