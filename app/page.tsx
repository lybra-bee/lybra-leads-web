'use client';

import React, { useState } from 'react';
import { 
  Zap, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  Code2,
  Palette,
  Megaphone,
  Layers,
  Clock,
  Flame,
  Bot,
  Terminal,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';

const mockLeads = [
  {
    id: 1,
    category: 'dev',
    title: 'Telegram Mini App на Next.js + FastAPI (сервис онлайн-записи)',
    budget: '65 000 ₽',
    source: 'TG: @freelance_b2b',
    time: 'Только что',
    isHot: true,
    tags: ['Next.js', 'FastAPI', 'PostgreSQL', 'Telegram API'],
    desc: 'Ищем опытного фуллстек-разработчика. Есть готовая дизайн-система в Figma, нужно поднять бэкенд, связать с ботом и настроить WebApp.'
  },
  {
    id: 2,
    category: 'design',
    title: 'UI/UX редизайн мобильного FinTech-приложения',
    budget: '45 000 ₽',
    source: 'Хабр Фриланс',
    time: '4 мин назад',
    isHot: true,
    tags: ['Figma', 'UI/UX', 'Mobile App', 'Design System'],
    desc: 'Переработка 14 ключевых экранов личного кабинета и формы оплаты. Строго по готовому гайдлайну бренда.'
  },
  {
    id: 3,
    category: 'marketing',
    title: 'Настройка связки Яндекс Директ + Telegram-канал для B2B',
    budget: '35 000 ₽',
    source: 'TG: @leads_b2b_pro',
    time: '11 мин назад',
    isHot: false,
    tags: ['Яндекс Директ', 'Лидогенерация', 'B2B', 'Аналитика'],
    desc: 'Тематика: поставка упаковочного оборудования. Интересует привлечение оптовых заявок с подтвержденной квалификацией.'
  },
  {
    id: 4,
    category: 'dev',
    title: 'Парсер каталогов поставщиков с выгрузкой в МойСклад',
    budget: '20 000 ₽',
    source: 'Kwork Pro',
    time: '19 мин назад',
    isHot: false,
    tags: ['Python', 'Asyncio', 'REST API', 'JSON'],
    desc: 'Написать надежный асинхронный парсер для 3 оптовых сайтов. Автоматическое сопоставление остатков и обновление цен раз в час.'
  }
];

export default function Home() {
  const [filter, setFilter] = useState<'all' | 'dev' | 'design' | 'marketing'>('all');

  const filteredLeads = filter === 'all' 
    ? mockLeads 
    : mockLeads.filter(lead => lead.category === filter);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-cyan-600/15 via-blue-600/10 to-transparent blur-[140px] rounded-full" />
        <div className="absolute top-[40%] right-[-10%] w-[500px] h-[400px] bg-blue-600/10 blur-[130px] rounded-full" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#030712]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-[1px] shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-[#030712] rounded-[11px] flex items-center justify-center">
                <Zap className="w-5 h-5 text-cyan-400 fill-cyan-400/20" />
              </div>
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-white flex items-center gap-1">
                LYBRA<span className="text-cyan-400 font-extrabold">LEADS</span>
              </span>
              <span className="text-[10px] text-slate-400 block -mt-1 tracking-widest font-mono">B2B AI RADAR</span>
            </div>
          </div>

          <a 
            href="https://t.me/lybra_leads_bot" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/35 active:scale-95"
          >
            <Send className="w-3.5 h-3.5 fill-slate-950" />
            Запустить бота
          </a>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4 sm:px-6 text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 backdrop-blur-md text-cyan-300 text-xs font-medium mb-8 shadow-inner shadow-cyan-500/20">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Парсинг 300+ закрытых чатов и бирж каждые 3 секунды</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1] mb-6">
            Забирайте горячие заказы <br />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
              быстрее студий и агентств
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
            AI-агент отслеживает публикации в реальном времени, отсекает спам и резюме, моментально присылая в Telegram прямого заказчика с бюджетом.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="https://t.me/lybra_leads_bot" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm px-8 py-4 rounded-xl transition-all shadow-xl shadow-cyan-500/25 hover:scale-[1.02] active:scale-95"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              Тестировать 3 дня бесплатно
            </a>
            <a 
              href="#live-radar" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 text-slate-300 font-semibold text-sm px-7 py-4 rounded-xl transition-all backdrop-blur-sm hover:text-white"
            >
              Смотреть заказы онлайн
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </a>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-16 pt-8 border-t border-slate-800/60 text-left">
            <div className="bg-slate-900/30 border border-slate-800/60 rounded-2xl p-4">
              <span className="text-2xl font-black text-white block">~3.2 сек</span>
              <span className="text-xs text-slate-400">Скорость перехвата лида</span>
            </div>
            <div className="bg-slate-900/30 border border-slate-800/60 rounded-2xl p-4">
              <span className="text-2xl font-black text-cyan-400 block">98.4%</span>
              <span className="text-xs text-slate-400">Точность AI-фильтра спама</span>
            </div>
            <div className="bg-slate-900/30 border border-slate-800/60 rounded-2xl p-4">
              <span className="text-2xl font-black text-white block">450+</span>
              <span className="text-xs text-slate-400">Новых лидов в день</span>
            </div>
            <div className="bg-slate-900/30 border border-slate-800/60 rounded-2xl p-4">
              <span className="text-2xl font-black text-emerald-400 block">0 ₽</span>
              <span className="text-xs text-slate-400">Для старта на триале</span>
            </div>
          </div>
        </section>

        {/* Live Radar Feed */}
        <section id="live-radar" className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <h2 className="text-2xl font-black text-white tracking-tight">Радар заказов в реальном времени</h2>
              </div>
              <p className="text-xs text-slate-400">Поток заказов, очищенных нейросетью от спама за последние 30 минут</p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-900/90 border border-slate-800 rounded-xl backdrop-blur-md">
              <button 
                onClick={() => setFilter('all')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filter === 'all' ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Все потоки
              </button>
              <button 
                onClick={() => setFilter('dev')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filter === 'dev' ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                Dev
              </button>
              <button 
                onClick={() => setFilter('design')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filter === 'design' ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                Дизайн
              </button>
              <button 
                onClick={() => setFilter('marketing')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filter === 'marketing' ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Megaphone className="w-3.5 h-3.5" />
                Маркетинг
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredLeads.map((lead) => (
              <div 
                key={lead.id}
                className="group relative bg-[#0b1324]/60 hover:bg-[#0f1a30]/80 border border-slate-800/90 hover:border-cyan-500/50 rounded-2xl p-6 transition-all duration-200 flex flex-col justify-between shadow-lg hover:shadow-cyan-500/5"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono">
                        {lead.budget}
                      </span>
                      {lead.isHot && (
                        <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300">
                          <Flame className="w-3 h-3 text-amber-400 fill-amber-400" /> Горячий
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-slate-600" />
                      {lead.time}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug mb-2.5">
                    {lead.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed mb-5 line-clamp-3">
                    {lead.desc}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {lead.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-mono text-slate-300 bg-slate-900/90 border border-slate-800 px-2 py-0.5 rounded-md">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 font-mono">{lead.source}</span>
                    <a 
                      href="https://t.me/lybra_leads_bot" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors"
                    >
                      Открыть заказ <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3 tracking-tight">Тарифы для старта</h2>
            <p className="text-sm text-slate-400">Начните бесплатно. Оплата только после взятия первого заказа.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Solo Plan */}
            <div className="bg-[#0b1324]/70 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between relative">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-base font-bold text-white">Фрилансер</span>
                  <span className="text-[11px] font-mono bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md">PRO Solo</span>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-black text-white">990 ₽</span>
                  <span className="text-xs text-slate-400"> / месяц</span>
                </div>
                <ul className="space-y-3.5 text-xs text-slate-300 mb-8">
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" /> Выбор 1 целевого направления (Dev / Design / Marketing)</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" /> Мгновенные пуши в Telegram (0 секунд задержки)</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" /> AI-фильтр от спама, агентств и взаимных резюме</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" /> Фильтрация по минимальному чеку</li>
                </ul>
              </div>
              <a 
                href="https://t.me/lybra_leads_bot" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full text-center bg-slate-800 hover:bg-slate-700 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition-colors"
              >
                3 дня бесплатно
              </a>
            </div>

            {/* Team Plan */}
            <div className="bg-[#0f1c38]/80 border border-cyan-500/50 rounded-3xl p-8 flex flex-col justify-between relative shadow-2xl shadow-cyan-500/10">
              <div className="absolute -top-3.5 right-8 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 text-[10px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                Максимальный поток
              </div>
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-base font-bold text-cyan-300">Студия / Агентство</span>
                  <span className="text-[11px] font-mono bg-cyan-500/10 text-cyan-300 px-2.5 py-1 rounded-md border border-cyan-500/20">Unlimited</span>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-black text-white">2 990 ₽</span>
                  <span className="text-xs text-slate-400"> / месяц</span>
                </div>
                <ul className="space-y-3.5 text-xs text-slate-300 mb-8">
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" /> Все направления и категории без ограничений</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" /> Доставка в командный чат Telegram для нескольких спецов</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" /> Webhook API для выгрузки в CRM (amoCRM / Bitrix)</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" /> Приоритетный саппорт и добавление ваших каналов в базу</li>
                </ul>
              </div>
              <a 
                href="https://t.me/lybra_leads_bot" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full text-center bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20"
              >
                Подключить для команды
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-850 bg-[#02050e] py-10 px-4 text-center text-xs text-slate-500">
        <p className="font-mono">© 2026 Lybra Leads (lybra-ai.ru). Все права защищены.</p>
      </footer>
    </div>
  );
}
