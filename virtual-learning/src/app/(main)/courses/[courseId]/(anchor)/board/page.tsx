"use client"

import Section from '@/components/Section';
import Link from 'next/link';
import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import SimpleDialog from '@/components/ActivityDialog';
import { fetchData } from '@/services/fetchData';
import { Article } from '@/components/Article';
import ArticleDialog from '@/components/ArticleDialog';

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTitle('');
    setDescription('');
  };

  async function handlePublishArticle() {
    const PATH = '/articles';
    let payload: any = { title, description, course_id: Number(params.courseId) };
    await fetchData(PATH, 'post', payload);
    handleClose();
  }

  async function loadArticles() {
    const PATH = `/articles/course/${params.courseId}`;
    const articlesFromApi = await fetchData(PATH, 'get');
    setArticles(articlesFromApi);
  }

  React.useEffect(() => {
    loadArticles();
  }, [open])
  return (
    <div className='my-[100px] w-full flex flex-col items-center'>
      <div className='w-[60%] flex flex-col items-start pt-[20px]'>
        { role === 'teacher' &&
          <button
            className='p-[10px] text-purple-500 font-bold text-[22px] flex items-center'
            type='button'
            onClick={handleClickOpen}
          >
            <AddIcon />
            New article
          </button>
        }
        <ArticleDialog
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          open={open}
          onClose={handleClose}
          handlePublishArticle={handlePublishArticle}
        />
        { articles?.map(({ title, description, id: article_id, sections }) => (
          <Article
            key={article_id}
            role={role}
            title={title}
            description={description}
            article_id={article_id}
            sections={sections}
            courseId={params.courseId}
          />
        ))}
      </div>
    </div>
  )
}