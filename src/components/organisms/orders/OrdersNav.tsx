'use client';;
import AddButton from '@/components/atoms/buttons/AddButton'
import CloseButton from '@/components/atoms/buttons/CloseButton';
import EditButton from '@/components/atoms/buttons/EditButton';
import LayoutButton from '@/components/atoms/buttons/LayoutButton'
import RefreshButton from '@/components/atoms/buttons/RefreshButton'
import SearchButton from '@/components/atoms/buttons/SearchButton'
import TextInput from '@/components/atoms/inputs/TextInput';


import { useSharedContext } from '@/context/sharedContext'
import useRefresh from '@/hooks/useRefresh'
import { OrderContext } from '@/services/useOrderServices'
import useSearchParamsHook from '@Lib/global/useSearchParams';
import { Badge } from '@material-tailwind/react';
import debounce from 'debounce-promise';
import OrderSearchMenu from './OrderSearchMenu';
import OrderStatusMenu from './OrderStatusMenu';

function OrdersNav() {


  const { state, setState }: OrderContext = useSharedContext()
  const loading = state?.loadingOrders
  const searchMode = state?.searchMode
  const checkedItems = state?.checkedItems || {}
  const isChecked = Object.values(checkedItems).filter(value => value)

  const { refresh } = useRefresh()

  const { pushQuery } = useSearchParamsHook()


  const handleSearch = debounce(async (value) => {
    pushQuery({ search: value })
  }, 500);
  const handleSearchMode = () => {
    setState(prev => ({ ...prev, searchMode: !prev.searchMode }))
  }




  return (
    <div className='flex justify-between bg_primary rounded-t-md items-center h-[50px] border_b  px-3'>
      {searchMode ?
        <>
          <div className="flex gap-3">
            <TextInput
              inputProps={{ autoFocus: true, placeholder: "search in orders ...", onChange: (e) => handleSearch(e.target.value), type: "search" }}
            />
           <OrderSearchMenu />
          </div>
          <CloseButton onClick={handleSearchMode} />
        </>
        : <>
          <div className="flex items-center gap-2">
            <p className='text-lg font-bold'>Orders</p>
            {Boolean(isChecked.length) &&
              <Badge content={isChecked.length} withBorder placement='bottom-end' color='blue'>
                <EditButton />
              </Badge>
            }
          </div>

          <div className="space-x-3">
            <OrderStatusMenu />
            <LayoutButton />
            <AddButton />
            <RefreshButton loading={loading} onClick={refresh} />
            <SearchButton onClick={handleSearchMode} />
          </div>
        </>}

    </div>
  )
}

export default OrdersNav