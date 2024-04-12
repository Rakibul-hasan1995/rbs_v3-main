'use client'
import React from 'react'
import { IconButton as Button, IconButtonProps } from '@material-tailwind/react'
import { twMerge } from 'tailwind-merge'




function IconButton(btnProps: IconButtonProps) {
   const props: any = btnProps
   return (
      <Button
         {...props}
         size={props.size || 'sm'}
         variant={props.variant || 'gradient'}
         color={props.color || 'deep-purple'}
         className={twMerge(`rounded-full ${props.className}`)}
      >
         {props.children}
      </Button>
   )
}

export default IconButton