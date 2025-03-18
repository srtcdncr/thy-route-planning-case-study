import Link from "next/link"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold">Route Planner</span>
        </Link>
      </div>
    </header>
  )
}

