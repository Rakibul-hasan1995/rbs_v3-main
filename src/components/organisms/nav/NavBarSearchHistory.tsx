import React from 'react'
import IconButton from '../../atoms/buttons/IconButton'
import { MdHistory } from 'react-icons/md'

function NavbarSearchHistory() {
  return (
    <IconButton className='rounded-md' color='blue-gray'>
      <MdHistory className='w-5 h-5' />
    </IconButton>
  )
}

export default NavbarSearchHistory