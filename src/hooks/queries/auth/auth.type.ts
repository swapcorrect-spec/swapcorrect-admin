type Login = {
  email: string;
  password: string;
};

export type LoginPayload = Prettify<BaseApiPayloadDto<Login>>;

export interface ILoginResponse {
  statusCode: number;
  displayMessage: string;
  result: {
    jwt: string;
    userRole: Array<"Visitor">;
  };
  errorMessages: string | null;
}

export type ForgotPassword = {
  email: string;
};

export type ForgotPasswordPayload = Prettify<BaseApiPayloadDto<ForgotPassword>>;

export interface IFogotPasswordResponse {
  statusCode: number;
  displayMessage: string;
  result: string;
  errorMessages: null | string;
}

export type ResetPassword = {
  email: string;
  token: string | string[];
  password: string;
};

export type ResetPasswordPayload = Prettify<BaseApiPayloadDto<ResetPassword>>;

export interface IResetPasswordResponse {
  statusCode: number;
  displayMessage: string;
  result: string;
  errorMessages: null | string;
}
export interface IGetUserInfoResponseData {
  statusCode: 200;
  displayMessage: string;
  result: {
    id: string;
    firstName: string;
    lastName: string;
    profilePicture: null | string;
    isEmailConfirmed: boolean;
    email: string;
    phoneNumber: string;
    userName: string;
    gender: string;
    isSuspendUser: boolean;
    isFlag: boolean;
    isTwoFactorEnable: boolean;
    lastLoginTime: string;
    deliveryAddress: string;
    city: string;
    state: string;
    country: string;
    created: string;
  };
  errorMessages: null | string;
}

export interface IGetGeneralUserInfoResponseData {
  statusCode: number;
  displayMessage: string;
  result: {
    id: string;
    firstName: string;
    lastName: string;
    profilePicture: null | string;
    isEmailConfirmed: boolean;
    email: string;
    phoneNumber: string;
    userName: string;
    gender: string;
    isSuspendUser: boolean;
    isFlag: boolean;
    isTwoFactorEnable: boolean;
    lastLoginTime: string;
    deliveryAddress: string;
    city: string;
    state: string;
    country: string;
    userRole: string[];
    listingCount: number;
    swapCount: number;
    rating: number;
    created: string;
  };
  errorMessages: null | string;
}
