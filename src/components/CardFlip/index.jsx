import { useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";
function CardFlip({ children, action, className }) {
    const [isFlipped, setIsFlipped] = useState(action);
    useEffect(() => {
        setIsFlipped(!isFlipped);
    }, [action])
    return (
        <ReactCardFlip  isFlipped={isFlipped} flipDirection="horizontal" containerClassName={`${className ? className : ""}`}>
            {children}
        </ReactCardFlip>
    );
}

export default CardFlip;


//EJEMPLO DE COMO DEBERIA CONSULTARSE LA CARD Y COMO GESTIONAR LAS FUNCIONES 

// const [flippedCards, setFlippedCards] = useState({});
// const handleHoverEnter = (index) => {
//     setFlippedCards((prevState) => ({
//         ...prevState,
//         [index]: true
//     }));
// };

// const handleHoverLeave = (index) => {
//     setFlippedCards((prevState) => ({
//         ...prevState,
//         [index]: false
//     }));
// };

// <CardFlip key={index} className={`${index > 0 ? "ml-5 " : ""} flex w-1/4 mt-5  h-80 `} action={flippedCards[index]}>
//     {/* DETALLE DE LA CARD UNA VEZ GIRADA */}
//     <CardCustom className={"h-full w-full "}>
//         <div onMouseEnter={() => handleHoverEnter(index)} onMouseLeave={() => handleHoverLeave(index)} className="w-full h-full flex-col justify-center items-center flex p-7">
//             <FaUser fontSize={"4rem"} className="mb-5" />
//             <h3 className="font-['Roboto-Condensed']">{item.name}</h3>
//             {item.category ? <h5 className="font-['Roboto-Condensed']">Categoría: {item.category}</h5> : null}
//             {item.dni ? <h5 className="font-['Roboto-Condensed']">DNI: {item.dni}</h5> : null}
//             {item.groupBlood ? <h5 className="font-['Roboto-Condensed']">Grupo Sanguíneo: {item.groupBlood}</h5> : null}
//             {item.burn ? <h5 className="font-['Roboto-Condensed']">Fecha de Nacimiento: {item.burn}</h5> : null}
//         </div>
//     </CardCustom>
//     {/* VISTA PRINCIPAL  */}
//     <CardCustom className={"h-full w-full"}>
//         <div onMouseEnter={() => handleHoverEnter(index)} onMouseLeave={() => handleHoverLeave(index)} className="w-full h-full flex-col justify-center items-center flex p-7">
//             <FaUser fontSize={"4rem"} className="mb-5" />
//             <h3 className="font-['Roboto-Condensed']">{item.name}</h3>
//         </div>
//     </CardCustom>
// </CardFlip>