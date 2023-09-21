'use client';

import axios from 'axios';
import * as React from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BasicMenu from '@/components/BasicMenu';
import { fetchData } from '@/services/fetchData';

interface Student {
  student: {
    email: string;
    first_name: string | null;
    last_name: string | null;
  };
  id: number;
  profilePictureFile: {
    string: string;
  } | null;
}

interface Teacher {
  email: string;
  first_name: string | null;
  last_name: string | null;
  profilePictureFile: {
    string: string;
  } | null;
}

interface Participants {
  students: Student[];
  teacher: Teacher;
}

export default function Participants({ params }: any) {
  const role = JSON.parse(localStorage.getItem('role') || '');
  const [participants, setParticipants] = React.useState<Participants | null>(
    null
  );
  const studentsNumber = participants?.students?.length ?? 0;

  async function loadParticipants() {
    const { courseId } = params;
    const PATH = `/registrations/courses/${courseId}`;
    const participantsFromApi = await fetchData({ url: PATH });
    console.log('participants from api', participantsFromApi);
    const { registrations, teacher } = participantsFromApi;
    setParticipants({ students: registrations, teacher });
  }

  const removeStudent = async (id: any) => {
    const PATH = `/registrations/${id}`;
    const participantsFromApi = await fetchData({
      url: PATH,
      method: 'delete',
    });
    setParticipants(participantsFromApi);
  };

  const chooseProfilePicture = (profilePictureFile: any) => {
    if (profilePictureFile)
      return `data:image/png;base64,${profilePictureFile.string}`;

    return '/default_profile.png';
  };

  React.useEffect(() => {
    loadParticipants();
  }, []);
  return (
    <div className="mt-[150px] w-full flex flex-col items-center">
      <div className="w-full flex flex-col items-center">
        <div
          className="w-[60%] p-[10px] flex justify-between items-end border-b-[1px]
          border-b-purple-600"
        >
          <h2 className="text-[30px] text-purple-600 font-semibold">Teacher</h2>
        </div>
        <ul
          className="w-[60%] divide-y divide-slate-400 flex flex-col py-[20px]"
          role="list"
        >
          <li className="w-full p-[20px] flex items-center">
            <span className=""></span>
            <div className="flex items-center gap-x-[15px]">
              <div className="w-[36px] h-[36px] relative rounded-[50%] overflow-hidden">
                <img
                  alt="Profile picture"
                  className="w-[100%] h-[100%]"
                  src={chooseProfilePicture(
                    participants?.teacher.profilePictureFile
                  )}
                />
              </div>
              <span className="">
                {participants?.teacher.first_name ||
                  participants?.teacher.email}
              </span>
            </div>
          </li>
        </ul>
      </div>
      <div className="w-full flex flex-col items-center">
        <div
          className="w-[60%] p-[10px] flex justify-between items-end border-b-[1px]
          border-b-purple-600"
        >
          <span className="text-[30px] text-purple-600 font-semibold">
            Classmates
          </span>
          <span className="text-purple-600 font-semibold">
            {studentsNumber}
            &nbsp;
            {studentsNumber === 1 || studentsNumber === 0
              ? 'student'
              : 'students'}
          </span>
        </div>
        <ul
          className="w-[60%] divide-y divide-slate-400 flex flex-col py-[20px]"
          role="list"
        >
          {participants?.students?.map(
            ({ student, id, profilePictureFile }: Student, index: number) => (
              <li
                key={index + student.email}
                className="w-full py-[10px] px-[20px] flex items-center justify-between"
              >
                <div className="flex items-center gap-x-[15px]">
                  <div className="w-[36px] h-[36px] relative rounded-[50%] overflow-hidden">
                    <img
                      alt="Profile picture"
                      className="w-[100%] h-[100%]"
                      src={chooseProfilePicture(profilePictureFile)}
                    />
                  </div>
                  <span className="">
                    {student.first_name || student.email}
                  </span>
                </div>
                {role === 'teacher' && (
                  <BasicMenu id={id} callBack={removeStudent}>
                    <MoreHorizIcon
                      sx={{
                        color: 'black',
                      }}
                    />
                  </BasicMenu>
                )}
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}
