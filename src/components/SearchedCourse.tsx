import { Box, ListItem, ListItemButton, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';

export default function SearchedCourse({ course, setState }: any) {
  const { title, code, teacher, id } = course;

  return (
    <ListItem className='hover:bg-purple-100/60'>
      <Link
        href={`/registrations/${id}`}
        onClick={() => setState(false)}
      >
        <Stack>
          <Typography className='flex text-[18px]'>{ title }</Typography>
          <Typography>
            <span>{ code }</span>
            <span className='text-[14px]'>
              &nbsp; &#8226; &nbsp;
            </span>
            <span>{ teacher.email }</span>
          </Typography>
        </Stack>
      </Link>
    </ListItem>
  );
}
