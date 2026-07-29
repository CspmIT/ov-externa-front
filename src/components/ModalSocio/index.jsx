import React, { useContext, useEffect, useState } from 'react'
import CardCustom from '../CardCustom'
import { Close } from '@mui/icons-material'
import { Box, Button, Tab, Tabs, TextField } from '@mui/material'
import { CustomTabPanel, a11yProps } from '../PanelTab'
import { storage } from '../../storage/storage'
import TableCustomer from '../TableCustomer'
import { request } from '../../utils/request'
import Swal from 'sweetalert2'
import { UserContext } from '../../contexts/UserContext'
import { FaSearch, FaCheckCircle } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const ModalSocio = ({ handleCloseModal }) => {
    const { usuario, setUsuario, account, setAccount } = useContext(UserContext)
    const navigate = useNavigate()
    const [value, setValor] = useState(0)
    const [dataSocio, setDataSocio] = useState(false)
    const handleChange = (event, newValue) => {
        setValor(newValue)
    }
    const handleChangeCustomer = (e) => {
        setValue('num_customer', e.target.value)
    }
    const handleChangeAccount = (item) => {
        if (item.num === account.num) {
            return
        }
        const activeUser = JSON.parse(localStorage.getItem('usuario'))
        activeUser.active = item.id_relation
        localStorage.setItem('usuario', JSON.stringify(activeUser))
        item.active = true
        setAccount(item)
        handleCloseModal()
        navigate('/')
    }
    const handleAddCustomer = async (data) => {
        try {
            const operation = await request(
                 import.meta.env.VITE_APP_API_URL + '/addOtherCustomer',
                 'post',
                 data
             )
            if (operation.status === 200) {
                Swal.fire({
                    title: '¡Perfecto!',
                    text: 'El socio ha sido agregado con éxito',
                    icon: 'success',
                    allowOutsideClick: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        const updatedUsuario = { ...usuario }
                        const accountAdd = {
                            id_relation: operation.data.id,
                            name: operation.data.procoop_last_name,
                            num: operation.data.procoop_number,
                            primary: operation.data.primary_account,
                            level: operation.data.level,
                            active: false
                        }
                        updatedUsuario.accounts = [
                            ...updatedUsuario.accounts,
                            accountAdd
                        ]
                        setUsuario(updatedUsuario)
                        const updatedStorage = storage.get('usuario')
                        updatedStorage.accounts = [updatedUsuario.accounts]
                        storage.set('usuario', updatedStorage)
                        handleChange(false, 0)
                    }
                })
            } else {
                throw new Error()
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: error,
                icon: 'error',
            })
        }
    }
    const handleSearchCustomer = async () => {
        try {
            const array = { customer: watch('num_customer') }
            const { data } = await request(
                import.meta.env.VITE_APP_API_URL + '/getCustomer',
                'post',
                array
            )
            const customer = data.shift()
            const lastName = customer.APELLIDOS
            const name = customer.NOMBRES

            const swal = await Swal.fire({
                title: '¿El socio que busca es?',
                text: `${lastName ?? ''} ${name ?? ''} `,
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Si',
                cancelButtonText: 'Cancelar',
            })

            if (swal.isConfirmed) {
                setValue('last_name_customer', lastName.toUpperCase())
                setDataSocio(true)
            }
        } catch (error) {
            setDataSocio(false)
            Swal.fire({
                title: 'Error',
                text: error.message,
                icon: 'error',
            })
        }
    }
    const [widthPhone, setWidthPhone] = useState(window.innerWidth <= 768)
    const changeScreen = () => {
        setWidthPhone(window.innerWidth <= 768)
    }
    useEffect(() => {
        window.addEventListener('resize', changeScreen)
        return () => {
            window.removeEventListener('resize', changeScreen)
        }
    }, [])

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault()
        }
    }

    const {
        register,
        setValue,
        watch,
        formState: { errors },
        handleSubmit,
    } = useForm()

    return (
        <CardCustom
            className={
                'lg:w-1/3 w-2/3 max-sm:w-full rounded-xl bg-white shadow-lg'
            }
        >
            <div className="rounded-xl ">
                <div className="relative rounded-t-xl bg-slate-200 p-5 ">
                    <h3
                        className="text-gray-900 m-0 font-bold text-center font-sans"
                        id="exampleModalLabel"
                    >
                        Administrar socios
                    </h3>
                    <div className="absolute  right-5 top-5">
                        <Close
                            onClick={handleCloseModal}
                            className="text-gray-500 hover:text-gray-800 hover:cursor-pointer"
                        />
                    </div>
                </div>
                <div className="p-5 ">
                    <p className="dark:text-white">
                        En esta tabla podrás ver todos los Socios que agregaste
                        para administrar la Oficina Virtual.
                    </p>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                aria-label="basic tabs example"
                            >
                                {widthPhone ? (
                                    <Tab label="Cambiar" {...a11yProps(2)} />
                                ) : null}
                                <Tab label="Listado" {...a11yProps(0)} />
                                <Tab label="Agregar" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <Box
                            sx={{
                                padding: 2,
                                border: 2,
                                borderTop: 0,
                                borderRadius: '0px 0px 10px 10px',
                                borderColor: 'divider',
                            }}
                        >
                            <CustomTabPanel
                                className={'flex flex-col'}
                                value={value}
                                index={widthPhone ? 1 : 0}
                            >
                                <TableCustomer />
                            </CustomTabPanel>
                            <CustomTabPanel
                                className={'flex flex-col'}
                                value={value}
                                index={widthPhone ? 2 : 1}
                            >
                                <form
                                    onSubmit={handleSubmit(handleAddCustomer)}
                                    onKeyDown={handleKeyDown}
                                >
                                    <div className="w-full flex flex-row justify-evenly items-center">
                                        <TextField
                                            type="tel"
                                            errors={errors}
                                            {...register('num_customer', {
                                                required: true,
                                                onChange: (e) =>
                                                    handleChangeCustomer,
                                            })}
                                            id="num_customer"
                                            name="num_customer"
                                            className="w-3/4"
                                            label="Nro Socio"
                                            placeholder="Ingrese un número de socio"
                                            variant="outlined"
                                        />
                                        {errors.num_customer?.type ===
                                            'required' && (
                                            <span className="text-red-500">
                                                Este campo es obligatorio
                                            </span>
                                        )}
                                        <Button
                                            type="button"
                                            onClick={() =>
                                                handleSearchCustomer()
                                            }
                                            variant="contained"
                                            color="success"
                                        >
                                            <FaSearch />
                                        </Button>
                                    </div>
                                    {dataSocio ? (
                                        <>
                                            <div className="w-full mt-3 flex gap-3 flex-row justify-evenly items-center">
                                                <div className="flex flex-col w-[90%]">
                                                    <TextField
                                                        type="text"
                                                        errors={errors}
                                                        disabled
                                                        {...register(
                                                            'last_name_customer',
                                                            {
                                                                required: true,
                                                                onChange: (
                                                                    e
                                                                ) => {
                                                                    setValue(
                                                                        'last_name_customer',
                                                                        e.target.value.toUpperCase()
                                                                    )
                                                                },
                                                            }
                                                        )}
                                                        name={
                                                            'last_name_customer'
                                                        }
                                                        id={
                                                            'last_name_customer'
                                                        }
                                                        label="Apellido"
                                                        placeholder="Ingrese apellido del socio"
                                                        variant="outlined"
                                                    />
                                                    {errors.last_name_customer
                                                        ?.type ===
                                                        'required' && (
                                                        <span className="text-red-500">
                                                            Este campo es
                                                            obligatorio
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="w-full mt-4 flex flex-col justify-center items-center">
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    color="success"
                                                >
                                                    Agregar
                                                </Button>
                                            </div>
                                        </>
                                    ) : null}
                                </form>
                            </CustomTabPanel>
                            {widthPhone ? (
                                <CustomTabPanel
                                    className={'flex flex-col'}
                                    value={value}
                                    index={0}
                                >
                                    <p className="mb-3 dark:text-white">
                                        Seleccioná el socio con el que querés
                                        operar:
                                    </p>
                                    <div className="w-full flex flex-col gap-2">
                                        {usuario.accounts.map((item) => (
                                            <button
                                                key={item.num}
                                                type="button"
                                                onClick={() =>
                                                    handleChangeAccount(item)
                                                }
                                                className={`flex items-center justify-between rounded-lg border px-4 py-3 text-left ${
                                                    item.num === account.num
                                                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30'
                                                        : 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800'
                                                }`}
                                            >
                                                <div className="flex flex-col">
                                                    <span className="font-medium dark:text-white">
                                                        {item.name}
                                                    </span>
                                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                                        Socio N° {item.num}
                                                    </span>
                                                </div>
                                                {item.num === account.num ? (
                                                    <FaCheckCircle className="text-emerald-500 shrink-0 ml-2" />
                                                ) : null}
                                            </button>
                                        ))}
                                    </div>
                                </CustomTabPanel>
                            ) : null}
                        </Box>
                    </Box>
                </div>
            </div>
        </CardCustom>
    )
}

export default ModalSocio
