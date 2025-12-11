import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Reminder {
  content: string;
  slug: string;
  title?: string;
  id?: number;
  date?: string;
  source?: string;
  tweet_url?: string;
  original?: string;
  tags?: string[];
}

const remindersDirectory = path.join(process.cwd(), 'content', 'reminders');

export function getAllReminders(): Reminder[] {
  // Check if directory exists
  if (!fs.existsSync(remindersDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(remindersDirectory);
  const reminders = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => {
      const fullPath = path.join(remindersDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { content, data } = matter(fileContents);
      
      // Use slug from frontmatter, fallback to filename without extension
      const slug = data.slug || fileName.replace(/\.md$/, '');

      return {
        content: content.trim(),
        slug,
        title: data.title,
        id: data.id,
        date: data.date,
        source: data.source,
        tweet_url: data.tweet_url,
        original: data.original,
        tags: data.tags,
      };
    });

  return reminders;
}

export function getRandomReminder(): Reminder | null {
  const reminders = getAllReminders();
  if (reminders.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * reminders.length);
  return reminders[randomIndex];
}

export function getReminderBySlug(slug: string): Reminder | null {
  const reminders = getAllReminders();
  return reminders.find((reminder) => reminder.slug === slug) || null;
}

export function getAllSlugs(): string[] {
  return getAllReminders().map((reminder) => reminder.slug);
}

export function stripReminderHeading(content: string): string {
  // Remove "# Reminder to Myself" or "# Reminder to myself" heading if present
  return content.replace(/^#\s*Reminder\s+to\s+[Mm]yself\s*\n*/i, '').trim();
}

export function formatSlugAsTitle(slug: string): string {
  // Convert "nonlinear-productivity" to "Nonlinear Productivity"
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function getDisplayTitle(reminder: Reminder): string {
  return reminder.title || formatSlugAsTitle(reminder.slug);
}

export function getOrderedReminders(): Reminder[] {
  const reminders = getAllReminders();
  // Sort by ID if available, otherwise by slug
  return reminders.sort((a, b) => {
    if (a.id !== undefined && b.id !== undefined) {
      return a.id - b.id;
    }
    if (a.id !== undefined) return -1;
    if (b.id !== undefined) return 1;
    return a.slug.localeCompare(b.slug);
  });
}

export function getNextReminder(currentSlug: string): Reminder | null {
  const ordered = getOrderedReminders();
  const currentIndex = ordered.findIndex(r => r.slug === currentSlug);
  if (currentIndex === -1 || currentIndex === ordered.length - 1) {
    return null;
  }
  return ordered[currentIndex + 1];
}

export function getPreviousReminder(currentSlug: string): Reminder | null {
  const ordered = getOrderedReminders();
  const currentIndex = ordered.findIndex(r => r.slug === currentSlug);
  if (currentIndex === -1 || currentIndex === 0) {
    return null;
  }
  return ordered[currentIndex - 1];
}

