'use client'

import Button from '@/components/Button';
import Editor from '@/lib/lexical/Editor';
import { fetchData } from '@/services/fetchData';
import { TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import * as React from 'react';

export interface ArticleParams {
  params: {
    articleId: string;
    courseId: string;
  }
}

export default function CreateSection({ params }: ArticleParams) {
  const [title, setTitle] = React.useState('');
  const router = useRouter();

  async function handlePublishSection() {
    const sectionContent = document.getElementById('editor-input')?.innerHTML;
    let payload: any = { content: sectionContent, title };
    const PATH = `/articles/${params.articleId}`;
    await fetchData(PATH, 'post', payload);
    router.back();
  }

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
        <Editor />
        <Button
          onClick={handlePublishSection}
          className='w-[200px]'
        >
          Publish
        </Button>
      </div>
    </div>
  )
}