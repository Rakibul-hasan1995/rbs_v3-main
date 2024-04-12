'use client'
/* eslint-disable react-hooks/exhaustive-deps */


// third party imports
import React, { useEffect } from 'react'
import { Menu, MenuHandler, IconButton, MenuList, } from '@material-tailwind/react'

// icons import
import { RiMenuSearchLine } from 'react-icons/ri'

// nav shared context
import { useSharedContext } from '@/context/sharedContext'

// type of nav Shared Context
import { NavContext } from '@Types/navContext'

// my components
import MenuItem from '@/components/atoms/menu/MenuItem';


function NavBarSearchMenu() {

   const { state, setState }: NavContext = useSharedContext()
   const searchBy = state?.searchBy


   useEffect(()=>{
      setState((prev) => {
         return ({ ...prev, searchBy: "Global" })
      })
   }, [])



   const menuItems = ['Customers', 'Orders', 'Global']

   return (
      <Menu placement='bottom-start'>
         <MenuHandler>
            <IconButton className='' size='sm' color='white'>
               <RiMenuSearchLine className='w-4 h-4' />
            </IconButton>
         </MenuHandler>
         <MenuList>
            {menuItems.map((item: any) => (
               <MenuItem
                  key={item}
                  active={searchBy == item}
                  onClick={() => setState((prev) => {
                     return ({ ...prev, searchBy: item })
                  })}
               >
                  {item}
               </MenuItem>

            ))}
         </MenuList>
      </Menu>
   )
}

export default NavBarSearchMenu