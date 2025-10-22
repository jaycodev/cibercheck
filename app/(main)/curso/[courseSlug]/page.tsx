import type { Metadata } from 'next'

import { CourseSectionsPage } from '@main/pages/course-sections'

import coursesData from '@/mock/courses.json'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseSlug: string }>
}): Promise<Metadata> {
  const { courseSlug } = await params
  const course = coursesData.find((c) => c.courseSlug === courseSlug)

  return {
    title: course ? course.name : 'Curso',
  }
}

export default async function Page({ params }: { params: Promise<{ courseSlug: string }> }) {
  const { courseSlug } = await params

  return <CourseSectionsPage params={{ courseSlug }} />
}
