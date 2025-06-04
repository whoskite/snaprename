"use client"

import Link from "next/link"
import Image from "next/image"
import { Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ThemeToggle"
import { motion } from "framer-motion"
import { TwitterIcon } from "@/components/icons/TwitterIcon"
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

const twitterAnimation = {
  initial: { 
    scale: 1,
  },
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

const iconColorAnimation = {
  initial: { 
    fill: "var(--icon-color)",
  },
  hover: { 
    fill: "#1DA1F2",
    transition: {
      duration: 0.2
    }
  }
}

export function Navbar() {
  const [showProfile, setShowProfile] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link className="mr-6 flex items-center space-x-3" href="/">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/Bulk Rename Logo.png"
                alt="Bulk Rename Logo"
                width={32}
                height={32}
                className="object-contain"
                priority
              />
            </motion.div>
            <motion.span 
              className="font-bold sm:inline-block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
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
                variants={twitterAnimation}
                className="relative"
                onHoverStart={() => setShowProfile(true)}
                onHoverEnd={() => setShowProfile(false)}
              >
                <Button variant="ghost" size="icon" asChild className="rounded-none">
                  <Link href="https://x.com/tomykite" target="_blank" rel="noreferrer">
                    <motion.div
                      initial="initial"
                      animate="initial"
                      whileHover="hover"
                      variants={iconColorAnimation}
                    >
                      <TwitterIcon className="h-4 w-4" />
                    </motion.div>
                    <span className="sr-only">X (Twitter)</span>
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

