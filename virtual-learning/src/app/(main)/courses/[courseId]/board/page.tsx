"use client"

import ArticleSummaryLink from '@/components/ArticleSummaryLink';
import axios from 'axios';
import * as React from 'react';

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
  const [articles, setArticles] = React.useState<ArticleSummary[]>(dumbArticles);
  const summaryElement = React.useRef(null);

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