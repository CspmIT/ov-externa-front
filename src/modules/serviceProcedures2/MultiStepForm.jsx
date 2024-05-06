import React from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'

const MultiStepForm = () => (
  <>
    <nav>
      <ul>
        <li>
          <Link to='/multiStepForm/step1'>Paso 1</Link>
        </li>
        <li>
          <Link to='/multiStepForm/step2'>Paso 2</Link>
        </li>
        <li>
          <Link to='/multiStepForm/step3'>Paso 3</Link>
        </li>
      </ul>
    </nav>
    <Routes>
      <Route path='/step1' element={<Step1 />} />
      <Route path='/step2' element={<Step2 />} />
      <Route path='/step3' element={<Step3 />} />
    </Routes>
  </>
)

export default MultiStepForm
