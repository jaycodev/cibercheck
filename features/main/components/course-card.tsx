'use client'

import { BookOpen } from 'lucide-react'
import Link from 'next/link'

import { Card, CardContent } from '@/components/ui/card'

interface CourseCardProps {
  id: string
  courseId: number
  sectionId: number
  code: string
  name: string
  section: string
  color: string
}

export function CourseCard({ id, code, name, section, color }: CourseCardProps) {
  return (
    <Link href={`/curso/${id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg hover:scale-[1.02] cursor-pointer">
        <div className="flex h-full">
          <div className="w-1 transition-all group-hover:w-2" style={{ backgroundColor: color }} />
          <CardContent className="flex-1 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors"
                  style={{ backgroundColor: `${color}20` }}
                >
                  <BookOpen className="h-5 w-5" style={{ color }} />
                </div>
              </div>
              <p className="text-xs font-mono font-semibold mb-2" style={{ color }}>
                {code}
              </p>
              <h3 className="font-semibold text-sm leading-tight text-balance mb-2 uppercase">
                {name}
              </h3>
            </div>
            <p className="text-xs text-muted-foreground">{section}</p>
          </CardContent>
        </div>
      </Card>
    </Link>
  )
}
