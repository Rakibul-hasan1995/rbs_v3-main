
'use client'
import React, { createContext, useState, useContext } from 'react';

export type Conte<T> = {
   state: T;
   setState: React.Dispatch<React.SetStateAction<T>>
};

export const SharedContext = createContext<Conte<any> | undefined>(undefined);

export const SharedContextProvider = ({ children }: { children: React.ReactNode }) => {
   const [state, setState] = useState();

   const value = {
      state,
      setState,
   }

   return (
      <SharedContext.Provider value={value}>
         {children}
      </SharedContext.Provider>
   );
};

export const useSharedContext = () => {
   const context = useContext(SharedContext);
   if (!context) {
      throw new Error('useSharedContext must be used within a SharedContext');
   }
   return context;
};
