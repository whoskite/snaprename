import Link from "next/link"

export function Navbar() {
  return (
    <nav className="bg-background border-b sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex justify-between h-12">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-primary">SnapRename</span>
            </Link>
          </div>
          <div className="flex items-center"></div>
        </div>
      </div>
    </nav>
  )
}

