import { WifiOff } from 'lucide-react'

export default function OfflinePage() {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-4 p-8 text-center">
      <WifiOff className="size-8" />
      <h1 className="text-2xl font-bold">You are offline</h1>
      <p>
        Still cannot connect right now. Please check your internet connection
        and try again.
      </p>
    </main>
  )
}
