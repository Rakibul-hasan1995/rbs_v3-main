
export type State = {
   searchBy: 'Customers' | "Orders" | "Global"
}

export type NavContext = {
   state: State
   setState: React.Dispatch<React.SetStateAction<State>>
}