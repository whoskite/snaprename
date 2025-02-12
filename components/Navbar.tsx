"use client"

import Link from "next/link"
import { Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ThemeToggle"
import { motion } from "framer-motion"
import { FarcasterIcon } from "@/components/icons/FarcasterIcon"
import { useState } from "react"
import { ProfilePopover } from "@/components/ProfilePopover"

const iconAnimation = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  tap: { scale: 0.95 }
}

export function Navbar() {
  const [showProfile, setShowProfile] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <motion.span 
              className="font-bold sm:inline-block"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              SnapRename
            </motion.span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between md:justify-end">
          <nav className="flex items-center">
            <div className="flex items-center bg-muted/50 rounded-lg p-1">
              <motion.div
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                variants={iconAnimation}
                className="relative"
              >
                <Button variant="ghost" size="icon" asChild className="rounded-r-none">
                  <Link href="https://github.com/whoskite/snaprename" target="_blank" rel="noreferrer">
                    <Github className="h-4 w-4" />
                    <span className="sr-only">GitHub</span>
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                variants={iconAnimation}
                className="relative"
                onHoverStart={() => setShowProfile(true)}
                onHoverEnd={() => setShowProfile(false)}
              >
                <Button variant="ghost" size="icon" asChild className="rounded-none">
                  <Link href="https://warpcast.com/kite" target="_blank" rel="noreferrer">
                    <FarcasterIcon className="h-4 w-4" />
                    <span className="sr-only">Farcaster</span>
                  </Link>
                </Button>
                <ProfilePopover isVisible={showProfile} />
              </motion.div>

              <div className="relative">
                <ThemeToggle className="rounded-l-none" />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

