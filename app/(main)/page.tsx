import type { Metadata } from 'next'

import { HomePage } from '@main/pages/home'

export const metadata: Metadata = {
  title: 'Inicio',
}

export default function Page() {
  return <HomePage />
}
