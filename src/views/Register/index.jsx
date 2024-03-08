import React, { useEffect, useState } from "react";
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
import request from "../../routes/request";

const Register = () => {
  const initialData = {
    name: "",
    last_name: "",
    email: "",
    email_confirmation: "",
    password: "",
    password_confirmation: "",
  };
  const [userData, setUserData] = useState(initialData);
  const [pass, setPass] = useState("password");
  const [iconEye, setIconEye] = useState(<TbEye />);
  const [passRepeat, setPassRepeat] = useState("password");
  const [iconEyeRepeat, setIconEyeRepeat] = useState(<TbEye />);
  const showPasswordRepeat = () => {
    setPassRepeat(passRepeat == "password" ? "text" : "password");
    setIconEyeRepeat(passRepeat == "password" ? <TbEyeClosed /> : <TbEye />);
  };
  const showPassword = () => {
    setPass(pass == "password" ? "text" : "password");
    setIconEye(pass == "password" ? <TbEyeClosed /> : <TbEye />);
  };
  const handleChangeUserData = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `http://cooptech.com.ar:30888/api/register`;
    try {
      const responseData = await request(url, "POST", userData);
      console.log(responseData);
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };
  return (
    <div className="flex flex-row h-full justify-center items-center">
      <div className="w-full md:1/2 p-5 flex justify-center">
        <div className="w-full md:w-3/4">
          <img className="mx-auto h-24 w-auto md:hidden" src="https://app.coopmorteros.coop/public/images/logos/Iso_OfiVirtual_Logo_Recortado.png?random=6582f0b2a7340" alt="Your Company" />
          <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">Registrarme</h2>
          <form id="formRegister" onSubmit={handleSubmit} autoComplete={"new-password"}>
            <div className="w-full flex flex-row">
              {/* Creo estos dos inputs ocultos por el tema del autocompletar, no esta funcionando bien con React */}
              <div className="w-full md:w-1/2 m-2">
                <InputGroup onChange={handleChangeUserData} props={{ name: "name", label: "Nombre", ph: "Nombre", type: "text", req: true, value: userData.name }} />
                <InputGroup onChange={handleChangeUserData} props={{ id: "mail", name: "email", label: "Email", ph: "Ingrese un Email", type: "email", req: true, value: userData.email }} />
                <InputGroup
                  onChange={handleChangeUserData}
                  showPass={showPassword}
                  props={{ id: "password", name: "password", label: "Contraseña", ph: "Ingrese una Contraseña", type: pass, req: true, btnIcon: iconEye, value: userData.password }}
                />
              </div>
              <div className="w-full md:w-1/2 m-2">
                <InputGroup onChange={handleChangeUserData} props={{ name: "last_name", label: "Apellido", ph: "Apellido", type: "text", req: true, value: userData.last_name }} />
                <InputGroup
                  onChange={handleChangeUserData}
                  props={{ name: "email_confirmation", label: "Email", ph: "Ingrese un Email", type: "email", req: true, value: userData.email_confirmation }}
                />
                <InputGroup
                  onChange={handleChangeUserData}
                  showPass={showPasswordRepeat}
                  props={{
                    name: "password_confirmation",
                    label: "Repetir Contraseña",
                    ph: "Ingrese Nuevamente una Contraseña",
                    type: passRepeat,
                    req: true,
                    btnIcon: iconEyeRepeat,
                    value: userData.password_confirmation,
                  }}
                />
              </div>
            </div>
            <div className="w-full flex justify-center">
              <Button props={{ class: "text-black bg-yellow-300 hover:bg-yellow-400 focus:bg-yellow-400 m-2", text: "Registrarme", type: "submit" }} />
              <Link to={"/Login"}>
                <Button props={{ class: "text-black bg-white hover:bg-yellow-400 focus:bg-yellow-400 m-2", text: "Cancelar" }} />
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

export default Register;
