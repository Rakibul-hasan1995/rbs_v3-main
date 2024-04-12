import React from 'react'
import IconButton from './IconButton'
import { MdRefresh } from "react-icons/md";

type Props = {
   onClick?: () => void;
   loading?: boolean
}
function RefreshButton({ onClick = () => { }, loading }: Props) {
   return (
      <IconButton  color='white'
         className='rounded-md dark:bg-black dark:text-blue-gray-50'
         onClick={onClick}
         disabled={loading}
      >
         <MdRefresh className={`w-6 h-6 dark:text-white ${loading ? "animate-spin" : ""}`} />
      </IconButton>
   )
}

export default RefreshButton
