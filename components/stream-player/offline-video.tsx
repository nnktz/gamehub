import { WifiOff } from 'lucide-react'

export const OfflineVideo = ({ username }: { username: string }) => {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <WifiOff className="h-10 w-10 text-muted-foreground" />
      <p className="text-muted-foreground">{username} is offline</p>
    </div>
  )
}
