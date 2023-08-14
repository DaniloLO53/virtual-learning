import { CourseCard } from "./CourseCard"

export const UserCourses = ({ courses }: any) => {
  const coursesList = () => {
    return courses.map((course: any) => <CourseCard course={course} key={course.id}/>)
  }
  return (
    
    <div className='w-[85%] absolute top-[55px] flex flex-wrap gap-x-[45px] gap-y-[65px] justify-start items-start py-[20px]'>
      {
        !courses || courses.length === 0
        ? <p>You&#39;re not assigned to any course yet</p>
        : coursesList()
      }
    </div>
  )
}