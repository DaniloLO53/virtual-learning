"use client"

import { fetchData } from '@/services/fetchData';
import axios from 'axios';
import Link from 'next/link';
import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';

export interface SectionParams {
  params: {
    sectionId: string;
    articleId: string;
    courseId: string;
  }
}

export default function Section({ params }: SectionParams) {
  const [sectionContent, setSectionContent] = React.useState<any>(null);
  const [sectionTitle, setSectionTitle] = React.useState('');
  const role = JSON.parse(localStorage.getItem('role') || '');

  async function loadSection() {
    const PATH = `/articles/sections/${params.sectionId}`;
    const sectionFromApi = await fetchData(PATH, 'get');
    const parser = new DOMParser();
    const document = parser.parseFromString(sectionFromApi.content, "text/html");
    const content = document.body;
    setSectionContent(content);
    setSectionTitle(sectionFromApi.title);
  }

  React.useEffect(() => {
    loadSection();
  }, []);
  return (
    <div className='mt-[100px] w-full flex flex-col items-center'>
      <div className='w-[60%]'>
      { role === 'teacher' &&
        <Link
          href={`/courses/${params.courseId}/articles/${params.articleId}/sections/${params.sectionId}/edit`}
          className='py-[10px] text-purple-500 font-bold flex items-center'
        >
          <AddIcon />
          Edit section
        </Link>
      }
      {sectionContent &&
      <div>
        <h1>{ sectionTitle }</h1>
        <div
          className=''
          dangerouslySetInnerHTML={{ __html: sectionContent.innerHTML }}
        />
      </div>}
      </div>
    </div>
  )
}