import type { Metadata } from 'next'

import { CoursePage } from '@main/pages/course'

import coursesData from '@/mock/courses.json'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseId: string }>
}): Promise<Metadata> {
  const { courseId } = await params
  const [courseIdStr, sectionIdStr] = courseId.split('-')
  const course = coursesData.find(
    (c) => c.courseId === parseInt(courseIdStr) && c.sectionId === parseInt(sectionIdStr)
  )

  return {
    title: course ? `${course.name} - ${course.section}` : 'Curso',
  }
}

export default async function Page({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params

  return <CoursePage params={{ courseId }} />
}
