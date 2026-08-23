import { NextResponse } from 'next/server';

const BOT_TOKEN = '8748079496:AAF2IthIKEspDnPdjtLspw8v3yf9fKD87bQ';
const TG_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

async function sendTelegramMessage(chatId: number, text: string, replyMarkup?: any) {
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
}

export async function POST(req: Request) {
  try {
    const update = await req.json();

    if (update.message) {
      const chatId = update.message.chat.id;
      const text = update.message.text || '';
      const firstName = update.message.from.first_name || 'друг';

      if (text.startsWith('/start')) {
        const welcomeText = 
          `👋 Привет, <b>${firstName}</b>!\n\n` +
          `⚡ <b>Lybra Leads AI</b> — радар горячих B2B заказов.\n` +
          `Мы мониторим 300+ бирж и TG-чатов, отсекаем спам и находим прямых заказчиков.\n\n` +
          `👇 Нажмите <b>🔥 Свежие заказы</b> или выберите категорию:`;

        const keyboard = {
          inline_keyboard: [
            [
              { text: '🔥 Получить свежие заказы', callback_data: 'fetch_latest' }
            ],
            [
              { text: '💻 Разработка', callback_data: 'cat_dev' },
              { text: '🎨 Дизайн', callback_data: 'cat_design' }
            ],
            [
              { text: '📢 Маркетинг', callback_data: 'cat_marketing' }
            ],
            [
              { text: '🌐 Открыть сайт', url: 'https://lybra-leads-web.vercel.app' }
            ]
          ]
        };

        await sendTelegramMessage(chatId, welcomeText, keyboard);
      }
    }

    if (update.callback_query) {
      const chatId = update.callback_query.message.chat.id;
      const data = update.callback_query.data;

      if (data === 'fetch_latest' || data.startsWith('cat_')) {
        await sendTelegramMessage(chatId, '🔍 <i>Сканирую биржи и отбираю актуальные лиды...</i>');

        // Вызываем наш парсер внутри приложения
        const host = req.headers.get('host') || 'lybra-leads-web.vercel.app';
        const protocol = host.includes('localhost') ? 'http' : 'https';
        const res = await fetch(`${protocol}://${host}/api/leads/feed`);
        const dataJson = await res.json();

        if (dataJson.success && dataJson.leads.length > 0) {
          const topLeads = dataJson.leads.slice(0, 3); // Показываем 3 самых свежих

          for (const lead of topLeads) {
            const leadMsg = 
              `💼 <b>${lead.title}</b>\n\n` +
              `💰 <b>Бюджет:</b> ${lead.budget}\n` +
              `🏷 <b>Теги:</b> ${lead.tags.join(' ')}\n` +
              `📍 <b>Источник:</b> ${lead.source}\n\n` +
              `📝 <i>${lead.snippet}</i>`;

            const leadKeyboard = {
              inline_keyboard: [
                [
                  { text: '🔗 Откликнуться на заказ', url: lead.link }
                ]
              ]
            };

            await sendTelegramMessage(chatId, leadMsg, leadKeyboard);
          }
        } else {
          await sendTelegramMessage(chatId, 'Пока нет новых заказов, попробуйте через пару минут.');
        }
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
