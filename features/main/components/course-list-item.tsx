'use client'

import { Star } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

interface CourseListItemProps {
  courseSlug: string
  code: string
  name: string
  totalSections: number
  color: string
}

export function CourseListItem({
  courseSlug,
  code,
  name,
  totalSections,
  color,
}: CourseListItemProps) {
  return (
    <Link href={`/curso/${courseSlug}`}>
      <div className="group flex items-center gap-4 rounded-lg border bg-card p-4 mb-3 transition-all hover:shadow-md">
        <div
          className="h-16 w-1 rounded-full transition-all group-hover:w-2"
          style={{ backgroundColor: color }}
        />

        <div className="flex-1 space-y-1">
          <p className="text-sm font-mono text-muted-foreground">{code}</p>
          <h3 className="font-semibold text-lg leading-tight text-balance uppercase">{name}</h3>
          <p className="text-sm text-muted-foreground">
            {totalSections} {totalSections === 1 ? 'sección' : 'secciones'}
          </p>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="shrink-0"
          onClick={(e) => e.preventDefault()}
        >
          <Star className="size-4 text-muted-foreground" />
        </Button>
      </div>
    </Link>
  )
}
