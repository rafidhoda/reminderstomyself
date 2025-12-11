"use client";

import ReactMarkdown from "react-markdown";

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="text-sm sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-zinc-900 dark:text-zinc-100">
      <ReactMarkdown
        components={{
          p: ({ children }) => <p className="mb-2 sm:mb-4 md:mb-6">{children}</p>,
          strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

