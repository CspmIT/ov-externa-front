import React, { useState } from "react";
import CardCustom from "../CardCustom";
import { Close } from "@mui/icons-material";
import { Box, Input, Tab, Tabs } from "@mui/material";
import { CustomTabPanel, a11yProps } from "../PanelTab";
import Button from "../Button";
import { storage } from "../../storage/storage";
import TableCustomer from "../TableCustomer";

const ModalSocio = ({ handleCloseModal }) => {
  const accounts = storage.get("usuario").accounts;
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log(accounts);
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
          <p className="dark:text-white">En esta tabla podrás ver todos los Socios que agregaste para administrar la Oficina Virtual.</p>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Ver socios" {...a11yProps(0)} />
                <Tab label="Agregar socio" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <Box sx={{ padding: 2, border: 2, borderTop: 0, borderRadius: "0px 0px 10px 10px", borderColor: "divider" }}>
              <CustomTabPanel className={"flex flex-col"} value={value} index={0}>
                  <TableCustomer data={accounts} />
              </CustomTabPanel>
              <CustomTabPanel className={"flex flex-col"} value={value} index={1}>
                <div className="w-full">
                  <Input className="w-3/4 dark:text-white" placeholder="Ingrese un número de socio"></Input>
                  <Button onclick={() => handleAddCustomer()} props={{ class: "bg-green-500" }}>Agregar</Button>
                </div>
              </CustomTabPanel>
            </Box>
          </Box>
        </div>
      </div>
    </CardCustom>
  );
};

export default ModalSocio;
