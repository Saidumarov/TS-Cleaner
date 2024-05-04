export interface UserT {
  full_name: string;
  phone_number: string;
  email: string;
  password: string;
}
export interface UserVerifyT {
  email: string;
  code: string;
}

export interface UserLoginT {
  email: string;
  password: string;
}

export interface UserInfoT {
  access_token: string;
  refresh_token: string;
  full_name: string;
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
  phone_number: string;
}

export interface ForgotPasswordT {
  email: string;
}

export interface ForgotPasswordVerify {
  email: string;
  code: string;
  new_password: string;
}

export interface Config {
  registerData: string;
  verifyData: UserInfoT;
  loginData: UserInfoT;
  forgotPasswordData: string;
  forgotPasswordVerifyData: string;
  loading: boolean;
  error: any;
  register: (user: UserT) => Promise<void>;
  verify: (user: UserVerifyT) => Promise<void>;
  login: (user: UserLoginT) => Promise<void>;
  forgotPassword: (user: ForgotPasswordT) => Promise<void>;
  forgotPasswordVerify: (user: ForgotPasswordVerify) => Promise<void>;
}
