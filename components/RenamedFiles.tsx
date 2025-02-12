"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileIcon, ChevronRightIcon, Trash2 } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"

type RenamedFile = {
  originalName: string
  newName: string
  size: number
  url?: string
}

export default function RenamedFiles({ 
  renamedFiles, 
  onDelete 
}: { 
  renamedFiles: RenamedFile[]
  onDelete: (index: number) => void
}) {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  if (renamedFiles.length === 0) return null

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Recently Renamed Files</h3>
      <div className="space-y-2">
        {renamedFiles.map((file, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="p-3 flex items-center space-x-4">
              {file.url && (
                <div className="flex-shrink-0">
                  <Image
                    src={file.url}
                    alt={file.newName}
                    width={48}
                    height={48}
                    className="rounded-md object-cover"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {file.originalName} → {file.newName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  variant="destructive"
                  size="icon"
                  className="h-8 w-8 flex-shrink-0"
                  onClick={() => onDelete(index)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete file</span>
                </Button>
              </motion.div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

