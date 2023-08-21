'use client'

import Button from '@/components/Button';
import Editor from '@/lib/lexical/Editor';
import { fetchData } from '@/services/useApi';
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
    let payload: any = { content: sectionContent, title };
    const PATH = `/articles/${params.articleId}`;
    await fetchData(PATH, 'post', payload); 
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