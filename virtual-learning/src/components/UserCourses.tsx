import { StudentCourseCard } from "./StudentCourseCard";
import { TeacherCourseCard } from "./TeacherCourseCard";

export const UserCourses = ({ courses }: any) => {
  let parsedUserRole: string;
  const userRole = localStorage.getItem('role');
  if (userRole) {
    parsedUserRole = JSON.parse(userRole);
  }

  const coursesList = () => {
    if (userRole) {
      return courses.map((course: any) => (
        parsedUserRole === 'student'
        ? <StudentCourseCard course={course} key={course.id}/>
        : <TeacherCourseCard course={course} key={course.id}/>
      ))
    }
  }

  const wrapperStyle = () => (
    userRole === 'student'
    ? `w-[85%] absolute top-[55px] flex flex-wrap gap-x-[45px] gap-y-[65px] items-start
      py-[20px]`
    : `w-[50%] absolute top-[55px] flex flex-col divide-y divide-slate-300`
  )
  return (
    <div className={wrapperStyle()}>
      {
        !courses || courses.length === 0
        ? <p>You&#39;re not assigned to any course yet</p>
        : coursesList()
      }
    </div>
  )
}