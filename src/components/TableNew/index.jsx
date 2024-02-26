import { Box } from "@mui/material";
import { MRT_ToggleDensePaddingButton, MRT_ToggleFiltersButton, MRT_ToggleGlobalFilterButton, MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Circle, Print } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const TableInvoice = ({data}) => {
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
              <Circle className={`${row.original?.status == 1 ? "text-yellow-500" : "text-red-500"}`} />
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
            <NavLink target={row.original?.url ? row.original?.url : undefined} to={row.original?.url ? row.original?.url : undefined} rel="noopener">
              <div className={"bg-blue-500 rounded text-center p-2  text-white m-0 w-11"}>
                <Print />
              </div>
            </NavLink>
          );
        }
      },
    },
  ];
  
const table = useMaterialReactTable({
        columns,
        data,
        initialState: {
          density: "comfortable",
          expanded: true,
          grouping: ["account"],
          pagination: { pageIndex: 0, pageSize: 20 },
          sorting: [{ id: "account", desc: false }],
          columnPinning: {
            right: ["mrt-row-select"],
          },
        },
        enableGrouping: true,
        groupedColumnMode: "remove",
        positionToolbarAlertBanner: "none",
        positionToolbarDropZone: "none",
        enableTopToolbar: true,
        enableSelectAll: true,
        enableStickyFooter: false,
        enableStickyHeader: true,
        enableRowSelection: true,
        muiTableContainerProps: { sx: { maxHeight: 600 } },
        muiTableBodyCellProps: () => ({
          sx: () => ({
            color: darkMode ? "rgb(0, 0, 0)" : "rgb(255, 255, 255)",
            fontSize: "15px",
          }),
        }),

        muiTableBodyRowProps: ({ row }) => {
          return {
            sx: {
              backgroundColor: row.depth == 0 ? "#969696" : "transparent",
              fontWeight: row.getIsExpanded() ? "bold" : "normal",
            },
          };
        },
        muiTableHeadCellProps: {
          sx: {
            color: darkMode ? "rgb(0, 0, 0)" : "rgb(255, 255, 255)",
            fontSize: "18px",
            fontWeight: "bold",
          },
        },
        muiTablePaperProps: {
          sx: {
            baseBackgroundColor: darkMode ? "rgb(238, 238, 238)" : "rgb(99, 99, 99)",
            padding: "10px",
            boxShadow: `inset 1px 1px 6px ${darkMode ? "#d1d1d1bb" : "#838383ac"}, inset -3px  -3px 6px ${darkMode ? "#d1d1d1bb" : "#838383ac"}`,
            borderRadius: "0.75rem",
          },
        },
        mrtTheme: () => ({
          baseBackgroundColor: darkMode ? "rgb(238, 238, 238)" : "rgb(99, 99, 99)",
        }),
        renderToolbarInternalActions: ({ table }) => (
          <Box>
            <MRT_ToggleGlobalFilterButton table={table} />
            <MRT_ToggleDensePaddingButton table={table} />
            <MRT_ToggleFiltersButton table={table} />
          </Box>
        ),
      })


  useEffect(() => {
    console.log(table.getSelectedRowModel().rows);
  }, [table.getState().rowSelection]);

  return <MaterialReactTable table={table} />;
};

export default TableInvoice;
