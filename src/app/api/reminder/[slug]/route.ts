import { getReminderBySlug, stripReminderHeading } from '@/lib/reminders';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const reminder = getReminderBySlug(slug);

  if (!reminder) {
    return Response.json({ error: 'Reminder not found' }, { status: 404 });
  }

  const content = stripReminderHeading(reminder.content);
  
  return Response.json({
    content,
    slug: reminder.slug,
  });
}

