import { Box, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { CustomTabPanel, a11yProps } from "../PanelTab";
import CardCustom from "../CardCustom";
import { FaCircle } from "react-icons/fa";
import CardServiceDetail from "../CardServiceDetail";

function TabService({ ...props }) {
    const [value, setValue] = useState(0);
    const [serviceActive, setServiceActive] = useState([]);
    const [serviceInactive, setServiceInactive] = useState([]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const classTabs = "w-1/2 !border-solid !border-gray-200 !rounded-t-xl !max-w-full !text-base !text-black !font-bold dark:!text-zinc-200 dark:!border-gray-500";
    const classTabStatus = [["!border-r-2 !border-t-2 !border-l-2 dark:!bg-zinc-600 "], ["!border-b-2 !bg-slate-200 dark:!bg-zinc-800 "]];
    useEffect(() => {
        if (props.service) {
            setServiceActive(props.service.filter((item) => item.status === 1));
            setServiceInactive(props.service.filter((item) => item.status === 0));
        }
    }, [props.service]);
    return (
        <div>
            <Tabs indicatorColor="transparent" value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab className={`${classTabStatus[value]} ${classTabs}`} label="ACTIVOS" {...a11yProps(0)} />
                <Tab className={`${classTabStatus[value === 0 ? 1 : 0]} ${classTabs}`} label="INACTIVOS" {...a11yProps(1)} />
            </Tabs>
            <div className={`border-2 border-t-0 rounded-b-2xl border-zinc-200 dark:!border-gray-500 dark:!bg-zinc-600`}>
                <CustomTabPanel className={"w-full flex p-2 flex-wrap justify-evenly"} value={value} index={0}>
                    {serviceActive.length ? (
                        serviceActive.map((item, index) => (
                            <div key={index} className="mb-4 p-2 w-1/4">
                                <CardServiceDetail key={index} serviceItem={item} />
                            </div>
                        ))
                    ) : (
                        <p>Sin Servicios Activos</p>
                    )}
                </CustomTabPanel>
                <CustomTabPanel className={"w-full flex p-2 flex-wrap justify-evenly"} value={value} index={1}>
                    {serviceInactive.length ? (
                        serviceInactive.map((item, index) => (
                            <div key={index} className="p-2 w-1/4">
                                <CardServiceDetail key={index} serviceItem={item} />
                            </div>
                        ))
                    ) : (
                        <p>Sin Servicios Inactivos</p>
                    )}
                </CustomTabPanel>
            </div>
        </div>
    );
}

export default TabService;
