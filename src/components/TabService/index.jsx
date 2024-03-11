import { Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { CustomTabPanel, a11yProps } from "../PanelTab";
import CardServiceDetail from "../CardServiceDetail";

function TabService({ ...props }) {
    const [value, setValue] = useState(0);
    const [serviceActive, setServiceActive] = useState([]);
    const [serviceInactive, setServiceInactive] = useState([]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const classTabs = "w-1/2 !border-solid !border-gray-200 !rounded-t-xl !max-w-full !text-base !text-black !font-bold dark:!text-zinc-200 dark:!border-gray-700";
    const classTabStatus = [["!border-r-2 !bg-white !border-t-2 !border-l-2 dark:!bg-zinc-800 "], ["!border-b-2 !bg-gray-200 dark:!bg-zinc-900 "]];
    useEffect(() => {
        if (props.service) {
            setServiceActive(props.service.filter((item) => item.status === 1));
            setServiceInactive(props.service.filter((item) => item.status === 0));
        }
    }, [props.service]);
    return (
        <>
            <Tabs indicatorColor="transparent" value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab className={`${classTabStatus[value]} ${classTabs}`} label="ACTIVOS" {...a11yProps(0)} />
                <Tab className={`${classTabStatus[value === 0 ? 1 : 0]} ${classTabs}`} label="INACTIVOS" {...a11yProps(1)} />
            </Tabs>
            <div className={`bg-white border-2 border-t-0 rounded-b-2xl border-zinc-200 dark:!border-gray-700 dark:!bg-zinc-800`}>
                <CustomTabPanel className={"w-full flex max-sm:flex-col p-2 flex-wrap justify-evenly"} value={value} index={0}>
                    {serviceActive.length ? (
                        serviceActive.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => {
                                    if (props.action) props.action(item.numService, item.account, item.service);
                                }}
                                className={`${props.action ? "cursor-pointer" : ""} mb-4 p-2 w-1/4 max-sm:w-full`}
                            >
                                <CardServiceDetail detailService={props.detailService} className={props.action ? "transition ease-in hover:scale-105 duration-400 " : null} key={index} serviceItem={item} />
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
                                <CardServiceDetail detailService={props.detailService} key={index} serviceItem={item} />
                            </div>
                        ))
                    ) : (
                        <p>Sin Servicios Inactivos</p>
                    )}
                </CustomTabPanel>
            </div>
        </>
    );
}

export default TabService;
