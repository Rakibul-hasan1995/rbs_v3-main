'use client'
import { useThemeContext } from '@/context/themeContext'
import React from 'react'

function Page() {
  const { toggleDarkMode } = useThemeContext()
  return (
    <div className=''>
      <button onClick={toggleDarkMode} >Click</button>
    </div>
  )
}

export default Page