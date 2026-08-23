import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lybra Leads — Перехват горячих B2B заказов",
  description: "AI-мониторинг бирж и Telegram-чатов. Получайте платежеспособных клиентов первыми.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="antialiased min-h-screen bg-[#090d16] text-slate-100 selection:bg-cyan-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
