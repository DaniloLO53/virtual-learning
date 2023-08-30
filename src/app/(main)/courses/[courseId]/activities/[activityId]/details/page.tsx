import * as React from 'react';

interface ActivityDetailsProps {
  params: {
    activityId: string;
    courseId: string;
  }
}

export default function ActivityDetails({ params }: ActivityDetailsProps) {
  const { activityId, courseId } = params;

  return (
    <div>
      TESTE
    </div>
  )
}