'use client'

import Button from '@/components/Button';
import Editor from '@/lib/lexical/Editor';
import { fetchData } from '@/services/fetchData';
import { TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import * as React from 'react';

export interface SectionParams {
  params: {
    articleId: string;
    courseId: string;
    sectionId: string;
  }
}

export default function EditSection({ params }: SectionParams) {
  const [sectionContent, setSectionContent] = React.useState<any>(null);
  const [title, setTitle] = React.useState('');
  const router = useRouter();

  async function handleEditSection() {
    const sectionContent = document.getElementById('editor-input')?.innerHTML;
    let payload: any = { content: sectionContent, title };
    const PATH = `/articles/sections/${params.sectionId}`;
    await fetchData(PATH, 'put', payload);
    router.back();
  }

  async function loadSection() {
    const PATH = `/articles/sections/${params.sectionId}`;
    const sectionFromApi = await fetchData(PATH, 'get');
    const parser = new DOMParser();
    const document = parser.parseFromString(sectionFromApi.content, "text/html");
    const content = document.body;
    setSectionContent(content);
    setTitle(sectionFromApi.title);
  }

  React.useEffect(() => {
    loadSection();
  }, []);

  return (
    <div
      className='pt-[80px] flex justify-center'
    >
      <div className='flex flex-col w-[60%]'>
        <TextField
          id="section-title"
          label="Title"
          variant="outlined"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          className='bg-white'
        />
        <Editor content={sectionContent} />
        <Button
          onClick={handleEditSection}
          className='w-[200px]'
        >
          Edit
        </Button>
      </div>
    </div>
  )
}