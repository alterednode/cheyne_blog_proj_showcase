'use client';

import React from 'react';

type IframeProps = {
  src: string;
  title: string;
  width?: string | number;
  height?: string | number;
  allowFullScreen?: boolean;
};

export default function Iframe({
  src,
  title,
  width = '100%',
  height = '600px',
  allowFullScreen = true,
}: IframeProps) {
  return (
    <div className="relative w-full h-0 pb-[56.25%] mb-8">
      <iframe
        src={src}
        title={title}
        allowFullScreen={allowFullScreen}
        className="absolute top-0 left-0 w-full h-full rounded-lg border border-gray-300 dark:border-gray-700 shadow-md"
      />
    </div>
  );
}
