"use client"

import { fetchData } from '@/services/useApi';
import axios from 'axios';
import * as React from 'react';

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
  }, [])
  return (
    <div className='mt-[100px] w-full flex flex-col items-center'>
      {sectionContent && <div className='w-[60%]'>
        <h1>{ sectionTitle }</h1>
        <div
          className=''
          dangerouslySetInnerHTML={{ __html: sectionContent.innerHTML }}
        />
      </div>}
    </div>
  )
}