import { MenuItem, TextField } from '@mui/material'
import { useRegForm } from '../../providers/RegFormProvider'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { request } from '../../../../utils/request'
import { backend } from '../../../../routes/apiEndpoints'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

const ModalAdherents = ({ open, setOpen, children }) => {
    const handleClose = () => setOpen(false)

    const [, dispatch] = useRegForm()

    const [relationship, setRelationship] = useState([])

    const {
        register: registerAdherent,
        handleSubmit: handleSubmitAdherent,
        formState: { errors: errorsAdherent },
    } = useForm()

    const getRelationships = async () => {
        try {
            const relations = await request(
                `${backend.OvExterna}/getRelationships`,
                'GET'
            )
            console.log(relations)
            setRelationship(relations.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        // obtengo los datos de la api de procoop
        getRelationships()
    }, [])

    const handleAddAdherent = (data) => {
        const person = [
            {
                name: `${data.name} ${data.last_name}`,
                dni: data.dni,
                groupBoold: data.groupBoold,
                burn: data.birth_date,
            },
        ]
        dispatch({
            type: 'adherents',
            data: person,
        })
        setOpen(false)
    }

    return (
        <>
            {children}
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <h2 className="text-center">Adherente</h2>
                    <form className="flex gap-3 flex-col">
                        <div className="w-full flex gap-3">
                            <TextField
                                label="Nomble"
                                {...registerAdherent('name')}
                                className="w-1/2"
                            />
                            <TextField
                                label="Apellido"
                                {...registerAdherent('last_name')}
                                className="w-1/2"
                            />
                        </div>
                        <div className="w-full flex gap-3">
                            <TextField
                                label="DNI"
                                {...registerAdherent('dni')}
                                className="w-full"
                            />
                            <TextField
                                label="Fecha de Nacimiento"
                                className="w-full"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                {...registerAdherent('birth_date')}
                            />
                        </div>
                        <div className="w-full flex gap-3">
                            <TextField
                                label="Grupo Sanguineo"
                                {...registerAdherent('groupBoold')}
                                className="w-full"
                            />
                            <TextField
                                label="Parentesco"
                                select
                                {...registerAdherent('relationship')}
                                className="w-full"
                            >
                                <MenuItem value={'hijos'}>Hijo</MenuItem>
                            </TextField>
                        </div>

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmitAdherent(handleAddAdherent)}
                            type="button"
                        >
                            Agregar
                        </Button>
                    </form>
                </Box>
            </Modal>
        </>
    )
}

export default ModalAdherents
