export interface ISignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ISignUpPayloadData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  user_type: string;
}
