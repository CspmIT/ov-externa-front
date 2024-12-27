import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import Login from './modules/auth/views/Login';
import Home from './views/Home';
import Register from './modules/auth/views/Register';
import Information from './views/Information';
import Invoice from './views/Invoice';
import Payments from './views/Payments';
import Handle from './views/Handle';
import MyServices from './views/MyServices';
import MyServicesD from './views/MyServices/detail';
import LevelDos from './modules/LevelUp/leveldos';
import Authentication from './views/LevelUp/authenticationPhotoSID';
import MyConsumption from './views/MyConsumption';
import Footer from './components/Footer';
import GetIp from './views/getIp';
import BaseInitial from './views/BaseInitial';
import RestorePassword from './modules/auth/views/RestorePassword';
import ChangePassword from './modules/auth/views/ChangePassword';
import Opinion from './views/Opinion';
import SelectServicesView from './modules/serviceProcedures/views/selectServicesView';
import { UserContext } from './contexts/UserContext';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import MultiStepForm from './modules/serviceProcedures/MultiStepForm';
import Profile from './modules/Profile/view/Index';
import PayMethods from './views/PayMethods';
import PaymentWaiting from './views/PaymentWaiting';
import MyRequest from './modules/serviceProcedures/views/MyRequest';
import MaintenancePage from './views/Maintenance/Maintenance';
import { statusBack } from './utils/request';

function App() {
    const { darkMode } = useContext(UserContext);
    const lightTheme = createTheme({
        palette: {
            mode: 'light',
        },
    });

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });
    const [theme, setTheme] = useState(darkMode ? darkTheme : lightTheme);
    useEffect(() => {
        setTheme(darkMode ? darkTheme : lightTheme);
    }, [darkMode]);

    const loginRoutes = [
        {
            name: '/getIp',
            element: <GetIp />,
        },
        {
            name: '/Login',
            element: (
                <BaseInitial>
                    <Login />
                </BaseInitial>
            ),
        },
        {
            name: '/Login/:token/:idUser',
            element: (
                <BaseInitial>
                    <Login />
                </BaseInitial>
            ),
        },
        {
            name: '/Register',
            element: (
                <BaseInitial>
                    <Register />
                </BaseInitial>
            ),
        },
        {
            name: '/RestorePassword',
            element: (
                <BaseInitial>
                    <RestorePassword />
                </BaseInitial>
            ),
        },
        {
            name: '/ChangePassword/:token/:userId',
            element: (
                <BaseInitial>
                    <ChangePassword />
                </BaseInitial>
            ),
        },
        {
            name: '/*',
            element: (
                <BaseInitial>
                    <Login />
                </BaseInitial>
            ),
        },
    ];

    const userRoutes = [
        { path: '/', element: <Home /> },
        { path: '/profile', element: <Profile /> },
        { path: '/information', element: <Information /> },
        { path: '/invoice', element: <Invoice /> },
        { path: '/payments', element: <Payments /> },
        { path: '/payMethods', element: <PayMethods /> },
        { path: '/payWaiting', element: <PaymentWaiting /> },
        { path: '/handle', element: <Handle /> },
        { path: '/myservices', element: <MyServices /> },
        { path: '/myservices/detail', element: <MyServicesD /> },
        { path: '/levelup2', element: <LevelDos /> },
        { path: '/authentication', element: <Authentication /> },
        { path: '/myconsumption', element: <MyConsumption /> },
        { path: '/Opinion', element: <Opinion /> },
        { path: '/selectServices', element: <SelectServicesView /> },
        {
            path: '/multiStepForm',
            element: <MultiStepForm />,
        },
        {
            path: '/multiStepForm/:step',
            element: <MultiStepForm />,
        },
        {
            path: '/myRequests',
            element: <MyRequest />,
        },
    ];
    const {backOk} = useContext(UserContext);
    if(!backOk){
        return <MaintenancePage />
    }
    return (
        <div className="flex flex-col min-h-screen w-screen h-screen overflow-y-auto overflow-x-hidden bg-gray-100 dark:bg-zinc-900 dark:text-gray-300 text-gray-700">
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Routes>
                        {loginRoutes.map((route) => (
                            <Route
                                key={route.name}
                                path={route.name}
                                element={route.element}
                            />
                        ))}
                        <Route element={<ProtectedRoutes />}>
                            {userRoutes.map((route) => (
                                <Route
                                    key={route.path}
                                    path={route.path}
                                    element={route.element}
                                />
                            ))}
                        </Route>
                    </Routes>
                    <LocationListener />
                    <Footer />
                </BrowserRouter>
            </ThemeProvider>
        </div>
    );
}

const LocationListener = () => {

    const {setBackOk} = useContext(UserContext);
    const location = useLocation();

    const efect = async () => {
        try {
            await statusBack();
        } catch (error) {
            setBackOk(false);
        }
    };

    useEffect(() => {
        efect();
        const currentUrl = window.location.href;
    }, [location]);

    return null;
};

export default App;