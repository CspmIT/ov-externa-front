import React, { useEffect } from 'react'
import { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import Card from '../../components/Card';
import Benefits from '../../components/Benefits';
import style from './Coopate.module.css'


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
    const [Beneficios, setBeneficios] = useState([]);
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
        img_name: "https://app.coopmorteros.coop/public/images_rewards/commerce/6543cf8b397e3.png",
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
        category_id: "2",
        commerce_id: "3",
        count: "45",
        cumulative: "3",
        date_finish: "2024-02-02 00:00:00",
        date_start: "2024-01-26 00:00:00",
        detail: "2X1",
        detail_type: "1",
        id: "2",
        id_cat: "3",
        img_name: "https://app.coopmorteros.coop/public/images_rewards/commerce/6544c3db66876.png",
        pay: "4",
        product: "1/4 kg de helado, todos los sabores",
        status: "1",
        stok_start: "50",
        type: "2",
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
        img_name: "https://app.coopmorteros.coop/public/images_rewards/commerce/651bf30c3d3fb.png",
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
    }, {
        action_finish: "1",
        address: "25 de Mayo 354",
        ammount_new: "0",
        ammount_old: "0",
        category_id: "3",
        commerce_id: "3",
        count: "45",
        cumulative: "1",
        date_finish: "2024-02-02 00:00:00",
        date_start: "2024-01-26 00:00:00",
        detail: "20%",
        detail_type: "1",
        id: "1",
        id_cat: "3",
        img_name: "https://app.coopmorteros.coop/public/images_rewards/commerce/6543cf8b397e3.png",
        pay: "1",
        product: "cualquier prenda (excepto mallas y bikinis)",
        status: "1",
        stok_start: "50",
        type: "1",
        view_create: "0",
        view_user_edit: "1/0",
        withdrawal_cap: "10.000"
    }
    ]

    useEffect(() => {
        pintar(html, 0);
        percentage();
    }, []);


    const [percentageNumber, setPercentageNumber] = useState("0%");
    const [circle, setCircle] = useState();

    const percentage = () => {
        let checked = document.querySelectorAll('.percentageChecks:checked');
        if (checked.length == 1) {
            setPercentageNumber("50%");
            setCircle(style.grandiet50);
        } else if (checked.length == 2) {
            setPercentageNumber("100%");
            setCircle(style.grandiet100);
        }
    }

    var pintar = (html, cat) => {
        if (html.length == 0) {
            setLabelInactive(
                <label className="text-red-400 text-center w-full">
                    <b>No hay Beneficios disponibles</b>
                </label>
            );
        } else {
            var activos;
            let status_active = employeeAccess == 1 ? 1 : statusActive;
            setBeneficios(userCreateManagement !== 8264 ? (
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

                html.map((val) => {
                    if (cat === 0 || cat > 0 && cat == val.category_id) {
                        setdropMode("hidden");
                        return <Benefits key={val.id} val={val} props={{ div: 'inicio' }} />;
                    }
                })

            )
            )
        }
    }

    return (
        <div>
            <img width="100%" src="https://app.coopmorteros.coop/public/images/coopate/Header.png" alt="" />
            <hr />
            <div className="w-full p-10">
                <h4 className='text-pink-400'><b>Activá tus cupones, y disfrutá de muchos descuentos y promociones!</b></h4>
                <div className="w-full flex flex-wrap">
                    <div className="w-1/2 p-0">
                        <h5><b>Acceder a ellos es fácil:</b></h5>
                        <ol className='ml-10'>
                            <li>Aboná todas tus Facturas por Oficina Virtual <b>antes del Primer Vencimiento</b></li>
                        </ol>
                    </div>
                </div>

                <div id="circle" className={`${style.percentage} ${circle}`}>
                    <div className={`${style.inner} bg-gray-200 color-gray-900 dark:bg-gray-900 color-gray-200`}>{percentageNumber}</div>
                    <div className={`${style.info}`}>
                        <h4 className={`text-center`}><b>¡Tus Logros!</b></h4>
                        <label><input disabled className={`percentageChecks m-2`} checked type="checkbox" />Aboné mi factura por Oficina Virtual</label><br />
                        <label><input disabled className={`percentageChecks m-2`} checked type="checkbox" />Aboné mi factura antes del Primer Vencimiento</label>
                    </div>
                </div>

                <div className="w-full flex flex-wrap justify-center">
                    <div onClick={() => dropModehidden()} className={`cursor-pointer mt-10 mb-1 rounded-xl p-3 bg-pink-200 text-pink-400`}>
                        <h5 className='m-0'>Ver Categorías{iconMode}</h5>
                    </div>
                    <div className={`w-full flex flex-wrap justify-center p-7 ${dropMode}`}>
                        <p onClick={() => pintar(html, 0)} className='cursor-pointer w-full text-center'><u>ver todos los Beneficios</u></p>
                        {catergories.map((item, index) => {
                            return <div onClick={() => pintar(html, item.id)} key={index} className='w-full md:w-1/2 lg:w-1/4'>
                                <Card
                                    props={{
                                        phone: "",
                                        subtitle: item.name,
                                        icon: item.icon,
                                        color: "text-gray-600 dark:text-gray-300",
                                        bgIcon: "bg-lime-500 dark:bg-lime-500",
                                        colorIcon: "bg-lime-500 dark:bg-lime-500",
                                        widht: "w-auto",
                                        bg: "bg-white",
                                        positionBtn: "absolute",
                                        text: "text-xl",
                                        shadow: "false"
                                    }}
                                />
                            </div>
                        })
                        }
                    </div>
                    {labelInactive && labelInactive}
                    <div className="w-full flex flex-wrap justify-center md:px-5" id="benefitsContainer">
                        {Beneficios}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default index