'use client';

import { StudentCourse, TeacherCourse } from '@/interfaces/user/UserData';
import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
  ReactNode
} from 'react';
import { fetchData } from '@/services/fetchData';
import { useAuthContext } from './authContext';

interface CoursesContext {
  courses: Courses;
  setCourses: any;
  loadUserCourses: () => Promise<void>;
}

export type Courses = StudentCourse[] | TeacherCourse[];

const CoursesContext = createContext<CoursesContext | null>(null);

export function useCoursesContext(): CoursesContext {
  const context = useContext(CoursesContext);
  if (!context) {
    throw new Error('useCoursesContext must be used within a UserProvider');
  }
  return context;
}

export function CoursesProvider({ children }: { children: ReactNode}): ReactElement {
  const { userRole } = useAuthContext();
  const [courses, setCourses] = useState<Courses>([]);

  async function loadUserCourses() {
    const PATH = `/courses/${userRole === 'student' ? 'registered' : 'created'}`;
    const coursesFromApi = await fetchData({ url: PATH });

    setCourses([...coursesFromApi]);
  }

  useEffect(() => {
    if (userRole) {
      loadUserCourses();
    }
  }, []);

  return (
    <CoursesContext.Provider
      value={{
        setCourses,
        courses,
        loadUserCourses,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
}
