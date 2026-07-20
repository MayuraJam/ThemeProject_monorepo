export interface AuthState {
  isAuthenticated: boolean;
  userData: UserProp;
  authLoading: boolean;
  authMessage: string;
  getMe: () => Promise<{ success: boolean; message?: string; data?: Record<string, unknown>; authMessage?: string }>;
  loginGoogle: (token: string) => Promise<{ success: boolean; message?: string; authMessage?: string }>;
  register: (email: string, password: string) => Promise<{ success: boolean; message?: string; authMessage?: string }>;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string; authMessage?: string }>;
}

export interface UserProp {
    id : number,
    supabase_UserId : string,
    userName : string,
    created_at : Date,
    updated_at : Date,
    email : string,
    status : number,
    firstname : string,
    lastname : string,
    Career_field : string,
    password : string,
}