'use client'

import { Star } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

interface CourseListItemProps {
  id: string
  code: string
  name: string
  section: string
  color: string
}

export function CourseListItem({ id, code, name, section, color }: CourseListItemProps) {
  return (
    <Link href={`/curso/${id}`}>
      <div className="group flex items-center gap-4 rounded-lg border bg-card p-4 mb-3 transition-all hover:shadow-md">
        <div
          className="h-16 w-1 rounded-full transition-all group-hover:w-2"
          style={{ backgroundColor: color }}
        />

        <div className="flex-1 space-y-1">
          <p className="text-sm font-mono text-muted-foreground">{code}</p>
          <h3 className="font-semibold text-lg leading-tight text-balance uppercase">{name}</h3>
          <p className="text-sm text-muted-foreground">{section}</p>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="shrink-0"
          onClick={(e) => e.preventDefault()}
        >
          <Star className="h-5 w-5 text-muted-foreground hover:text-primary" />
        </Button>
      </div>
    </Link>
  )
}
