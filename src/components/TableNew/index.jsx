import { MRT_ExpandAllButton, MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import NoRegisterTable from "../NoRegisterTable";
import { calcValues } from "../../utils/invoice";
import { Box, Stack } from "@mui/material";

const TableNew = ({ data, columns, amountPay, ...prop }) => {
    const { darkMode } = useContext(UserContext);
    //creo una constante con las configuracion inicial para poder modificar con props
    const tableInitialState = {
        density: "comfortable",
        expanded: true,
        sorting: [],
        grouping: [],
    };
    //activacion de paginacion
    if (prop.pagination) {
        tableInitialState.pagination = { pageIndex: 0, pageSize: 100 };
    }
    //controlo si llega un agrupacion por columna
    if (prop.groupBy) {
        tableInitialState.grouping.push(prop.groupBy);
    }
    //controlo si llega un orden por columna
    if (prop.orderBy) {
        tableInitialState.sorting.push({ id: prop.orderBy, desc: false });
    }

    const table = useMaterialReactTable({
        columns,
        data,
        initialState: tableInitialState,
        groupedColumnMode: "remove",
        positionToolbarAlertBanner: "none",
        positionToolbarDropZone: "none",
        enableTopToolbar: false,
        enableStickyFooter: false,
        enableStickyHeader: true,
        enablePagination: prop.pagination ?? false,
        displayColumnDefOptions: {
            "mrt-row-expand": {
                size: 30,
                minSize: 10,
                maxSize: 30,
            },
        },
        muiTableContainerProps: { sx: { maxHeight: prop.pagination ? 500 : 50000 } },
        //HABILITACION DE ROWS
        enableBatchRowSelection: prop.checkbox ?? false,
        enableMultiRowSelection: prop.checkbox ?? false,
        enableRowSelection: prop.checkbox ?? false,
        enableSelectAll: prop.checkbox ?? false,
        enableSubRowSelection: prop.checkbox ?? false,
        //HABILITACION DE COLUMNA
        //si esta true te deja copiar el campo de la tabla
        enableClickToCopy: false,
        //habilita los 3 puntos para acciones por columna
        enableColumnActions: false,
        //habilita hacer drag and drop aunque faltan otras opciones para que funcione al 100%
        enableColumnDragging: false,
        //habilita el poder filtrar por todas las columnas
        enableColumnFilter: false,
        //activa un boton que te genera un modal para editar el campo en la tabla, pero hay que combinarlo con otra funcion para el guardado, actualizacion, etc.
        enableEditing: false,
        //permite agrupar por columnas
        enableGrouping: true,
        //junto con el de los 3 puntos de accion te permite ocultar columnas, o activando el toopbar
        enableHiding: false,
        //habilita el ordenamiento de columnas osea ordenar los datos por alguna columna en especifico
        enableSorting: false,
        //svg para cuando la tabla esta vacia
        renderEmptyRowsFallback: () => {
            return <NoRegisterTable />;
        },
        muiTableBodyCellProps: () => ({
            sx: () => ({
                color: darkMode ? "rgb(0, 0, 0)" : "rgb(255, 255, 255)",
                fontSize: "15px",
            }),
        }),
        muiTableBodyRowProps: ({ row }) => {
            return {
                sx: {
                    backgroundColor: row.depth == 0 ? (darkMode ? "rgba(209, 213, 219, 0.482)" : "#0000004e") : "transparent",
                    fontWeight: row.getIsExpanded() ? "bold" : "normal",
                },
            };
        },
        muiTableHeadCellProps: {
            sx: {
                background: "#fef08a !important",
                fontSize: "18px",
                fontWeight: "bold",
            },
        },
        muiTopToolbarProps: {
            sx: {
                color: "black",
            },
        },
        muiBottomToolbarProps: {
            sx: {
                minHeight: prop.pagination ? "3.5rem" : "2rem",
            },
        },
        muiTablePaperProps: {
            sx: {
                margin: "10px",
                boxShadow: `2px 3px 5px 0px #00000046`,
                borderRadius: "0.75rem",
            },
        },
        mrtTheme: () => ({
            baseBackgroundColor: darkMode ? "rgba(238, 238, 238, 0.39)" : "rgba(238, 238, 238, 0.11)",
        }),
    });

    useEffect(() => {
        const data = calcValues(table);
        if (amountPay) {
            if (data) amountPay(data);
        }
    }, [table.getState().rowSelection]);
    useEffect(() => {
        table.setColumnOrder(["mrt-row-expand", ...columns.map((e) => e.accessorKey), "mrt-row-select"]);
    }, [table]);
    return <MaterialReactTable table={table} />;
};

export default TableNew;
