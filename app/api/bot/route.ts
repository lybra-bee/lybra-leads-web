import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

const BOT_TOKEN = '8748079496:AAF2IthIKEspDnPdjtLspw8v3yf9fKD87bQ';
const TG_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

async function sendTelegramMessage(chatId: number, text: string, replyMarkup?: any) {
  await fetch(`${TG_API}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: text, parse_mode: 'HTML', reply_markup: replyMarkup }),
  });
}

export async function POST(req: Request) {
  try {
    const update = await req.json();
    let user = null;
    let chatId = null;
    let text = '';

    if (update.message) {
      user = update.message.from;
      chatId = update.message.chat.id;
      text = update.message.text || '';
    } else if (update.callback_query) {
      user = update.callback_query.from;
      chatId = update.callback_query.message.chat.id;
      text = update.callback_query.data;
    }

    if (!user || !chatId) return NextResponse.json({ ok: true });

    // Пробуем записать в БД при любом действии
    const { error: dbError } = await supabase.from('users').upsert({
      id: user.id,
      first_name: user.first_name || '',
      username: user.username || '',
      is_subscribed: true
    }, { onConflict: 'id' });

    // Если есть ошибка БД — отправляем её прямо в бота!
    if (dbError) {
      await sendTelegramMessage(chatId, `🚨 <b>Ошибка Supabase:</b> <code>${dbError.message}</code>`);
    }

    if (text.startsWith('/start')) {
      const msg = `👋 Привет, <b>${user.first_name}</b>!\n` +
                  (dbError ? `❌ В базу не записан!` : `✅ Твой профиль (ID: ${user.id}) успешно сохранен в базу!`);
      await sendTelegramMessage(chatId, msg);
    } else if (text.startsWith('cat_')) {
      await supabase.from('users').update({ category: text.replace('cat_', '') }).eq('id', user.id);
      await sendTelegramMessage(chatId, `✅ Категория обновлена!`);
    }

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
