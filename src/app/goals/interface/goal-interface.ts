import { FieldValues } from 'react-hook-form';

export interface IFormValues extends FieldValues {
  tempSelectedAccounts: ILinkedAccount[];
}

export interface ILinkedAccount {
  account_id: string;
  contribution_limit?: string;
}

export interface IGoalFormData {
  title: string;
  goal_purpose: string;
  description: string;
  goal_amount: string;
  target_date: Date;
  goal_status: 'active' | 'paused';
  linked_accounts: ILinkedAccount[];
  tempSelectedAccounts?: ILinkedAccount[];
}

export interface IGoalApiRequest {
  title: string;
  goal_purpose: string;
  description: string;
  goal_amount: number;
  target_date: string;
  goal_status: 'active' | 'paused';
  linked_accounts: {
    account_id: string;
    contribution_limit: number;
  }[];
}

// export interface IAccount {
//   id: string;
//   user_id: number;
//   client_institution_id: number;
//   balances_available: string;
//   balances_current: string;
//   balances_iso_currency_code: string;
//   balances_limit: string;
//   balances_unofficial_currency_code: null;
//   mask: string;
//   name: string;
//   official_name: string;
//   persistent_account_id: null;
//   subtype: string;
//   type: string;
//   created_at: Date;
//   updated_at: Date;
// }

// export interface IInstitution {
//   name: string;
//   logo: null;
//   slug: string;
// }

// export interface IUserAccounts {
//   account: IAccount;
//   institution: IInstitution;
// }

interface IEstimatedContributions {
  daily: number;
  weekly: number;
  biWeekly: number;
  monthly: number;
  quarterly: number;
  halfYearly: number;
  yearly: number;
}

interface IEstimatedDateProgress {
  status: string;
  difference: string;
  estimated_target_date: Date;
}

export interface IGoal {
  progress_percentage: number;
  id: number;
  user_id: number;
  broker_id: number;
  linked_account_id: null;
  title: string;
  description: string;
  goal_amount: number;
  goal_purpose: string;
  current_amount: number;
  goal_status: string;
  target_date: Date;
  estimated_contributions: IEstimatedContributions;
  slug: string;
  created_at: Date;
  updated_at: Date;
}

interface IGoalAccount {
  id: number;
  goal_id: number;
  account_id: string;
  contribution_limit: string;
  created_at: Date;
  updated_at: Date;
  account: Account;
}

interface Account {
  id: string;
  name: string;
  type: string;
  subtype: string;
  mask: string;
}

export interface ISingleGoal {
  id: number;
  user_id: number;
  broker_id: null;
  title: string;
  description: string;
  goal_amount: string;
  current_amount: string;
  progress_percentage: string;
  goal_status: string;
  goal_purpose: string;
  target_date: Date;
  estimated_target_date: Date;
  estimated_contributions: IEstimatedContributions;
  goal_progress_updated_at: Date;
  slug: string;
  created_at: Date;
  updated_at: Date;
  goalAccounts: IGoalAccount[];
  estimated_date_progress: IEstimatedDateProgress;
}
