import { Box, Grid } from '@mui/material';
import { StudentCourseCard } from './StudentCourseCard';
import { TeacherCourseCard } from './TeacherCourseCard';
import AddIcon from '@mui/icons-material/Add';
import NewCourseDialog from './NewCourseDialog';
import { useEffect } from 'react';
import { NewCourseInfos } from '@/app/(main)/home/page';
import { useCoursesContext } from '@/contexts/coursesContext';
import { useAuthContext } from '@/contexts/authContext';
import { StudentCourse, TeacherCourse } from '@/interfaces/user/UserData';

interface UserCoursesProps {
  open: boolean;
  setOpen: (value: any) => any;
  newCourseInfos: NewCourseInfos | null;
  setNewCourseInfos: (value: any) => any;
  handlePublishCourse: any;
}

export const UserCourses = ({
  open,
  setOpen,
  newCourseInfos,
  setNewCourseInfos,
  handlePublishCourse,
}: UserCoursesProps) => {
  const { loadUserCourses, courses } = useCoursesContext();
  const { userRole: role } = useAuthContext();

  const coursesList = () => {
    return courses.map((course) =>
      role === 'student' ? (
        <StudentCourseCard course={course as StudentCourse} key={course.id} />
      ) : (
        <TeacherCourseCard course={course as TeacherCourse} key={course.id} />
      )
    );
  };

  const noCoursesComponentBuilder = () => {
    const notAssignedText = "You're not assigned to any course yet";
    const didntCreatedText = "You didn't create any course yet";
    const text = role === 'student' ? notAssignedText : didntCreatedText;

    return <p className="relative left-[50%] translate-x-[-50%]">{text}</p>;
  };

  const createCourseButton = () => (
    <Box className="flex text-purple-500 hover:text-bold">
      <AddIcon />
      <button
        className="border-none bg-transparent"
        type="button"
        onClick={() => setOpen(true)}
      >
        Create new course
      </button>
    </Box>
  );

  const handleClose = () => {
    setNewCourseInfos(null);
    setOpen(false);
  };

  useEffect(() => {
    loadUserCourses();
  }, []);

  return (
    <>
      <Grid
        className="flex flex-wrap gap-x-[40px] gap-y-[65px] py-[20px] relative"
        container
      >
        {courses.length === 0 ? noCoursesComponentBuilder() : coursesList()}
      </Grid>
      {role === 'teacher' && createCourseButton()}
      <NewCourseDialog
        open={open}
        onClose={handleClose}
        newCourseInfos={newCourseInfos}
        setNewCourseInfos={setNewCourseInfos}
        handlePublishCourse={handlePublishCourse}
      />
    </>
  );
};
