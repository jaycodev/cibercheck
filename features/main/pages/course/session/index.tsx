'use client'

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

import { AttendanceTable } from '@main/components/attendance-table'

import { Button } from '@/components/ui/button'
import coursesData from '@/mock/courses.json'
import sessionsData from '@/mock/sessions.json'

const generateStudents = (count: number, seed: string) => {
  const firstNames = [
    'Juan',
    'María',
    'Carlos',
    'Ana',
    'Pedro',
    'Laura',
    'Miguel',
    'Sofia',
    'Diego',
    'Elena',
  ]
  const lastNames = [
    'García',
    'Rodríguez',
    'Martínez',
    'López',
    'González',
    'Pérez',
    'Sánchez',
    'Ramírez',
    'Torres',
    'Flores',
  ]

  const hashCode = (str: string) => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash
    }
    return Math.abs(hash)
  }

  const students = []
  for (let i = 0; i < count; i++) {
    const seedValue = hashCode(seed + i)
    const firstNameIndex = seedValue % firstNames.length
    const lastNameIndex = Math.floor(seedValue / firstNames.length) % lastNames.length
    const attendanceIndex = (seedValue * 7) % 3

    students.push({
      id: `student-${i + 1}`,
      name: `${firstNames[firstNameIndex]} ${lastNames[lastNameIndex]}`,
      studentId: `EST${String(i + 1).padStart(6, '0')}`,
      attendance: ['asistio', 'falto', 'tardanza'][attendanceIndex] as
        | 'asistio'
        | 'falto'
        | 'tardanza',
    })
  }
  return students
}

export default function SessionPage({
  params,
}: {
  params: { courseId: string; sessionId: string }
}) {
  const [courseIdStr, sectionIdStr] = params.courseId.split('-')
  const courseId = parseInt(courseIdStr)
  const sectionId = parseInt(sectionIdStr)
  const sessionId = parseInt(params.sessionId)

  const course = coursesData.find((c) => c.courseId === courseId && c.sectionId === sectionId)

  const session = sessionsData.find(
    (s) => s.sessionId === sessionId && s.courseId === courseId && s.sectionId === sectionId
  )

  if (!course || !session) {
    return <p>Sesión no encontrada</p>
  }

  const students = generateStudents(25, `${params.courseId}-${params.sessionId}`)
  const fullCourseName = `${course.name} - ${course.section}`

  return (
    <>
      <Link href={`/curso/${params.courseId}`}>
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="size-4" />
          Volver a sesiones
        </Button>
      </Link>

      <AttendanceTable
        courseId={params.courseId}
        sessionId={params.sessionId}
        courseName={fullCourseName}
        sessionDate={new Date(session.date).toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
        students={students}
      />
    </>
  )
}
