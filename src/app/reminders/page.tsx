import { getOrderedReminders, getDisplayTitle, stripReminderHeading } from "@/lib/reminders";
import Link from "next/link";
import { MarkdownPreview } from "@/components/MarkdownPreview";

export default function RemindersPage() {
  const reminders = getOrderedReminders();

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-6xl mx-auto flex-col py-8 sm:py-12 md:py-16 lg:py-20 px-6 sm:px-8 md:px-12 lg:px-16 bg-white dark:bg-black">
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-black dark:text-zinc-50 mb-2">
            Reminders to myself
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400">
            A collection of reminders I've written over the years
          </p>
        </div>

        {reminders.length === 0 ? (
          <div className="w-full">
            <p className="text-zinc-600 dark:text-zinc-400">
              No reminders found. Add some markdown files to the <code className="px-2 py-1 bg-zinc-200 dark:bg-zinc-800 rounded">content/reminders</code> directory.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {reminders.map((reminder) => {
              const preview = stripReminderHeading(reminder.content).split('\n').slice(0, 3).join('\n');
              const displayTitle = getDisplayTitle(reminder);
              
              return (
                <Link
                  key={reminder.slug}
                  href={`/${reminder.slug}`}
                  className="block p-6 sm:p-8 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-lg transition-all"
                >
                  <h2 className="text-xl sm:text-2xl font-semibold text-black dark:text-zinc-50 mb-4">
                    {displayTitle}
                  </h2>
                  <div className="line-clamp-4">
                    <MarkdownPreview content={preview} />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
      
      <footer className="w-full max-w-6xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-6 sm:py-8 border-t border-zinc-200 dark:border-zinc-800">
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 text-center">
          Reminders to myself by <span className="font-semibold text-zinc-900 dark:text-zinc-100">Rafid Hoda</span>
        </p>
      </footer>
    </div>
  );
}

