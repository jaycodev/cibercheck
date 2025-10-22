'use client'

import { useState } from 'react'

import { LayoutGrid, List, Search } from 'lucide-react'

import { CourseCard } from '@main/components/course-card'
import { CourseListItem } from '@main/components/course-list-item'

import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getCourseColor } from '@/lib/colors'
import coursesData from '@/mock/courses.json'

const groupedCourses = coursesData.map((course) => ({
  id: `${course.courseId}-${course.sectionId}`,
  courseId: course.courseId,
  sectionId: course.sectionId,
  code: course.code,
  name: course.name,
  section: course.section,
  color: getCourseColor(course.courseId),
}))

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [periodFilter, setPeriodFilter] = useState('all')
  const [courseFilter, setCourseFilter] = useState('all')
  const [itemsPerPage, setItemsPerPage] = useState('10')

  const filteredCourses = groupedCourses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      <div className="mb-8 space-y-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-balance">Mis cursos</h1>
          <p className="text-muted-foreground mt-2">Selecciona un curso para marcar asistencia</p>
        </div>

        <div className="flex flex-wrap gap-4 items-start lg:flex-nowrap lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-3 items-center w-full lg:w-auto">
            <Tabs
              value={viewMode}
              onValueChange={(val) => setViewMode(val as 'grid' | 'list')}
              defaultValue="grid"
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

            <InputGroup className="min-w-70 w-auto">
              <InputGroupInput
                placeholder="Busque sus cursos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
            </InputGroup>
          </div>

          <div className="flex flex-wrap gap-3 w-full lg:w-auto">
            <Select value={periodFilter} onValueChange={setPeriodFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Períodos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los períodos</SelectItem>
                <SelectItem value="2025-1">2025-1</SelectItem>
                <SelectItem value="2024-2">2024-2</SelectItem>
              </SelectContent>
            </Select>

            <Select value={courseFilter} onValueChange={setCourseFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filtros" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los cursos</SelectItem>
                <SelectItem value="open">Abiertos</SelectItem>
                <SelectItem value="closed">Cerrados</SelectItem>
              </SelectContent>
            </Select>

            <Select value={itemsPerPage} onValueChange={setItemsPerPage}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          {filteredCourses.length} {filteredCourses.length === 1 ? 'resultado' : 'resultados'}
        </p>
      </div>

      {filteredCourses.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredCourses.map((course) => (
              <CourseListItem key={course.id} {...course} />
            ))}
          </div>
        )
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-muted-foreground">
            No se encontraron cursos que coincidan con tu búsqueda
          </p>
        </div>
      )}
    </>
  )
}
