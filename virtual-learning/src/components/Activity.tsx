'use client'

import Link from 'next/link';
import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import Section from './Section';
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
import Canvas from './Canvas';


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


export const Activity: React.FC<ActivityProps> =({ activity, handleChange, expanded, setExpanded, handleRemoveActivity }: ActivityProps) => {
  const [fileStringArray, setFileStringArray] = React.useState<string[]>([]);

  function toBase64(bufferArray: Buffer[]) {
    const base64Array = bufferArray.map((buffer) => (
      new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        const formData = new FormData();
        const blob = new Blob([buffer]);

        // formData.append();

        // fileReader.readAsDataURL(blob);
      })
    ))
  }

  async function loadFilesActivity() {
    const REQUEST_PATH = '/files/activities/' + `${activity.uuid}`;
    const data = await fetchData(REQUEST_PATH, 'get');

    setFileStringArray(data);
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
                  fileStringArray.map(({ string, name, type }: any, index) => (
                    <div
                      className="w-[calc(50%-5px)] h-full flex items-center border-[1px] border-slate-300 rounded-[8px] overflow-x-hidden"
                      key={string + index}
                    >
                      {
                        (type === 'png' || type === 'jpg' || type === 'jpeg')
                        && <Canvas fileString={string} />
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
                      <div className='p-[10px] h-[70px] flex flex-col justify-start'>
                        <span className='font-semibold text-gray-500'>{ name }</span>
                      </div>
                    </div>
                  ))
                }
              </div>
              </AccordionDetails>
          </Accordion>
  )
}
