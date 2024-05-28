import React, { useState } from 'react'
import InputGroup from '../../components/InputGroup'
import Button from '../../components/Button'
import { requestAuth } from '../../utils/request';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

const index = () => {
    const [inputVisibility, setInputVisibility] = useState('hidden');
    const [valor, setValor] = useState(null);
    const {usuario} = useContext(UserContext);

    const initialData = {
        id_score: "",
        text_opinion: "",
        id_customer: "",
    };

    const [userData, setUserData] = useState(initialData);

    const showInput = (variab) => {
        setInputVisibility(variab === valor ? (inputVisibility === 'hidden' ? '' : 'hidden') : '');
        setValor(variab);
    };

    const handleChangeUserData = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value, ['id_score']: valor, ['id_customer']: usuario.number_customer || null});
    };

    const formulario = async () => {
        const url = 'http://localhost:8000/api/addOpinions'
        // const url = `http://cooptech.com.ar:30888/api/addOpinions`;
        try {
            await requestAuth(url, "POST", userData);
            Swal.fire({
                icon: "success",
                title: "Opinión Guardada!",
                text: "Muchas gracias",
            });
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };

    return (
        <div>
            <h2 className="text-center m-5">Dejanos tu Opinión</h2>
            <hr />
            <h5 className='text-center mt-5'>¿Como fue tu experiencia en la Oficina Virtual?</h5>
            <div className='w-full flex flex-wrap justify-center'>
                <div className='w-1/2 flex flex-wrap p-5'>
                    <div onClick={() => showInput(1)} className='w-1/4 p-2'>
                        <img className='w-full' src='../../src/assets/img/opinion/enojado.png' />
                    </div>
                    <div onClick={() => showInput(2)} className='w-1/4 p-2'>
                        <img className='w-full' src='../../src/assets/img/opinion/emoji.png' />
                    </div>
                    <div onClick={() => showInput(3)} className='w-1/4 p-2'>
                        <img className='w-full' src='../../src/assets/img/opinion/bien.png' />
                    </div>
                    <div onClick={() => showInput(4)} className='w-1/4 p-2'>
                        <img className='w-full' src='../../src/assets/img/opinion/feliz.png' />
                    </div>
                </div>
                <div className={`w-2/3 text-center`} style={{ visibility: inputVisibility }} >
                    <InputGroup
                        onChange={handleChangeUserData}
                        id={"text_opinion"}
                        name={"text_opinion"}
                        required
                        ph={"Ayudanos a mejorar ingresando tu comentario..."}
                        type={"text"}
                        value={userData.text_opinion}
                    />
                    <Button onclick={() => formulario()} props={{ class: `text-black bg-yellow-300 mt-5 hover:bg-yellow-400 focus:bg-yellow-400 m-2`, text: "Enviar", type: 'button' }} />
                </div>
            </div>
        </div>
    )
}

export default index