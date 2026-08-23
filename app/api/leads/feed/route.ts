import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

export const dynamic = 'force-dynamic';

const parser = new Parser({
  customFields: {
    item: ['description', 'pubDate', 'guid'],
  }
});

// RSS фиды бирж
const FEEDS = [
  { name: 'Habr Freelance', url: 'https://freelance.habr.com/tasks.rss', category: 'dev' },
  { name: 'FL.ru', url: 'https://www.fl.ru/rss/all.xml', category: 'all' },
];

export interface Lead {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  source: string;
  snippet: string;
  budget: string;
  tags: string[];
}

function cleanHtml(html: string): string {
  return html.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').trim();
}

function extractBudget(text: string): string {
  const match = text.match(/(\d[\d\s]*\s*(?:руб|₽|USD|\$|EUR|€))/i);
  return match ? match[1].trim() : 'По договоренности';
}

function detectCategory(text: string): string[] {
  const t = text.toLowerCase();
  const tags: string[] = [];
  
  if (t.includes('разработ') || t.includes('бот') || t.includes('python') || t.includes('react') || t.includes('сайт') || t.includes('скрипт') || t.includes('api')) {
    tags.push('💻 Разработка');
  }
  if (t.includes('дизайн') || t.includes('figma') || t.includes('лого') || t.includes('баннер') || t.includes('ui/ux')) {
    tags.push('🎨 Дизайн');
  }
  if (t.includes('маркетинг') || t.includes('трафик') || t.includes('smm') || t.includes('реклам') || t.includes('seo')) {
    tags.push('📢 Маркетинг');
  }
  
  return tags.length > 0 ? tags : ['🔥 Общее'];
}

export async function GET() {
  try {
    const leads: Lead[] = [];

    for (const feed of FEEDS) {
      try {
        const parsed = await parser.parseURL(feed.url);
        
        for (const item of (parsed.items || []).slice(0, 15)) {
          const rawText = item.contentSnippet || item.description || item.title || '';
          const cleanText = cleanHtml(rawText);

          leads.push({
            id: item.guid || item.link || Math.random().toString(),
            title: item.title?.trim() || 'Без названия',
            link: item.link || '#',
            pubDate: item.pubDate || new Date().toISOString(),
            source: feed.name,
            snippet: cleanText.slice(0, 220) + (cleanText.length > 220 ? '...' : ''),
            budget: extractBudget(rawText + ' ' + (item.title || '')),
            tags: detectCategory(item.title + ' ' + cleanText),
          });
        }
      } catch (feedError) {
        console.error(`Ошибка при сборе с ${feed.name}:`, feedError);
      }
    }

    // Сортировка по дате (самые свежие первыми)
    leads.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

    return NextResponse.json({
      success: true,
      count: leads.length,
      leads: leads
    });
  } catch (error) {
    console.error('Scraper error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch feeds' }, { status: 500 });
  }
}
