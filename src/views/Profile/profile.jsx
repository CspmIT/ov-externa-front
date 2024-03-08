import React from "react";
import CardCustom from "../../components/CardCustom/index";
function profile() {
    return (
        <div>
            <CardCustom>
                <div className="flex flex-col items-center ">
                    <img
                        className="h-32 w-32 rounded-full mt-4"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="imagen de perfil"
                    />
                    <h1 className="text-2xl font-bold mt-4">Nombre Apellido</h1>
                    <p className="text-gray-500">
                        Correo:
                        <span className="text-black"> </span>
                    </p>
                    <p className="text-gray-500">
                        Teléfono:
                        <span className="text-black"> </span>
                    </p>
                    <p className="text-gray-500">
                        Dirección:
                        <span className="text-black"> </span>
                    </p>
                </div>
            </CardCustom>
        </div>
    );
}

export default profile;
