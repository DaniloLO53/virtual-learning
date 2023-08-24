import React, { useState } from 'react'
import { Box } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import ClearIcon from '@mui/icons-material/Clear';
import uniqid from 'uniqid';

export type FileUploadProps = {
  accept: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onDrop: (event: React.DragEvent<HTMLElement>) => void
}

export const FileUpload: React.FC<FileUploadProps> = ({ accept, onChange, onDrop }) => {
    const [imageUrl, setImageUrl] = React.useState('')
    const [labelText, setLabelText] = React.useState<string>('Click or drag to upload file')
    const [isDragOver, setIsDragOver] = React.useState<boolean>(false)
    const [isMouseOver, setIsMouseOver] = React.useState<boolean>(false)
    const [selectedFiles, setSelectedFiles] = useState<any[]>([]);

    const stopDefaults = (e: React.DragEvent) => {
      e.stopPropagation()
      e.preventDefault()
    }
    const dragEvents = {
      // onMouseEnter: () => {
      //   setIsMouseOver(true)
      // },
      // onMouseLeave: () => {
      //   setIsMouseOver(false)
      // },
      // onDragEnter: (e: React.DragEvent) => {
      //   stopDefaults(e)
      //   setIsDragOver(true)
      //   setLabelText('Drop label')
      // },
      // onDragLeave: (e: React.DragEvent) => {
      //   stopDefaults(e)
      //   setIsDragOver(false)
      //   setLabelText('Hover label')
      // },
      // onDragOver: stopDefaults,
      // onDrop: (e: React.DragEvent<HTMLElement>) => {
      //   console.log('On drop:')
      //   console.log('imageButton:', imageButton)
      //   console.log('e.dataTransfer.files', e.dataTransfer.files)
      //   stopDefaults(e)
      //   setLabelText('Hover label')
      //   setIsDragOver(false)
      //   if (imageButton && e.dataTransfer.files[0]) {
      //     setImageUrl(URL.createObjectURL(e.dataTransfer.files[0]))
      //   }
      //   onDrop(e)
      // },
    }

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
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedFiles((prevState) => (
            [
              ...prevState,
              {
                id: uniqid(),
                filename: file.name,
                filetype: file.type,
                fileimage: reader.result,
                datetime: file.lastModifiedDate.toLocaleString('en-IN'),
                filesize: filesizes(file.size)
            }
            ]
          ))
        }
        file && reader.readAsDataURL(file);
        return
      })
      onChange(event)
    }

    function handleDeleteSelectedItem(id: string) {
      const filteredFiles = selectedFiles.filter((file) => file.id !== id);
      console.log('filteredFiles', filteredFiles)
      console.log('selectedFiles', selectedFiles)
      setSelectedFiles(filteredFiles);
    }

    return (
      <div className='w-full min-h-[150px]'>
        <input
          onChange={handleChange}
          accept={accept}
          multiple
          id="file-upload"
          type="file"
          className='opacity-0 w-[0.1px] h-[0.1px] absolute overflow-hidden -z-1'
        />
        <label
          htmlFor="file-upload"
          className=''
          {...dragEvents}
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
                <Typography>{labelText}</Typography>
              </div>
          </div>
        </label>
        <div className='flex flex-wrap justify-between gap-y-[5px]'>
        {
          selectedFiles.map((data, index) => {
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
