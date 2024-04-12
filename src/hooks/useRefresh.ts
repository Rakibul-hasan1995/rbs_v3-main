import useSearchParamsHook from '@Lib/global/useSearchParams'
import { useSearchParams } from 'next/navigation'

function useRefresh() {
   const searchParams = useSearchParams()
   const refreshState = searchParams.get('refresh') == '1' ? '0' : '1'

   const { pushQuery } = useSearchParamsHook()

   const refresh = () => {
      pushQuery({ refresh: refreshState })
   }
   return { refresh }
}

export default useRefresh