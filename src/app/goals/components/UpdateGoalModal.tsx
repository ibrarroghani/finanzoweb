import { yupResolver } from '@hookform/resolvers/yup';
import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  useForm,
  Control,
  FieldValues,
  UseFormSetValue,
  UseFormWatch,
  FieldErrors,
  UseFormTrigger,
} from 'react-hook-form';
import { goalCreateValidationSchema } from '../validations/goal-create-validation-schema';
import { convertDateApiFormat, getTomorrowDate } from '@/utils/date-formatter';
import { useGoalPageContext } from '../context/GoalPageContext';
import useUpdateGoal from '@/hooks/data-hooks/goal/use-update-goal';
import useGetSingleGoal from '@/hooks/data-hooks/goal/use-get-single-goal';
import Spinner from '@/shared-components/Spinner';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import useGetBankAccounts from '@/hooks/data-hooks/account/use-get-bank-accounts';
import {
  IGoalFormData,
  IFormValues,
  IUserAccounts,
} from '@/app/goals/interface/goal-interface';
import AccountSelectionModal from './AccountSelectionModal';
import GoalForm from './GoalForm';

interface IUpdateGoalModalProps {
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

const UpdateGoalModal: React.FC<IUpdateGoalModalProps> = ({
  title,
  showModal,
  setShowModal,
}) => {
  const [userAccounts, setUserAccounts] = useState<IUserAccounts[]>([]);
  const [showAccountSelectionModal, setShowAccountSelectionModal] =
    useState(false);
  const slug = useSelector((state: RootState) => state.auth.client.slug);
  const { goalSlug } = useGoalPageContext();

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
    reset,
    watch,
    setValue,
    trigger,
  } = useForm<IGoalFormData>({
    defaultValues: INITIAL_GOAL_FORM_DATA,
    resolver: yupResolver(goalCreateValidationSchema),
  });

  const goalPurpose = watch('goal_purpose');
  const linkedAccounts = watch('linked_accounts');

  const { data: goalData, isLoading: isGoalLoading } = useGetSingleGoal(
    slug,
    goalSlug
  );
  const { mutate: updateGoal, isPending } = useUpdateGoal(slug, goalSlug);
  const { data: bankAccounts, isLoading } = useGetBankAccounts(slug, {
    force_initial_plaid_account_fetch: 'no',
  });

  const handleGoalUpdate = (data: IGoalFormData) => {
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

    updateGoal(formData, {
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

  useEffect(() => {
    if (goalData?.data?.goal) {
      const { goal } = goalData.data;
      reset({
        title: goal.title || '',
        goal_purpose: goal.goal_purpose || '',
        description: goal.description || '',
        goal_amount: goal.goal_amount || '',
        target_date: goal.target_date || getTomorrowDate(),
        goal_status: goal.goal_status || 'active',
        linked_accounts: goal.goalAccounts || [],
      });
    }
  }, [goalData, reset]);

  const handleAddAccountClick = () => {
    setValue('tempSelectedAccounts', linkedAccounts);
    setShowAccountSelectionModal(true);
  };

  return (
    <>
      <Modal
        title={title}
        centered
        open={showModal}
        onCancel={setShowModal}
        footer={null}
      >
        <div className='flex min-h-[350px] flex-col'>
          {isGoalLoading ? (
            <div className='flex flex-1 items-center justify-center'>
              <Spinner />
            </div>
          ) : (
            <GoalForm
              control={control as unknown as Control<FieldValues>}
              formErrors={formErrors as unknown as FieldErrors<IGoalFormData>}
              onSubmit={handleSubmit(handleGoalUpdate)}
              setShowAccountSelectionModal={setShowAccountSelectionModal}
              goalPurpose={goalPurpose}
              linkedAccounts={linkedAccounts}
              userAccounts={userAccounts}
              setValue={setValue}
              isLoading={isLoading}
              isPending={isPending}
              onAddAccountClick={handleAddAccountClick}
            />
          )}
        </div>
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

export default UpdateGoalModal;
