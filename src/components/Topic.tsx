import * as React from 'react';
import { TopicItem } from './Article';

interface TopicProps {
  subject: any;
}

export default function Topic({ subject }: TopicProps) {
  return (
    <ul
      className='w-[60%] divide-y divide-slate-400 flex flex-col py-[20px]'
      role='list'
    >
    {
      subject?.map((item: any, index: number) => (
        <TopicItem>

        </TopicItem>
      ))
    }
    </ul>
  )
}