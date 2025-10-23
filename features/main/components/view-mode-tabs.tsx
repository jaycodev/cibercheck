'use client'

import { LayoutGrid, List } from 'lucide-react'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useViewMode } from '@/lib/use-view-mode'

interface ViewModeTabsProps {
  defaultValue?: 'grid' | 'list'
  className?: string
}

export function ViewModeTabs({ defaultValue = 'grid', className }: ViewModeTabsProps) {
  const [viewMode, setViewMode, mounted] = useViewMode(defaultValue)

  if (!mounted) {
    return null
  }

  return (
    <Tabs
      value={viewMode}
      onValueChange={(val) => setViewMode(val as 'grid' | 'list')}
      className={className}
    >
      <TabsList>
        <TabsTrigger value="grid">
          <LayoutGrid className="h-4 w-4" />
        </TabsTrigger>
        <TabsTrigger value="list">
          <List className="h-4 w-4" />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
