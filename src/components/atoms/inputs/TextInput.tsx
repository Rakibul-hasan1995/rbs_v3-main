'use client'
import React from 'react'
import { twMerge } from 'tailwind-merge';

type InputProps = {
   value: any;
   onChange: any;
   onBlur: any;
   name: string;
   disabled?: boolean;
   type?: any;
}

type Props = {
   // inputProps: InputProps
   inputProps: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
   label?: string;
   error?: string
   inputCssClass?: string;
   labelCssClass?: string;
}





// eslint-disable-next-line react/display-name
const TextInput = React.forwardRef(({ inputProps, error, inputCssClass, labelCssClass, label }: Props, ref?: any) => {

   const handleSelect = (event: any) => {
      event.target.select()
   }

   return (
      <div className={`w-fit`}>
         {label && <label htmlFor={inputProps.name} className={twMerge(`capitalize px-2 ${error ? 'text-red-600' : ""} ${labelCssClass}`)}>{label || inputProps.name}</label>}
         <input
            ref={ref}
            id={inputProps.name}
            placeholder={inputProps.name}
            onClick={handleSelect}
            className={twMerge(`
             input w-full h-[35px]
            ${Boolean(error) ? "ring-2 ring-red-600/50 focus:ring-red-600/50" : ""}
            ${inputCssClass}
            `)}
            {...inputProps}
            type={inputProps.type || "text"}
         />
         {error && <p className='text-sm text-red-600 mt-1 px-2'>{error}</p>}
      </div>
   )
}
)
export default TextInput