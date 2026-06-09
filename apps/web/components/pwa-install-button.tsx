import { usePwaInstall } from '@/hooks/use-pwa-install'
import { Download } from 'lucide-react'
import { Button } from './ui/button'

export default function PWAInstallButton() {
  const { canInstall, install } = usePwaInstall()

  if (!canInstall) return null

  return (
    <Button variant="secondary" className="cursor-pointer" onClick={install}>
      <Download /> Install
    </Button>
  )
}
