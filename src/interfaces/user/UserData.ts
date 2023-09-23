export interface TeacherCourse {
  id: number;
  code: string;
  title: string;
  teacher: {
    email: string;
    first_name: string;
    last_name: string;
  };
  activities: {
    _count: {
      activities_done: number
    };
  }[]
}

export interface StudentCourse {
  id: number;
  code: string;
  title: string;
  teacher: {
    email: string;
    first_name: string;
    last_name: string;
    profilePictureFile: {
      string: string;
    }
  };
  activities: Activity[]
}

export interface Activity {
  uuid: string;
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  file?: any;
  description: string | null;
  deadline: string | null;
  course_id: number;
  activities_done: ActivityDone[];
}

export interface ActivityDone {
  uuid: string;
  id: number;
  created_at: string;
  description: string | null;
  grade: string | null;
  student_id: number;
  activity_id: number;
}

export interface UserData {
  id: number;
  email: string;
  first_name: string | null;
  last_name: string | null;
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