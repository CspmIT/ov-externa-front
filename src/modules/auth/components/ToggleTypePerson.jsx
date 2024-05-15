import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useState } from 'react'

function ToggleTypePerson({ changeSelect }) {
  const [alignment, setAlignment] = useState('fisica')

  const handleChange = (event, newAlignment) => {
    if (newAlignment) {
      setAlignment(newAlignment)
      changeSelect(newAlignment)
    }
  }

  return (
    <ToggleButtonGroup color='secondary' value={alignment} exclusive onChange={handleChange} aria-label='Platform'>
      <ToggleButton value='fisica'>Soy Una Persona</ToggleButton>
      <ToggleButton value='legal'>Soy una Empresa/Comercio</ToggleButton>
    </ToggleButtonGroup>
  )
}

export default ToggleTypePerson
