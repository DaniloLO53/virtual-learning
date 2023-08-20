'use client'

import Button from '@/components/Button';
import SimpleDialog from '@/components/SimpleDialog';
import Editor from '@/lib/lexical/Editor';
import axios from 'axios';
import * as React from 'react';

export default function ArticleCreate() {
  return (
    <div
      className='pt-[60px] flex flex-col items-center'
    >
        <Editor />
        <Button
          onClick={() => 'oi'}
          className='w-[200px]'
        >
          Publish
        </Button>
    </div>
  )
}