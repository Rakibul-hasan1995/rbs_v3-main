'use client';
import { Accordion, AccordionBody, Tooltip } from '@material-tailwind/react';
import Link from 'next/link'

import { useParams } from 'next/navigation';
import React, { useState } from 'react'
import { sidebarItems } from './sidebarItems';
import { twMerge } from 'tailwind-merge';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';


const ICON_ROTATE_DURATION = '200'


export default function Sidebar({ children }: { children: React.ReactNode }) {
   const [expand, setExpand] = useState(false)
   const [selected, setSelected] = useState('xu')
   const [collapse, setCollapse] = useState<any>(undefined)

   const handleCollapse = (value: any) => {
      const x = collapse === value ? undefined : value
      setCollapse(x);
      setSelected(collapse)
      if (expand) {
         setExpand(false)
      }
   };

   const activePage = useParams()
   let route_name = activePage.routeName

   const isSelected = (text: any) => {
      let routeNames: string[]
      if (typeof route_name == 'string') {
         routeNames = route_name.split('-')
         return Boolean(routeNames.includes(text))
      } else {

         return Boolean(selected == text)
      }
   }

   const Item = ({ item, onClick = () => { }, isChild = false, isExpand }: { isExpand: boolean, item: any, onClick?: () => void, isChild?: boolean }) => {
      const lisClass = twMerge(
         `flex justify-between items-center gap-3 my-1 duration-200 text-blue-gray-50 py-2 px-3 rounded-md w-full hover:bg-sidebar-bg-secondary
         ${isSelected(item.name) ? "bg-sidebar-bg-secondary text-cyan-500 font-semibold border-l-4 border-l-cyan-500 rounded-l-none" : ""}`
      )
      return (
         <>
            {!isExpand ?
               <Link
                  href={item.link || "#"}
                  onClick={onClick}
                  className={lisClass}>
                  <>
                     <div className={`flex gap-3 items-center duration-200 `}>
                        {item.icon ? item.icon : <MdChevronRight className='w-5 h-5' />}
                        <p className='text-[12px]'>{item.title}</p>
                     </div>
                     {!isChild && <MdChevronRight
                        className={`
                           h-4 w-4 transition-transform duration-${ICON_ROTATE_DURATION} ${collapse == item.name ? "rotate-90" : "rotate-120"
                           }`}
                     />}
                  </>
               </Link>
               :
               <Tooltip content={item.title} placement="right-end" offset={1}
                  animate={{
                     mount: { scale: 1, x: 0 },
                     unmount: { scale: 0, x: 0 },
                  }}
               >
                  <Link href={item.link || "#"}
                     onClick={onClick}
                     className={lisClass}>
                     {item.icon ? item.icon : <MdChevronRight className='w-5 h-5' />}
                  </Link>
               </Tooltip>
            }
         </>
      )
   }


   return (
      <div className='!text-[12px]'>
         <div className={`bg-sidebar-bg-primary p-2 border_r  h-screen overflow-auto  ${expand ? 'w-[4rem]' : 'w-[15rem]'} duration-200 ease-linear fixed `}>
            <div className="absolute text-blue-gray-50 top-0 flex_center w-full h-12 left-0 bg-sidebar-bg-secondary cursor-pointer " >
               RBS
            </div>
            <div className="h-12" />
            <ul className={`max-h-full overflow-auto overflow-x-hidden scroll-box`}>

               {sidebarItems.map((item) => (
                  <React.Fragment key={item.title}>
                     {item.parent ?
                        <Accordion
                           open={collapse == item.name && !expand}
                        >
                           <Item isExpand={expand} item={item} onClick={() => {
                              handleCollapse(item.name)
                           }} />
                           <AccordionBody className="py-1 pl-4">
                              {item.child?.map((child) => (
                                 <Item key={child.name} isExpand={expand} item={child} isChild onClick={() => setExpand(true)} />
                              ))}
                           </AccordionBody>
                        </Accordion>
                        :

                        <Item isExpand={expand} item={item} isChild onClick={() => setExpand(true)} />

                     }
                  </React.Fragment>
               ))}
            </ul>
            <div className="absolute bottom-0 p-2 w-full left-0 bg-sidebar-bg-secondary cursor-pointer " onClick={() => setExpand((p) => !p)}>
               <MdChevronLeft className={`w-5 h-5 font-bold  mx-auto text-white duration-${ICON_ROTATE_DURATION} ${expand ? 'rotate-180 ' : "rotate-0"}`} />
            </div>
         </div>
         <div className={`${expand ? 'ml-[4rem]' : 'ml-[15rem]'} transition-all duration-200 ease-linear`}>
            {children}
         </div>

      </div>
   )
}


