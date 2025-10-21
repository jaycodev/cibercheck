import type { Metadata } from 'next'

import SessionPage from '@main/pages/course/session'

import coursesData from '@/mock/courses.json'
import sessionsData from '@/mock/sessions.json'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseId: string; sessionId: string }>
}): Promise<Metadata> {
  const { courseId, sessionId } = await params
  const [courseIdStr, sectionIdStr] = courseId.split('-')
  const parsedCourseId = parseInt(courseIdStr)
  const parsedSectionId = parseInt(sectionIdStr)

  const course = coursesData.find(
    (c) => c.courseId === parsedCourseId && c.sectionId === parsedSectionId
  )

  const session = sessionsData.find(
    (s) =>
      s.sessionId === parseInt(sessionId) &&
      s.courseId === parsedCourseId &&
      s.sectionId === parsedSectionId
  )

  if (course && session) {
    return {
      title: `${session.topic} - ${course.name}`,
    }
  }

  return {
    title: 'Sesión',
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ courseId: string; sessionId: string }>
}) {
  const { courseId, sessionId } = await params

  return <SessionPage params={{ courseId, sessionId }} />
}
