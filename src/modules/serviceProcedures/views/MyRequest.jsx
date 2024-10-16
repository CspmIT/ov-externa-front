import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { request } from '../../../utils/request';
import { formatDateForInput } from '../../../utils/dateFunction';

const tramiteVigente = {
    id: 'T001',
    tipo: 'Alta',
    fechaInicio: '15-12-2024',
    estado: 'Completado',
};

const tramitesIniciados = [
    {
        id: 'T001',
        tipo: 'Alta',
        fechaInicio: '15-12-2024',
        estado: 'Completado',
    },
    {
        id: 'T002',
        tipo: 'Baja',
        fechaInicio: '25-12-2024',
        estado: 'En proceso',
    },
    {
        id: 'T002',
        tipo: 'Baja',
        fechaInicio: '25-12-2024',
        estado: 'Rechazado',
    },
    {
        id: 'T002',
        tipo: 'Baja',
        fechaInicio: '25-12-2024',
        estado: 'Completado',
    },
];

const status = {
    0: {
        description: "Pendiente de carga",
        color:"default"
    },
    1: {
        description: "Solicitud Enviada",
        color: "info"
    },
    2: {
        description: "Solicitud en Revicion",
        color: "warning"
    },
    3: {
        description: "Solicitud Aprovada",
        color: "success"
    },
    4: {
        description: "Anulado",
        color: "error"
    },
    5: {
        description: "Corregir datos",
        color: "secondary"
    }
}

export default function MyRequest() {
    useEffect(() => {
        const fetchData = async () => {
            const baseUrl = import.meta.env.VITE_APP_API_URL;
            const url = `${baseUrl}/getRequestsByUser`;
            try {
                const response = await request(url, 'post');
                // Guardo los datos recibidos
                if(response.data){
                    setRequests(response.data)
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const [requests, setRequests] = useState([])

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const TramiteVigenteContent = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <Typography variant="subtitle2" className="font-semibold">
                    ID del Trámite:
                </Typography>
                <Typography variant="body2">{tramiteVigente.id}</Typography>
            </div>
            <div>
                <Typography variant="subtitle2" className="font-semibold">
                    Tipo de Trámite:
                </Typography>
                <Typography variant="body2">{tramiteVigente.tipo}</Typography>
            </div>
            <div>
                <Typography variant="subtitle2" className="font-semibold">
                    Fecha de Inicio:
                </Typography>
                <Typography variant="body2">
                    {tramiteVigente.fechaInicio}
                </Typography>
            </div>
            <div>
                <Typography variant="subtitle2" className="font-semibold">
                    Estado:
                </Typography>
                <Chip
                    label={tramiteVigente.estado}
                    color={'primary'}
                    size="small"
                />
            </div>
        </div>
    );

    const TramitesIniciadosTable = () => (
        <TableContainer component={Paper} className="overflow-x-auto">
            <Table
                aria-label="tabla de trámites iniciados"
                size={isMobile ? 'small' : 'medium'}
            >
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Tipo de Trámite</TableCell>
                        {!isMobile && <TableCell>Fecha de Inicio</TableCell>}
                        {!isMobile && <TableCell>Ultima Actualización</TableCell>}
                        <TableCell>Estado</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {requests.map((tramite) => (
                        <TableRow key={tramite.id}>
                            <TableCell>T{tramite.id}</TableCell>
                            <TableCell>Alta</TableCell>
                            {!isMobile && (
                                <TableCell>{formatDateForInput(tramite.createdAt)}</TableCell>
                            )}
                            {!isMobile && (
                                <TableCell>{formatDateForInput(tramite.updatedAt)}</TableCell>
                            )}
                            <TableCell>
                                <Chip
                                    label={status[tramite.status].description}
                                    color={status[tramite.status].color}
                                    size="small"
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

    return (
        <div className="container mx-auto p-4 space-y-6">
            <Typography
                variant="h4"
                component="h1"
                className="mb-4 font-bold text-center sm:text-left"
            >
                Estado de Trámites
            </Typography>

            <Card className="shadow-md">
                <CardContent>
                    <Typography variant="h6" className="mb-4 font-semibold">
                        Trámite Vigente
                    </Typography>
                    {tramiteVigente ? (
                        <TramiteVigenteContent />
                    ) : (
                        <Typography
                            variant="body2"
                            className="text-center py-4"
                        >
                            No hay trámites vigentes en este momento.
                        </Typography>
                    )}
                </CardContent>
            </Card>

            <Card className="shadow-md">
                <CardContent>
                    <Typography variant="h6" className="mb-4 font-semibold">
                        Trámites Iniciados
                    </Typography>
                    <TramitesIniciadosTable />
                </CardContent>
            </Card>
        </div>
    );
}
