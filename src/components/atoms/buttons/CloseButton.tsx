import React from 'react'
import IconButton from './IconButton'
import { MdClose } from 'react-icons/md'

type Props = {
   onClick?: () => void
}
function CloseButton({ onClick = () => { } }: Props) {
   return (
      <IconButton size='sm' variant='gradient' color='brown'
      className='rounded-md'
         onClick={onClick}
      >
         <MdClose className='w-5 h-5' />
      </IconButton>
   )
}

export default CloseButton