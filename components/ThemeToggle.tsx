"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

const moonGlowVariants = {
  initial: {
    opacity: 0.8,
    scale: 1,
    filter: "drop-shadow(0 0 0px rgba(253, 224, 71, 0))"
  },
  animate: {
    opacity: [0.8, 1, 0.8],
    scale: [1, 1.02, 1],
    filter: [
      "drop-shadow(0 0 2px rgba(253, 224, 71, 0.3)) drop-shadow(0 0 4px rgba(234, 179, 8, 0.2))",
      "drop-shadow(0 0 4px rgba(253, 224, 71, 0.5)) drop-shadow(0 0 8px rgba(234, 179, 8, 0.4))",
      "drop-shadow(0 0 2px rgba(253, 224, 71, 0.3)) drop-shadow(0 0 4px rgba(234, 179, 8, 0.2))"
    ],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: [0.4, 0, 0.6, 1],
      times: [0, 0.5, 1]
    }
  }
}

const sunVariants = {
  initial: { rotate: 90, opacity: 0 },
  animate: { 
    rotate: 0, 
    opacity: 1,
    scale: [1, 1.05, 1],
    transition: {
      scale: {
        repeat: Infinity,
        duration: 8,
        ease: "easeInOut"
      }
    }
  },
  exit: { rotate: -90, opacity: 0 }
}

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

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
              transition={{ duration: 0.4 }}
            >
              <motion.div
                variants={moonGlowVariants}
                initial="initial"
                animate="animate"
                className="text-yellow-100/90 relative"
              >
                <motion.span
                  className="absolute inset-0 rounded-full bg-yellow-100/20 blur-sm"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <Moon className="h-[1.2rem] w-[1.2rem] relative z-10" />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              variants={sunVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4 }}
              className="text-yellow-500/90"
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