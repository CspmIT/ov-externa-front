import { useState } from "react";
import { useNavigate } from "react-router-dom";

import InputGroup from "../../components/InputGroup";
import Axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Button, CircularProgress } from "@mui/material";

function RestorePassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [spinner, setSpinner] = useState(false);
    const handleChangeMail = (e) => {
        setEmail(e.target.value);
    };

    const formulario = async () => {
        setSpinner(true);
        const url = "http://cooptech.com.ar:30888/api/password_recover";
        const info = { email };
        try {
            const responseData = await Axios.post(url, info);
            if (responseData === "Error") {
                alert("No existe el usuario");
                return;
            }
            Swal.fire({
                icon: "success",
                title: "Perfecto!",
                text: `Se ha enviado un correo a ${info.email}, para restablecer su contraseña`,
            })
           
        } catch (error) {
            console.error("Error en la solicitud:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Ocurrio un problema`,
            })
            setSpinner(false);
            return;
        } finally{
            setSpinner(false);
            navigate('/Login')
        }
    };
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    return (
        <>
            <h2 className="mt-5 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">Recuperar contraseña </h2>
            <form onSubmit={handleSubmit((data) => formulario(data))}>
                <InputGroup onChange={handleChangeMail} required errors={errors} validation={register} id={"email"} name={"email"} title={"Email"} ph={"Ingrese un Email"} type={"email"} value={email} />
                <div className="w-full mt-3 flex flex-col text-center items-center justify-center">
                    <Button variant="contained" color="primary" disabled={spinner} type="submit">
                        {spinner ? <CircularProgress size={20} disableShrink={true} color="warning" /> : <b>Recuperar</b>}
                    </Button>
                </div>
            </form>
        </>
    );
}

export default RestorePassword;
