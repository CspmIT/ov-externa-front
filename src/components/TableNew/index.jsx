import { Box } from "@mui/material";
import { MRT_ToggleDensePaddingButton, MRT_ToggleFiltersButton, MRT_ToggleGlobalFilterButton, MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
const TableNew = ({ data, columns, agrupacion }) => {
  const { darkMode } = useContext(UserContext);
  const table = useMaterialReactTable({
    columns,
    data,
    initialState: {
      density: "comfortable",
      expanded: true,
      grouping: [agrupacion],
      pagination: { pageIndex: 0, pageSize: 20 },
      sorting: [{ id: agrupacion, desc: false }],
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
    enableStickyFooter: true,
    enableStickyHeader: true,
    enableRowSelection: true,
    muiTableContainerProps: { sx: { maxHeight: 600 } },
    muiTableBodyCellProps: () => ({
      sx: () => ({
        color: darkMode ? "rgb(0, 0, 0)" : "rgb(255, 255, 255)",
        fontSize: '15px'
      }),
    }),

    muiTableBodyRowProps: ({ row }) => {
      return {
        sx: {
          backgroundColor: row.depth == 0 ? "#969696" : "transparent",
          fontWeight: row.getIsExpanded() ? 'bold' : 'normal',
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
  });

  useEffect(() => {
    console.log(table.getSelectedRowModel().rows);
  }, [table.getState().rowSelection]);

  return <MaterialReactTable table={table} />;
};

export default TableNew;
