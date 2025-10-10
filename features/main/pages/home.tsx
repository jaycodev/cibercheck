'use client'

import { useState } from 'react'

import { LayoutGrid, List, Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

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
  const [itemsPerPage, setItemsPerPage] = useState('25')

  const filteredCourses = coursesData.filter(
    (course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      <div className="mb-8 space-y-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance">Mis Cursos</h1>
          <p className="text-muted-foreground mt-2">Selecciona un curso para marcar asistencia</p>
        </div>

        <div className="flex flex-wrap gap-4 items-start lg:flex-nowrap lg:items-center lg:justify-between">
          <div className="flex flex-nowrap gap-3 items-center w-full lg:w-auto">
            <div className="flex gap-1 rounded-lg border bg-card p-1">
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="gap-2"
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="gap-2"
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
            </div>

            <div className="relative flex-1 min-w-0 sm:flex-none sm:w-auto">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Busque sus cursos"
                className="pl-10 w-auto"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 w-full lg:w-auto">
            <Select value={periodFilter} onValueChange={setPeriodFilter}>
              <SelectTrigger className="w-auto min-w-[120px]">
                <SelectValue placeholder="Períodos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los períodos</SelectItem>
                <SelectItem value="2025-1">2025-1</SelectItem>
                <SelectItem value="2024-2">2024-2</SelectItem>
              </SelectContent>
            </Select>

            <Select value={courseFilter} onValueChange={setCourseFilter}>
              <SelectTrigger className="w-auto min-w-[120px]">
                <SelectValue placeholder="Filtros" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los cursos</SelectItem>
                <SelectItem value="open">Abiertos</SelectItem>
                <SelectItem value="closed">Cerrados</SelectItem>
              </SelectContent>
            </Select>

            <Select value={itemsPerPage} onValueChange={setItemsPerPage}>
              <SelectTrigger className="w-auto min-w-[120px]">
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
