import { useThemeContext } from '@/context/themeContext'

import { IconButton } from '@material-tailwind/react'
import React from 'react'
import { BiMoon, BiSun } from 'react-icons/bi'
import { twMerge } from 'tailwind-merge'

function ToggleTheme({ buttonClass, iconClass }: { buttonClass?: string, iconClass?: string }) {
   const { isDarkMode, toggleDarkMode } = useThemeContext()
   return (
      <IconButton
         onClick={toggleDarkMode}
         size='sm' variant='gradient' color='deep-purple'  className={twMerge(`dark:text-blue-gray-50 rounded-full ${buttonClass}`)}>
         {isDarkMode ? <BiMoon className={twMerge(`w-5 h-5 ${iconClass}`)} /> : <BiSun className={twMerge(`w-5 h-5 ${iconClass}`)} />}
      </IconButton>
   )
}

export default ToggleTheme