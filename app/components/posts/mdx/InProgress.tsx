import React from 'react';
import { FaHardHat, FaHammer } from 'react-icons/fa';

interface InProgressProps {
  title?: string;
  children?: React.ReactNode;
}

export default function InProgress({ 
  title = "Under Construction", 
  children 
}: InProgressProps) {
  return (
    <div className="relative left-[calc(-50vw+50%)] my-8 w-screen border-y-2 border-yellow-400 bg-yellow-50 shadow-lg dark:bg-yellow-950/30 dark:border-yellow-600/50">
      <style>
        {`
          @keyframes move-stripes {
            from { background-position: 0 0; }
            to { background-position: 56px 0; }
          }
          .animate-stripes {
            animation: move-stripes 1s linear infinite;
          }
        `}
      </style>
      <div 
        className="h-4 w-full animate-stripes" 
        style={{
          backgroundImage: 'linear-gradient(45deg, #FACC15 25%, #EAB308 25%, #EAB308 50%, #FACC15 50%, #FACC15 75%, #EAB308 75%, #EAB308 100%)',
          backgroundSize: '56px 56px'
        }}
      />
      
      <div className="mx-auto max-w-4xl px-6">
        <div className="flex flex-col items-center gap-6 py-6 sm:flex-row">
          <div className="relative shrink-0">
            <div className="absolute -right-2 -top-2 animate-bounce">
              <FaHammer className="text-2xl text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-200 ring-4 ring-yellow-100 dark:bg-yellow-900 dark:ring-yellow-900/50">
              <FaHardHat className="text-3xl text-yellow-700 dark:text-yellow-300" />
            </div>
          </div>
          
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-bold text-yellow-900 dark:text-yellow-100">
              {title}
            </h3>
            <div className="mt-2 text-yellow-800 dark:text-yellow-200/80 ">
              {children || "I'm still hammering away at this. Mind the dust! Some parts might be incomplete or subject to change."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
