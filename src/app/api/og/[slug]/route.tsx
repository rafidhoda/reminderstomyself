import { ImageResponse } from '@vercel/og';
import { getReminderBySlug, stripReminderHeading } from '@/lib/reminders';
import { NextRequest } from 'next/server';

export const runtime = 'nodejs';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const reminder = getReminderBySlug(slug);

  if (!reminder) {
    return new Response('Reminder not found', { status: 404 });
  }

  const content = stripReminderHeading(reminder.content);
  const lines = content.split('\n').filter(line => line.trim());

  try {
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#000000',
            padding: '64px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          {/* Top section - Branding */}
          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'flex-start',
            }}
          >
            <div
              style={{
                color: '#71717a',
                fontSize: '14px',
                fontWeight: '500',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Reminders to myself
            </div>
          </div>

          {/* Middle section - Content */}
          <div
            style={{
              display: 'flex',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              paddingTop: '32px',
              paddingBottom: '32px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                color: '#ffffff',
                fontSize: '32px',
                lineHeight: '1.6',
                width: '100%',
              }}
            >
              {lines.map((line, i) => {
                // Handle bold text
                const parts = line.split(/(\*\*.*?\*\*)/g);
                return (
                  <div
                    key={i}
                    style={{
                      marginTop: i > 0 ? '24px' : '0',
                    }}
                  >
                    {parts.map((part, j) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return (
                          <span
                            key={j}
                            style={{
                              fontWeight: '700',
                            }}
                          >
                            {part.slice(2, -2)}
                          </span>
                        );
                      }
                      return <span key={j}>{part}</span>;
                    })}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom section - Attribution */}
          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'flex-end',
            }}
          >
            <div
              style={{
                color: '#71717a',
                fontSize: '18px',
              }}
            >
              — <span style={{ color: '#ffffff', fontWeight: '600' }}>Rafid Hoda</span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 1200,
      }
    );
  } catch (e: any) {
    console.error('Error generating image:', e);
    return new Response(`Failed to generate the image: ${e.message}`, {
      status: 500,
    });
  }
}

