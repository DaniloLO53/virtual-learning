import Image from 'next/image';
import React from 'react';

export enum IconNames {
  learnusLogo = 'learnusLogo',
}

export const Icons = {
  learnusLogo: {
    src: '/learnus.svg',
    alt: 'Default profile logo',
    width: 140,
    height: 70,
  },
  teacherProfile: {
    src: '/default_profile.png',
    alt: 'Default profile logo',
    width: 80,
    height: 80
  }
}

export default function StaticIcon({ icon }: { icon: keyof typeof Icons }) {
  const { src, alt, width, height } = Icons[icon];

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority
    />
  )
}
