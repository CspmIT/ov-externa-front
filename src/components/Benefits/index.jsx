import {useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import swals from '../../routes/swals';
import style from '../../views/Coopate/Coopate.module.css'
import Card from '../Card';
import { useState, useEffect } from "react";
import QRCodeStyling from 'qr-code-styling';

const index = ({ val, props }) => {
    const getTitle = (val) => {
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
            const productosConsecuentes = val.product.split("//");
            const product1 = (productosConsecuentes[0] || '').trim();
            const product2 = (productosConsecuentes[1] || '').trim();

            console.log(product1);
            console.log(product2)

            product = "Con tu compra de " + product1;
            product += " te llevas sin costo " + product2;
            title_preview = product;
            return title_preview;
        }
        return title_preview;
    };

    const getSubTitle = (val) => {
        var subtitle = "";
        var ammountOld = "";

        if (val.type == 1) {
            subtitle = val.withdrawal_cap == "" || val.withdrawal_cap == "0" ? "" : 'Tope de Descuento: $' + val.withdrawal_cap;
            return subtitle;
        }

        if (val.type == 2) {
            subtitle = val.detail_type == 2 ? "Se va a tomar el precio del producto o servicio de mayor valor" : "";
            return subtitle;
        }

        if (val.type == 3) {
            if (val.ammount_old !== "") {
                ammountOld = <p className={`${style.tachado} m-0`}>${val.ammount_old}</p>;
            }
            subtitle = "$" + val.ammount_new;
            return subtitle;
        }
        return subtitle;
    };

    const getOldAmount = (val) => {
        var ammountOld = "";
        if (val.type == 3 && val.ammount_old !== "") {
            ammountOld = <p className={`${style.tachado} m-0 p-2`}>{val.ammount_old}</p>;
            return ammountOld;
        }
        return ammountOld;
    };

    const getMetPago = (val) => {
        var metPago = "";
        var pago = val.pay == 1 ? "Efectivo" : val.pay == 2 ? "Crédito" : val.pay == 3 ? "Débito" : val.pay == 4 ? "Todos" : val.pay == 5 ? "Tarjetas Locales" : val.pay == 6 ? "Efectivo o Tarjetas Locales" : "";
        if (pago != "") {
            metPago = pago;
            return metPago;
        }
        return metPago;
    };

    const getCummulative = (val) => {
        var cummulative = "";
        if (val.cumulative == 2) {
            cummulative = <p className={textInfo}>Acumulable con otras promos vigentes</p>;
        } else {
            cummulative = <p className={textInfo}>No acumulable con otras promos vigentes</p>;
        }
        return cummulative;
    };

    const codeQR = (qr) => {
        const qrImage = `https://app.coopmorteros.coop/public/qr_Image/${qr}.png`;
        const htmlContent = `<div class='flex justify-center'><img class='w-1/2' src='${qrImage}' /></div>`;

        swals({
            title: `Su código es: ${qr}`,
            html: htmlContent,
        });
    }
    
    const navigate  = useNavigate();

    const activeBenefit = (id) => {
        const aleatorio = generarCadenaAlfanumericaAleatoria(5);
        descargarQR(aleatorio);

        setTimeout(() => {
            swals({
                icon: 'success',
                title: `Felicitaciones!`,
                html: `<p>Tu cupón a sido activado con éxito. <br /> 
                Para canjearlo debes presentarte en el comercio con el QR o con el codigo. <br /> 
                El mismo lo podes ver en:
                <b>Coopate/Mis Canjes.</b> <br /> 
                Recuerda que tienes una semana para canjearlo</p>`,
                confirm: 'Ir a mis canjes',
                actionConfirm: () => navigate('/Coopate/Canjes')
            })
        }, 300);
    }

    const generarCadenaAlfanumericaAleatoria = (longitud) => {
        const bytes = new Uint8Array(longitud);
        window.crypto.getRandomValues(bytes);
        const cadena = btoa(String.fromCharCode.apply(null, bytes));
        return cadena.replace(/[/+=]/g, '').substring(0, longitud);
    };

    const descargarQR = async (code) => {
        const qrCode = new QRCodeStyling({
            width: 200,
            height: 200,
            data: code,
            imageOptions: {
                hideBackgroundDots: true,
            },
        });

        await qrCode.download({
            name: `codigoQR_${code}`,
            extension: 'png',
        });
    };

    const [btn, setBtn] = useState('');
    const [textInfo, setTextInfo] = useState('');
    const [info, setInfo] = useState('');

    const margen = val.type === 3 ? "ml-3" : "";
    const titlePreview = getTitle(val);
    const subtitle = getSubTitle(val);
    const ammountOld = getOldAmount(val);
    const metPago = getMetPago(val);
    const cummulativeText = getCummulative(val);

    useEffect(() => {
        if (props.div === 'inicio') {
            const dateFinishPreview = val.date_finish;
            const hs = dateFinishPreview.split(" ");
            let info = hs[0].split("-").reverse().join("/")
            setInfo(info);
            setBtn(
                <div onClick={() => swals({
                    icon: 'warning',
                    title: `Atención!`,
                    html: '¿Deseas activar este beneficio? Recuerda que tienes una semana para poder canjearlo! ',
                    confirm: 'Activar',
                    cancel: 'Cancelar',
                    actionConfirm: () => activeBenefit(val.id),
                })}>
                    <Button
                        props={{
                            class: 'text-black botonPrincipal m-2 mt-7 text-sm w-full',
                            text: `ACTIVALO AHORA`,
                        }}
                    />
                </div>
            );
        } else if (props.div === 'activo') {
            var fechaInicial = new Date(val.bs_date_create);
            var fechaObjeto = new Date(fechaInicial);
            fechaObjeto.setDate(fechaObjeto.getDate() + 7);
            var dia = fechaObjeto.getDate().toString().padStart(2, "0");
            var mes = (fechaObjeto.getMonth() + 1).toString().padStart(2, "0");
            var anio = fechaObjeto.getFullYear().toString();
            var fechaFinal = dia + "/" + mes + "/" + anio;
            let info = fechaFinal;
            setInfo(info);

            setBtn(
                <div onClick={() => codeQR(val.bs_qr_code)}>
                    <Button
                        props={{
                            class: 'text-black botonPrincipal m-2 mt-7 text-sm w-full',
                            text: `Ver Código QR`,
                        }}
                    />
                </div>
            );
        } else if (props.div === 'historico') {
            var dateFinishPreview = val.bs_date_create;
            var hs = dateFinishPreview.split(" ");
            setInfo(hs[0].split("-").reverse().join("/"));

            var redemptionDate = val.date_redemption;
            if (val.date_redemption != null) {
                var hs = redemptionDate.split(" ");
                var redemption = hs[0].split("-").reverse().join("/");
            }
            setBtn(val.date_redemption != null ? <p className='text-green-500 pt-4'>Canjeado el: {redemption}</p> : <p className='text-red-500 pt-4'> El beneficio fue activado pero no se reclamo</p>);
            setTextInfo('hidden');
        }
    }, [props.div]);


    const titlePago = props.div == 'inicio' ? 'Vigente hasta:' : props.div == 'activo' ? 'Usar antes del: ' : props.div == 'historico' ? 'Activado el: ' : '';

    return (
        <div className={`${props.widht ? props.widht : 'w-1/3'}  p-4`}>
            <Card
                key={val.id}
                props={{
                    phone: "",
                    subtitle: (
                        <div className="w-full text-center">
                            <div className={`w-full flex items-center justify-center ${style.ContenedorImg}`}>
                                <img src={val.img_name} alt="img" className={`${style.imgBenefit} mb-3`} />
                            </div>
                            <p className="w-full px-4 py-2 mt-2">
                                {val.address}
                            </p>
                            <hr className="my-1" />
                            <h5 className="uppercase text-orange-700 dark:text-orange-400">{titlePreview}</h5>
                            <div className={`flex flex-wrap justify-center ${textInfo}`}>
                                {ammountOld}
                                <p className={`m-0 p-2 ${margen}`}>{subtitle}</p>
                            </div>
                            <div className={`my-3 text-center ${textInfo}`}>
                                <p className="m-0">
                                    {metPago !== "" && (
                                        <>
                                            <span className="text-purple-700 dark:text-purple-400">Método de Pago: </span>
                                            {metPago}
                                        </>
                                    )}
                                </p>
                                <p className="m-0">
                                    <span className="text-purple-700 dark:text-purple-400">{titlePago}</span>
                                    {info}
                                </p>
                            </div>
                            {btn}
                            <label className={`mt-2 ${textInfo}`}>*Válido para una compra o servicio.</label>
                            {cummulativeText}
                        </div>
                    ),
                    widht: "w-full h-full",
                    bg: "bg-white",
                    positionBtn: "absolute"
                }}
            />
        </div>
    );
};

export default index