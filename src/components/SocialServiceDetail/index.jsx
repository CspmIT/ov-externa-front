import { FaUser } from "react-icons/fa";
import CardCustom from "../CardCustom";

function SocialServiceDetail({ adherentes }) {
    return (
        <>
            <CardCustom className={"p-7 mt-5"}>
                <div className="flex relative w-full">
                    <h3 className="text-center m-0">Adherentes</h3>
                </div>
            </CardCustom>
            <div className="w-full flex flex-row">
                {adherentes?.map((item, index) => {
                    if (!item) {
                        return null;
                    } else {
                        return (
                            <CardCustom key={index} className={`${index > 0 ? "ml-5 " : ""} flex w-1/4 mt-5  h-80 `}>
                                <div onMouseEnter={() => handleHoverEnter(index)} onMouseLeave={() => handleHoverLeave(index)} className="w-full h-full flex-col justify-center items-center flex p-7">
                                    <FaUser fontSize={"4rem"} className="mb-5" />
                                    <h3 className=" text-center font-['Roboto-Condensed']">{item.name}</h3>
                                    {item.category ? <h5 className="font-['Roboto-Condensed']">Categoría: {item.category}</h5> : null}
                                    {item.dni ? <h5 className="font-['Roboto-Condensed']">DNI: {item.dni}</h5> : null}
                                    {item.groupBlood ? <h5 className="font-['Roboto-Condensed']">Grupo Sanguíneo: {item.groupBlood}</h5> : null}
                                    {item.burn ? <h5 className="font-['Roboto-Condensed']">Fecha de Nacimiento: {item.burn}</h5> : null}
                                </div>
                            </CardCustom>
                        );
                    }
                })}
            </div>
        </>
    );
}

export default SocialServiceDetail;
