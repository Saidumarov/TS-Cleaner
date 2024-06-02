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

// card information
export interface CardT {
  title: string;
  count: string;
}

export type SiteBarProps = {
  state: {
    collapsed: boolean;
  };
};

export type HeaderProps = {
  state: {
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
  };
};

// Service information
export interface Service {
  id: string;
  name: string;
  price: number;
  created_at: string;
}

export interface ServiceAdd {
  name: string;
  price: number;
  owner_email: string;
}

export interface ServiceEdit {
  id: string;
  name: string;
  price: number;
  owner_email: string;
}

export interface getServiceT {
  page: number;
  limit: number;
  ownerEmail: string;
  token: string;
}

export interface getSearchT {
  page: number;
  limit: number;
  ownerEmail: string;
  token: string;
  name: string;
}
export interface ServiceConfig {
  data: Service[];
  loading: boolean;
  error: any;
  render: any;
  getService: (data: getServiceT) => Promise<void>;
  addService: (data: ServiceAdd, token: string) => Promise<void>;
  updateService: (data: ServiceEdit, token: string) => Promise<void>;
  deleteService: (id: string, token: string) => Promise<void>;
  getSearch: (data: getSearchT) => Promise<void>;
}

// https://app.olimjanov.uz/v1/service/search?page=1&limit=10&name=ja'farxon&owner_email=saidumarovjafarxon@gmail.com
