import { HeartIcon } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-background border-t mt-auto">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-muted-foreground flex items-center justify-center">
          Made with <HeartIcon className="h-4 w-4 mx-1 text-red-500" /> by SnapRename Team © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}

