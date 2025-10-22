'use client'

import { BookOpen } from 'lucide-react'
import Link from 'next/link'

import { Card, CardContent } from '@/components/ui/card'

interface CourseCardProps {
  courseSlug: string
  code: string
  name: string
  totalSections: number
  color: string
}

export function CourseCard({ courseSlug, code, name, totalSections, color }: CourseCardProps) {
  return (
    <Link href={`/curso/${courseSlug}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg hover:scale-[1.02] cursor-pointer h-full">
        <div className="flex h-full">
          <div className="w-1 transition-all group-hover:w-2" style={{ backgroundColor: color }} />
          <CardContent className="flex-1 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-3">
                <div
                  className="flex size-10 items-center justify-center rounded-lg transition-colors"
                  style={{ backgroundColor: `${color}20` }}
                >
                  <BookOpen className="size-5" style={{ color }} />
                </div>
              </div>
              <p className="text-xs font-mono font-semibold mb-2" style={{ color }}>
                {code}
              </p>
              <h3 className="font-semibold text-sm leading-tight text-balance mb-2 uppercase">
                {name}
              </h3>
            </div>
            <p className="text-xs text-muted-foreground">
              {totalSections} {totalSections === 1 ? 'sección' : 'secciones'}
            </p>
          </CardContent>
        </div>
      </Card>
    </Link>
  )
}
