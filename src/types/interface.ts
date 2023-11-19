export interface AuthResponse {
  data: {
    accessToken: { token: string; expires: number };
    name?: string;
    email: string;
  };
  statusCode?: number | string;
}

export interface IUser {
  accessToken: { token: string; expires: number };
  name?: string;
  email: string;
}

export interface AuthPayload {
  name?: string;
  email: string;
  password: string;
}

export interface AuthError {
  message: string;
}


export interface PaymentIntentResponse {
    data: {
      clientSecret: string;
    };
    statusCode?: number | string;
  }