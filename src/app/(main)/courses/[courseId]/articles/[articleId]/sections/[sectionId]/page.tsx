"use client"

import { fetchData } from '@/services/fetchData';
import Link from 'next/link';
import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import Editor from '@/lib/lexical/Editor';
import BasicMenu from '@/components/BasicMenu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  const removeSection = async (id: any) => {
    const PATH = `/articles/sections/${id}`;
    await fetchData(PATH, 'delete');
    router.back();
  }

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
      {
        role === 'teacher' &&
        <div className='flex items-center justify-between'>
          <Link
            href={`/courses/${params.courseId}/articles/${params.articleId}/sections/${params.sectionId}/edit`}
            className='py-[10px] text-purple-500 font-bold flex items-center'
          >
            <AddIcon />
            Edit section
          </Link>
          <BasicMenu
            id={params.sectionId}
            callBack={removeSection}
          >
            <MoreVertIcon
              sx={{
                color: 'black',
              }}
            />
          </BasicMenu>
        </div>
      }
      {/* {sectionContent &&
      <div>
      <div
      className=''
      dangerouslySetInnerHTML={{ __html: sectionContent.innerHTML }}
      />
    </div>} */}
      {
        sectionContent &&
        <div className=''>
          <h1>{ sectionTitle }</h1>
          <Editor content={sectionContent} readOnly={true} />
        </div>
      }
      </div>
    </div>
  )
}