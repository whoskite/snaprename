"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileIcon, ChevronRightIcon } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { motion, AnimatePresence } from "framer-motion"

type RenamedFile = {
  originalName: string
  newName: string
}

export default function RenamedFiles({ renamedFiles }: { renamedFiles: RenamedFile[] }) {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Renamed Files</CardTitle>
      </CardHeader>
      <CardContent>
        {renamedFiles.length > 0 ? (
          <ul className="space-y-2">
            {renamedFiles.map((file, index) => (
              <Collapsible key={index} open={openItems.includes(index)} onOpenChange={() => toggleItem(index)}>
                <CollapsibleTrigger asChild>
                  <li className="flex items-center cursor-pointer hover:bg-accent hover:text-accent-foreground p-2 rounded-md transition-colors">
                    <FileIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm flex-grow">{file.originalName}</span>
                    <ChevronRightIcon
                      className={`h-4 w-4 transition-transform duration-200 ${openItems.includes(index) ? "rotate-90" : ""}`}
                    />
                  </li>
                </CollapsibleTrigger>
                <AnimatePresence>
                  {openItems.includes(index) && (
                    <CollapsibleContent asChild forceMount>
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="text-sm pl-6 py-2 text-muted-foreground">New name: {file.newName}</p>
                      </motion.div>
                    </CollapsibleContent>
                  )}
                </AnimatePresence>
              </Collapsible>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">No renamed files yet.</p>
        )}
      </CardContent>
    </Card>
  )
}

