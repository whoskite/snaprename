"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Trash2 } from "lucide-react"
import Image from "next/image"

type RenamedFile = {
  originalName: string
  newName: string
  size: number
  url?: string
}

export default function RenamedFiles({
  renamedFiles,
  onDelete,
  onUndo,
  canUndo
}: {
  renamedFiles: RenamedFile[]
  onDelete: (index: number) => void
  onUndo?: () => void
  canUndo?: boolean
}) {
  if (renamedFiles.length === 0) return null

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Recently Renamed Files</h3>
        {onUndo && canUndo && (
          <Button variant="outline" size="sm" onClick={onUndo}>
            Undo
          </Button>
        )}
      </div>
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

