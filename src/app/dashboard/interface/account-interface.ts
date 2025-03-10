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

export interface IAccountInstitution {
  name: string;
  logo: null;
  slug: string;
}

export interface IUserAccounts {
  account: IAccount;
  institution: IAccountInstitution;
}

export interface IInstitution {
  plaid_institution_id: string;
  name: string;
  logo: null;
  slug: string;
}

export interface ICount {
  name: string;
  type: string;
  count: number;
}

export interface IInstitutions {
  institution: IInstitution;
  counts: ICount[];
}
