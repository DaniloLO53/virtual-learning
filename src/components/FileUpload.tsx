import React, { useState } from 'react'
import { Box } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import ClearIcon from '@mui/icons-material/Clear';
import uniqid from 'uniqid';

export type FileUploadProps = {
  selectedFiles: any
  setSelectedFiles: any
}

export const FileUpload: React.FC<FileUploadProps> = ({ selectedFiles, setSelectedFiles }) => {
    const filesizes = (bytes: any, decimals = 2) => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      Object.values(event.target?.files || {}).forEach((file: any) => {
        console.log('FILE', file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedFiles((prevState: any) => (
            [
              ...prevState,
              {
                raw: file,
                id: uniqid(),
                filename: file.name,
                filetype: file.type,
                fileimage: URL.createObjectURL(file),
                datetime: file.lastModifiedDate.toLocaleString('en-IN'),
                filesize: filesizes(file.size)
              }
            ]
          ))
        }
        file && reader.readAsDataURL(file);
        return;
      })
    }

    function handleDeleteSelectedItem(id: string) {
      const filteredFiles = selectedFiles.filter((file: any) => file.id !== id);
      console.log('filteredFiles', filteredFiles)
      console.log('selectedFiles', selectedFiles)
      setSelectedFiles(filteredFiles);
    }

    return (
      <div className='w-full min-h-[150px]'>
        <input
          onChange={handleChange}
          accept='.pdf,.jpg,.jpeg,.png'
          multiple
          id="file-upload"
          type="file"
          className='opacity-0 w-[0.1px] h-[0.1px] absolute overflow-hidden -z-1'
        />
        <label
          htmlFor="file-upload"
          className=''
          // {...dragEvents}
        >
          <div
            className='bg-slate-100 min-h-full flex items-center justify-center'
          >
            {/* {imageButton && (
              <Box
              >
                <img
                  alt="file upload"
                  src={`${imageUrl}`}
                />
              </Box>
            )} */}
              <div
                className='flex flex-col items-center p-[20px] opacity-60 hover:opacity-100'
              >
                <CloudUploadIcon fontSize="large" />
                <Typography>{'Click or drag to upload file'}</Typography>
              </div>
          </div>
        </label>
        <div className='flex flex-wrap justify-between gap-y-[5px]'>
        {
          selectedFiles.map((data: any, index: number) => {
            const { filename, filetype, fileimage, datetime, filesize, id } = data;
            return (
              <div className="border-[1px] border-slate-200 w-[50%] flex h-[180px] p-[10px]" key={index}>
                {
                  filename.match(/.(jpg|jpeg|png|gif|svg)$/i) ?
                  <div className="w-[30%] flex items-center justify-center relative">
                    <Image
                      src={fileimage}
                      alt='Uploaded file'
                      fill={true}
                      priority
                    />
                  {/* <embed
                    width="250"
                    height="250"
                    src={fileimage}
                  /> */}
                  </div> :
                  <div className=""><i className=""></i></div>
                }
                <div className='w-[70%]'>
                  <div className="flex items-center justify-end p-[5px] hover:text-purple-400">
                    <button
                      type="button"
                      onClick={() => handleDeleteSelectedItem(id)}
                    >
                      <ClearIcon sx={{ fontSize: '25px'}}/>
                    </button>
                  </div>
                  <div className=" p-[15px] flex flex-col text-[14px]">
                    <h6 className='w-full truncate'>{filename}</h6>
                    <p className='w-full truncate'>Size : {filesize}</p>
                    <p className="w-full truncate">Updated at : {datetime}</p>
                  </div>
                </div>
              </div>
            )
          })
        }
        </div>
      </div>
    )
}
