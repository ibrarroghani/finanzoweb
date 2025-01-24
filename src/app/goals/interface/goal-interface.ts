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
