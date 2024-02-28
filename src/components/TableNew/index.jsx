import { Box } from "@mui/material";
import { MRT_ToggleDensePaddingButton, MRT_ToggleFiltersButton, MRT_ToggleGlobalFilterButton, MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Circle, Print } from "@mui/icons-material";
import Button from "../Button";
import Swal from "sweetalert2";
import axios from "axios";
const TableInvoice = ({ data, amountPay, ...prop }) => {
  const { darkMode } = useContext(UserContext);
  const columns = [
    {
      header: "Cuenta",
      accessorKey: "account",
    },
    {
      header: "Tipo",
      accessorKey: "type",
    },
    {
      header: "Factura",
      accessorKey: "nrovoucher",
    },
    {
      header: "Periodo",
      accessorKey: "period",
    },
    {
      header: "Vencimiento",
      accessorKey: "vto",
    },
    {
      header: "Importe",
      accessorKey: "amount",
      size: 45,
      Cell: ({ row, cell }) => {
        if (!row.original.subRows) {
          return (
            <Box
              component="span"
              sx={() => ({
                color: darkMode ? "rgb(0, 0, 0)" : "rgb(255, 255, 255)",
                fontWeight: "bold",
                fontSize: "15px",
              })}
            >
              {cell.getValue()?.toLocaleString?.("es-AR", {
                style: "currency",
                currency: "ARS",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Box>
          );
        }
      },
      // Footer: ({ table }) => {
      //   const total = table
      //     .getSelectedRowModel()
      //     .rows.map((item) => {
      //       return item.original.amount;
      //     })
      //     .reduce((a, b) => {
      //       return a + b;
      //     }, 0);
      //   return (
      //     <Box   sx={() => ({
      //       color: darkMode ? "rgb(0, 0, 0)" : "rgb(255, 255, 255)",
      //       fontWeight: 'bold',
      //     })} className={"text-xl"}>
      //       Total:
      //       <Box color="warning.main">
      //         {total.toLocaleString?.("es-AR", {
      //           style: "currency",
      //           currency: "ARS",
      //           minimumFractionDigits: 2,
      //           maximumFractionDigits: 2,
      //         })}
      //       </Box>
      //     </Box>
      //   );
      // },
    },
    {
      header: "",
      accessorKey: "status",
      disableFilters: true,
      size: 15,
      enableGlobalFilter: false,
      Cell: ({ row }) => {
        if (!row.original.subRows) {
          return (
            <div>
              <Circle className={`${row.original?.status > 0 ? (row.original?.status == 2 ? "text-yellow-500" : "text-green-500") : "text-red-500"}`} />
            </div>
          );
        }
      },
    },
    {
      header: "",
      accessorKey: "url",
      disableFilters: true,
      enableGlobalFilter: false,
      size: 15,
      Cell: ({ row }) => {
        if (row.original.url) {
          return (
            <Button
              props={{ class: "bg-blue-500 rounded text-center   text-white " }}
              onclick={() => {
                controlUrl(`${row.original?.url ? row.original?.url : undefined}`);
              }}
            >
              <Print />
            </Button>
          );
        }
      },
    },
  ];

  const controlUrl = async (url) => {
    const urlConsulta = "http://localhost:8000/api/existinvoice?url=" + url;
    try {
      const response = await axios({
        method: "GET",
        url: urlConsulta,
        headers: { "Content-Type": "application/json", Accept: "application/json" },
      });
      window.open(url, "_blank");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "La factura aun no se encuentra disponible",
        showConfirmButton: true,
      });
    }
  };
  //creo una constante con las configuracion inicial para poder modificar con props
  const tableInitialState = {
    density: "comfortable",
    expanded: true,
    pagination: { pageIndex: 0, pageSize: 100 },
    sorting: [],
    grouping: [],
    columnPinning: {
      right: ["mrt-row-select"],
    },
  };
  //constrolo si llega un agrupacion por columna
  if (prop.groupBy) {
    tableInitialState.grouping.push(prop.groupBy);
  }
    //constrolo si llega un orden por columna
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
    enablePagination: false,

    // muiTableContainerProps: { sx: { maxHeight: 50000 } },
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

    muiTablePaperProps: {
      sx: {
        margin: "10px",
        boxShadow: `2px 3px 5px 0px #0000007f`,
        borderRadius: "0.75rem",
      },
    },
    mrtTheme: () => ({
      baseBackgroundColor: darkMode ? "rgba(238, 238, 238, 0.39)" : "rgba(238, 238, 238, 0.11)",
    }),

    renderToolbarInternalActions: ({ table }) => (
      <Box>
        <MRT_ToggleGlobalFilterButton table={table} />
        <MRT_ToggleDensePaddingButton table={table} />
        <MRT_ToggleFiltersButton table={table} />
      </Box>
    ),
  });

  useEffect(() => {
    let values = 0;
    table.getSelectedRowModel().rows.forEach((element) => {
      values += element.original.amount;
    });
    values = values.toFixed(2);
    if (amountPay) amountPay(values);
  }, [table.getState().rowSelection]);

  return <MaterialReactTable table={table} />;
};

export default TableInvoice;
