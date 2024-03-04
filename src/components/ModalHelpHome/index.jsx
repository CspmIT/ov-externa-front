import { Close, FindInPage } from "@mui/icons-material";
import CardCustom from "../CardCustom";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState } from "react";
import { FaCircle } from "react-icons/fa";
import Button from "../Button";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

function ModalHelpHome({ handleCloseModal }) {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <CardCustom className={" w-1/3 rounded-xl  bg-white shadow-lg"}>
            <div className="rounded-xl ">
                <div className="relative rounded-t-xl bg-slate-200 p-5 ">
                    <h3 className="text-gray-900 m-0 font-bold text-center font-sans" id="exampleModalLabel">
                        Ayuda
                    </h3>
                    <div className="absolute  right-5 top-5">
                        <Close onClick={handleCloseModal} className="text-gray-500 hover:text-gray-800 hover:cursor-pointer" />
                    </div>
                </div>
                <div className="p-5 ">
                    <h5 className="font-sans font-semibold">Datos de la Tabla</h5>
                    <p>A continuación verás algunas referencias con respecto a los datos que se muestran en la tabla de Facturas Impagas.</p>
                    <Box sx={{ width: "100%",  }}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Tipos" {...a11yProps(0)} />
                                <Tab label="Facturas" {...a11yProps(1)} />
                                <Tab label="Estados" {...a11yProps(2)} />
                                <Tab label="Acciones" {...a11yProps(3)} />
                            </Tabs>
                        </Box>
                        <Box sx={{ border: 2, borderTop: 0, borderRadius: "0px 0px 10px 10px" , borderColor: "divider" }}>

                        <CustomTabPanel value={value} index={0}>
                            <ul className="pt-3">
                                <li>
                                    <span className="pr-3">
                                        <b>AG</b> - Agua Potable
                                    </span>
                                </li>
                                <li>
                                    <span className="pr-3">
                                        <b>EN / EG</b> - Energía Eléctrica
                                    </span>
                                </li>
                                <li>
                                    <span className="pr-3">
                                        <b>GC</b> - Grandes Consumos
                                    </span>
                                </li>
                                <li>
                                    <span className="pr-3">
                                        <b>SS</b> - Servicios Sociales
                                    </span>
                                </li>
                                <li>
                                    <span className="pr-3">
                                        <b>TE</b> - Telefonía
                                    </span>
                                </li>
                            </ul>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <ul className="pt-3">
                                <li>
                                    <span className="pr-3">
                                        <b>FA</b> - Factura "A"
                                    </span>
                                </li>
                                <li>
                                    <span className="pr-3">
                                        <b>FB</b> - Factura "B"
                                    </span>
                                </li>

                                <li>
                                    <span className="pr-3">
                                        <b>SPA</b> - Liquidación de Servicio "A"
                                    </span>
                                </li>
                                <li>
                                    <span className="pr-3">
                                        <b>SPB</b> - Liquidación de Servicio "B"
                                    </span>
                                </li>
                            </ul>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={2}>
                            <span className="flex mr-3">
                                <FaCircle className="text-green-500 mr-2" /> Servicio Activo
                            </span>
                            <span className="flex mr-3">
                                <FaCircle className="text-yellow-500 mr-2" /> Servicio Pendiente de Conexión
                            </span>
                            <span className="flex mr-3">
                                <FaCircle className="text-red-500 mr-2" /> Servicio Inactivo
                            </span>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={3}>
                            <Button props={{ class: "bg-blue-500 rounded text-center py-0.7 px-1.5 text-white mr-4" }}>
                                <FindInPage />
                            </Button>
                            Botón para Ver tu Factura
                        </CustomTabPanel>
                        </Box>
                    </Box>
                </div>
            </div>
        </CardCustom>
    );
}

export default ModalHelpHome;
