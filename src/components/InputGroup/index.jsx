import { useEffect, useState } from 'react'

const InputGroup = ({ validation, ...props }) => {
  const errors = props.errors ?? null
  const validationType = {
    number: {
      required: {
        value: props.required ?? false,
        message: 'Este campo es obligatorio'
      }
    },
    text: {
      required: {
        value: props.required ?? false,
        message: 'Este campo es obligatorio'
      }
    },
    email: {
      required: {
        value: props.required ?? false,
        message: 'Este campo es obligatorio'
      }
    },
    date: {
      required: {
        value: props.required ?? false,
        message: 'Este campo es obligatorio'
      }
    },
    password: {
      required: {
        value: props.required ?? false,
        message: 'Este campo es obligatorio'
      },
      pattern: {
        value: /^(?=.*[A-Z]).{6,}$/,
        message: 'La contraseña debe contener al menos una mayúscula y seis carácteres'
      }
    }
  }
  const [register, setRegister] = useState({})
  useEffect(() => {
    if (validation) {
      const optionValidate = validationType[props.type]
      if (props.maxLength) optionValidate.maxLength = props.maxLength
      if (props.minLength) optionValidate.minLength = props.minLength
      if (props.max) optionValidate.max = props.max
      if (props.min) optionValidate.min = props.min
      if (props.pattern) optionValidate.pattern = props.pattern
      if (props.validate) optionValidate.validate = props.validate
      setRegister({ ...validation(props.name ? props.name : props.id, optionValidate ?? null) })
    }
  }, [])
  const typeValidate = ['required', 'maxLength', 'minLength', 'max', 'min', 'pattern', 'validate', 'matchesPreviousPassword']
  return (
    <div className={props.className}>
      {props.title && <label className='block font-semibold ml-1 mb-2 dark:text-white'>{props.title}</label>}
      <div className='relative flex flex-col items-center justify-center'>
        <input disabled={props.disabled === 'disabled' ? props.disabled : ''} {...register} value={props.value} onChange={props.onChange} name={props.name ? props.name : props.id} type={props.type} placeholder={props.ph} id={props.id || ''} className='block w-full h-12 rounded-md border-0 p-1.5 text-gray-900 dark:bg-zinc-800 dark:text-gray-200 shadow-sm ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6' />
        {props.showPass && (
          <button type='button' key={props.id ?? props.name} className={'absolute right-3 '} onClick={props.showPass}>
            {props.btnIcon}
          </button>
        )}
      </div>
      {errors &&
        typeValidate.map((key) => {
          if (errors[props.name ? props.name : props.id]?.type === key) {
            return (
              <span key={key} className='text-red-500'>
                {errors[props.name ? props.name : props.id]?.message}
              </span>
            )
          }
          return null
        })}
    </div>
  )
}

export default InputGroup
