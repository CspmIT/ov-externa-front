import React from 'react';
import { RiNumber1, RiNumber2, RiNumber3, RiNumber4 } from 'react-icons/ri';
import CardBasic from '../../../../components/CardBasic';

const steps = [
  { id: 1, text: 'Buscá un lugar iluminado con fondo claro liso.', icon: <RiNumber1 className='w-full' /> },
  { id: 2, text: 'Evitá anteojos o algo que dificulte el proceso.', icon: <RiNumber2 className='w-full' /> },
  { id: 3, text: 'Posá con una expresión neutral.', icon: <RiNumber3 className='w-full' /> },
  { id: 4, text: 'Esperá hasta que validemos tu identidad.', icon: <RiNumber4 className='w-full' /> }
];

const CardStep = ({ onClick }) => (
  <div className='flex flex-wrap'>
    {steps.map(step => (
      <div key={step.id} onClick={() => onClick(step.id)} className='w-full md:w-1/2 xl:w-1/4'>
        <CardBasic
          props={{
            phone: '',
            title: <p className='w-1/2 md:w-3/4'>{step.text}</p>,
            icon: step.icon,
            color: 'text-yellow-500',
            bgIcon: 'fondoPrincipal',
            colorIcon: 'colorPrincipal',
            widht: 'w-auto',
            bg: 'bg-white',
            positionBtn: 'absolute'
          }}
        />
      </div>
    ))}
  </div>
);

export default CardStep;
