import type { Metadata } from 'next'

import SessionPage from '@main/pages/course/session'

import courseSectionDetail from '@/mock/attendance.json'
import sessionsData from '@/mock/sessions.json'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseSlug: string; sectionSlug: string; sessionNumber: string }>
}): Promise<Metadata> {
  const { courseSlug, sectionSlug, sessionNumber } = await params

  const course = courseSectionDetail

  const session = sessionsData.find(
    (s) =>
      s.courseSlug === courseSlug &&
      s.sectionSlug === sectionSlug &&
      s.sessionNumber === parseInt(sessionNumber)
  )

  if (course && session) {
    return {
      title: `${session.topic} - ${course.courseName}`,
    }
  }

  return {
    title: 'Sesión',
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ courseSlug: string; sectionSlug: string; sessionNumber: string }>
}) {
  const { courseSlug, sectionSlug, sessionNumber } = await params

  return <SessionPage params={{ courseSlug, sectionSlug, sessionNumber }} />
}
