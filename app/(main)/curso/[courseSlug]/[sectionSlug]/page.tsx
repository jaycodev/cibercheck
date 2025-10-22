import type { Metadata } from 'next'

import { CoursePage } from '@main/pages/course'

import courseSectionDetail from '@/mock/attendance.json'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseSlug: string; sectionSlug: string }>
}): Promise<Metadata> {
  await params

  const course = courseSectionDetail

  return {
    title: course ? `${course.courseName} - ${course.sectionName}` : 'Curso',
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ courseSlug: string; sectionSlug: string }>
}) {
  const { courseSlug, sectionSlug } = await params

  return <CoursePage params={{ courseSlug, sectionSlug }} />
}
