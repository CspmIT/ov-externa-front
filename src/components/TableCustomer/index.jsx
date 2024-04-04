import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "../Button";
import { FaTrashCan, FaPencil } from "react-icons/fa6";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";

export default function TableCustomer() {
  const { usuario, setUsuario } = useContext(UserContext);
  const handleCustomer = (item) => {
    console.log(item);
  };
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table" className="dark:bg-zinc-800">
        <TableHead className="bg-amber-300">
          <TableRow>
            <TableCell>
              <b>Socio</b>
            </TableCell>
            <TableCell>
              <b>Nombre</b>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usuario.accounts.map((row) => (
            <TableRow key={row.num} sx={{ "&:last-child td, &:last-child th": { border: 0 } }} className="dark:border-gray-700">
              <TableCell component="th" scope="row" align="left">
                <span className="dark:text-white">{row.num}</span>
              </TableCell>
              <TableCell align="left">
                <span className="dark:text-white">{row.name}</span>
              </TableCell>
              <TableCell align="right">
                <Button
                  onclick={() => handleCustomer(row)}
                  props={{ class: `${row.main ? "bg-amber-500" : "bg-red-500"} m-0 rounded-xl  max-sm:rounded-full max-sm:p-1.5 text-center py-0.7 px-1.5 text-white` }}
                >
                  {row.main ? <FaPencil /> : <FaTrashCan />}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
