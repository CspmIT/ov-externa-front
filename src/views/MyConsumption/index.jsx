import { useEffect, useState } from "react";
import { request } from "../../utils/request";
import BarChar from "../../components/BarChart";
import CardCustom from "../../components/CardCustom";
import LoaderComponent from "../../components/Loader";
import { Tab, Tabs } from "@mui/material";
import { CustomTabPanel, a11yProps } from "../../components/PanelTab";
import { statusDifService } from "../../utils/services";
import { obtenerNombreDelMes } from "../../utils/dateFunction";

const MyConsumption = () => {
  const [rows, setRows] = useState("");
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(0);
  const [difConsumoWater, setDifConsumoWater] = useState(0);
  const [difConsumoElectric, setDifConsumoElectric] = useState(0);
  const [statusWater, setStatusWater] = useState({});
  const [mesInvoice, setMesInvoice] = useState([]);
  const [statusElectric, setStatusElectric] = useState({});
  const classTabs = "w-1/2 !border-solid !border-gray-200 !rounded-t-xl !max-w-full !text-base !text-black !font-bold dark:!text-zinc-200 dark:!border-gray-500";
  const classTabStatus = [["!border-r-2 !bg-white !border-t-2 !border-l-2 dark:!bg-zinc-600 "], ["!border-b-2 !bg-slate-200 dark:!bg-zinc-800 "]];
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const searchData = async () => {
      const socio = "58500";
      const url = `http://cooptech.com.ar:30888/api/getConsumo?id_procoop=${socio}`;
      try {
        const responseData = await request(url, "get");
        setDifConsumoWater(responseData.water.info.difConsumo);
        setDifConsumoElectric(responseData.electric.info.difConsumo);
        setStatusWater(statusDifService(responseData.water.info.difConsumo));
        setStatusElectric(statusDifService(responseData.electric.info.difConsumo));
        const nameMonth = obtenerNombreDelMes(responseData.electric.label.slice(-1)[0].split("/")[0]);
        setMesInvoice(nameMonth);
        setRows(responseData);
      } catch (error) {
        console.error("Error en la solicitud:", error);
      } finally {
        setLoading(false);
      }
    };
    searchData();
  }, []);

  return (
    <div>
      <div className={`w-auto rounded-xl px-7`}>
        <h2 className="text-center m-5">Mis Consumos</h2>
        <hr className="mb-5" />
        {loading ? (
          <LoaderComponent />
        ) : (
          <div>
            <Tabs indicatorColor="transparent" value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab className={`${classTabStatus[value]} ${classTabs}`} label="Agua Potable" {...a11yProps(0)} />
              <Tab className={`${classTabStatus[value === 0 ? 1 : 0]} ${classTabs}`} label="Energía Eléctrica" {...a11yProps(1)} />
            </Tabs>
            <div className={`border-2 border-t-0 p-5 rounded-b-2xl bg-white border-gray-200 dark:!border-gray-500 dark:!bg-zinc-600`}>
              <CustomTabPanel className={"w-full flex flex-wrap justify-evenly"} value={value} index={0}>
                <div className={`flex max-sm:flex-col mt-2 mb-3 rounded-xl p-5 bg-gray-300 dark:bg-zinc-800`}>
                  <p className="m-0 text-lg space-x-6">
                    <b>Cuenta Nº:</b>
                    {rows.water.info.account}
                  </p>
                  <p className="m-0 ml-3 max-sm:ml-0 text-lg space-x-6">
                    <b>Domicilio:</b> {rows.water.info.addresse}
                  </p>
                  <p className="m-0 ml-3 max-sm:ml-0 text-lg space-x-6">
                    <b>Medidor:</b> {rows.water.info.NumMedidor}
                  </p>
                </div>
                <CardCustom className={`relative p-5 mb-5 rounded-xl flex flex-col items-center ${statusWater.bgColorClass} ${statusWater.borderColorClass} border-solid border-2 `}>
                  <label className={`text-xl font-bold ${statusWater.textTitleColor}`}>{statusWater.attentionText}</label>
                  <p className={`${statusWater.textClass}`}>
                    En {mesInvoice} de 2024 consumiste {difConsumoWater === 0 ? "" : `${parseFloat(difConsumoWater < 0 ? difConsumoWater * -1 : difConsumoWater).toFixed(2)} m3`}{" "}
                    <b className={`${statusWater.textTitleColor}`}>{statusWater.comparacionText}</b> que en {mesInvoice} de 2023.
                  </p>
                </CardCustom>
                <div className="w-full h-full">
                  <BarChar key={2} title={"Consumo de Agua Potable por mes"} nameSeria={"m³"} data={rows.water} />
                </div>
              </CustomTabPanel>

              <CustomTabPanel className={"w-full flex flex-wrap justify-evenly"} value={value} index={1}>
                <div className={`flex max-sm:flex-col mt-2 mb-3 rounded-xl p-5 bg-gray-300 dark:bg-zinc-800`}>
                  <p className="m-0 text-lg space-x-6">
                    <b>Cuenta Nº:</b>
                    {rows.electric.info.account}
                  </p>
                  <p className="m-0 ml-3 max-sm:ml-0 text-lg space-x-6">
                    <b>Domicilio:</b> {rows.electric.info.addresse}
                  </p>
                  <p className="m-0 ml-3 max-sm:ml-0 text-lg space-x-6">
                    <b>Medidor:</b> {rows.electric.info.NumMedidor}
                  </p>
                </div>
                <CardCustom className={`relative p-5 mb-5 rounded-xl flex flex-col items-center ${statusElectric.bgColorClass} ${statusElectric.borderColorClass} border-solid border-2 `}>
                  <label className={`text-xl font-bold ${statusElectric.textTitleColor}`}>{statusElectric.attentionText}</label>
                  <p className={`${statusElectric.textClass}`}>
                    En {mesInvoice} de 2024 consumiste {difConsumoElectric === 0 ? "" : `${parseFloat(difConsumoElectric < 0 ? difConsumoElectric * -1 : difConsumoElectric).toFixed(2)} kW/h`}{" "}
                    <b className={`${statusElectric.textTitleColor}`}>{statusElectric.comparacionText}</b> que en {mesInvoice} de 2023.
                  </p>
                </CardCustom>
                <div className="w-full h-full">
                  <BarChar key={2} title={"Consumo de Energía Eléctrica por mes"} nameSeria={"kW/h"} data={rows.electric} />
                </div>
              </CustomTabPanel>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyConsumption;
