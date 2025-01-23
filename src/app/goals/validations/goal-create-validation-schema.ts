import { getTomorrowDate } from '@/utils/date-formatter';
import * as yup from 'yup';
import { IGoalFormData } from '../components/CreateGoalModal';

export const goalCreateValidationSchema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .min(2, 'Goal Name is required and must be at least 2 characters long')
    .required(),
  goal_purpose: yup
    .string()
    .trim()
    .min(1, 'Goal Purpose is required')
    .required(),
  description: yup
    .string()
    .trim()
    .min(
      2,
      'Goal description is required and must be at least 2 characters long'
    )
    .required(),
  goal_amount: yup
    .string()
    .trim()
    .test('is-positive', 'Amount must be greater than 0', (value) => {
      if (!value) return false;
      const numericValue = parseFloat(value);
      return !isNaN(numericValue) && numericValue > 0;
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

  // date: yup
  //   .date()
  //   .nullable()
  //   .default(null)
  //   .required('Date is required')
  //   .test(
  //     'not-epoch',
  //     'Date is required',
  //     (value) => value?.getTime() !== new Date(0).getTime()
  //   ),

  target_date: yup
    .date()
    .required('Target date is required')
    .min(getTomorrowDate(), 'Date cannot be today or in the past date'),
  goal_status: yup
    .string()
    .oneOf(['active', 'paused'])
    .required('Status is required'),
  linked_accounts: yup
    .array()
    .of(
      yup.object({
        account_id: yup.string().required('Account is required'),
        contribution_limit: yup.string().test({
          name: 'conditional-contribution-limit',
          test: function (value, context) {
            const goal_purpose =
              context.from &&
              context.from[1] &&
              context.from[1].value.goal_purpose;

            if (goal_purpose === 'repayment') {
              return true; // Skip validation for repayment
            }

            // Check if value exists and is a valid positive number
            if (!value) return false;
            const numValue = parseFloat(value);
            return !isNaN(numValue) && numValue > 0;
          },
          message:
            'Contribution limit must be a valid positive number for savings goals',
        }),
      })
    )
    .min(1, 'At least one account must be linked')
    .required('Linked accounts are required'),
}) as yup.ObjectSchema<IGoalFormData>;
