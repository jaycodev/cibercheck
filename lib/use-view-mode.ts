'use client'

import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'viewMode'
const DEFAULT_VIEW_MODE = 'grid'
const ATTRIBUTE_NAME = 'data-view-mode'

type ViewMode = 'grid' | 'list'

const viewModeEventTarget = new EventTarget()

export function useViewMode(defaultValue: ViewMode = DEFAULT_VIEW_MODE) {
  const [viewMode, setViewModeState] = useState<ViewMode>(defaultValue)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const attr = document.documentElement.getAttribute(ATTRIBUTE_NAME)
    if (attr === 'grid' || attr === 'list') {
      setViewModeState(attr)
    }
    setMounted(true)
  }, [])

  const setViewMode = useCallback((value: ViewMode) => {
    setViewModeState(value)
    document.documentElement.setAttribute(ATTRIBUTE_NAME, value)
    localStorage.setItem(STORAGE_KEY, value)

    viewModeEventTarget.dispatchEvent(new CustomEvent('viewModeChange', { detail: value }))
  }, [])

  useEffect(() => {
    const handleViewModeChange = (e: Event) => {
      const customEvent = e as CustomEvent<ViewMode>
      if (customEvent.detail) {
        setViewModeState(customEvent.detail)
      }
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        const newValue = e.newValue as ViewMode
        if (newValue === 'grid' || newValue === 'list') {
          setViewModeState(newValue)
          document.documentElement.setAttribute(ATTRIBUTE_NAME, newValue)
        }
      }
    }

    viewModeEventTarget.addEventListener('viewModeChange', handleViewModeChange)
    window.addEventListener('storage', handleStorageChange)

    return () => {
      viewModeEventTarget.removeEventListener('viewModeChange', handleViewModeChange)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  return [viewMode, setViewMode, mounted] as const
}
