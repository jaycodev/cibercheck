import { ModeToggle } from '@/components/ui/mode-toggle'

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6 py-20 gap-12 sm:px-20 overflow-x-hidden">
      <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8">
        <ModeToggle />
      </div>
    </main>
  )
}
