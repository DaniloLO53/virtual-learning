import * as React from 'react';

interface ActivitySubmitsProps {
  params: {
    activityId: string;
    courseId: string;
  }
}

export default function ActivitySubmits({ params }: ActivitySubmitsProps) {
  const { activityId, courseId } = params;

  return (
    <div>
      TESTE
    </div>
  )
}