import Link from 'next/link';
import * as React from 'react';

interface CourseTopBarAnchorProps {
    currentTab: string;
    courseId: string;
    setCurrentTab: any;
    anchorName: string;
}

export default function CourseTopBarAnchor({
  currentTab, courseId, setCurrentTab, anchorName
}: CourseTopBarAnchorProps) {
  const current = currentTab === anchorName;

  return (
    <li className={`min-h-full relative flex items-center ${current && 'text-purple-600 bg-purple-100/60 '}`}>
      <Link
        href={`/courses/${courseId}/${anchorName}`}
        className={`${current && 'after:content-[""] after:w-full after:absolute after:bottom-[0px] after:left-[0px] after:h-[4px] after:bg-gray-400 after:rounded-t-[7px]'} min-h-full px-[15px]`}
        onClick={() => setCurrentTab(anchorName)}
      >
        { anchorName.charAt(0).toUpperCase() + anchorName.slice(1) }
      </Link>
    </li>
  )
}