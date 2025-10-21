'use client'

import { useState } from 'react'

import { LayoutGrid, List, Search } from 'lucide-react'

import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { CourseCard } from '@/features/main/components/course-card'
import { CourseListItem } from '@/features/main/components/course-list-item'

const coursesData = [
  {
    id: '1',
    code: 'CIBERTEC.5113.202596.C201.WT',
    name: 'INGLÉS II (WT)',
    status: 'Abierto' as const,
    color: '#dc2626',
  },
  {
    id: '2',
    code: 'CIBERTEC.2412.202509P.1127',
    name: 'INNOVACIÓN Y EMPRENDIMIENTO',
    status: 'Abierto' as const,
    color: '#2563eb',
  },
  {
    id: '3',
    code: 'CIBERTEC.4693.202509P.1875',
    name: 'DESARROLLO DE APLICACIONES MÓVILES I',
    status: 'Abierto' as const,
    color: '#0891b2',
  },
  {
    id: '4',
    code: 'CIBERTEC.3301.202596.C105.WT',
    name: 'PROGRAMACIÓN WEB',
    status: 'Abierto' as const,
    color: '#7c3aed',
  },
  {
    id: '5',
    code: 'CIBERTEC.2201.202509P.2341',
    name: 'BASE DE DATOS',
    status: 'Cerrado' as const,
    color: '#059669',
  },
  {
    id: '6',
    code: 'CIBERTEC.1105.202596.C202.WT',
    name: 'MATEMÁTICA PARA LA COMPUTACIÓN',
    status: 'Abierto' as const,
    color: '#ea580c',
  },
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [periodFilter, setPeriodFilter] = useState('all')
  const [courseFilter, setCourseFilter] = useState('all')
  const [itemsPerPage, setItemsPerPage] = useState('10')

  const filteredCourses = coursesData.filter(
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
