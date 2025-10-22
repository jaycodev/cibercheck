'use client'

import { AlertCircle, Calendar, CheckCircle2, Clock, XCircle } from 'lucide-react'
import Link from 'next/link'

import { Card, CardContent, CardHeader } from '@/components/ui/card'

interface SessionCardProps {
  id: string
  courseId: string
  number: number
  date: string
  startTime: string
  endTime: string
  topic: string
  attended: number
  absent: number
  late: number
}

function formatTime(time: string): string {
  const [hours, minutes] = time.split(':')
  const hour = Number.parseInt(hours)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 || 12
  return `${displayHour}:${minutes} ${ampm}`
}

export function SessionCard({
  id,
  courseId,
  number,
  date,
  startTime,
  endTime,
  topic,
  attended,
  absent,
  late,
}: SessionCardProps) {
  return (
    <Link href={`/curso/${courseId}/sesion/${id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-lg hover:scale-[1.02] h-full cursor-pointer">
        <CardHeader className="pb-3">
          <div className="space-y-2">
            <p className="text-sm font-semibold">Sesión {number}</p>
            <h3 className="font-semibold text-lg leading-tight text-balance">{topic}</h3>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 shrink-0" />
              {new Date(date).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 shrink-0" />
              <span>
                {formatTime(startTime)} - {formatTime(endTime)}
              </span>
            </div>
          </div>

          <div className="pt-2 border-t">
            <p className="text-xs font-semibold text-muted-foreground mb-2">Asistencia</p>
            <div className="flex gap-3">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">{attended}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <XCircle className="h-4 w-4 text-red-600" />
                <span className="text-sm font-medium">{absent}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <span className="text-sm font-medium">{late}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
