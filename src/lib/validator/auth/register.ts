


export const registerValidator = (user: any) => {
   let error: any = {}
   if (!user.email) {
      error.email = 'Email is required'
   } else {
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      const validate = regex.test(user.email)
      if (!validate) {
         error.email = '! invalid email'
      }
   }
   if (!user.password) {
      error.password = 'Password is required'
   } 


   return {
      error,
      isValid: Boolean(Object.keys(error).length == 0)
   }
}