'use client'

import { ArrowLeft, Calendar, CircleArrowRight, Clock } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { getCourseColor } from '@/lib/colors'
import coursesData from '@/mock/courses.json'
import sessionsData from '@/mock/sessions.json'

export function CoursePage({ params }: { params: { courseId: string } }) {
  const [courseIdStr, sectionIdStr] = params.courseId.split('-')
  const courseId = parseInt(courseIdStr)
  const sectionId = parseInt(sectionIdStr)

  const course = coursesData.find((c) => c.courseId === courseId && c.sectionId === sectionId)

  const sessions = sessionsData.filter((s) => s.courseId === courseId && s.sectionId === sectionId)

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
            <h1 className="text-3xl font-bold tracking-tight text-balance">
              {course.name} - {course.section}
            </h1>
            <p className="text-sm font-mono text-muted-foreground mt-2">{course.code}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Sesiones de clase</h2>
        {sessions.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sessions.map((session) => (
              <Link
                key={session.sessionId}
                href={`/curso/${params.courseId}/sesion/${session.sessionId}`}
              >
                <Card className="group overflow-hidden transform transition-transform duration-200 ease-in-out hover:shadow-lg hover:-translate-y-1 h-full">
                  <CardHeader className="pb-3">
                    <h3 className="font-semibold text-lg leading-tight text-balance">
                      {session.topic}
                    </h3>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="size-4" />
                      {new Date(session.date).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="size-4" />
                      {session.startTime.substring(0, 5)} - {session.endTime.substring(0, 5)}
                    </div>
                    <span className="text-sm group-hover:underline flex flex-row items-center gap-1 pt-2">
                      Ver detalles
                      <CircleArrowRight className="size-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground">No hay sesiones registradas para este curso</p>
          </div>
        )}
      </div>
    </>
  )
}
