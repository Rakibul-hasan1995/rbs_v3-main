import useSearchParamsHook from '@Lib/global/useSearchParams';
import React, { useEffect, useRef, useState } from 'react';
// import PaginationBar from './layout/pagination';
import { Pagination } from '@Types/index';

import { isEven } from '@Lib/global/isEven';
import { twMerge } from 'tailwind-merge'
import { Spinner } from '@material-tailwind/react';
import TextInput from '../atoms/inputs/TextInput';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import Loading from '../molecules/Loading';
import PaginationBar from '../molecules/pagination';



type NestedKeys<T> = T extends Record<string, any> ? keyof T : never;

export type ColumnDef<T> = {
   headerName: string;
   field: NestedKeys<T> | [NestedKeys<T>, string];
   sortable?: boolean
   editable?: boolean;
   searchable?: boolean;
   cssClass?: string;
   headerCssClass?: string;
   type?: 'string' | 'number';
   formatter?: (value: string, row?: T) => string | React.ReactNode;
   headerFormatter?: (value: string, col: any) => string | React.ReactNode;
}



type Props = {
   columnDef: ColumnDef<any>[],
   rowData: any[],
   rowStep?: boolean;
   pagination?: Pagination
   onCellValueChange?: (value: any, row: any,) => void
   onClickRow?: (row: any) => void;
   containerClass?: string;
   showHeader?: boolean;
   topSpace?: string;
   keyExtractor?: (item: any, index: number) => string | number;
   activeRow?: string | number
   activeRowCssClass?: string;
   rowCssClass?: string;
   headerCssClass?: string;
   loading?: boolean
}

const getFieldValue = (col: any, row: any) => {
   let value
   if (typeof col.field !== 'string') {
      value = col.field.reduce((obj: any, key: any) => obj && obj[key], row);
   } else {
      value = row[col.field]
   }
   if (col.formatter) {
      value = col.formatter(value, row)
   }
   return value
}




const Table = ({
   columnDef,
   rowData,
   pagination,
   containerClass,
   onCellValueChange = () => { },
   onClickRow = () => { },
   showHeader = true,
   topSpace = '50px',
   rowStep = false,
   keyExtractor = (item, i) => i,
   activeRow,
   activeRowCssClass,
   rowCssClass,
   headerCssClass,
   loading
}: Props) => {

   const { searchParams, pushQuery } = useSearchParamsHook()
   const sort_key = searchParams.get('sort_key')
   const sort_type = searchParams.get('sort_type')




   const EditableCell = ({ col, row }: { col: any, row: any[] }) => {
      const [isEditable, setEditable] = useState(false)
      const [inputValue, setInputValue] = useState('')
      const [inputWidth, setInputWidth] = useState(0)

      const tdRef = useRef<any>(null)
      useEffect(() => {
         const wi = tdRef.current.offsetWidth
         setInputWidth(wi)
         setInputValue(row[col.field])
         // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

      return (
         <td
            ref={tdRef}
            onDoubleClick={() => setEditable((p) => !p)}
            className={twMerge(`           
            ${isEditable ? '' : 'p-2 px-4 text-center'}
            ${col.type == 'number' ? 'text-right' : ''}
            ${col.cssClass} `)}

            style={{ width: `${inputWidth}px` }}
         >
            {isEditable ?
               <form onSubmit={(e) => {
                  e.preventDefault()
                  onCellValueChange({ [col.field]: inputValue }, row)
               }}>
                  <TextInput
                     inputCssClass={`input w-full text-[10px]`}
                     inputProps={{
                        autoFocus: true,
                        value: inputValue,
                        type: col.type == 'number' ? "number" : 'text',
                        onChange: (e) => { setInputValue(e.target.value) },
                        onBlur: () => { setEditable((p) => !p) },

                     }}
                  />
                  {/* <input
                     autoFocus
                     className={`input w-full text-[10px]`}
                     type="text"
                     value={inputValue}
                     onChange={(e) => { setInputValue(e.target.value) }}
                     onBlur={() => setEditable((p) => !p)}
                  /> */}
                  <button className='hidden' type='submit'> </button>
               </form>

               : getFieldValue(col, row)}
         </td>
      )
   }

   const HeaderCellFormate = ({ col }: { col: ColumnDef<any> }) => {
      if (col.headerFormatter) {
         const value = col.headerFormatter(col.headerName, col)
         return (
            value
         )
      } else {
         return (
            col.headerName
         )
      }

   }




   return (
      <div className={twMerge(`w-full scroll-box h-screen bg_primary dark:text-blue-gray-50 relative ${containerClass}`)}  >
         <div className={` h-[${topSpace}]`} />
         {loading && <Loading /> }
         <table className="w-full">
            {showHeader &&
               <thead>
                  <tr className={twMerge(`border_b sticky top-[50px] bg_primary border_b shadow-md z-10 font-bold ${headerCssClass}`)}  >
                     {columnDef.map((col) => (
                        <td
                           key={col.headerName}
                           className={twMerge(`text-center   
                        ${col.type == 'number' ? "text-right" : ""}        
                         ${col.headerCssClass} `
                           )}
                           onClick={() => {
                              if (col.sortable) {
                                 pushQuery({ sort_key: col.field, sort_type: sort_type == 'asc' ? "desc" : "asc" })
                              }
                           }}
                        >
                           <div className={`
                        p-2 px-4
                         ${col.sortable ? "flex items-center cursor-pointer group  relative" : ""} `}>
                              {Boolean(col.headerFormatter) ? <HeaderCellFormate col={col} /> : col.headerName}
                              {<MdChevronRight className={`w-3 h-3 rotate-90 hidden group-hover:block absolute -right-0 duration-200 transition-all 
                           ${sort_key == col.field && sort_type == 'asc' ? '' : 'rotate-180'}
                     `} />}
                           </div>
                        </td>
                     ))}
                  </tr>
               </thead>}
            <tbody >
               {rowData.map((row: any, i) => (
                  <tr
                     key={keyExtractor(row, i)}
                     onClick={() => onClickRow(row)}
                     className={twMerge(
                     ` cursor-pointer border_b
                      hover:!bg-blue-500/10
                     ${isEven(i) && rowStep ? 'bg-blue-gray-50/50 dark:bg-blue-gray-900/30 ' : ""}
                      ${activeRow == keyExtractor(row, i) ? activeRowCssClass : ""}
                     ${rowCssClass}
                     `
                     )}
                  >
                     {columnDef.map((col, i) => (
                        <React.Fragment key={col.headerName + i}>
                           {col.editable ?
                              <EditableCell col={col} row={row} />
                              :
                              <td
                                 className={twMerge(`p-2 px-4 ${col.type == 'number' ? 'text-right' : ""}  ${col.cssClass}`)}
                              >
                                 {getFieldValue(col, row)}
                              </td>
                           }
                        </React.Fragment>
                     ))}
                  </tr>
               ))}
            </tbody>
         </table>
         {
            // pagination && <p>Pagination</p>
            pagination && <PaginationBar pagination={pagination} />
         }
      </div>
   );
};

export default Table;

