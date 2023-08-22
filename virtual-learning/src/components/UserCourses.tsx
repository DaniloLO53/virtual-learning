import { Grid } from "@mui/material";
import { StudentCourseCard } from "./StudentCourseCard";
import { TeacherCourseCard } from "./TeacherCourseCard";

export const UserCourses = ({ courses }: any) => {
  const role = JSON.parse(localStorage.getItem('role') || '');

  const coursesList = () => {
    if (role) {
      return courses.map((course: any) => (
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
        !courses || courses.length === 0
        ? <p>You&#39;re not assigned to any course yet</p>
        : coursesList()
      }
    </Grid>
  )
}