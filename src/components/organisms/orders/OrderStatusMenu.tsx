import MenuItem from '@/components/atoms/menu/MenuItem'
import { orderStatus } from '@DB/model/appConfig'
import useSearchParamsHook from '@Lib/global/useSearchParams'
import { IconButton, Menu, MenuHandler, MenuList } from '@material-tailwind/react'
import { TbFilterDown } from 'react-icons/tb'



function OrderStatusMenu() {
   const { pushQuery, searchParams } = useSearchParamsHook()
   const status = searchParams.get('status') || 'All'
   const items = ['All', ...orderStatus]
   return (
      <Menu>
         <MenuHandler>
            <IconButton size='sm' color='white'
               className='rounded-md dark:bg-black dark:text-blue-gray-50'
            >
               <TbFilterDown className={`w-5 h-5 dark:text-white`} />
            </IconButton>
         </MenuHandler>
         <MenuList>
            {items.map((item) => (
               <MenuItem
                  key={item}
                  active={Boolean(status == item)}
                  onClick={() => pushQuery({ status: item == 'All' ? "" : item })}
               >{item}</MenuItem>
            ))}
         </MenuList>
      </Menu>
   )
}

export default OrderStatusMenu