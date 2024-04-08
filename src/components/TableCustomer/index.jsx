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
import { requestAuth } from "../../utils/request";
import Swal from "sweetalert2";
import { storage } from "../../storage/storage";
import { Hidden, TextField } from "@mui/material";
import { MdCancel } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { useState } from "react";

export default function TableCustomer() {
  const { usuario, setUsuario } = useContext(UserContext);
  const [openEdit, setOpenEdit] = useState("none");
  const [value, setValue] = useState();

  const handleCustomer = (item) => {
    if (item.name === usuario.name_customer) {
      Swal.fire({
        title: "Atención",
        text: "No puedes modificar el usuario que estas usando",
        icon: "warning",
      });
      return false;
    }
    item.main ? setOpenEdit("table-row") : deleteCustomer(item.id);
  };
  const handleCancelEdit = () => {
    setOpenEdit("none");
    setValue("");
  };

  const handleChangeValue = (e) => {
    setValue(e.target.value);
  };
  const handleEditCustomer = async () => {
    try {
      const array = { nro_customer: value };
      const user = await requestAuth("http://127.0.0.1:8000/api/searchOther", "post", array);
      const swal = await Swal.fire({
        title: "¿Deseas agregar a este socio como principal?",
        text: user.data,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Agregar",
        cancelButtonText: "Cancelar",
      });

      if (swal.isConfirmed) {
        const data = { name_customer: user.data, number_customer: value };
        const operation = await requestAuth("http://127.0.0.1:8000/api/updateCustomer", "patch", data);
        if (operation.message) {
          Swal.fire({
            title: "¡Perfecto!",
            text: "El socio principal ha sido cambiado con éxito",
            icon: "success",
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
              //Actualizar contexto y localstorage
            }
          });
        } else {
          throw new Error(result.error);
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "El número ingresado es inválido",
        icon: "error",
      });
    }
  };
  const deleteCustomer = async (id) => {
    try {
      const swal = await Swal.fire({
        title: "Atención",
        text: "¿Deseas eliminar al socio seleccionado?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
      });

      if (swal.isConfirmed) {
        const operation = await requestAuth(`http://127.0.0.1:8000/api/deleteOther/${id}`, "delete");
        if (operation.message) {
          Swal.fire({
            title: "¡Perfecto!",
            text: "El socio ha sido eliminado con éxito",
            icon: "success",
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
              const updatedUsuario = { ...usuario };
              updatedUsuario.accounts = updatedUsuario.accounts.filter((obj) => obj.id !== id);
              setUsuario(updatedUsuario);
              const updatedStorage = storage.get("usuario");
              updatedStorage.accounts = [updatedUsuario.accounts];
              storage.set("usuario", updatedStorage);
            }
          });
        } else {
          throw new Error(result.error);
        }
      }
    } catch {
      console.log("error");
    }
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
          <TableRow sx={{ display: openEdit }}>
            <TableCell colSpan={2}>
              <div className="flex flex-row justify-center">
                <TextField onChange={handleChangeValue} value={value} placeholder="Ingrese un número de socio" variant="outlined" />
              </div>
            </TableCell>
            <TableCell align="right">
              <div className="flex flex-row justify-evenly">
                <Button onclick={() => handleCancelEdit()} props={{ class: `bg-amber-500 m-0 rounded-xl  max-sm:rounded-full max-sm:p-1.5 text-center py-0.7 px-1.5 text-white` }}>
                  <MdCancel />
                </Button>
                <Button onclick={() => handleEditCustomer()} props={{ class: `bg-green-500 m-0 rounded-xl  max-sm:rounded-full max-sm:p-1.5 text-center py-0.7 px-1.5 text-white` }}>
                  <FaCheckCircle />
                </Button>
              </div>
            </TableCell>
          </TableRow>
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
