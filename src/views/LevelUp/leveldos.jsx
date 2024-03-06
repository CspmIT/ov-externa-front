import React from "react";
{
    /* ----------------- COMPONENTES ----------------- */
}
import Button from "../../components/Button";
import CardCustom from "../../components/CardCustom";
import { useForm } from "react-hook-form";
import formulario from "./validateForm";
import { useNavigate } from "react-router-dom";
const leveldos = () => {
    var usuario = "Julieta";
    var provincias = [
        { id: 1, name: "Buenos Aires" },
        { id: 2, name: "Buenos Aires-GBA" },
        { id: 3, name: "Capital Federal" },
        { id: 4, name: "Catamarca" },
        { id: 5, name: "Chaco" },
        { id: 6, name: "Chubut" },
        { id: 7, name: "Córdoba" },
        { id: 8, name: "Corrientes" },
        { id: 9, name: "Entre Ríos" },
        { id: 10, name: "Formosa" },
    ];

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const navigate = useNavigate();

    return (
        <CardCustom>
            <div className="flex flex-wrap w-full">
                <p className="py-10 leading-7">
                    Hola {usuario}, estás a unos pasos de subir al Nivel 2. Para
                    esto, te vamos a pedir una serie de datos necesarios para
                    validar tu identidad y así poder usar tu Oficina Virtual
                    aprovechando todos los beneficios.
                    <br />
                    Uno de los datos más importantes y obligatorio es tu número
                    de socio, ya que ingresando el mismo, podrás acceder a todas
                    tus cuentas como así también todos tus servicios.
                    <br />A continuación, verás una imagen del encabezado de tu
                    factura. El número de socio podés obtenerlo desde la misma,
                    tal como lo muestra la imagen.
                </p>
                <div className="w-full flex justify-center mb-10">
                    <img
                        className="w-full md:w-3/4"
                        src="https://app.coopmorteros.coop/public/images/otros/Factura.jpg"
                    />
                </div>
                <form
                    id="formRegister"
                    onSubmit={handleSubmit((data) => formulario(data, navigate))}
                    className="w-full flex flex-wrap p-7"
                >
                    <div className="w-full md:w-1/2 lg:w-1/4 p-2">
                        <div className="mt-2">
                            <label
                                htmlFor="number_customer"
                                className="block font-semibold ml-1 mb-2 dark:text-white"
                            >
                                Nº Socio
                            </label>
                            <input
                                id="number_customer"
                                type="text"
                                placeholder="Ingrese su N° de Socio"
                                {...register("number_customer", {
                                    required: true,
                                    pattern: /^[0-9]*$/,
                                })}
                                //Si el campo es requerido y no se completa, pinto el borde de rojo
                                className={`block w-full rounded-md border-0 p-1.5 text-gray-900 dark:bg-zinc-800 dark:text-gray-200 shadow-sm ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                                    errors.number_customer
                                        ? "border-red-500"
                                        : ""
                                }`}
                            />
                            {errors.number_customer?.type === "required" && (
                                <span className="text-red-500">
                                    Este campo es obligatorio
                                </span>
                            )}
                            {errors.number_customer?.type === "pattern" && (
                                <span className="text-red-500">
                                    Solo se pueden ingresar numeros
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-1/4 p-2">
                        <div className="mt-2">
                            <label
                                htmlFor="document_type"
                                className="block font-semibold ml-1 mb-2 dark:text-white"
                            >
                                Tipo Doc.
                            </label>
                            <select
                                id="document_type"
                                {...register("document_type", {
                                    required: true,
                                })}
                                className="block bg-white dark:bg-zinc-800 w-full rounded-md border-0 p-3 text-gray-900 dark:text-gray-200 shadow placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
                            >
                                <option className="robotoCondensed" value="">
                                    Seleccionar...
                                </option>
                                <option value="1">CUIL</option>
                                <option value="2">CUIT</option>
                                <option value="3">DNI</option>
                                <option value="4">LC</option>
                                <option value="5">LE</option>
                            </select>
                            {errors.document_type?.type === "required" && (
                                <span className="text-red-500">
                                    Este campo es obligatorio
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-1/4 p-2">
                        <div className="mt-2">
                            <label
                                htmlFor="document_number"
                                className="block font-semibold ml-1 mb-2 dark:text-white"
                            >
                                Nº de Documento
                            </label>
                            <input
                                id="document_number"
                                type="text"
                                placeholder="Ingrese su N° de Documento"
                                {...register("document_number", {
                                    required: true,
                                    pattern: /^[0-9]*$/,
                                })}
                                className="block w-full rounded-md border-0 p-1.5 text-gray-900 dark:bg-zinc-800 dark:text-gray-200 shadow-sm ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            />
                            {errors.document_number?.type === "required" && (
                                <span className="text-red-500">
                                    Este campo es obligatorio
                                </span>
                            )}
                            {errors.document_number?.type === "pattern" && (
                                <span className="text-red-500">
                                    Solo se pueden ingresar numeros
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-1/4 p-2">
                        <div className="mt-2">
                            <label
                                htmlFor="sex"
                                className="block font-semibold ml-1 mb-2 dark:text-white"
                            >
                                Sexo
                            </label>
                            <select
                                id="sex"
                                {...register("sex", { required: true })}
                                className="block bg-white dark:bg-zinc-800 w-full rounded-md border-0 p-3 text-gray-900 dark:text-gray-200 shadow placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
                            >
                                <option className="robotoCondensed" value="">
                                    Seleccionar...
                                </option>
                                <option value="1">Femenino</option>
                                <option value="2">Masculino</option>
                            </select>
                            {errors.sex?.type === "required" && (
                                <span className="text-red-500">
                                    Este campo es obligatorio
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-1/3 p-2">
                        <div className="mt-2">
                            <label
                                htmlFor="id_state"
                                className="block font-semibold ml-1 mb-2 dark:text-white"
                            >
                                Provincias
                            </label>
                            <select
                                id="id_state"
                                {...register("id_state", { required: true })}
                                className="block bg-white dark:bg-zinc-800 w-full rounded-md border-0 p-3 text-gray-900 dark:text-gray-200 shadow placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
                            >
                                <option className="robotoCondensed" value="">
                                    Seleccionar...
                                </option>
                                {provincias.map((item, index) => (
                                    <option
                                        key={index}
                                        className="robotoCondensed"
                                        value={item.id}
                                    >
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                            {errors.id_state?.type === "required" && (
                                <span className="text-red-500">
                                    Este campo es obligatorio
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-1/3 p-2">
                        <div className="mt-2">
                            <label
                                htmlFor="id_cities"
                                className="block font-semibold ml-1 mb-2 dark:text-white"
                            >
                                Localidades
                            </label>
                            <select
                                id="id_cities"
                                {...register("id_cities", { required: true })}
                                className="block bg-white dark:bg-zinc-800 w-full rounded-md border-0 p-3 text-gray-900 dark:text-gray-200 shadow placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
                            >
                                <option className="robotoCondensed" value="">
                                    Seleccionar...
                                </option>
                                {provincias.map((item, index) => (
                                    <option
                                        key={index}
                                        className="robotoCondensed"
                                        value={item.id}
                                    >
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                            {errors.id_cities?.type === "required" && (
                                <span className="text-red-500">
                                    Este campo es obligatorio
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-1/3 p-2">
                        <div className="mt-2">
                            <label
                                htmlFor="address"
                                className="block font-semibold ml-1 mb-2 dark:text-white"
                            >
                                Dirección
                            </label>
                            <input
                                id="address"
                                type="text"
                                placeholder="Dirección"
                                {...register("address", { required: true })}
                                className="block w-full rounded-md border-0 p-1.5 text-gray-900 dark:bg-zinc-800 dark:text-gray-200 shadow-sm ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            />
                            {errors.address?.type === "required" && (
                                <span className="text-red-500">
                                    Este campo es obligatorio
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-1/3 p-2">
                        <div className="mt-2">
                            <label className="block font-semibold ml-1 mb-2 dark:text-white">
                                Caracteristica
                            </label>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                    0
                                </span>
                                <input
                                    {...register("phoneCaract", {
                                        required: true,
                                        pattern: /^[0-9]*$/,
                                    })}
                                    type="text"
                                    id="caractPhone"
                                    className="block rounded-none rounded-e-md dark:bg-zinc-700 dark:text-gray-200 shadow border-0 p-2.5 text-gray-900 w-full placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                    placeholder="Caract. (Sin el 0)"
                                />
                            </div>
                            {errors.phoneCaract?.type === "required" && (
                                <span className="text-red-500">
                                    Este campo es obligatorio
                                </span>
                            )}
                            {errors.phoneCaract?.type === "pattern" && (
                                <span className="text-red-500">
                                    Solo se pueden ingresar numeros
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-1/3 p-2">
                        <div className="mt-2">
                            <label className="block font-semibold ml-1 mb-2 dark:text-white">
                                Número de Celular
                            </label>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                    15
                                </span>
                                <input
                                    {...register("numberPhone", {
                                        required: true,
                                        pattern: /^[0-9]*$/,
                                    })}
                                    type="text"
                                    id="numberPhone"
                                    className="block rounded-none rounded-e-md dark:bg-zinc-700 dark:text-gray-200 shadow border-0 p-2.5 text-gray-900 w-full placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                    placeholder="Número (Sin el 15)"
                                />
                            </div>
                            {errors.numberPhone?.type === "required" && (
                                <span className="text-red-500">
                                    Este campo es obligatorio
                                </span>
                            )}
                            {errors.numberPhone?.type === "pattern" && (
                                <span className="text-red-500">
                                    Solo se pueden ingresar numeros
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-1/3 p-2">
                        <div className="mt-2">
                            <label
                                htmlFor="birthday"
                                className="block font-semibold ml-1 mb-2 dark:text-white"
                            >
                                Fecha de Nacimiento
                            </label>
                            <input
                                {...register("birthdate", { required: true })}
                                type="date"
                                id="birthday"
                                className="block rounded-none rounded-e-md dark:bg-zinc-700 dark:text-gray-200 shadow border-0 p-2.5 text-gray-900 w-full placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            />
                            {errors.birthdate?.type === "required" && (
                                <span className="text-red-500">
                                    Este campo es obligatorio
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="w-full flex justify-center">
                        <Button
                            props={{
                                class: "text-black bg-yellow-300 hover:bg-yellow-400 focus:bg-yellow-400 m-2",
                                text: "Enviar",
                                type: "submit",
                            }}
                        />
                    </div>
                </form>
            </div>
        </CardCustom>
    );
};

export default leveldos;
