'use client'

import { useState } from 'react'

import { ArrowLeft, LayoutGrid, List } from 'lucide-react'
import Link from 'next/link'

import { SessionCard } from '@main/components/session-card'
import { SessionListItem } from '@main/components/session-list-item'

import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getCourseColor } from '@/lib/colors'
import coursesData from '@/mock/courses.json'
import sessionsData from '@/mock/sessions.json'

export function CoursePage({ params }: { params: { courseId: string } }) {
  const [courseIdStr, sectionIdStr] = params.courseId.split('-')
  const courseId = parseInt(courseIdStr)
  const sectionId = parseInt(sectionIdStr)

  const course = coursesData.find((c) => c.courseId === courseId && c.sectionId === sectionId)
  const sessions = sessionsData.filter((s) => s.courseId === courseId && s.sectionId === sectionId)

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  if (!course) {
    return <p>Curso no encontrado</p>
  }

  const courseColor = getCourseColor(course.courseId)

  return (
    <>
      <Link href="/">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="size-4" />
          Volver a cursos
        </Button>
      </Link>

      <div className="mb-8 space-y-4">
        <div className="flex items-start gap-4">
          <div className="h-16 w-1 rounded-full" style={{ backgroundColor: courseColor }} />
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight text-balance">{course.name}</h1>
            <p className="text-sm text-muted-foreground mt-2">Sección {course.section}</p>
            <p className="text-sm font-mono text-muted-foreground mt-1">{course.code}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center mb-6">
        <h2 className="text-xl font-semibold">Sesiones de Clase</h2>
        <Tabs
          value={viewMode}
          onValueChange={(val) => setViewMode(val as 'grid' | 'list')}
          defaultValue="grid"
          className="ml-auto"
        >
          <TabsList>
            <TabsTrigger value="grid">
              <LayoutGrid />
            </TabsTrigger>
            <TabsTrigger value="list">
              <List />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {sessions.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sessions.map((session) => (
              <SessionCard
                key={session.sessionId}
                id={session.sessionId.toString()}
                courseId={params.courseId}
                number={session.sessionNumber}
                date={session.date}
                startTime={session.startTime}
                endTime={session.endTime}
                topic={session.topic}
                attended={session.attendanceStats.presente}
                absent={session.attendanceStats.ausente}
                late={session.attendanceStats.tarde}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {sessions.map((session) => (
              <SessionListItem
                key={session.sessionId}
                id={session.sessionId.toString()}
                courseId={params.courseId}
                number={session.sessionNumber}
                date={session.date}
                startTime={session.startTime}
                endTime={session.endTime}
                topic={session.topic}
                attended={session.attendanceStats.presente}
                absent={session.attendanceStats.ausente}
                late={session.attendanceStats.tarde}
              />
            ))}
          </div>
        )
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-muted-foreground">No hay sesiones registradas para este curso</p>
        </div>
      )}
    </>
  )
}
