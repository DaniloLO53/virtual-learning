'use client'

import Link from 'next/link';
import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import Section from './Section';


interface ArticleProps extends React.HTMLAttributes<HTMLDivElement> {
  title: any;
  description: any;
  article_id: any;
  sections: any;
  courseId: any;
  role: any;
}

export const Article: React.FC<ArticleProps> =({
    title,
    description,
    article_id,
    sections,
    courseId,
    role
}: ArticleProps) => {
  return (
    <div
      className='w-full'
      key={'article-'+ article_id}
    >
      <div className='p-[10px] flex flex-col border-b-[1px] border-b-purple-600'>
        <h2 className='text-[30px] text-purple-600 font-semibold'>{ title }</h2>
        <p>{ description }</p>
      </div>
      <>
        { role === 'teacher' &&
          <div className='flex'>
            <Link
              href={`/courses/${courseId}/articles/${article_id}/create`}
              className='p-[10px] text-purple-500 font-bold flex items-center'
            >
              <AddIcon />
              New section
            </Link>
          </div>
        }
        <ul
          className='flex flex-col divide-y divide-slate-200'
          role='list'
        >
          { sections?.map(({ title, id, updated_at }: any) => (
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
  )
}
