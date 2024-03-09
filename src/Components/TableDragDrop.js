import { useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Typography } from "@mui/material";

const Example = ({ firstTeam, secondTeam }) => {
  const columns = [
    {
      accessorKey: "name",
      header: "Nombre",
    },
  ];

  const [data1, setData1] = useState(() => firstTeam.getPlayers());
  const [data2, setData2] = useState(() => secondTeam.getPlayers());

  const [draggingRow, setDraggingRow] = useState(null);
  const [hoveredTable, setHoveredTable] = useState(null);

  const commonTableProps = {
    columns,
    enableTopToolbar: false,
    enableBottomToolbar: false,
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,
    enableRowDragging: true,
    enableFullScreenToggle: false,
    muiTableContainerProps: {
      sx: {
        minHeight: "320px",
        backgroundColor: "grey",
        border: "rgb(32, 32, 32) 1px solid",
      },
    },
    muiTableHeadRowProps: { sx: { backgroundColor: "black" } },
    muiTableBodyRowProps: { sx: { backgroundColor: "black" } },
    onDraggingRowChange: setDraggingRow,
    state: { draggingRow },
  };

  const table1 = useMaterialReactTable({
    ...commonTableProps,
    data: data1,
    getRowId: (originalRow) => `table-1-${originalRow.firstName}`,
    muiRowDragHandleProps: {
      onDragEnd: () => {
        if (hoveredTable === "table-2") {
          setData2((data2) => [...data2, draggingRow.original]);
          setData1((data1) => data1.filter((d) => d !== draggingRow.original));
        }
        setHoveredTable(null);
      },
    },
    muiTablePaperProps: {
      onDragEnter: () => setHoveredTable("table-1"),
      sx: {
        outline: hoveredTable === "table-1" ? "2px dashed pink" : undefined,
      },
    },
    renderTopToolbarCustomActions: () => <p>Equipo 1</p>,
  });

  const table2 = useMaterialReactTable({
    ...commonTableProps,
    data: data2,
    defaultColumn: {
      size: 100,
    },
    getRowId: (originalRow) => `table-2-${originalRow.firstName}`,
    muiRowDragHandleProps: {
      onDragEnd: () => {
        if (hoveredTable === "table-1") {
          setData1((data1) => [...data1, draggingRow.original]);
          setData2((data2) => data2.filter((d) => d !== draggingRow.original));
        }
        setHoveredTable(null);
      },
    },
    muiTablePaperProps: {
      onDragEnter: () => setHoveredTable("table-2"),
      sx: {
        outline: hoveredTable === "table-2" ? "2px dashed pink" : undefined,
      },
    },
    renderTopToolbarCustomActions: () => <p>Equipo 2</p>,
  });

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "auto", lg: "1fr 1fr" },
        gap: "1rem",
        overflow: "auto",
        p: "4px",
      }}
    >
      <MaterialReactTable table={table1} />
      <MaterialReactTable table={table2} />
    </Box>
  );
};

export default Example;
