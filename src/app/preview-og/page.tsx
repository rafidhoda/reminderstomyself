import { getRandomReminder, getDisplayTitle, stripReminderHeading } from "@/lib/reminders";

export default function PreviewOGPage() {
  const reminder = getRandomReminder();
  
  if (!reminder) {
    return <div>No reminder found</div>;
  }

  const displayTitle = getDisplayTitle(reminder);
  const content = stripReminderHeading(reminder.content);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 dark:bg-zinc-900 p-8">
      <div className="text-center mb-4 text-zinc-600 dark:text-zinc-400">
        <p className="text-sm mb-2">Preview of social media image (1200x1200px)</p>
        <p className="text-xs">This is how it will look when generated</p>
      </div>
      
      {/* Square image preview - 1200x1200px equivalent */}
      <div className="w-full max-w-[600px] aspect-square bg-black rounded-lg shadow-2xl overflow-hidden relative border-4 border-zinc-300 dark:border-zinc-700">
        {/* Content container with padding */}
        <div className="h-full flex flex-col justify-between p-16">
          {/* Top section - Branding */}
          <div>
            <div className="text-zinc-500 text-sm font-medium tracking-wider uppercase">
              Reminders to myself
            </div>
          </div>

          {/* Middle section - Content */}
          <div className="flex-1 flex items-center py-8">
            <div className="text-white text-2xl leading-relaxed w-full">
              {content.split('\n').filter(line => line.trim()).map((line, i) => {
                // Handle bold text
                const parts = line.split(/(\*\*.*?\*\*)/g);
                return (
                  <p key={i} className={i > 0 ? 'mt-6' : ''}>
                    {parts.map((part, j) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={j} className="font-bold">{part.slice(2, -2)}</strong>;
                      }
                      return <span key={j}>{part}</span>;
                    })}
                  </p>
                );
              })}
            </div>
          </div>

          {/* Bottom section - Attribution */}
          <div className="text-zinc-500 text-lg text-right">
            — <span className="text-white font-semibold">Rafid Hoda</span>
          </div>
        </div>
      </div>
    </div>
  );
}

