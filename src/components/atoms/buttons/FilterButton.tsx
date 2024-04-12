import { IconButton } from '@material-tailwind/react';
import React from 'react'

import { TbFilterDown } from 'react-icons/tb';

type Props = {
   onClick?: () => void;
   loading?: boolean
}
function FilterButton({ onClick = () => { }, loading }: Props) {
   return (
      <IconButton  color='white'
         className='rounded-md dark:bg-black dark:text-blue-gray-50'
         onClick={onClick}
         disabled={loading}
      >
         <TbFilterDown className={`w-4 h-4 dark:text-white ${loading ? "animate-spin" : ""}`} />
      </IconButton>
   )
}

export default FilterButton
