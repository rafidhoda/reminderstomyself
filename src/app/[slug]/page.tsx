import { getReminderBySlug, getAllSlugs, stripReminderHeading, getDisplayTitle, getNextReminder, getPreviousReminder } from "@/lib/reminders";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MarkdownContent } from "@/components/MarkdownContent";

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

export default async function ReminderPage({ params }: PageProps) {
  const { slug } = await params;
  const reminder = getReminderBySlug(slug);

  if (!reminder) {
    notFound();
  }

  const nextReminder = getNextReminder(slug);
  const prevReminder = getPreviousReminder(slug);

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-5xl mx-auto flex-col justify-center py-8 sm:py-16 md:py-24 lg:py-32 px-6 sm:px-8 md:px-12 lg:px-16 bg-white dark:bg-black">
        <Link
          href="/reminders"
          className="block mb-6 sm:mb-8 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          ← Back to reminders
        </Link>
        
        <div className="w-full">
          <div className="flex items-center justify-between mb-6 sm:mb-8 md:mb-12">
            {prevReminder ? (
              <Link
                href={`/${prevReminder.slug}`}
                className="text-xl sm:text-2xl md:text-3xl text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                ←
              </Link>
            ) : (
              <span className="text-xl sm:text-2xl md:text-3xl text-zinc-300 dark:text-zinc-700">←</span>
            )}
            
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-black dark:text-zinc-50 text-center px-2">
              {getDisplayTitle(reminder)}
            </h1>
            
            {nextReminder ? (
              <Link
                href={`/${nextReminder.slug}`}
                className="text-xl sm:text-2xl md:text-3xl text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                →
              </Link>
            ) : (
              <span className="text-xl sm:text-2xl md:text-3xl text-zinc-300 dark:text-zinc-700">→</span>
            )}
          </div>
          
          <div className="prose prose-xl dark:prose-invert max-w-none text-left mb-12 sm:mb-16">
            <MarkdownContent content={stripReminderHeading(reminder.content)} />
          </div>
        </div>
      </main>
      
      <footer className="w-full max-w-5xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-6 sm:py-8 border-t border-zinc-200 dark:border-zinc-800">
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 text-center">
          Reminders to myself by <span className="font-semibold text-zinc-900 dark:text-zinc-100">Rafid Hoda</span>
        </p>
      </footer>
    </div>
  );
}

