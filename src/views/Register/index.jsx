import {useState} from "react";
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
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const Register = () => {
    const initialData = {
        first_name: "",
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
    const formulario = async () => {
        const url = `http://cooptech.com.ar:30888/api/register`;
        try {
            const responseData = await request(url, "POST", userData);
            Swal.fire({
                icon: "success",
                title: "¡Registrado!",
                text: "Ahora puedes iniciar sesión.",
            });
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    return (
        <>
            <h2 className="max-sm:mt-5 mb-8 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">Registrarme</h2>
            <form id="formRegister" onSubmit={handleSubmit((data) => formulario(data))} autoComplete={"new-password"}>
                <div className="w-full grid sm:grid-cols-2 gap-3 mt-2 mb-3">
                    <InputGroup onChange={handleChangeUserData} required errors={errors} validation={register} id={"first_name"} name={"first_name"} title={"Nombre"} ph={"Nombre"} type={"text"} value={userData.first_name} />
                    <InputGroup onChange={handleChangeUserData} required errors={errors} validation={register} id={"last_name"} name={"last_name"} title={"Apellido"} ph={"Apellido"} type={"text"} value={userData.last_name} />
                    <InputGroup onChange={handleChangeUserData} required errors={errors} validation={register} id={"email"} name={"email"} title={"Email"} ph={"Ingrese un Email"} type={"email"} value={userData.email} />
                    <InputGroup onChange={handleChangeUserData} required errors={errors} validation={register} id={"email_confirmation"} name={"email_confirmation"} title={"Repetir Email"} ph={"Ingrese nuevamente tu Email"} type={"email"} value={userData.email_confirmation} />
                    <InputGroup onChange={handleChangeUserData} required errors={errors} validation={register} id={"password"} name={"password"} title={"Contraseña"} showPass={showPassword} ph={"Ingrese una Contraseña"} type={pass} btnIcon={iconEye} value={userData.password} />
                    <InputGroup onChange={handleChangeUserData} required errors={errors} validation={register} id={"password_confirmation"} name={"password_confirmation"} title={"Repetir Contraseña"} ph={"Ingrese Nuevamente una Contraseña"} type={passRepeat} value={userData.password_confirmation} showPass={showPasswordRepeat} btnIcon={iconEyeRepeat} />
                </div>
                <div className="w-full flex justify-center">
                    <Button props={{ class: "text-black bg-yellow-300 hover:bg-yellow-400 focus:bg-yellow-400 m-2", text: "Registrarme", type: "submit" }} />
                    <Link to={"/Login"}>
                        <Button props={{ class: "text-black bg-white hover:bg-yellow-400 focus:bg-yellow-400 m-2", text: "Cancelar" }} />
                    </Link>
                </div>
            </form>
        </>
    );
};

export default Register;
