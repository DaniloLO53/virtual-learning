import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';
import { fetchData } from '@/services/fetchData';
import Link from 'next/link';
import Image from 'next/image';
import { Activity, ActivityDto } from './Activity';


interface CustomizedAccordionProps {
  activities: any;
}



export default function CustomizedAccordion({ activities }: CustomizedAccordionProps) {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  // console.log('ACTIVITIES', activities);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const handleRemoveActivity = async ({ activity_id, course_id }: any) => {
    const PATH = `/courses/${course_id}/activities/${activity_id}`;
    await fetchData({ url: PATH, method: 'delete' });
  }

  return (
    <div>
      {
        activities?.map((activity: ActivityDto) => (
          <Activity
            key={activity.id}
            activity={activity}
            handleChange={handleChange}
            handleRemoveActivity={handleRemoveActivity}
            expanded={expanded}
            setExpanded={setExpanded}
          />
        ))
      }
    </div>
  );
}
