import useSearchParamsHook from '@Lib/global/useSearchParams'
import { Pagination } from '@Types/index'

import { IconButton, Menu, MenuHandler, MenuList } from '@material-tailwind/react'
import { BsChevronBarLeft, BsChevronBarRight, BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import MenuItem from '../atoms/menu/MenuItem'
function PaginationBar({ pagination }: { pagination: Pagination }) {
   const { limit, currentPage, nextPage, prevPage, totalDocuments, totalPages } = pagination

   const { pushQuery } = useSearchParamsHook()

   const limits = [10, 20, 50, 100, 200, 500, 'All']


   return (
      <div className="h-12 w-full sticky bottom-0  flex px-2 sm:justify-between xl:gap-1 rounded-t-md items-center bg_blur border_t border_l border_r">
         <Menu placement='top-start' allowHover>
            <MenuHandler >
               <span className='cursor-pointer'>limit : {limit}</span>
            </MenuHandler>
            <MenuList>
               {limits.map((item) => (
                  <MenuItem
                     onClick={() => pushQuery({ limit: item })}
                     key={item}
                     active={limit == item}
                     className={`${limit == item ? "bg-blue-500/10 flex items-center justify-between" : ""} `}
                  >
                     {item}
                  </MenuItem>
               ))}

            </MenuList>
         </Menu>


         <span>Total : {totalDocuments}</span>



         <div className="space-x-2">
            <IconButton
               onClick={() => pushQuery({ page: 1 })}
               disabled={!Boolean(prevPage)}
               // hidden={!Boolean(nextPage)}
               size='sm' variant='text' color='cyan' className='h-6 w-6 rounded-full'>
               <BsChevronBarLeft className='w-5 h-5' />
            </IconButton>
            <IconButton
               onClick={() => pushQuery({ page: prevPage })}
               disabled={!Boolean(prevPage)}
               // hidden={!Boolean(nextPage)}
               size='sm' variant='text' color='cyan' className='h-6 w-6 rounded-full'>
               <BsChevronLeft className='w-4 h-4' />
            </IconButton>
            <span>{currentPage}</span>
            <IconButton
               onClick={() => pushQuery({ page: nextPage })}
               disabled={!Boolean(nextPage)}
               // hidden={!Boolean(nextPage)}
               size='sm' variant='text' color='cyan' className='h-6 w-6 rounded-full'>
               <BsChevronRight className='w-4 h-4' />
            </IconButton>
            <IconButton
               onClick={() => pushQuery({ page: totalPages })}
               disabled={!Boolean(nextPage)}
               // hidden={!Boolean(nextPage)}
               size='sm' variant='text' color='cyan' className='h-6 w-6 rounded-full'>
               <BsChevronBarRight className='w-5 h-5' />
            </IconButton>
         </div>
      </div>
   )
}

export default PaginationBar