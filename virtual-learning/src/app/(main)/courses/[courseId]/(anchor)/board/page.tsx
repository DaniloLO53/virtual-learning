"use client"

import Section from '@/components/Section';
import axios from 'axios';
import Link from 'next/link';
import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import SimpleDialog from '@/components/SimpleDialog';

interface BoardParams {
  params: {
    courseId: string;
  }
}

interface Section {
  id: number;
  title: string;
  content: string;
  updated_at: string;
}

interface Article {
  id: number;
  title: string;
  description: string;
  sections: Section[];
}

export default function Board({ params }: BoardParams) {
  const role = JSON.parse(localStorage.getItem('role') || '');
  const [articles, setArticles] = React.useState<Article[] | null>(null);
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const { courseId } = params;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // handlePublishArticle();
  };

  async function handlePublishArticle() {
    const TOKEN = JSON.parse(localStorage.getItem('access_token') || '');
    const role = JSON.parse(localStorage.getItem('role') || '');
    const URL = (process.env.NEXT_PUBLIC_SERVER_ENDPOINT as string) + '/articles';
    const config = {
      headers: {
        role,
        authorization: 'Bearer ' + TOKEN
      },
    }
    let payload: any = { title, description, course_id: Number(params.courseId) };
    try {
      const { data } = await axios.post(URL, payload, { ...config });
      console.log('Data:', data)
    } catch (error) {
      console.log('Error', error)
    }
  }

  async function loadArticles() {
    const TOKEN = JSON.parse(localStorage.getItem('access_token') || '');
    const URL = (process.env.NEXT_PUBLIC_SERVER_ENDPOINT as string) + `/articles/course/${courseId}`;
    const config = {
      headers: {
        role,
        authorization: 'Bearer ' + TOKEN
      },
    }
    console.log('courseId', courseId)
    console.log('URL', URL)
    try {
      const { data } = await axios.get(URL, { ...config });
      setArticles(data);
      console.log('Data from board:', data)
    } catch (error) {
      console.log('Error', error)
    }
  }

  React.useEffect(() => {
    loadArticles();
  }, [])
  return (
    <div className='mt-[150px] w-full flex flex-col items-center'>
      <div className='w-[60%]'>
        { role === 'teacher' &&
        <button
          className='p-[10px] text-purple-500 font-bold flex items-center'
          type='button'
          onClick={handleClickOpen}
        >
          <AddIcon />
          New article
        </button>}
        <SimpleDialog
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          open={open}
          onClose={handleClose}
          handlePublishArticle={handlePublishArticle}
        />
      </div>
      { articles?.map(({ title, description, id: article_id, sections }) => (
        <div
          className='w-full flex flex-col items-center'
          key={'article-'+ article_id}
        >
          <div className='w-[60%] p-[10px] flex flex-col border-b-[1px]
            border-b-purple-600'>
            <h2 className='text-[30px] text-purple-600 font-semibold'>
              { title }
            </h2>
            <p>
              { description }
            </p>
          </div>
          <>
            { role === 'teacher' &&
              <div className='py-[10px] flex w-[60%]'>
                <Link
                  href={`/courses/${courseId}/articles/${article_id}/create`}
                  className='p-[10px] text-purple-500 font-bold flex items-center'
                >
                  <AddIcon />
                  New section
                </Link>
              </div>}
              <ul
                className='w-[60%] flex flex-col py-[20px] divide-y divide-slate-200'
                role='list'
              >
              { sections?.map(({ title, id, updated_at }) => (
                <Section
                  key={'section-' + id}
                  title={title}
                  id={id}
                  section_id={id}
                  course_id={courseId}
                  article_id={article_id}
                  updated_at={updated_at}
                />
              ))}
            </ul>
          </>
        </div>
      ))}
    </div>
  )
}