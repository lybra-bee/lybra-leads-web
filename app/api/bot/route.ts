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
      reply_markup: replyMarkup,
    }),
  });
}

export async function POST(req: Request) {
  try {
    const update = await req.json();

    // Обработка обычных сообщений
    if (update.message) {
      const chatId = update.message.chat.id;
      const text = update.message.text || '';
      const firstName = update.message.from.first_name || 'друг';

      if (text.startsWith('/start')) {
        const welcomeText = 
          `👋 Привет, <b>${firstName}</b>!\n\n` +
          `⚡ <b>Lybra Leads AI</b> — радар горячих B2B заказов.\n` +
          `Мы мониторим 300+ бирж и TG-чатов, отсекаем спам и присылаем прямых заказчиков с бюджетами.\n\n` +
          `🎯 <b>Выберите категории заказов для получения:</b>`;

        const keyboard = {
          inline_keyboard: [
            [
              { text: '💻 Разработка (Dev)', callback_data: 'cat_dev' },
              { text: '🎨 Дизайн (UI/UX)', callback_data: 'cat_design' }
            ],
            [
              { text: '📢 Маркетинг / Трафик', callback_data: 'cat_marketing' },
              { text: '🔥 Все заказы', callback_data: 'cat_all' }
            ],
            [
              { text: '🌐 Открыть радар на сайте', url: 'https://lybra-leads-web.vercel.app' }
            ]
          ]
        };

        await sendTelegramMessage(chatId, welcomeText, keyboard);
      }
    }

    // Обработка нажатий на инлайн-кнопки
    if (update.callback_query) {
      const chatId = update.callback_query.message.chat.id;
      const data = update.callback_query.data;
      
      const catNames: Record<string, string> = {
        cat_dev: '💻 Разработка',
        cat_design: '🎨 Дизайн',
        cat_marketing: '📢 Маркетинг',
        cat_all: '🔥 Все категории'
      };

      const selected = catNames[data] || 'Выбранная категория';
      const msg = 
        `✅ Подписка активирована: <b>${selected}</b>\n\n` +
        `📡 <b>Радар запущен.</b> Как только AI отберет горячий заказ без спама, вы получите уведомление первыми.`;

      await sendTelegramMessage(chatId, msg);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
