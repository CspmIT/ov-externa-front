import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import ServiceDetails from '../components/ServiceDetails';
import ServiceList from '../components/ServiceList';
import { services } from '../utils/object';
import { Button } from '@mui/material';

const ManageServices = () => {
    const [currentView, setCurrentView] = useState('main');
    const [typeService, setType] = useState('');

    const switchView = (view, type) => {
        setCurrentView(view);
        setType(type);
    };

    return (
        <div className='text-center'>
            {currentView === 'main' && (
                <div>
                    <h2 className="m-5">Administrar Servicios</h2>
                    <hr />
                    <div className={`flex flex-wrap justify-center mt-10 mb-10`}>
                        {Object.keys(services).map((type) => (
                            <ServiceCard key={type} type={type} services={services} onClick={() => switchView('service', type)} />
                        ))}
                    </div>
                    <Link to={'/Information'}>
                        <Button className='AeromaticsRegular botonPrincipal rounded-xl' variant="contained"><b>Ver Tutoriales Nivel 3</b></Button>
                    </Link>
                </div>
            )}
            {currentView === 'service' && (
                <ServiceList type={typeService} onBack={() => setCurrentView('main')} onClick={() => switchView('details', typeService)} />
            )}
            {currentView === 'details' && (
                <ServiceDetails typeService={typeService} onBack={() => setCurrentView('service')} />
            )}
        </div>
    );
};

export default ManageServices;