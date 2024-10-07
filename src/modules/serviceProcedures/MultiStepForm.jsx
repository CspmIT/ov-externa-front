import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PersonalData from './views/PersonalData';
import RegFormProvider from './providers/RegFormProvider';
import HeaderForm from './components/HeaderForm';
import SelectServices from './views/SelectServices';
import ElectricPowerForm from './views/ElectricPowerForm';
import DrinkingWaterForm from './views/DrinkingWaterForm';
import TelecommunicationsForm from './views/TelecommunicationsForm';
import { Paper } from '@mui/material';
import { MdElectricBolt, MdWaterDrop } from 'react-icons/md';
import { BsFillRouterFill } from 'react-icons/bs';
import { FaHandsHelping } from 'react-icons/fa';
import SocialService from './views/SocialService';
const services = [
    {
        nombre: 'Energia Electrica',
        tipo: 1,
        color: '#00953e',
        text: 'text-[#00953e]',
        unselect: 'text-[#a7a7a7]',
        bgColor: '!bg-[#00953e]/[0.5]',
        icon: <MdElectricBolt />,
    },
    {
        nombre: 'Agua Potable',
        tipo: 2,
        color: '#007dbb',
        text: 'text-[#007dbb]',
        unselect: 'text-[#a7a7a7]',
        bgColor: '!bg-[#007dbb]/[0.5]',
        icon: <MdWaterDrop />,
    },
    {
        nombre: 'Telecomunicaciones',
        tipo: 3,
        color: '#14407f',
        text: 'text-[#14407f]',
        unselect: 'text-[#a7a7a7]',
        bgColor: '!bg-[#14407f]/[0.5]',
        icon: <BsFillRouterFill />,
    },
    {
        nombre: 'Servicios Sociales',
        tipo: 4,
        color: '#ed6c23',
        text: 'text-[#ed6c23]',
        unselect: 'text-[#a7a7a7]',
        bgColor: '!bg-[#ed6c23]/[0.5]',
        icon: <FaHandsHelping />,
    },
];

const MultiStepForm = () => {
    const { step } = useParams(['step']);
    const [renderStep, setRenderStep] = useState(renderView(step));
    useEffect(() => {
        setRenderStep(renderView(step));
    }, [step]);
    function renderView(step) {
        switch (step) {
            case 'select-service':
                return <SelectServices services={services} />;
            case 'Datos Personales':
                return <PersonalData />;
            case 'Energia Electrica':
                return <ElectricPowerForm />;
            case 'Agua Potable':
                return <DrinkingWaterForm />;
            case 'Telecomunicaciones':
                return <TelecommunicationsForm />;
            case 'Servicios Sociales':
                return <SocialService />;
            default:
                return <SelectServices services={services} />;
        }
    }
    return (
        <RegFormProvider>
            <div className="p-4">
                <Paper
                    elevation={step !== 'select-service' ? 0 : 3}
                    className={`p-8 mb-4`}
                >
                    <HeaderForm />
                    {renderStep}
                </Paper>
            </div>
        </RegFormProvider>
    );
};

export default MultiStepForm;
