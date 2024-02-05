import React, { useEffect } from 'react'
import Benefits from '../../components/Benefits';
import { useState } from "react";
import style from './Coopate.module.css'
import PieChart from '../../components/PieChart';
import 'chart.js/auto';

const myExchanges = () => {
  const html = [{
    bs_id: '34',
    bs_qr_code: 'WDepb',
    bs_date_create: '2023-09-27 00:00:00',
    bs_status: '1',
    date_redemption: "2024-01-13 00:00:00",
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
    stok_start: "50",
    type: "1",
    view_create: "0",
    view_user_edit: "1/0",
    withdrawal_cap: "10.000"
  }, {
    bs_id: '34',
    bs_qr_code: 'WDepb',
    bs_date_create: '2023-09-27 00:00:00',
    bs_status: '2',
    date_redemption: null,
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
    stok_start: "50",
    type: "2",
    view_create: "0",
    view_user_edit: "0/3",
    withdrawal_cap: ""
  }, {
    bs_id: '34',
    bs_qr_code: 'WDepb',
    bs_date_create: '2023-09-27 00:00:00',
    bs_status: '2',
    date_redemption: null,
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
    status: "3",
    stok_start: "10",
    type: "3",
    view_create: "0",
    view_user_edit: "0/40",
    withdrawal_cap: ""
  }, {
    bs_id: '34',
    bs_qr_code: 'WDepb',
    bs_date_create: '2023-09-27 00:00:00',
    bs_status: '1',
    date_redemption: '2024-01-10 00:00:00',
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
    status: "2",
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
    bs_date_create: '2024-01-31 00:00:00',
    bs_id: '34',
    bs_qr_code: 'WDepb',
    bs_status: '0',
    c_id: "10",
    category_id: "3",
    commerce_id: "3",
    count: "45",
    cumulative: "1",
    date_finish: "2024-02-02 00:00:00",
    date_start: "2024-01-26 00:00:00",
    date_redemption: null,
    detail: "20%",
    detail_type: "1",
    id: "4",
    img_name: "https://app.coopmorteros.coop/public/images_rewards/commerce/6543cf8b397e3.png",
    pay: "1",
    product: "cualquier prenda (excepto mallas y bikinis)",
    status: "3",
    stok_start: "50",
    type: "1",
    view_create: "0",
    view_user_edit: "1/0",
    withdrawal_cap: "10.000"
  }
  ]

  useEffect(() => {
    pintar(html, 0);
  }, []);

  const [labelInactive, setLabelInactive] = useState('');
  const [BeneficiosA, setBeneficiosA] = useState([]);
  const [BeneficiosH, setBeneficiosH] = useState([]);
  const [countA, setcountA] = useState(0);
  const [countB, setcountB] = useState(0);

  var pintar = function (html, cat) {
    if (html.length == 0) {
      setLabelInactive(
        <label className="text-red-400 text-center w-full">
          <b>No hay Beneficios disponibles</b>
        </label>
      );
    } else {
      setBeneficiosA(
        html.map((val) => {
          if (val.bs_status == 0) {
            setcountA(countA + 1);
            return <Benefits key={val.id} val={val} props={{ div: 'activo' }} />;
          }
        })
      )

      setBeneficiosH(
        html.map((val) => {
          if (val.bs_status == 1 || val.bs_status == 2) {
            setcountB(countB + 1);
            return <Benefits key={val.id} val={val} props={{ div: 'historico', widht: 'w-full' }} />;
          }
        })
      )
    }
  }

  const data = [3, 5, 2];
  const labels = ['Bebidas', 'Indumentaria', 'Hogar'];
  const colorPalette = ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#9C27B0', '#FF9800', '#2196F3'];

  return (
    <div className="p-2 sm:pl-64 pt-20">
      <h2 className="m-5 text-center">Mis Canjes</h2>
      <hr />
      <div className="w-full p-10">
        <h4 className='text-center m-7'>ACTIVOS</h4>
        {labelInactive && labelInactive}
        <div className="w-full flex flex-wrap justify-center md:px-5" id="benefitsContainer">
          {countA > 0 ? BeneficiosA : <p>No cuentas con beneficios activados</p>}
        </div>
        <h4 className='text-center m-7'>HISTORICOS</h4>
        <ul className={`${style.cards}`}>
          {countB > 0 ? BeneficiosH : <p>Despues de canjear su primer beneficio podra ver un historial</p>}
        </ul>
        <h4 className='text-center m-7'>MI PERFIL DE CANJES</h4>
        <div className="w-full flex justify-center md:px-5">
          <div>
            <PieChart data={data} colorPalette={colorPalette} labels={labels} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default myExchanges