import React, { useState } from "react";
import CardCustom from "../CardCustom";
import { Close } from "@mui/icons-material";
import { Box, Tab, Tabs } from "@mui/material";
import { CustomTabPanel, a11yProps } from "../PanelTab";

const ModalSocio = ({ handleCloseModal }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <CardCustom className={" w-1/3 rounded-xl bg-white shadow-lg"}>
      <div className="rounded-xl ">
        <div className="relative rounded-t-xl bg-slate-200 p-5 ">
          <h3 className="text-gray-900 m-0 font-bold text-center font-sans" id="exampleModalLabel">
            Administrar socios
          </h3>
          <div className="absolute  right-5 top-5">
            <Close onClick={handleCloseModal} className="text-gray-500 hover:text-gray-800 hover:cursor-pointer" />
          </div>
        </div>
        <div className="p-5 ">
          <h5 className="font-sans font-semibold">Datos de la Tabla</h5>
          <p>A continuación verás algunas referencias con respecto a los datos que se muestran en la tabla de Facturas Impagas.</p>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Ver socios" {...a11yProps(0)} />
                <Tab label="Agregar socio" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <Box sx={{ padding: 2, border: 2, borderTop: 0, borderRadius: "0px 0px 10px 10px", borderColor: "divider" }}>
              <CustomTabPanel className={"flex flex-col"} value={value} index={0}>
                <p className="pr-3 mb-1">
                  <b>AG</b> - Agua Potable
                </p>
                <p className="pr-3 mb-1">
                  <b>EN / EG</b> - Energía Eléctrica
                </p>
                <p className="pr-3 mb-1">
                  <b>GC</b> - Grandes Consumos
                </p>
                <p className="pr-3 mb-1">
                  <b>SS</b> - Servicios Sociales
                </p>
                <p className="pr-3 mb-1">
                  <b>TE</b> - Telefonía
                </p>
              </CustomTabPanel>
              <CustomTabPanel className={"flex flex-col"} value={value} index={1}>
                <p className="pr-3 mb-1">
                  <b>FA</b> - Factura &quot;A&quot;
                </p>
                <p className="pr-3 mb-1">
                  <b>FB</b> - Factura &quot;B&quot;
                </p>
                <p className="pr-3 mb-1">
                  <b>SPA</b> - Liquidación de Servicio &quot;A&quot;
                </p>
                <p className="pr-3 mb-1">
                  <b>SPB</b> - Liquidación de Servicio &quot;B&quot;
                </p>
              </CustomTabPanel>
            </Box>
          </Box>
        </div>
      </div>
    </CardCustom>
  );
};

export default ModalSocio;
