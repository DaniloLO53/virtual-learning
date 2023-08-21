"use client"

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
    const { sectionId } = params;
    const TOKEN = JSON.parse(localStorage.getItem('access_token') || '');
    const role = JSON.parse(localStorage.getItem('role') || '');

    const URL = (process.env.NEXT_PUBLIC_SERVER_ENDPOINT as string) + `/articles/sections/${sectionId}`;
    const config = {
      headers: {
        role,
        authorization: 'Bearer ' + TOKEN
      },
    }
    try {
      const { data } = await axios.get(URL, { ...config });
      const parser = new DOMParser();
      const document = parser.parseFromString(data.content, "text/html");
      const content = document.body;
      setSectionContent(content);
      setSectionTitle(data.title);
      console.log('content:', content)
    } catch (error) {
      console.log('Error', error)
    }
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