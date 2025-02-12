"use client"

import { useState } from "react"
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

  const handleFilesRenamed = (newFiles: RenamedFile[]) => {
    setRenamedFiles((prevFiles) => [...prevFiles, ...newFiles])
  }

  const handleDeleteRenamedFile = (index: number) => {
    setRenamedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
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
          />
        </div>
      </div>
    </div>
  )
}

