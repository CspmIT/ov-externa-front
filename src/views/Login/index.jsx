import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
{
    /* ----------------- ICONOS ----------------- */
}
import { TbEye, TbEyeClosed } from "react-icons/tb";
{
    /* ----------------- COMPONENTES ----------------- */
}
import InputGroup from "../../components/InputGroup";
import Button from "../../components/Button";
import Axios from "axios";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { UserContext } from "../../contexts/UserContext";

const Login = () => {
    const { token, id_user } = useParams(["token", "id_user"]);
    const { setUsuario } = useContext(UserContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pass, setPass] = useState("password");
    const [remember, setRemember] = useState(false);
    const [iconEye, setIconEye] = useState(<TbEye />);
    const showPassword = () => {
        setPass(pass == "password" ? "text" : "password");
        setIconEye(pass == "password" ? <TbEyeClosed /> : <TbEye />);
    };
    const handleChangeCheckBoxRemember = (e) => {
        setRemember(!remember);
    };
    const handleChangeMail = (e) => {
        setEmail(e.target.value);
    };
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };
    const RenviarToken = async () => {
        const url = "http://localhost:8000/api/reSendEmailToken";
        const info = { token, id_user };
        console.log(info);
        try {
            const responseData = await Axios.post(url, info);
            if (responseData === "Error") {
                alert("No existe el usuario");
                return;
            }
            Swal.fire({
                icon: "success",
                title: "Perfecto!",
                text: `Se ha reenviado un email a ${info.mail} para activar la cuenta`,
            }).then(() => {
                navigate("/Login");
            });
        } catch (error) {
            console.log(error);
            return;
        }
    };
    const formulario = async () => {
        // const url = "http://cooptech.com.ar:30888/api/login";
        const url = "http://localhost:8000/api/login";
        const info = { email, password };
        try {
            const responseData = await Axios.post(url, info);
            if (responseData.status === 200) {
                localStorage.setItem("usuario", JSON.stringify(responseData.data));
                setUsuario(responseData.data);
            }
        } catch (error) {
            Swal.fire({
                icon: "warning",
                title: "Atención!",
                text: error.response.data.message,
                allowOutsideClick: false,
            });
            return;
        }
    };

    const validacionToken = async (token, id) => {
        const url = "http://localhost:8000/api/validationUser";
        const info = { token };
        try {
            const responseData = await Axios.post(url, info);
            Swal.fire({
                icon: "success",
                title: "Perfecto!",
                text: "Se habilito correctamente tu cuenta.",
                allowOutsideClick: false,
            }).then(() => {
                navigate("/Login");
            });
        } catch (error) {
            Swal.fire({
                icon: "warning",
                title: "Atención!",
                text: error.response.data.message,
                confirmButtonText: "Reenviar Token",
                allowOutsideClick: false,
                showCancelButton: true,
            }).then((result) => {
                if (!result.isConfirmed) {
                    navigate("/Login");
                } else {
                    RenviarToken();
                }
            });
        }
    };
    useEffect(() => {
        if (token && id_user) {
            validacionToken(token, id_user);
        }
    }, [id_user, token]);

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    return (
        <>
            <h2 className="mt-5 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">Iniciar Sesión </h2>
            <form onSubmit={handleSubmit((data) => formulario(data))}>
                <InputGroup onChange={handleChangeMail} required errors={errors} validation={register} id={"email"} name={"email"} title={"Email"} ph={"Ingrese un Email"} type={"email"} value={email} />
                <InputGroup className={"mt-5"} onChange={handleChangePassword} id={"password"} name={"password"} title={"Contraseña"} showPass={showPassword} ph={"Ingrese una Contraseña"} type={pass} btnIcon={iconEye} value={password} />
                <div className="w-full mt-3 flex flex-col text-center items-center justify-center">
                    <FormControlLabel onChange={handleChangeCheckBoxRemember} control={<Checkbox id="CheckBoxRemember" />} label="Recuerdame" />
                    <Button props={{ class: "text-gray-700 text-xl mt-3 bg-green-500 hover:bg-green-400", text: "Ingresar", type: "submit" }} />
                </div>
                <div className="mt-4 w-full flex-col flex text-center">
                    <label className="mt-2">
                        ¿Olvidaste tu contraseña?
                        <span
                            className="font-bold cursor-pointer ml-2 text-teal-700"
                            onClick={() => {
                                navigate("/RestorePassword");
                            }}
                        >
                            Recuperala
                        </span>
                    </label>
                    <label className="m-0 mt-2">
                        ¿No tenés una cuenta?
                        <span
                            className="font-bold ml-2 cursor-pointer text-orange-600"
                            onClick={() => {
                                navigate("/Register");
                            }}
                        >
                            Registrate
                        </span>
                    </label>
                </div>
            </form>
        </>
    );
};

export default Login;
