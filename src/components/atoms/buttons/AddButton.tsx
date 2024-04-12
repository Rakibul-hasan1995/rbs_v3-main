import React from 'react'
import IconButton from './IconButton'
import { BiPlus } from 'react-icons/bi'

type Props = {
   onClick?: () => void
}
function AddButton({ onClick = () => { } }: Props) {
   return (
      <IconButton size='sm' variant='gradient' color='green'
      className='rounded-md'
         onClick={onClick}
      >
         <BiPlus className='w-5 h-5' />
      </IconButton>
   )
}

export default AddButton