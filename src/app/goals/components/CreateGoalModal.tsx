import { yupResolver } from '@hookform/resolvers/yup';
import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  useForm,
  Control,
  FieldValues,
  UseFormTrigger,
  FieldErrors,
  UseFormWatch,
  UseFormSetValue,
} from 'react-hook-form';
import { goalCreateValidationSchema } from '../validations/goal-create-validation-schema';
import useCreateGoal from '@/hooks/data-hooks/goal/use-create-goal';
import { convertDateApiFormat, getTomorrowDate } from '@/utils/date-formatter';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import useGetBankAccounts from '@/hooks/data-hooks/account/use-get-bank-accounts';
import {
  IFormValues,
  IGoalFormData,
  IUserAccounts,
} from '@/app/goals/interface/goal-interface';
import AccountSelectionModal from './AccountSelectionModal';
import GoalForm from './GoalForm';

interface IGoalModalProps {
  title: string;
  showModal: boolean;
  setShowModal: () => void;
}

const INITIAL_GOAL_FORM_DATA: IGoalFormData = {
  title: '',
  goal_purpose: '',
  description: '',
  goal_amount: '',
  target_date: getTomorrowDate(),
  goal_status: 'active',
  linked_accounts: [],
  tempSelectedAccounts: [],
};

const GoalModal: React.FC<IGoalModalProps> = ({
  title,
  showModal,
  setShowModal,
}) => {
  const [userAccounts, setUserAccounts] = useState<IUserAccounts[]>([]);
  const [showAccountSelectionModal, setShowAccountSelectionModal] =
    useState(false);
  const slug = useSelector((state: RootState) => state.auth.client.slug);

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
    watch,
    setValue,
    trigger,
  } = useForm<IGoalFormData>({
    defaultValues: INITIAL_GOAL_FORM_DATA,
    resolver: yupResolver<IGoalFormData>(goalCreateValidationSchema),
    reValidateMode: 'onChange',
  });

  const goalPurpose = watch('goal_purpose');
  const linkedAccounts = watch('linked_accounts');

  const { mutate: CreateGoal, isPending } = useCreateGoal(slug);
  const { data: bankAccounts, isLoading } = useGetBankAccounts(slug, {
    force_initial_plaid_account_fetch: 'yes',
  });

  const handleGoalCreate = (data: IGoalFormData) => {
    const formData = {
      title: data.title,
      goal_purpose: data.goal_purpose,
      description: data.description,
      goal_amount: Number(data.goal_amount),
      target_date: convertDateApiFormat(data.target_date),
      goal_status: data.goal_status,
      linked_accounts: data.linked_accounts.map((account) => ({
        account_id: account.account_id,
        contribution_limit: Number(account.contribution_limit),
      })),
    };

    CreateGoal(formData, {
      onSuccess: () => {
        setShowModal();
      },
    });
  };

  useEffect(() => {
    if (bankAccounts?.data) {
      setUserAccounts(bankAccounts.data ?? []);
    }
  }, [bankAccounts]);

  // Add this useEffect to handle purpose changes
  useEffect(() => {
    if (goalPurpose === 'repayment' && linkedAccounts.length > 1) {
      // Keep only the first account when switching to repayment
      setValue('linked_accounts', [linkedAccounts[0]]);
    }
  }, [goalPurpose, linkedAccounts, setValue]);

  return (
    <>
      <Modal
        title={title}
        centered
        open={showModal}
        onCancel={setShowModal}
        footer={null}
      >
        <GoalForm
          control={control as unknown as Control<FieldValues>}
          formErrors={formErrors as unknown as FieldErrors<IGoalFormData>}
          onSubmit={handleSubmit(handleGoalCreate)}
          setShowAccountSelectionModal={setShowAccountSelectionModal}
          goalPurpose={goalPurpose}
          linkedAccounts={linkedAccounts}
          userAccounts={userAccounts}
          setValue={setValue}
          watch={watch}
          isLoading={isLoading}
          isPending={isPending}
        />
      </Modal>

      {showAccountSelectionModal && (
        <AccountSelectionModal
          showModal={showAccountSelectionModal}
          setShowModal={setShowAccountSelectionModal}
          userAccounts={userAccounts}
          goalPurpose={goalPurpose}
          control={control as unknown as Control<IFormValues>}
          formErrors={formErrors as unknown as FieldErrors<IFormValues>}
          watch={watch as unknown as UseFormWatch<IFormValues>}
          setValue={setValue as unknown as UseFormSetValue<IFormValues>}
          trigger={trigger as unknown as UseFormTrigger<IFormValues>}
        />
      )}
    </>
  );
};

export default GoalModal;
