import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

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

interface CustomizedAccordionProps {
  activities: any;
}

export default function CustomizedAccordion({ activities }: CustomizedAccordionProps) {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  console.log('ACTIVITIES', activities);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <div>
      {
        activities?.map(({ id, title, description, deadline, course_id, updated_at}: any) => (
          <Accordion
            key={id}
            expanded={expanded === `panel${id}`} onChange={handleChange(`panel${id}`)}
          >
            <AccordionSummary
              aria-controls={`panel${id}d-content`}
              id={`panel${id}d-header`}
            >
              <Typography>{ title }</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                { description }
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))
      }
    </div>
  );
}
