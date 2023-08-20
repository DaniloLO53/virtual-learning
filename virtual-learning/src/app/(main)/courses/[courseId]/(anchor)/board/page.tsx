"use client"

import ArticleSummaryLink from '@/components/ArticleSummaryLink';
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

interface Article {
  id: number;
  title: string;
  content: string;
  updated_at: string;
}

interface ArticleSummary {
  id: number;
  title: string;
  description: string;
  content: Article[];
}

const dumbArticles = [
  {
    id: 0,
    title: 'Objetivo do curso',
    description: `Aqui iremos definir os principais objetivos do curso e falaremos
      sobre as principais habilidades que os alunos terão ao chegar no final do
      módulo.`,
    content: [
      {
        id: 0,
        title: 'Objetivo do módulo 0',
        content: `Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
        Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
        Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum`,
        updated_at: '15-05-2023',
      },
      {
        id: 1,
        title: 'Objetivo do módulo 1',
        content: `Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
        Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
        Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum`,
        updated_at: '15-05-2023',
      },{
        id: 2,
        title: 'Objetivo do módulo 2',
        content: `Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
        Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
        Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum`,
        updated_at: '15-05-2023',
      },
    ]
  },
  {
    id: 1,
    title: 'Módulo 0 - Revisão de trigonometria e funções',
    description: `Aqui iremos definir os principais objetivos do curso e falaremos
      sobre as principais habilidades que os alunos terão ao chegar no final do
      módulo. Aqui iremos definir os principais objetivos do curso e falaremos
      sobre as principais habilidades que os alunos terão ao chegar no final do
      módulo.`,
    content: [
      {
        id: 0,
        title: 'Trigonometria',
        content: `Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
        Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
        Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum`,
        updated_at: '15-05-2023',
      },
      {
        id: 1,
        title: 'Funções',
        content: `Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
        Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
        Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum`,
        updated_at: '15-05-2023',
      },{
        id: 2,
        title: 'Funções e trigonometria',
        content: `Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
        Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
        Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum`,
        updated_at: '15-05-2023',
      },
    ]
  },
  {
    id: 2,
    title: 'Módulo 1 - Limites e Continuidade',
    description: `Aqui iremos definir os principais objetivos do curso e falaremos
      sobre as principais habilidades que os alunos terão ao chegar no final do
      módulo.`,
    content: [
      {
        id: 0,
        title: 'Definições sobre continuidade',
        content: `Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
        Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
        Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum`,
        updated_at: '15-05-2023',
      },
      {
        id: 1,
        title: 'Limites e suas regras',
        content: `Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
        Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
        Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum`,
        updated_at: '15-05-2023',
      },{
        id: 2,
        title: 'Analisando limites no gráfico',
        content: `Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
        Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
        Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum`,
        updated_at: '15-05-2023',
      },
    ]
  },
]

export default function Board({ params }: BoardParams) {
  const role = JSON.parse(localStorage.getItem('role') || '');
  const [articles, setArticles] = React.useState<ArticleSummary[]>(dumbArticles);
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    handlePublishArticle();
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

  async function loadCourse() {
    const { courseId } = params;
    const TOKEN = JSON.parse(localStorage.getItem('access_token') || '');
    const URL = (process.env.NEXT_PUBLIC_SERVER_ENDPOINT as string) + `/courses/${courseId}/`;
    const config = {
      headers: {
        role: 'student',
        authorization: 'Bearer ' + TOKEN
      },
    }
    console.log('courseId', courseId)
    try {
      // const { data } = await axios.get(URL, { ...config });
      // setCourseInfos(data);
      // console.log('Data from participants:', data)
    } catch (error) {
      console.log('Error', error)
    }
  }

  React.useEffect(() => {
    loadCourse();
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
        />
      </div>
      { articles.map(({ title, description, id, content }) => (
        <div className='w-full flex flex-col items-center' key={id}>
          <div className='w-[60%] p-[10px] flex flex-col border-b-[1px]
            border-b-purple-600'>
            <h2 className='text-[30px] text-purple-600 font-semibold'>
              { title }
            </h2>
            <p>
              { description }
            </p>
          </div>
          <ul
            className='w-[60%] flex flex-col py-[20px] divide-y divide-slate-200'
            role='list'
          >
            { content.map(({ title, id, updated_at }) => (
              <ArticleSummaryLink
                key={id}
                title={title}
                id={id}
                courseId={params.courseId}
                updated_at={updated_at}
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}