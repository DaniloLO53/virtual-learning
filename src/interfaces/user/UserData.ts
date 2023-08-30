export interface UserData {
  id: number;
  email: string;
  access_token: string | null;
  courses: any[]
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