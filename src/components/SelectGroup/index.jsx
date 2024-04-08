const SelectGroup = ({ props, register }) => {
  return (
    <div className={`mt-5`}>
      {props.label && <label className='block font-semibold ml-1 mb-2 dark:text-white'>{props.label}</label>}
      <select name={props.name} {...register} className='block bg-white dark:bg-zinc-800 w-full rounded-md border-0 p-3 text-gray-900 dark:text-gray-200 shadow placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6'>
        <option className='robotoCondensed' value=''>
          Seleccionar...
        </option>
        {props.options.map((item, index) => (
          <option className='robotoCondensed' key={index} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectGroup
