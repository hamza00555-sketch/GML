import type { Metadata } from 'next'
import { ContentProvider } from '@/components/ContentProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'GML — من مكتبة موشن إلى نظام إنتاج بصري أسرع',
  description: 'GML هي المرحلة الأولى لبناء مكتبة موشن تساعد الفريق على إنتاج فيديوهات أسرع بجودة أوضح.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <ContentProvider>
          {children}
        </ContentProvider>
      </body>
    </html>
  )
}
