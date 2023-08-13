import { CourseCard } from "./CourseCard"

export const UserCourses = ({ courses }: any) => {
  console.log('courses:', courses)
  const coursesList = () => {
    return courses.map((course: any) => <CourseCard course={course} key={course.id}/>)
  }
  return (
    
    <div className='w-full min-h-[calc(100vh-55px)] absolute bottom-[0px]
    flex justify-around items-start p-[20px]'>
      {
        !courses || courses.length === 0
        ? <p>You&#39;re not assigned to any course yet</p>
        : coursesList()
      }
    </div>
  )
}