import * as yup from 'yup';

export const goalCreateValidationSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(2, 'Goal Name is required and must be at least 2 characters long')
    .required(),
  amount: yup
    .string()
    .trim()
    .test('is-positive', 'Amount must be greater than 0', (value) => {
      if (!value) return false;
      const numericValue = parseFloat(value); // Convert the string to a number
      return !isNaN(numericValue) && numericValue > 0; // Check if it's a number and greater than 0
    })
    .min(2, 'Amount must be at least 2 characters long')
    .required('Amount is required'),

  // monthlyAmount: yup
  //   .string()
  //   .trim()
  //   .min(2, 'Monthly Amount must be at least 2 characters long')
  //   .test(
  //     'is-greater-than-amount',
  //     'Monthly Amount must be greater than Amount',
  //     function (value) {
  //       const { amount } = this.parent; // Access the `amount` field
  //       const monthlyAmountValue = parseFloat(value || '0');
  //       const amountValue = parseFloat(amount || '0');

  //       // Validate that monthlyAmount is greater than amount
  //       return (
  //         !isNaN(monthlyAmountValue) &&
  //         !isNaN(amountValue) &&
  //         monthlyAmountValue > amountValue
  //       );
  //     }
  //   )
  //   .required('Monthly Amount is required'),

  date: yup
    .date()
    .nullable()
    .default(null)
    .required('Date is required')
    .test(
      'not-epoch',
      'Date is required',
      (value) => value?.getTime() !== new Date(0).getTime()
    ),

  status: yup
    .string()
    .oneOf(['active', 'paused'], 'Status must be either "active" or "paused"')
    .required('Status is required'),
});
