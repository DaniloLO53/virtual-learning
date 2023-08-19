import Image from 'next/image';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { useRouter } from 'next/navigation';

export const StudentCourseCard = ({ course }: any) => {
  const router = useRouter()
  const { title, teacher, id } = course;

  console.log('course', course)

  function formatDate(date: string): string {
    const dateObj = new Date(date);
    const day = String(dateObj.getUTCDate()).padStart(2, '0');
    const mounth = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
    return `${day}/${mounth}`;
  }

  return (
    <button
      type='button'
      onClick={() => router.replace(`/courses/${id}/board`)}
    >
      <div
        className='w-[350px] h-[280px] border-slate-300 border-[1px] rounded-t-[35px] rounded-b-[10px] relative'
      >
        <div className='rounded-t-[35px] h-[25%] py-[8px] border-b-slate-300 border-b-[1px]'>
          <h3 className='text-[20px] w-[75%] flex pl-[25px]'>
            <span className='truncate'>{ title }</span>
          </h3>
          <div className='w-[93%] flex items-center relative'>
            <p className='text-[15px] font-light w-[75%] flex px-[25px] text-ellipsis overflow-hidden'>
              <span className='truncate'>{ teacher.email }</span>
            </p>
            <div
              className='absolute bg-white rounded-[50%] right-[0px]'
            >
              <Image
                src='/default_profile.png'
                alt='Default profile logo'
                width={60}
                height={60}
                priority
              />
            </div>
          </div>
        </div>
        <div
          className='flex flex-col items-start overflow-y-scroll max-h-[75%]'
        >
          {
            course.activities.map(({ deadline, title, activities_done }: any) => (
              <div
                key={`${deadline || 'none'}-${title}`}
                className='flex flex-col items-start p-[14px]'
              >
                <h3
                  className='font-bold text-gray-600 text-[18px]'
                >
                  <span>
                    { activities_done.length > 0
                      ? <CheckIcon className='text-green-500'/>
                      : <ClearIcon className='text-red-500'/>
                    }
                  </span>
                  &nbsp;
                  Due to {formatDate(deadline)}
                </h3>
                <p>{ title }</p>
              </div>
            ))
          }
        </div>
      </div>
    </button>
  )
}