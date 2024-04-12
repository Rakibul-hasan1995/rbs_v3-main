import React from 'react'
import IconButton from './IconButton'
import { FaRegEdit } from 'react-icons/fa'

type Props = {
   onClick?: () => void
}
function EditButton({ onClick = () => { } }: Props) {
   return (
      <IconButton size='sm' variant='gradient' color='amber'
         className='rounded-md'
         onClick={onClick}
      >
         <FaRegEdit className='w-5 h-5' />
      </IconButton>
   )
}

export default EditButton