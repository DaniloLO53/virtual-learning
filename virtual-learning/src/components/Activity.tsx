'use client'

import Link from 'next/link';
import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import Section from './Section';
import { Typography } from '@mui/material';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ClearIcon from '@mui/icons-material/Clear';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { fetchData } from '@/services/fetchData';
import Image from 'next/image';


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
  ":hover": {
    backgroundColor: 'rgb(243, 232, 255, 0.6)'
  }
}));

export const Activity: React.FC<ActivityProps> =({ activity, handleChange, expanded, setExpanded, handleRemoveActivity }: ActivityProps) => {
  const [filePath, setFilePath] = React.useState<string>('');

  async function loadFilesActivity() {
    const REQUEST_PATH = '/files/activities/' + `${activity.uuid}`;
    const imageBuffer = await fetchData(REQUEST_PATH, 'get');

    const base64String = btoa(String.fromCharCode(...new Uint8Array(imageBuffer.data)));
    setFilePath(base64String);
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
              {
                  <div className="w-[30%] flex items-center justify-center relative">
                    <Image
                      src={`data:image/png;base64,${filePath}` || '/default_profile.png'}
                      alt='Uploaded file'
                      fill={true}
                      priority
                    />
                    {/* <img
                      src={`data:image/png;base64,${filePath}` || '/default_profile.png'}
                    /> */}
                  </div>
                }
            </AccordionDetails>
          </Accordion>
  )
}
