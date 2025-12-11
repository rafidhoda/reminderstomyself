import { getReminderBySlug, getAllSlugs, stripReminderHeading, getDisplayTitle, getNextReminder, getPreviousReminder } from "@/lib/reminders";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MarkdownContent } from "@/components/MarkdownContent";
import { StructuredData } from "@/components/StructuredData";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const reminder = getReminderBySlug(slug);

  if (!reminder) {
    return {
      title: "Reminder not found",
    };
  }

  const title = getDisplayTitle(reminder);
  const content = stripReminderHeading(reminder.content);
  const description = content.split('\n').filter(line => line.trim())[0]?.replace(/\*\*/g, '').substring(0, 160) || `A reminder: ${title}`;
  const url = `https://reminderstomyself.com/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      authors: ["Rafid Hoda"],
      publishedTime: reminder.date,
      siteName: "Reminders to myself",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@rafidhoda",
    },
  };
}

export default async function ReminderPage({ params }: PageProps) {
  const { slug } = await params;
  const reminder = getReminderBySlug(slug);

  if (!reminder) {
    notFound();
  }

  const nextReminder = getNextReminder(slug);
  const prevReminder = getPreviousReminder(slug);
  const content = stripReminderHeading(reminder.content);
  const url = `https://reminderstomyself.com/${slug}`;

  return (
    <>
      <StructuredData
        type="Article"
        data={{
          headline: getDisplayTitle(reminder),
          description: content.split('\n').filter(line => line.trim())[0]?.replace(/\*\*/g, '') || getDisplayTitle(reminder),
          author: {
            "@type": "Person",
            name: "Rafid Hoda",
            url: "https://x.com/rafidhoda",
          },
          datePublished: reminder.date,
          url,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": url,
          },
        }}
      />
      <div className="flex h-screen sm:min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black overflow-hidden">
      <main className="flex flex-1 w-full max-w-5xl mx-auto flex-col justify-between sm:justify-center py-6 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-8 md:px-12 lg:px-16 bg-white dark:bg-black min-h-0 overflow-y-auto">
        <div className="w-full">
          <Link
            href="/reminders"
            className="block mb-6 sm:mb-8 text-xs sm:text-base text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            ← Back to reminders
          </Link>
          
          <div className="flex items-center justify-between mb-6 sm:mb-8 md:mb-12">
            {prevReminder ? (
              <Link
                href={`/${prevReminder.slug}`}
                className="text-base sm:text-2xl md:text-3xl text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                ←
              </Link>
            ) : (
              <span className="text-base sm:text-2xl md:text-3xl text-zinc-300 dark:text-zinc-700">←</span>
            )}
            
            <h1 className="text-base sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-black dark:text-zinc-50 text-center px-1 sm:px-2">
              {getDisplayTitle(reminder)}
            </h1>
            
            {nextReminder ? (
              <Link
                href={`/${nextReminder.slug}`}
                className="text-base sm:text-2xl md:text-3xl text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                →
              </Link>
            ) : (
              <span className="text-base sm:text-2xl md:text-3xl text-zinc-300 dark:text-zinc-700">→</span>
            )}
          </div>
          
          <div className="prose prose-sm sm:prose-xl dark:prose-invert max-w-none text-left mb-6 sm:mb-16">
            <MarkdownContent content={stripReminderHeading(reminder.content)} />
          </div>
        </div>
      </main>
      
      <footer className="w-full max-w-5xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-4 sm:py-6 md:py-8 border-t border-zinc-200 dark:border-zinc-800 flex-shrink-0">
        <p className="text-xs sm:text-base text-zinc-600 dark:text-zinc-400 text-center">
          Reminders to myself by <span className="font-semibold text-zinc-900 dark:text-zinc-100">Rafid Hoda</span>
        </p>
      </footer>
    </div>
    </>
  );
}

