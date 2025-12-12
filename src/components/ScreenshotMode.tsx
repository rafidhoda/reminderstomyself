"use client";

import { useState } from "react";
import { MarkdownContent } from "./MarkdownContent";

interface ScreenshotModeProps {
  children: React.ReactNode;
  content: string;
}

export function ScreenshotMode({ children, content }: ScreenshotModeProps) {
  const [isActive, setIsActive] = useState(false);

  if (isActive) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex items-center justify-center p-4">
        <div className="w-full h-full max-w-[600px] max-h-[600px] min-w-0 min-h-0 aspect-square flex flex-col justify-between p-6 sm:p-8 md:p-12">
          <div className="text-white text-[10px] sm:text-xs md:text-sm font-medium tracking-wider uppercase flex-shrink-0">
            REMINDER TO MYSELF
          </div>
          
          <div className="flex-1 flex items-center justify-center overflow-hidden min-h-0">
            <div className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed text-left max-w-full px-2 sm:px-4 [&_*]:text-white [&_p]:mb-2 sm:[&_p]:mb-4">
              <MarkdownContent content={content} />
            </div>
          </div>
          
          <div className="text-white text-[10px] sm:text-xs md:text-sm text-right flex-shrink-0">
            — Rafid Hoda
          </div>
          
          <button
            onClick={() => setIsActive(false)}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white hover:text-zinc-400 transition-colors text-xs sm:text-sm"
          >
            ✕ Exit
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsActive(true)}
        className="fixed bottom-3 right-3 z-40 bg-zinc-900/30 dark:bg-zinc-100/30 backdrop-blur-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all hover:bg-zinc-900/50 dark:hover:bg-zinc-100/50 cursor-pointer"
        aria-label="Screenshot mode"
      >
        📷
      </button>
      {children}
    </>
  );
}

