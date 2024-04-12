'use client'
import AsyncSelect from 'react-select/async';
import { useId, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import Select from 'react-select';
import debounce from 'debounce-promise';

type InputProps = {
   value: any;
   onChange: any;
   onBlur?: any;
   name: string;
   disabled?: boolean;
   type?: any;
   placeholder?: string
}

export type AsyncOption = {
   label: string | React.ReactNode;
   value: string | number;
}

interface StandardInputAsyncProps {
   inputProps: InputProps;
   error?: string;
   label?: string;
   loadOptions: (arg: any) => any;
   menuPlacement?: 'top' | 'bottom' | 'auto'
   labelCssClass?: string;
   options?: AsyncOption[];
}

function AsyncSelectInput({
   options, error, loadOptions, inputProps, labelCssClass, label, menuPlacement = 'auto'
}: StandardInputAsyncProps) {
   const [loading, setLoading] = useState(false)
   const [inputValue, setInputValue] = useState('')



   const loadData = debounce(async (value) => {
      if (value.length < 3) {
         return Promise.resolve([]);
      }
      setLoading(true)
      const data = await loadOptions(value)
      setLoading(false)
      return data
   }, 500);


   // const loadData: any = async (x: any) => {
   //    try {
   //       setLoading(true)
   //       const data = await loadOptions(x)
   //       return data
   //    } catch (error) {
   //       console.log(error)
   //    } finally { setLoading(false) }
   // }

   return (
      <div className='w-full  '>
         {label && <label htmlFor={inputProps.name} className={twMerge(`capitalize px-2 ${error ? 'text-red-600' : ""} ${labelCssClass}`)}>{label || inputProps.name}</label>}
         <AsyncSelect
            // unstyled

            // onChange={inputProps.onChange}
            // onBlur={inputProps.onBlur}
            // name={inputProps.name}
            // value={inputProps.value}

            {...inputProps}
            inputValue={inputValue}
            onInputChange={(text) => setInputValue(text)}
            instanceId={useId()}
            id={inputProps.name}
            placeholder={inputProps.placeholder || undefined}
            inputId={inputProps.name}
            defaultValue={inputProps.value}
            loadOptions={loadData}
            isLoading={loading}
            maxMenuHeight={500}
            defaultOptions={options || true}
            cacheOptions={true}
            menuPlacement={menuPlacement}
            // isClearable
            // autoFocus

            classNames={{
               input: () => `[&_input:focus]:ring-0 dark:text-blur-gray-50`,
               control: (state) =>
                  twMerge(`
                    ${Boolean(error) ? "ring-2 ring-red-600/50 focus:ring-red-600/50 w-full" : ""}
                     ${!state.isFocused ? '' : ""} 
                     rounded-md flex border-[1px] border-gray-500 h-8 `),
               container: () => "",
               menuList: () => "scroll-box z-50 dark:text-blue-gray-900",
               dropdownIndicator: ({ isFocused, getStyles }) => `${isFocused ? 'rotate-180' : 'rotate-0'} duration-300`
            }}
            styles={{
               control: (_baseStyles, state) => ({
                  boxSizing: "unset",
                  width: "100%",
                  backgroundColor: 'transparent',
                  outline: state.isFocused ? '4px solid #b1ecf3e6' : "none",
                  outlineOffset: "1px"
               }),
               input: (baseStyle) => ({
                  position: 'absolute',
                  padding: '10px'
               })
            }}
         />
         {error && <p className='text-sm text-red-600 mt-1 px-2'>{error}</p>}
      </div>
   );
}


interface StandardSelect {
   inputProps: InputProps;
   error?: string;
   label?: string;
   isDisabled?: boolean;
   labelCssClass?: string;
   menuPlacement?: 'top' | 'bottom' | 'auto'
   options?: {
      label: string;
      value: string | number;
   }[];
}

function SelectInput({
   inputProps, options, error, isDisabled, label, labelCssClass, menuPlacement = 'auto'

}: StandardSelect) {


   return (
      <div className=''>
         <label htmlFor={inputProps.name} className={twMerge(`capitalize px-2 ${error ? 'text-red-600' : ""} ${labelCssClass}`)}>{label || inputProps.name}</label>

         <Select
            className="basic-single"
            classNamePrefix="select"
            defaultValue={inputProps.value}
            isDisabled={isDisabled}
            // isLoading={isLoading}
            menuPlacement={menuPlacement}
            isClearable
            isSearchable
            name="color"
            options={options}

            classNames={{
               input: () => `[&_input:focus]:ring-0 `,
               control: (state) =>
                  twMerge(`
                    ${Boolean(error) ? "ring-2 ring-red-600/50 focus:ring-red-600/50" : ""}
                     ${!state.isFocused ? '' : ""} 
                     rounded-md flex border-[1px] border-gray-500 h-8 `),
               container: () => "",
               menuList: () => "scroll-box",
               dropdownIndicator: ({ isFocused }) => `${isFocused ? 'rotate-180' : 'rotate-0'} duration-300`
            }}
            styles={{
               control: (_baseStyles, state) => ({
                  boxSizing: "unset",
                  backgroundColor: 'transparent',
                  outline: state.isFocused ? '4px solid #b1ecf3e6' : "none"
               }),
            }}

         />

      </div>
   );
}





export { AsyncSelectInput, SelectInput }
