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
import Button from '@/components/Button';


interface ActivityDetailsProps extends React.HTMLAttributes<HTMLDivElement> {
  params: {
    activityId: string;
    courseId: string;
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


const ActivityDetails: React.FC<ActivityDetailsProps> =({ params }: ActivityDetailsProps) => {
  const [fileStringArray, setFileStringArray] = React.useState<string[]>([]);
  const [activity, setActivity] = React.useState<any>(null);
  const [open, setOpen] = React.useState(false);
  const [activityIsDone, setActivityIsDone] = React.useState<any>(null);

  const role = JSON.parse(localStorage.getItem('role') || '');
  const { courseId, activityId } = params;

  async function loadActivity() {
    const ACTIVITY_PATH = `/courses/${courseId}/activities/${activityId}`;
    const PATH_ACTIVITY_DONE = `/courses/${courseId}/activities/${activityId}/done`;

    const activityFromApi = await fetchData({ url: ACTIVITY_PATH });
    const FILE_PATH = '/files/activities/' + `${activityFromApi.uuid}`;
    const filesFromApi = await fetchData({ url: FILE_PATH });
    const data = await fetchData({ url: PATH_ACTIVITY_DONE });
    console.log('Activity done', data)

    data && setActivityIsDone(data);
    setActivity(activityFromApi);
    setFileStringArray(filesFromApi);
  }

  async function downloadFile({ uuid, name, timestamp }: any) {
    const PATH = `/files/download/${timestamp}_${uuid}_${name}`;
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

  async function undoneActivity() {
    console.log('activityIsDone',activityIsDone)
    const ACTIVITY_PATH = `/courses/${courseId}/activities/${activityId}/done/${activityIsDone.id}`;
    await fetchData({ url: ACTIVITY_PATH, method: 'delete' });

    setActivityIsDone(null);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    loadActivity()
  }, [activityIsDone?.id])
  return (
    activity &&
      <div className='pt-[80px] flex justify-center'>
        <div className='w-[60%]'>
          <div
            id={`panel${activity.id}d-header`}
            className='border-b-[1px] border-b-purple-500 py-[15px]'
          >
            <h1 className='text-[30px] text-purple-500'>{ activity.title }</h1>
            <p className='text-slate-500'>Deadline: <span>{ activity.deadline }</span></p>
          </div>
          <div>
            <div className='flex items-center justify-between'>
              <p>{ activity.description }</p>
            </div>
          <div
            className='flex flex-wrap gap-y-[12px] py-[15px] justify-between items-center
            w-full max-h-[200px] overflow-y-auto'
          >
            {
              fileStringArray
                .map(({ string, name, type, uuid, timestamp }: any, index) => (
                <button
                  type='button'
                  onClick={() => downloadFile({ name, uuid, timestamp })}
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
            className='w-[25%]'
          >
            { role === 'student' &&
              (activityIsDone
              ?
                <div>
                  <Typography className='my-[10px]'>Activity is done already</Typography>
                  <Button
                    type='button'
                    onClick={undoneActivity}
                    className=''
                  >
                    Undone activity
                  </Button>
                </div>
              :
              <button
                className='p-[10px] text-purple-500 font-bold text-[22px] flex items-center'
                type='button'
                onClick={handleClickOpen}
              >
                <AddIcon />
                Finish activity
              </button>)
            }
            { activityIsDone && !activityIsDone.grade && <p>Submission not graded yet</p>}
            { activityIsDone?.grade && <p>Grade: <span>{ activityIsDone?.grade }</span></p>}
            { activityIsDone?.description && <p>Description: <span>{ activityIsDone?.description }</span></p>}
            <ActivityAttachDialog
              open={open}
              handleClose={handleClose}
              activityUUID={activity.uuid}
              setActivityIsDone={setActivityIsDone}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActivityDetails;