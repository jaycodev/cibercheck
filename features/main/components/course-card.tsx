'use client'

import { BookOpen, CircleArrowRight } from 'lucide-react'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

interface CourseCardProps {
  id: string
  code: string
  name: string
  status: 'Abierto' | 'Cerrado'
  color: string
}

export function CourseCard({ id, code, name, status, color }: CourseCardProps) {
  return (
    <Link href={`/curso/${id}`}>
      <Card className="group overflow-hidden transform transition-transform duration-200 ease-out hover:shadow-lg hover:-translate-y-1">
        <CardHeader className="p-6 text-white" style={{ backgroundColor: color }}>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
              <BookOpen className="size-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg leading-tight text-balance">{name}</h3>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-3">
          <div>
            <p className="text-sm font-mono text-muted-foreground">{code}</p>
          </div>
          <div className="flex items-center justify-between">
            <Badge variant={status === 'Abierto' ? 'default' : 'secondary'} className="font-medium">
              {status}
            </Badge>
            <span className="text-sm text-muted-foreground flex flex-row items-center gap-1">
              Ver detalles
              <CircleArrowRight className="size-4" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
