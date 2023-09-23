'use client'

import Link from 'next/link';
import * as React from 'react';
import { Typography } from '@mui/material';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ClearIcon from '@mui/icons-material/Clear';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { fetchData } from '@/services/fetchData';
import Image from 'next/image';
import { useUserContext } from '@/contexts/userContext';


interface ActivityProps extends React.HTMLAttributes<HTMLDivElement> {
  activity: ActivityDto;
  handleChange: any;
  handleRemoveActivity: any;
  setExpanded: any;
  expanded: any;
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

const Accordion: any = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  // backgroundColor:
  //   theme.palette.mode === 'dark'
  //     ? 'rgba(255, 255, 255, .05)'
  //     : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
  ":focus": {
    backgroundColor: 'rgb(243, 232, 255, 0.6)'
  },
  ":hover": {
    backgroundColor: 'rgb(243, 232, 255, 0.6)'
  }
  
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));


export const Activity: React.FC<ActivityProps> =({ activity, handleChange, expanded, handleRemoveActivity }: ActivityProps) => {
  const [fileStringArray, setFileStringArray] = React.useState<string[]>([]);
  const { userData } = useUserContext();
  const role = JSON.parse(localStorage.getItem('role') || 'null');

  async function loadFilesActivity() {
    const REQUEST_PATH = '/files/activities/' + `${activity.uuid}`;
    const data = await fetchData({ url: REQUEST_PATH });

    setFileStringArray(data);
  }

  async function downloadFile({ uuid, name, timestamp }: any) {
    const PATH = `/files/download/${timestamp}_${uuid}_${name}`;
    console.log(PATH);

    const headers = { responseType: 'blob' };
    const data = await fetchData({ url: PATH, headers });
    console.log('blob data', data)

    const element = document.createElement('a');
    element.setAttribute('href', `data:application/octet-stream;charset=utf-16le;base64,${data.data}`);
    element.setAttribute('download', name);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
    // const blob = await data.blob();

    // setFileStringToDownload(data);
    // downloadScript(data)
    // console.log('typeof data', blob)
  }

  React.useEffect(() => {
    loadFilesActivity()
  }, [])
  return (
    <Accordion
            key={activity.id}
            expanded={expanded === `panel${activity.id}`} onChange={handleChange(`panel${activity.id}`)}
          >
            <AccordionSummary
              aria-controls={`panel${activity.id}d-content`}
              id={`panel${activity.id}d-header`}
            >
              <Typography>{ activity.title }</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className='flex items-center justify-between'>
                <Typography>
                  { activity.description }
                </Typography>
                <button
                  type='button'
                  onClick={() => handleRemoveActivity({ activity_id: activity.id, course_id: activity.course_id })}
                >
                  <ClearIcon />
                </button>
              </div>
              <div className='flex flex-wrap gap-y-[12px] py-[15px] justify-between items-center w-full max-h-[200px] overflow-y-scroll'>
                {
                  fileStringArray.map(({ string, name, type, uuid, timestamp }: any, index) => (
                    <button
                      type='button'
                      onClick={() => downloadFile({ name, uuid, timestamp })}
                      key={string + index}
                      className='w-[calc(50%-5px)] h-full border-[1px] border-slate-300 rounded-[8px] overflow-x-hidden'
                    >
                      <div
                        className=" w-full flex flex-row items-center"
                      >
                        {
                          (type === 'png' || type === 'jpg' || type === 'jpeg')
                          && <img src={`data:image/png;base64,${string}`} style={{ width: '100px', height: '70px'}} />
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
                        <div className='p-[10px] h-[70px] flex flex-col justify-between items-start '>
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
                <Link
                  href={
                    `/courses/${activity.course_id}/activities/${activity.id}/${role === 'student' ? 'details' : 'submits'}`
                  }
                  className='text-purple-400 font-semibold hover:font-bold'
                >
                  See activity
                </Link>
              </div>
              </AccordionDetails>
          </Accordion>
  )
}
