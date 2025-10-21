// Paleta de colores para cursos basada en su courseId
const courseColors = [
  '#dc2626', // rojo
  '#2563eb', // azul
  '#0891b2', // cyan
  '#7c3aed', // violeta
  '#059669', // verde
  '#ea580c', // naranja
  '#ec4899', // rosa
  '#8b5cf6', // púrpura
  '#10b981', // esmeralda
  '#f59e0b', // ámbar
  '#06b6d4', // cyan claro
  '#6366f1', // índigo
  '#14b8a6', // teal
  '#f97316', // naranja oscuro
  '#a855f7', // púrpura claro
]

/**
 * Obtiene un color consistente para un curso basado en su ID
 * @param courseId - El ID del curso
 * @returns Un color en formato hexadecimal
 */
export function getCourseColor(courseId: number): string {
  return courseColors[(courseId - 1) % courseColors.length]
}
