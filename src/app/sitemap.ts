import { getAllSlugs } from '@/lib/reminders';

export default function sitemap() {
  const baseUrl = 'https://reminderstomyself.com';
  const slugs = getAllSlugs();

  const reminderUrls = slugs.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/reminders`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    ...reminderUrls,
  ];
}


