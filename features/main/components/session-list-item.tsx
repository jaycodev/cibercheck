'use client'

import { AlertCircle, Calendar, CheckCircle2, Clock, XCircle } from 'lucide-react'
import Link from 'next/link'

interface SessionListItemProps {
  sessionNumber: string
  courseSlug: string
  sectionSlug: string
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

export function SessionListItem({
  sessionNumber,
  courseSlug,
  sectionSlug,
  number,
  date,
  startTime,
  endTime,
  topic,
  attended,
  absent,
  late,
}: SessionListItemProps) {
  return (
    <Link href={`/curso/${courseSlug}/${sectionSlug}/sesion/${sessionNumber}`}>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-lg border bg-card p-4 mb-3 transition-all hover:shadow-md cursor-pointer">
        <div className="flex-1 space-y-2">
          <p className="text-sm font-semibold">Sesión {number}</p>
          <h3 className="font-semibold text-lg leading-tight text-balance">{topic}</h3>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(date).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {formatTime(startTime)} - {formatTime(endTime)}
            </div>
          </div>
        </div>

        <div className="flex gap-4 sm:border-l sm:pl-4">
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
    </Link>
  )
}
