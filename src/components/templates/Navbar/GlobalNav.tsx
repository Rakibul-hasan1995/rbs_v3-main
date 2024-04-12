'use client'

import IconButton from '@/components/atoms/buttons/IconButton'
import ToggleTheme from '@/components/atoms/buttons/toggleTheme'
import NavbarSearchHistory from '@/components/organisms/nav/NavBarSearchHistory'
import NavBarSearchInput from '@/components/organisms/nav/NavBarSearchInput'
import NavBarSearchMenu from '@/components/organisms/nav/NavBarSearchMenu'

import { SharedContextProvider } from '@/context/sharedContext'

import React from 'react'
import { TbSum } from 'react-icons/tb'
import { twMerge } from 'tailwind-merge'

function GlobalNav() {
  return (
    <SharedContextProvider >
      <nav className={twMerge(`h-[50px] sticky top-0 flex items-center w-[100%]  z-50 bg_primary border_b shadow-sm justify-between px-3`)}>
        <div className="flex w-full gap-3 ">
          <NavbarSearchHistory />
          <NavBarSearchMenu />
          <NavBarSearchInput />
        </div>
        <div className="flex gap-3"
        >
          <ToggleTheme />
          <IconButton className='rounded-md' variant='gradient' color='white'>
            <TbSum className='w-5 h-5' />
          </IconButton>
        </div>
      </nav>
    </SharedContextProvider>
  )
}

export default GlobalNav