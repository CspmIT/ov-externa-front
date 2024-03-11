import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
{
  /* ----------------- ICONOS ----------------- */
}
import { TbEye, TbEyeClosed } from "react-icons/tb";
{
  /* ----------------- COMPONENTES ----------------- */
}
import InputGroup from "../../components/InputGroup";
import Button from "../../components/Button";
import request from "../../routes/request";

const Login = () => {
  const navigate = useNavigate();
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
    const url = "https://desarrollo.coopmorteros.coop/TestReact/login";
    const data = { email, password };
    try {
      const responseData = await request(url, 'post', data);
      if (responseData === "Error") {
        alert("No existe el usuario");
        return;
      }
      localStorage.setItem("usuario", JSON.stringify(responseData));
      window.location.reload();
    } catch (error) {
      console.error("Error en la solicitud:", error);
      return;
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
            <div className="w-full flex flex-col text-center items-center justify-center">
              <Button props={{ class: "text-black bg-green-400", text: "Ingresar", type: "submit" }} />
{/* 
              <Link to={"/Register"}>
                <Button props={{ class: "text-black botonesAceptar m-2", text: "Registrarme", type: "button" }} />
              </Link> */}
            </div>
            <div className="mt-4 w-full flex-col flex text-center">
              <label className="mt-2" >¿Olvidaste tu contraseña? <span className="font-bold text-teal-700" onClick={()=>{navigate('/Register')}}>Recuperala</span> </label>
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