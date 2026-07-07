export interface AuthState {
  isAuthenticated: boolean;
  userData: UserProp;
  authLoading: boolean;
  authMessage: string;
  getMe: () => Promise<{ success: boolean; message?: string; data?: Record<string, unknown>; authMessage?: string }>;
}

export interface UserProp {
    email: string;
    email_verified: boolean;
    family_name: string;
    given_name: string;
    name: string;
    picture: string;
    sub: string;
}