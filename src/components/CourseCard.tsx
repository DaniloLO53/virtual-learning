'use client';

import { Box, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import StaticIcon from './StaticIcon';
import * as React from 'react';

export interface CourseCardProps {
  id: number;
  title: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  profilePictureFile?: {
    string: string;
  };
  children: React.ReactNode;
}

export const CourseCard = ({
  children,
  id,
  title,
  email,
  first_name,
  last_name,
  profilePictureFile,
}: CourseCardProps) => {
  const nameHandler = () => {
    if (first_name && last_name) return `${first_name} ${last_name ?? ''}`;
    return email;
  };

  const chooseProfilePicture = (
    profilePictureFile: { string: string } | null | undefined
  ) => {
    if (profilePictureFile)
      return `data:image/png;base64,${profilePictureFile.string}`;

    return '/default_profile.png';
  };

  return (
    <Link href={`/courses/${id}/board`}>
      <Grid
        className="w-[310px] h-[280px] border-slate-300 border-[1px] rounded-t-[35px]
        rounded-b-[10px]"
      >
        <Box
          className="rounded-t-[35px] h-[25%] py-[8px] pl-[25px] border-b-slate-300
          border-b-[1px] flex flex-col justify-between"
        >
          <Typography className="truncate text-[20px] w-[75%]">
            {title}
          </Typography>
          <Box className="flex items-center relative w-[95%]">
            <Typography className="truncate text-[15px] font-light w-[65%] truncate">
              {nameHandler()}
            </Typography>
            {profilePictureFile !== undefined && (
              <Box className="absolute bg-white rounded-[50%] right-[0px] w-[80px] h-[80px] overflow-hidden">
                <img
                  alt="Profile picture"
                  className="w-[100%] h-[100%]"
                  src={chooseProfilePicture(profilePictureFile)}
                />
              </Box>
            )}
          </Box>
        </Box>
        <Box className="flex flex-col items-start overflow-y-auto max-h-[75%]">
          {children}
        </Box>
      </Grid>
    </Link>
  );
};
