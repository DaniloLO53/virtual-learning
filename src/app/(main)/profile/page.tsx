'use client';

import Button from '@/components/Button';
import { useUserContext } from '@/contexts/userContext';
import { Gender } from '@/interfaces/user/UserData';
import { fetchData } from '@/services/fetchData';
import {
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import * as React from 'react';

export type FileUploadProps = {
  selectedFile: any;
  setSelectedFile: any;
};

export default function ProfilePage() {
  const { userData, loadUserInfos } = useUserContext();

  const [email, setEmail] = React.useState(userData.email);
  const [firstName, setFirstName] = React.useState<any>(userData.first_name);
  const [lastName, setLastName] = React.useState<any>(userData.last_name);
  const [gender, setGender] = React.useState(userData.gender);
  const [selectedFile, setSelectedFile] = React.useState<any>(null);
  const router = useRouter();

  const filesizes = (bytes: any, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('event', event.target.files);
    Object.values(event.target?.files || {}).forEach((file: any) => {
      console.log('FILE', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile({
          raw: file,
          filename: file.name,
          filetype: file.type,
          fileimage: URL.createObjectURL(file),
          datetime: file.lastModifiedDate.toLocaleString('en-IN'),
          filesize: filesizes(file.size),
        });
      };
      file && reader.readAsDataURL(file);
      return;
    });
  };

  const chooseProfilePicture = () => {
    if (selectedFile) return selectedFile.fileimage;
    return (
      `data:image/png;base64,${userData.profile_picture?.string}` ??
      '/default_profile.png'
    );
  };

  async function handleSaveEdit() {
    const PATH_UPLOAD = `/files/profile`;
    const PATH_EDIT = `/profile`;

    const formData = new FormData();
    selectedFile && formData.append('files', selectedFile.raw);
    const payload = {
      email,
      firstName,
      lastName,
      gender,
    };
    let payloadWithPicture;

    if (selectedFile) {
      payloadWithPicture = {
        ...payload,
        profilePicture: {
          raw: formData,
          id: userData.profile_picture?.id,
          size: selectedFile.filesize,
          title: selectedFile.filename,
          type: selectedFile.filetype,
        },
      };

      await fetchData({
        url: PATH_UPLOAD,
        method: 'put',
        payload: payloadWithPicture.profilePicture.raw,
      });
    }

    await fetchData({
      url: PATH_EDIT,
      method: 'put',
      payload: selectedFile ? payloadWithPicture : payload,
    });

    await loadUserInfos();

    router.replace('/home');
  }

  return (
    <div className="my-[100px] w-[100vw] flex justify-center">
      <div className="flex w-[60%] justify-evenly">
        <div className="flex flex-col gap-y-[10px]">
          <div className="w-[230px] h-[230px] relative">
            <img
              alt="Profile picture"
              className="max-w-[100%] max-h-[100%]"
              src={chooseProfilePicture()}
            />
          </div>
          <input
            onChange={handleChange}
            accept=".pdf,.jpg,.jpeg,.png"
            id="file-upload"
            type="file"
            className="opacity-0 w-[0.1px] h-[0.1px] absolute overflow-hidden -z-1"
          />
          <Button className="relative">
            <label htmlFor="file-upload" className="min-w-full min-h-[100%]">
              Change profile picture
            </label>
          </Button>
        </div>
        <div className="flex flex-col gap-y-[20px]">
          <h2 className="text-[30px] text-purple-600 font-semibold">
            Edit your profile information
          </h2>
          <TextField
            label={'First name'}
            variant="outlined"
            value={firstName}
            onChange={({ target }) => setFirstName(target.value)}
            className="w-full"
          />
          <TextField
            label={'Last name'}
            variant="outlined"
            value={lastName}
            onChange={({ target }) => setLastName(target.value)}
            className="w-full"
          />
          <TextField
            label={'Email'}
            variant="outlined"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            className="w-full"
          />
          <div>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              value={gender}
              onChange={({ target }) => setGender(target.value as Gender)}
              name="radio-buttons-group"
              row
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="none"
                control={<Radio />}
                label="Prefer not to say"
              />
            </RadioGroup>
          </div>
          <Button onClick={handleSaveEdit}>Save edit</Button>
        </div>
      </div>
    </div>
  );
}
