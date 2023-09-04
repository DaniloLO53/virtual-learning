import { useUserContext } from "@/contexts/userContext";
import { Grid } from "@mui/material";
import { StudentCourseCard } from "./StudentCourseCard";
import { TeacherCourseCard } from "./TeacherCourseCard";

export const UserCourses = () => {
  const role = JSON.parse(localStorage.getItem('role') || 'null');
  const { userData } = useUserContext();

  const coursesList = () => {
    if (role) {
      return userData.courses.map((course: any) => (
        role === 'student'
        ? <StudentCourseCard course={course} key={course.id}/>
        : <TeacherCourseCard course={course} key={course.id}/>
      ))
    }
  }

  const wrapperStyle = () => (
    role === 'student'
    ? `w-[85%] absolute top-[55px] flex flex-wrap gap-x-[45px] gap-y-[65px] items-start
      py-[20px]`
    : `w-[50%] absolute top-[55px] flex flex-col divide-y divide-slate-300`
  )
  return (
    <Grid 
      // className={wrapperStyle()}
      className='flex flex-wrap gap-x-[40px] gap-y-[65px] py-[20px]'
      container
    >
      {
        !userData.courses || userData.courses.length === 0
        ? <p>You&#39;re not assigned to any course yet</p>
        : coursesList()
      }
    </Grid>
  )
}