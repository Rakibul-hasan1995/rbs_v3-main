'use client'
import CheckBoxInput from '@/components/atoms/inputs/CheckBox'
import { Checkbox, IconButton, Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react'
import React from 'react'
import { FaCheck, FaUser } from 'react-icons/fa'
import { RiMenuSearchLine } from 'react-icons/ri'

function Dashboard() {
  return (
    <div className='p-4 space-x-5 bg_primary flex'>
      

      <Menu placement='bottom'>
        <MenuHandler>
          <IconButton className='rounded-md' color='white'>
            <RiMenuSearchLine className='w-4 h-4' />
          </IconButton>
        </MenuHandler>
        <MenuList>
          <MenuItem>
            Customers
          </MenuItem>
          <MenuItem>
            Orders
          </MenuItem>
        </MenuList>
      </Menu>



    </div>
  )
}

export default Dashboard