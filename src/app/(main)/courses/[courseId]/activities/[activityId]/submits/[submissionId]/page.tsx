'use client'

import Link from 'next/link';
import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Box, Typography } from '@mui/material';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ClearIcon from '@mui/icons-material/Clear';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { fetchData } from '@/services/fetchData';
import Image from 'next/image';
import { Blob, File } from 'buffer';
import axios from 'axios';
import ActivityAttachDialog from '@/components/ActivityAttachDialog';
import AssignGradeDialog from '@/components/AssignGradeDialog';


interface SubmitProps extends React.HTMLAttributes<HTMLDivElement> {
  params: {
    activityId: string;
    courseId: string;
    submissionId: string;
  }
}

export interface ActivityDto {
  id: any;
  title: any;
  description: any;
  deadline: any;
  course_id: any;
  updated_at: any;
  files: any;
  uuid: any;
}


const Submit: React.FC<SubmitProps> =({ params }: SubmitProps) => {
  const [fileStringArray, setFileStringArray] = React.useState<string[]>([]);
  const [submission, setSubmission] = React.useState<any>(null);
  const [open, setOpen] = React.useState(false);
  const [grade, setGrade] = React.useState('');
  const [description, setDescription] = React.useState('');

  const role = JSON.parse(localStorage.getItem('role') || '');
  const { courseId, activityId } = params;

  async function loadSubmission() {
    const ACTIVITY_PATH = `/courses/${courseId}/activities/${activityId}/submissions/${params.submissionId}`;

    const submissionFromApi = await fetchData({ url: ACTIVITY_PATH });
    const FILE_PATH = '/files/submissions/' + `${submissionFromApi.uuid}`;
    const filesFromApi = await fetchData({ url: FILE_PATH });
    console.log('Activity done', submissionFromApi);

    setSubmission(submissionFromApi);
    setFileStringArray(filesFromApi);
  }

  async function downloadFile({ activity_uuid, submission_uuid, name, timestamp }: any) {
    const PATH = `/files/download/submissions/${timestamp}_${activity_uuid}_${submission_uuid}_${name}`;
    console.log(PATH);

    const headers = { responseType: 'blob' };
    const data = await fetchData({ headers, url: PATH });
    console.log('blob data', data)

    const element = document.createElement('a');
    element.setAttribute('href', `data:application/octet-stream;charset=utf-16le;base64,${data.data}`);
    element.setAttribute('download', name);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    loadSubmission()
  }, [submission?.grade])
  return (
    submission &&
      <div className='pt-[80px] flex justify-center'>
        <div className='w-[60%]'>
          <div>
          <div
            className='flex flex-wrap gap-y-[12px] py-[15px] justify-between items-center
            w-full max-h-[200px] overflow-y-auto'
          >
            {
              fileStringArray
                .map(({ string, name, type, activity_uuid, submission_uuid, timestamp }: any, index) => (
                <button
                  type='button'
                  onClick={() => downloadFile({ name, activity_uuid, submission_uuid, timestamp })}
                  key={string + index}
                  className='w-[calc(50%-5px)] h-full border-[1px] border-slate-300
                  rounded-[8px] overflow-x-hidden'
                >
                  <div
                    className=" w-full flex flex-row items-center"
                  >
                    {
                      (type === 'png' || type === 'jpg' || type === 'jpeg')
                      &&
                      <img
                        src={`data:image/png;base64,${string}`}
                        style={{ width: '100px', height: '70px'}}
                      />
                    }
                    {
                      type === 'pdf'
                      &&
                      <div className='w-[130px] h-[70px] relative'>
                        <Image
                          src={'/default_profile.png'}
                          alt='Uploaded file'
                          fill={true}
                          priority
                        />
                      </div>
                    }
                    <div
                      className='p-[10px] h-[70px] flex flex-col justify-between
                      items-start'
                    >
                      <p className='font-semibold text-gray-500 '>{ name }</p>
                      <p className='font-semibold text-gray-500 '>{ type.toUpperCase() }</p>
                    </div>
                  </div>
                </button>
              ))
            }
          </div>
          <div
            className=''
          >
            <button
                className='p-[10px] text-purple-500 font-bold text-[22px] flex items-center'
                type='button'
                onClick={handleClickOpen}
              >
                <AddIcon />
                {<p>{submission.grade ? 'Reassign' : 'Assign'} grade</p>}
            </button>
            { submission.grade && <p>Grade: <span>{ submission.grade }</span></p>}
            { submission.description && <p>Description: <span>{ submission.description }</span></p>}
            <AssignGradeDialog
              open={open}
              handleClose={handleClose}
              activityUUID={submission.activity.uuid}
              grade={grade}
              setGrade={setGrade}
              description={description}
              setDescription={setDescription}
              setSubmission={setSubmission}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Submit;