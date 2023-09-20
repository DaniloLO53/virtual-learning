export interface UserData {
  id: number;
  email: string;
  first_name: string | null;
  last_name: string | null;
  access_token: string | null;
  courses?: any[];
  registrations?: any;
  role: string | null;
  profile_picture?: any;
  gender: Gender;
}

export interface SignUpData {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export type Gender = 'male' | 'female' | 'none';