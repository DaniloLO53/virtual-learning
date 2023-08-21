'use client'

import Button from '@/components/Button';
import Editor from '@/lib/lexical/Editor';
import axios from 'axios';
import HTML from 'html-parse-stringify';
import * as React from 'react';

export interface ArticleParams {
  params: {
    articleId: string;
    courseId: string;
  }
}

export default function CreateSection({ params }: ArticleParams) {
  const [title, setTitle] = React.useState('');

  async function handlePublishSection() {
    const sectionContent = document.getElementById('editor-input')?.innerHTML;
    const TOKEN = JSON.parse(localStorage.getItem('access_token') || '');
    const role = JSON.parse(localStorage.getItem('role') || '');
    const URL = (process.env.NEXT_PUBLIC_SERVER_ENDPOINT as string) + `/articles/${params.articleId}`;
    const config = {
      headers: {
        role,
        authorization: 'Bearer ' + TOKEN
      },
    }
    let payload: any = { content: sectionContent, title };
    try {
      const { data } = await axios.post(URL, payload, { ...config });
      console.log('Data:', data)
    } catch (error) {
      console.log('Error', error)
    }
  }

  return (
    <div
      className='pt-[80px] flex justify-center'
    >
      <div className='flex flex-col w-[60%]'>
        <label htmlFor='section-title'>
          <input
            id='section-title'
            placeholder='Title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
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