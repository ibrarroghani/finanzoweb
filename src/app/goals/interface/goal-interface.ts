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

export interface IAccount {
  id: string;
  user_id: number;
  client_institution_id: number;
  balances_available: string;
  balances_current: string;
  balances_iso_currency_code: string;
  balances_limit: string;
  balances_unofficial_currency_code: null;
  mask: string;
  name: string;
  official_name: string;
  persistent_account_id: null;
  subtype: string;
  type: string;
  created_at: Date;
  updated_at: Date;
}

export interface IInstitution {
  name: string;
  logo: null;
  slug: string;
}

export interface IUserAccounts {
  account: IAccount;
  institution: IInstitution;
}
