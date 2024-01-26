import React, { useEffect } from 'react'
import { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import Card from '../../components/Card';
import { FaQuestion } from 'react-icons/fa6';
import Button from '../../components/Button';

const index = () => {

    const catergories = [{
        id: 1,
        name: "Gastronomía",
        icon: <img src='https://app.coopmorteros.coop/public/images_rewards/categories/650195ededf17.png' />
    }, {
        id: 2,
        name: "Indumentaria",
        icon: <img src='https://app.coopmorteros.coop/public/images_rewards/categories/6501960137cd9.png' />
    }, {
        id: 3,
        name: "Bienestar",
        icon: <img src='https://app.coopmorteros.coop/public/images_rewards/categories/65019619beb58.png' />
    }, {
        id: 4,
        name: "Salud",
        icon: <img src='https://app.coopmorteros.coop/public/images_rewards/categories/6501962715a28.png' />
    }, {
        id: 5,
        name: "Bebidas",
        icon: <img src='https://app.coopmorteros.coop/public/images_rewards/categories/6501970f9786b.png' />
    }, {
        id: 6,
        name: "Hogar",
        icon: <img src='https://app.coopmorteros.coop/public/images_rewards/categories/6502f86f02865.png' />
    }]

    const [dropMode, setdropMode] = useState("hidden");
    const [iconMode, seticonMode] = useState(<IoMdArrowDropdown className="float-end ml-3" />);
    const dropModehidden = () => {
        setdropMode(dropMode == "hidden" ? "" : "hidden");
        seticonMode(dropMode == "hidden" ? <IoMdArrowDropup className="float-end ml-3" /> : <IoMdArrowDropdown className="float-end ml-3" />);
    };

    const [statusActive, setStatusActive] = useState(0);
    const [labelInactive, setLabelInactive] = useState('');
    const [Beneficios, setBeneficios] = useState('');
    const employeeAccess = 1;
    const userCreateManagement = 8264;
    const beneficiosActivos = 3;

    const html = [{
        action_finish: "1",
        address: "25 de Mayo 354",
        ammount_new: "0",
        ammount_old: "0",
        category_id: "1",
        commerce_id: "3",
        count: "45",
        cumulative: "1",
        date_finish: "2024-02-02 00:00:00",
        date_start: "2024-01-26 00:00:00",
        detail: "20%",
        detail_type: "1",
        id: "1",
        id_cat: "3",
        img_name: "https://app.coopmorteros.coop/public/images_rewards/commerce/6544c737a7531.png",
        pay: "1",
        product: "cualquier prenda (excepto mallas y bikinis)",
        status: "1",
        stok_start: "50",
        type: "1",
        view_create: "0",
        view_user_edit: "1/0",
        withdrawal_cap: "10.000"
    }, {
        action_finish: "1",
        address: "Lopez y Planes 555",
        ammount_new: "0",
        ammount_old: "0",
        category_id: "1",
        commerce_id: "3",
        count: "45",
        cumulative: "3",
        date_finish: "2024-02-02 00:00:00",
        date_start: "2024-01-26 00:00:00",
        detail: "2X1",
        detail_type: "1",
        id: "2",
        id_cat: "3",
        img_name: "https://app.coopmorteros.coop/public/images_rewards/commerce/6544c737a7531.png",
        pay: "4",
        product: "1/4 kg de helado, todos los sabores",
        status: "1",
        stok_start: "50",
        type: "4",
        view_create: "0",
        view_user_edit: "0/3",
        withdrawal_cap: ""
    }, {
        action_finish: "1",
        address: "El Libertador 760",
        ammount_new: "1990",
        ammount_old: "5200",
        category_id: "2",
        commerce_id: "39",
        count: "10",
        cumulative: "1",
        date_finish: "2024-02-01 00:00:00",
        date_start: "2024-01-26 00:00:00",
        detail: "",
        detail_type: "",
        id: "64",
        id_cat: "39",
        img_name: "https://app.coopmorteros.coop/public/images_rewards/commerce/6544c737a7531.png",
        pay: "1",
        product: "TELA FIBRANA $1.990 el metro",
        status: "1",
        stok_start: "10",
        type: "3",
        view_create: "0",
        view_user_edit: "0/40",
        withdrawal_cap: ""
    }, {
        action_finish: "1",
        address: "Caseros 332",
        ammount_new: "0",
        ammount_old: "0",
        category_id: "1",
        commerce_id: "3",
        count: "45",
        cumulative: "1",
        date_finish: "2024-02-02 00:00:00",
        date_start: "2024-01-26 00:00:00",
        detail: "",
        detail_type: "",
        id: "7",
        id_cat: "3",
        img_name: "https://app.coopmorteros.coop/public/images_rewards/commerce/6544c737a7531.png",
        pay: "4",
        product: "Cena en el local // Bebida",
        status: "1",
        stok_start: "50",
        type: "4",
        view_create: "0",
        view_user_edit: "0/3",
        withdrawal_cap: ""
    },
    ]

    useEffect(() => {
        pintar(html);
    }, [html]);


    var getTitle = function (val) {
        var title_preview = "";
        if (val.type == 1) {
            title_preview = val.detail_type == 2 ? val.detail + "de Descuento en toda la Compra" : val.detail + " de Descuento en " + val.product;
            return title_preview;
        }

        if (val.type == 2) {
            title_preview = val.detail + " en " + val.product;
            return title_preview;
        }

        if (val.type == 3) {
            title_preview = "Oferta Especial en " + val.product;
            return title_preview;
        }

        if (val.type == 4) {
            let product = "";
            const productos_consecuentes = val.product.split("//");
            const product_1 = productos_consecuentes[0];
            const product_2 = productos_consecuentes[1];

            product = "Con tu compra de " + product_1;
            product += " te llevas sin costo " + product_2;
            title_preview = product;
            return title_preview;
        }
        return title_preview;
    };

    var getSubTitle = function (val) {
        var subtitle = "";

        if (val.type == 1) {
            subtitle = val.withdrawal_cap == "" || val.withdrawal_cap == "0" ? "" : "<span>Tope de Descuento: $</span> " + val.withdrawal_cap;
            return subtitle;
        }

        if (val.type == 2) {
            subtitle = val.detail_type == 2 ? "Se va a tomar el precio del producto o servicio de mayor valor" : "";
            return subtitle;
        }

        if (val.type == 3) {
            if (val.ammount_old !== "") {
                ammount_old = `<p className='tachado m-0'>$ ${val.ammount_old}</p>`;
            }
            subtitle = "$" + val.ammount_new;
            return subtitle;
        }
        return subtitle;
    };

    var getOldAmount = function (val) {
        var ammount_old = "";
        if (val.type == 3 && val.ammount_old !== "") {
            ammount_old = `<p className='tachado m-0 p-2'>$ ${val.ammount_old}</p>`;
            return ammount_old;
        }
        return ammount_old;
    };

    var getMetPago = function (val) {
        var met_pago = "";
        var pago = val.pay == 1 ? "Efectivo" : val.pay == 2 ? "Crédito" : val.pay == 3 ? "Débito" : val.pay == 4 ? "Todos" : val.pay == 5 ? "Tarjetas Locales" : val.pay == 6 ? "Efectivo o Tarjetas Locales" : "";
        if (pago != "") {
            met_pago = `<span className="font_Roboto-BoldCondensedItalic" style="color: #804f79">Método de Pago:</span> ${pago}`;
            return met_pago;
        }
        return met_pago;
    };

    var getCummulative = function (val) {
        var cummulative = "";
        if (val.cumulative == 2) {
            cummulative = `<p className="font_Roboto-LightItalic">Acumulable con otras promos vigentes</p>`;
        } else {
            cummulative = `<p className="font_Roboto-LightItalic">No acumulable con otras promos vigentes</p>`;
        }
        return cummulative;
    };

    var pintar = function (html) {
        let benefitsElements = [];
        if (html.length == 0) {
            setLabelInactive(
                <label className="text-red-400 text-center w-full">
                    <b>No hay Beneficios disponibles</b>
                </label>
            )
        } else {
            var activos;
            let status_active = employeeAccess == 1 ? 1 : statusActive;
            {
                userCreateManagement !== "8264" ? (
                    <>
                        {status_active === 0 && (
                            setLabelInactive(
                                <label className="text-red-400 text-center w-full">
                                    <b>Debes llegar al 100% para poder acceder a los Beneficios</b>
                                </label>
                            )
                        )}
                        {beneficiosActivos.length >= 4 && (
                            setLabelInactive(
                                <label className="text-red-400 text-center w-full">
                                    <b>Ya activaste 4 beneficios, canjealos y volvé por más!</b>
                                </label>
                            )
                        )}
                    </>
                ) : (
                    benefitsElements = html.map((val) => {
                        let found = activos.find((obj) => obj.id === val.id);
                        if (found === undefined) {
                            const titlePreview = getTitle(val);
                            const subtitle = getSubTitle(val);
                            const ammountOld = getOldAmount(val);
                            const metPago = getMetPago(val);
                            const cummulativeText = getCummulative(val);

                            const dateFinishPreview = val.date_finish;
                            const hs = dateFinishPreview.split(" ");
                            const info = hs[0].split("-").reverse().join("/");

                            const margen = val.type === 3 ? "ml-3" : "";

                            return (
                                <Card
                                    key={val.id}
                                    props={{
                                        phone: "",
                                        subtitle: (
                                            <div className="w-full text-center">
                                                <img src={val.img_name} alt="img" className="w-full mb-5" />
                                                <p className="w-full bg-gray-100 dark:bg-zinc-800 px-4 py-2 mt-2">
                                                    {val.address}
                                                </p>
                                                <hr className="my-1" />
                                                <h5 className="uppercase text-orange-700">{titlePreview}</h5>
                                                <div className="flex flex-wrap justify-center">
                                                    {ammountOld}
                                                    <p className={`m-0 p-2 ${margen}`}>{subtitle}</p>
                                                </div>
                                                <div className="my-3 text-center">
                                                    <p className="m-0">{metPago}</p>
                                                    <p className="m-0">
                                                        <span className="text-purple-700">Vigente hasta: </span>
                                                        {info}
                                                    </p>
                                                </div>
                                                <Button
                                                    props={{
                                                        class: "text-black botonPrincipal m-2 mt-7 text-sm w-full",
                                                        text: `ACTIVALO AHORA`,
                                                    }}
                                                />
                                                <label className="mt-2">*Válido para una compra o servicio.</label>
                                                {cummulativeText}
                                            </div>
                                        ),
                                        widht: "w-auto",
                                        bg: "bg-white",
                                        positionBtn: "absolute",
                                        hover: "false",
                                    }}
                                />
                            );
                        }
                        return null;
                    })
                )
            }
            const benefitsContainer = document.getElementById('benefitsContainer');
            benefitsElements.forEach((element) => {
                ReactDOM.createPortal(element, benefitsContainer);
            });

        }
    }

    return (
        <div className="p-2 sm:pl-64">
            <img width="100%" src="https://app.coopmorteros.coop/public/images/coopate/Header.png" alt="" />
            <hr />
            <div className="w-full p-10">
                <h4 className='text-pink-400'><b>Activá tus cupones, y disfrutá de muchos descuentos y promociones!</b></h4>
                <div className="w-full flex flex-wrap">
                    <div className="w-1/2 p-0">
                        <h5><b>Acceder a ellos es fácil:</b></h5>
                        <ol className='ml-10'>
                            <li>Ser <strong> Nivel 3 </strong> de Oficina Virtual</li>
                            <li>Aboná todas tus Facturas por Oficina Virtual antes del Primer Vencimiento</li>
                        </ol>
                    </div>
                </div>
                <div className="w-full flex flex-wrap justify-center">
                    <div onClick={() => dropModehidden()} className={`cursor-pointer mt-10 mb-5 rounded-xl p-3 bg-pink-200 text-pink-400`}>
                        <h5 className='m-0'>Ver Categorías{iconMode}</h5>
                    </div>
                    <div className={`w-full flex flex-wrap justify-center p-7 pt-0 ${dropMode}`}>
                        <p className='cursor-pointer w-full text-center'><u>ver todos los Beneficios</u></p>
                        {catergories.map((item, index) => {
                            return <div key={index} className='w-full md:w-1/2 lg:w-1/4'>
                                <Card
                                    props={{
                                        phone: "",
                                        subtitle: item.name,
                                        icon: item.icon,
                                        color: "text-lime-500",
                                        bgIcon: "bg-lime-500",
                                        colorIcon: "bg-lime-500",
                                        widht: "w-auto",
                                        bg: "bg-white",
                                        positionBtn: "absolute",
                                        text: "text-xl"
                                    }}
                                />
                            </div>
                        })
                        }
                    </div>
                    {labelInactive}
                    <div className="w-full flex flex-wrap justify-center" id="benefitsContainer">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default index