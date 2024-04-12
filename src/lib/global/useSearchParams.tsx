'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function useSearchParamsHook() {
   const searchParams = useSearchParams()
   const { replace } = useRouter();
   let searchQuery = ''

   const pathName = usePathname()
   const params = new URLSearchParams(searchParams);
   
   if (typeof window !== "undefined") {
      searchQuery = window.location.search
   }
   

   const pushQuery = (value: any) => {
      Object.keys(value).forEach((key) => {
         if (!value[key]) {
            params.delete(key);
         } else {
            params.set(key, value[key]);
         }
      })
      replace(`${pathName}?${params.toString()}`);
   }

   return { pushQuery, searchParams, searchQuery }
}
