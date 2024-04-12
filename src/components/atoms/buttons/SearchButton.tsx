import React from 'react'
import IconButton from './IconButton'
import { MdSearch } from 'react-icons/md'

type Props = {
   onClick?: () => void
}
function SearchButton({ onClick = () => { } }: Props) {
   return (
      <IconButton size='sm'  color='white'
         className='rounded-md dark:bg-black dark:text-blue-gray-50'
         onClick={onClick}
      >
         <MdSearch className='w-5 h-5' />
      </IconButton>
   )
}

export default SearchButton