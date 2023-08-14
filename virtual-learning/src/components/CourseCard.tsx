import Image from 'next/image';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

export const CourseCard = ({course}: any) => {
  const { title, teacher } = course;

  function formatDate(date: string): string {
    const dateObj = new Date(date);
    const day = String(dateObj.getUTCDate()).padStart(2, '0');
    const mounth = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
    return `${day}/${mounth}`;
  }

  return (
    <button
      type='button'
      onClick={() => console.log('clicked')}
    >
      <div
        className='w-[350px] h-[250px] border-slate-300 border-[1px] rounded-t-[35px] rounded-b-[10px] relative'
      >
        <div className='rounded-t-[35px] h-[25%] py-[8px] border-b-slate-300 border-b-[1px] bg-purple-200'>
          <h3 className='text-[20px]'>{ title }</h3>
          <div className='w-[93%] flex items-center relative px-[26px]'>
            <p className='text-[15px] font-light'>{ teacher.email }</p>
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
                    { activities_done.length > 0 ?
                      <CheckIcon className='text-green-500'/> :
                      <ClearIcon className='text-red-500'/>
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