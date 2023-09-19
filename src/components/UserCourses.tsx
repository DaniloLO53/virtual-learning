import { useUserContext } from "@/contexts/userContext";
import { Box, Grid } from "@mui/material";
import { StudentCourseCard } from "./StudentCourseCard";
import { TeacherCourseCard } from "./TeacherCourseCard";
import AddIcon from '@mui/icons-material/Add';
import NewCourseDialog from "./NewCourseDialog";

interface UserCoursesProps {
  open: boolean;
  setOpen: (value: any) => any;
  code: string;
  setCode: (value: any) => any;
  title: string;
  setTitle: (value: any) => any;
  description: string;
  setDescription: (value: any) => any;
  handlePublishCourse: any;
}

export const UserCourses = ({
  open,
  setOpen,
  code,
  setCode,
  title,
  setTitle,
  description,
  setDescription,
  handlePublishCourse
}: UserCoursesProps) => {
  const role = JSON.parse(localStorage.getItem('role') || 'null');
  const { userData } = useUserContext();

  const coursesList = () => {
    if (role) {
      console.log('COURSES', userData.courses)
      return userData.courses.map((course: any) => (
        role === 'student'
        ? <StudentCourseCard course={course} key={course.id}/>
        : <TeacherCourseCard course={course} key={course.id}/>
      ))
    }
  }

  const noCoursesComponentBuilder = () => {
    const text = role === 'student'
      ? "You're not assigned to any course yet"
      : "You didn't create any course yet";
  
    return (
      <p className='relative left-[50%] translate-x-[-50%]'>
        { text }
      </p>
    )
  }

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setCode('');

    setOpen(false);
  }

  return (
    <>
      <Grid 
        className='flex flex-wrap gap-x-[40px] gap-y-[65px] py-[20px] relative'
        container
      >
        {
          !userData.courses || userData.courses.length === 0
          ? noCoursesComponentBuilder()
          : coursesList()
        }
      </Grid>
      { role === 'teacher' &&
        <Box className='flex text-purple-500 hover:text-bold'>
          <AddIcon />
          <button
            className="border-none bg-transparent"
            type="button"
            onClick={() => setOpen(true)}
          >
            Create new course
          </button>
        </Box>
      }
      <NewCourseDialog
        open={open}
        onClose={handleClose}
        code={code}
        setCode={setCode}
        description={description}
        setDescription={setDescription}
        title={title}
        setTitle={setTitle}
        handlePublishCourse={handlePublishCourse}
      />
    </>
  )
}