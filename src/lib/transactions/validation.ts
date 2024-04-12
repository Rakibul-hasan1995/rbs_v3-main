const transactionValidation = (data: any) => {
   let error: any = {}

   if (!data.date) {
      error.date = '! date is required'
   }
   if (!data.paid_from_account) {
      error.paid_from_account = '! please select an account'
   }
   if (!data.paid_to_account) {
      error.paid_to_account = '! please select an account'
   }
   if (!data.amount) {
      error.amount = '! amount is required'
   }else if (data.amount < 0) {
      error.amount = '! 0 not accept'
   }
   if (!data.type) {
      error.type = '! Type is required'
   }

   return {
      error,
      isValid: Object.keys(error).length === 0,
   };
};

export default transactionValidation;
