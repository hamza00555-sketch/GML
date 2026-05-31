import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'جمل GML — موشن أسرع، إنتاج أذكى',
  description: 'جمل GML هي مكتبة موشن مبنية للمحتوى السعودي. تمكّن منشئي المحتوى والمصممين من إنتاج موشن احترافي في أسرع وقت ممكن.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-[#020C1B] text-white antialiased">
        {children}
      </body>
    </html>
  )
}
