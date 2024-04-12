import { Checkbox, CheckboxProps } from '@material-tailwind/react'
import React from 'react'
import { FaMinus } from 'react-icons/fa'


type Props = CheckboxProps & {
   indeterminate?: boolean
}
function CheckBoxInput(props: Props) {

   const { indeterminate, ...rest } = props;

   const itemProps: any = { ...rest };
   delete itemProps.active;

   return (
      <Checkbox
         color='blue'
         icon={
            props.indeterminate && <FaMinus />
         }
         {...itemProps}
         containerProps={{ className: "p-1", ...props.containerProps }}
         className={`bg-transparent ${props.className}`}
         crossOrigin={undefined}
      />
   )
}

export default CheckBoxInput