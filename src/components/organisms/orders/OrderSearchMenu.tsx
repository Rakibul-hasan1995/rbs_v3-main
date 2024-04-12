import { AsyncOption } from '@/components/atoms/inputs/AsyncSelect'
import MenuItem from '@/components/atoms/menu/MenuItem'
import useSearchParamsHook from '@Lib/global/useSearchParams'
import { IconButton, Menu, MenuHandler, MenuList } from '@material-tailwind/react'
import { TbFilterDown } from 'react-icons/tb'

const Items: AsyncOption[] = [
   {
      label: 'Default',
      value: ''
   },
   {
      label: 'Order Name',
      value: 'order_name'
   },
   {
      label: 'Program Name',
      value: 'program_name'
   },
   {
      label: 'Customer Name',
      value: 'customer.user_name'
   },
]


function OrderSearchMenu() {
   const { pushQuery , searchParams} = useSearchParamsHook()
   const searchBy = searchParams.get('search_by')|| ''
   return (
      <Menu allowHover>
         <MenuHandler>
            <IconButton size='sm' color='white'
               className='rounded-md dark:bg-black dark:text-blue-gray-50'
            >
               <TbFilterDown className={`w-6 h-6 dark:text-white`} />
            </IconButton>
         </MenuHandler>
         <MenuList>
            {Items.map((item) => (
               <MenuItem 
               key={item.value}
               active={Boolean(searchBy == item.value)}
               onClick={()=>pushQuery({search_by: item.value})}
               >{item.label}</MenuItem>
            ))}
         </MenuList>
      </Menu>
   )
}

export default OrderSearchMenu