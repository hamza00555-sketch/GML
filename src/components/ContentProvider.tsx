'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { defaultContent, SiteContent } from '@/data/siteContent'

const ContentContext = createContext<{
  content: SiteContent
  setContent: (c: SiteContent) => void
}>({
  content: defaultContent,
  setContent: () => {},
})

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContentState] = useState<SiteContent>(defaultContent)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('gml-content')
      if (saved) setContentState(JSON.parse(saved))
    } catch {}
  }, [])

  const setContent = (c: SiteContent) => {
    setContentState(c)
    localStorage.setItem('gml-content', JSON.stringify(c))
  }

  return (
    <ContentContext.Provider value={{ content, setContent }}>
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  return useContext(ContentContext)
}
