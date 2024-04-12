import { MenuItem as Item, MenuItemProps as ItemProps } from '@material-tailwind/react'
import React, { forwardRef } from 'react'
import { IoCheckmarkDoneOutline } from 'react-icons/io5';
import { twMerge } from 'tailwind-merge';

type Props = ItemProps & {
   active?: boolean
}

// eslint-disable-next-line react/display-name
const MenuItem = forwardRef((props: Props, ref) => {

   const { active, ...rest } = props;

   const itemProps :any= { ...rest };
   delete itemProps.active;

   return (
      <Item
         ref={ref}
         {...itemProps}
         className={twMerge(`flex items-center justify-between my-[2px] ${itemProps?.className} ${props.active ? 'bg-blue-500/10 font-semibold' : ""} `)}
      >
         {itemProps?.children}
         {props.active && <IoCheckmarkDoneOutline className='w-4 h-4' />}
      </Item>
   )
})

export default MenuItem