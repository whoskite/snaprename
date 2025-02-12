"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

const moonGlowVariants = {
  initial: {
    opacity: 0.5,
    scale: 1
  },
  animate: {
    opacity: [0.5, 1, 0.5], // Array for keyframes
    scale: [1, 1.2, 1],
    filter: [
      "drop-shadow(0 0 0.5rem rgba(253, 224, 71, 0.3))", // yellow-300 with low opacity
      "drop-shadow(0 0 1rem rgba(253, 224, 71, 0.6))",   // yellow-300 with medium opacity
      "drop-shadow(0 0 0.5rem rgba(253, 224, 71, 0.3))"  // back to initial
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className={className}
      >
        <AnimatePresence mode="wait" initial={false}>
          {theme === "dark" ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                variants={moonGlowVariants}
                initial="initial"
                animate="animate"
                className="text-yellow-300"
              >
                <Moon className="h-[1.2rem] w-[1.2rem]" />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className="h-[1.2rem] w-[1.2rem]" />
            </motion.div>
          )}
        </AnimatePresence>
        <span className="sr-only">Toggle theme</span>
      </Button>
    </motion.div>
  )
} 