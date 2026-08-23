import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

const BOT_TOKEN = '8748079496:AAF2IthIKEspDnPdjtLspw8v3yf9fKD87bQ';
const TG_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

async function sendTelegramMessage(chatId: number, text: string, replyMarkup?: any) {
  try {
    await fetch(`${TG_API}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
        reply_markup: replyMarkup,
      }),
    });
  } catch (err) {
    console.error('Send error:', err);
  }
}

export async function GET(req: Request) {
  try {
    // 1. Получаем всех активных подписчиков из Supabase
    const { data: users, error: dbError } = await supabase
      .from('users')
      .select('*')
      .eq('is_subscribed', true);

    if (dbError || !users || users.length === 0) {
      return NextResponse.json({ success: true, message: 'No active subscribers found' });
    }

    // 2. Получаем свежие заказы через внутренний парсер
    const host = req.headers.get('host') || 'lybra-leads-web.vercel.app';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const feedRes = await fetch(`${protocol}://${host}/api/leads/feed`);
    const feedData = await feedRes.json();

    if (!feedData.success || !feedData.leads || feedData.leads.length === 0) {
      return NextResponse.json({ success: false, message: 'No leads available' });
    }

    const latestLeads = feedData.leads.slice(0, 3);
    let sentCount = 0;

    // 3. Отправляем каждому пользователю подходящие лиды
    for (const user of users) {
      // Фильтрация по категории пользователя
      const filteredLeads = latestLeads.filter((lead: any) => {
        if (user.category === 'all') return true;
        if (user.category === 'dev' && lead.tags.some((t: string) => t.includes('Dev'))) return true;
        if (user.category === 'design' && lead.tags.some((t: string) => t.includes('Дизайн'))) return true;
        if (user.category === 'marketing' && lead.tags.some((t: string) => t.includes('Маркетинг'))) return true;
        return false;
      });

      const leadsToSend = filteredLeads.length > 0 ? filteredLeads : latestLeads.slice(0, 1);

      for (const lead of leadsToSend) {
        const msg = 
          `🔔 <b>Новый горячий заказ для вас!</b>\n\n` +
          `💼 <b>${lead.title}</b>\n\n` +
          `💰 <b>Бюджет:</b> ${lead.budget}\n` +
          `🏷 <b>Теги:</b> ${lead.tags.join(' ')}\n` +
          `📍 <b>Источник:</b> ${lead.source}\n\n` +
          `📝 <i>${lead.snippet}</i>`;

        const keyboard = {
          inline_keyboard: [
            [{ text: '🔗 Откликнуться на заказ', url: lead.link }]
          ]
        };

        await sendTelegramMessage(Number(user.id), msg, keyboard);
        sentCount++;
      }
    }

    return NextResponse.json({
      success: true,
      subscribersCount: users.length,
      dispatchedMessages: sentCount
    });
  } catch (error) {
    console.error('Dispatch error:', error);
    return NextResponse.json({ success: false, error: 'Dispatch failed' }, { status: 500 });
  }
}
