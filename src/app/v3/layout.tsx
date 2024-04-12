import GlobalNav from '@/components/templates/Navbar/GlobalNav'
import Sidebar from '@/components/templates/sidebar/Sidebar'
import React from 'react'

function layout({ children }: { children: React.ReactNode }) {
   return (
      <div className='h-screen  bg_secondary'>
         <Sidebar >
            <div>
               <GlobalNav />
              
               <div className="h-[calc(100vh-50px)] overflow-hidden">
                  {children}
               </div>
            </div>
         </Sidebar>

      </div>
   )
}

export default layout