"use client"

import { useState, useEffect } from "react"
import ImageUploader from "@/components/ImageUploader"
import RenamedFiles from "@/components/RenamedFiles"
import { ArrowDownIcon } from "lucide-react"

type RenamedFile = {
  originalName: string
  newName: string
  size: number
  url?: string
}

export default function Home() {
  const [renamedFiles, setRenamedFiles] = useState<RenamedFile[]>([])
  const [history, setHistory] = useState<RenamedFile[][]>([])

  useEffect(() => {
    const saved = localStorage.getItem("renamedFiles")
    if (saved) {
      try {
        setRenamedFiles(JSON.parse(saved))
      } catch {
        // ignore parse errors
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("renamedFiles", JSON.stringify(renamedFiles))
  }, [renamedFiles])

  const handleFilesRenamed = (newFiles: RenamedFile[]) => {
    setHistory((h) => [...h, renamedFiles])
    setRenamedFiles((prevFiles) => [...prevFiles, ...newFiles])
  }

  const handleDeleteRenamedFile = (index: number) => {
    setHistory((h) => [...h, renamedFiles])
    setRenamedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
  }

  const handleUndo = () => {
    setHistory((hist) => {
      const last = hist[hist.length - 1]
      if (last) {
        setRenamedFiles(last)
        return hist.slice(0, hist.length - 1)
      }
      return hist
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">Bulk Image Wizard</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Effortlessly rename and organize your images in bulk. Perfect for photographers, designers, and content
            creators.
          </p>
        </div>
        <div className="max-w-3xl mx-auto bg-card rounded-lg shadow-lg p-6">
          <ImageUploader onFilesRenamed={handleFilesRenamed} />
          <div className="flex items-center justify-center my-8">
            <ArrowDownIcon className="h-8 w-8 text-muted-foreground animate-bounce" />
          </div>
          <RenamedFiles
            renamedFiles={renamedFiles}
            onDelete={handleDeleteRenamedFile}
            onUndo={handleUndo}
            canUndo={history.length > 0}
          />
        </div>
      </div>
    </div>
  )
}

