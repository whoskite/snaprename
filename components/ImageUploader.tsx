"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import type React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { UploadIcon, DownloadIcon, Trash2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion, AnimatePresence } from "framer-motion"
import JSZip from "jszip"
import Image from "next/image"

type NamingPattern = "custom-number" | "custom-sequence" | "custom-only" | "date-filename"

type RenamedFile = {
  originalName: string
  newName: string
  size: number
  url?: string
}

const useMotionDropzone = (onDrop: (acceptedFiles: File[]) => void) => {
  const dropzone = useDropzone({
    accept: { "image/*": [] },
    onDrop
  })

  const getMotionDropzoneProps = () => ({
    ...dropzone.getRootProps(),
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 }
  })

  return {
    ...dropzone,
    getMotionDropzoneProps,
  }
}

export default function ImageUploader({ onFilesRenamed }: { onFilesRenamed: (files: RenamedFile[]) => void }) {
  const [files, setFiles] = useState<File[]>([])
  const [customPrefix, setCustomPrefix] = useState("")
  const [namingPattern, setNamingPattern] = useState<NamingPattern>("custom-number")
  const [uploading, setUploading] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  const generateFileName = (file: File, index: number) => {
    const extension = file.name.split(".").pop()
    const originalNumber = file.lastModified.toString().slice(-6)
    const date = new Date()
    const formattedDate = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}`
    const formattedTime = `${date.getHours().toString().padStart(2, "0")}${date.getMinutes().toString().padStart(2, "0")}${date.getSeconds().toString().padStart(2, "0")}`

    switch (namingPattern) {
      case "custom-number":
        return `${customPrefix}-${originalNumber}.${extension}`
      case "custom-sequence":
        return `${customPrefix}-${(index + 1).toString().padStart(3, "0")}.${extension}`
      case "custom-only":
        return `${customPrefix}.${extension}`
      case "date-filename":
        return `${formattedDate}_${formattedTime}_${customPrefix}.${extension}`
      default:
        return file.name
    }
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles])
  }, [])

  const handleSubmit = async () => {
    if (files.length === 0 || !customPrefix) return

    setUploading(true)
    const zip = new JSZip()
    const renamedFiles: RenamedFile[] = []

    files.forEach((file, index) => {
      const newFileName = generateFileName(file, index)
      zip.file(newFileName, file)
      renamedFiles.push({ 
        originalName: file.name, 
        newName: newFileName, 
        size: file.size,
        url: URL.createObjectURL(file)
      })
    })

    try {
      const content = await zip.generateAsync({ type: "blob" })
      const link = document.createElement("a")
      link.href = URL.createObjectURL(content)
      link.download = `${customPrefix}_renamed_images.zip`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      onFilesRenamed(renamedFiles)
    } catch (error) {
      console.error("Error creating zip file:", error)
    } finally {
      setUploading(false)
    }
  }

  const handleSingleDownload = (file: File, index: number) => {
    const newFileName = generateFileName(file, index)
    const url = URL.createObjectURL(file)
    const link = document.createElement("a")
    link.href = url
    link.download = newFileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    onFilesRenamed([{ 
      originalName: file.name, 
      newName: newFileName, 
      size: file.size,
      url: url
    }])
  }

  const handleDeleteFile = (indexToDelete: number) => {
    setFiles(files.filter((_, index) => index !== indexToDelete))
  }

  const handleClearAll = () => {
    setFiles([])
  }

  const { getMotionDropzoneProps, getInputProps, isDragActive } = useMotionDropzone(onDrop)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium mb-1">Naming Pattern</label>
          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <Select value={namingPattern} onValueChange={(value: NamingPattern) => setNamingPattern(value)}>
              <SelectTrigger className="transition-colors duration-200 hover:border-primary">
                <SelectValue placeholder="Select naming pattern" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="custom-number">Custom Name - Original File Number</SelectItem>
                <SelectItem value="custom-sequence">Custom Name - Sequence</SelectItem>
                <SelectItem value="custom-only">Custom Name Only</SelectItem>
                <SelectItem value="date-filename">Date and Time - Custom Name</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>
        </div>
        <div>
          <label htmlFor="customPrefix" className="block text-sm font-medium mb-1">
            Custom Text
          </label>
          <TooltipProvider>
            <Tooltip open={showTooltip && customPrefix === ""}>
              <TooltipTrigger asChild>
                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <Input
                    id="customPrefix"
                    type="text"
                    value={customPrefix}
                    onChange={(e) => {
                      setCustomPrefix(e.target.value.toUpperCase())
                      setShowTooltip(true)
                    }}
                    onFocus={() => setShowTooltip(true)}
                    onBlur={() => setShowTooltip(false)}
                    placeholder="Enter custom text (e.g., KITESTUDIO)"
                    className={`uppercase transition-colors duration-200 hover:border-primary ${customPrefix === "" ? "border-red-500" : ""}`}
                    required
                  />
                </motion.div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Custom text is required</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div
        {...getMotionDropzoneProps()}
        className={`p-10 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
          isDragActive ? "border-primary bg-primary/5" : "border-muted hover:border-primary/50"
        }`}
      >
        <input {...getInputProps()} />
        <UploadIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        {isDragActive ? (
          <p className="text-lg">Drop the files here ...</p>
        ) : (
          <p className="text-lg">Drag &apos;n&apos; drop some files here, or click to select files</p>
        )}
      </div>

      <motion.div whileTap={{ scale: 0.98 }}>
        <Button
          onClick={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
          className="w-full"
          disabled={uploading || files.length === 0 || !customPrefix}
        >
          {uploading ? (
            "Preparing Zip..."
          ) : files.length === 0 ? (
            "Select Files"
          ) : (
            <>
              <DownloadIcon className="mr-2 h-4 w-4" />
              Download All as Zip
            </>
          )}
        </Button>
      </motion.div>

      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Preview:</h3>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleClearAll}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear All
                </Button>
              </motion.div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {files.map((file, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-4">
                      <div className="aspect-square mb-4 relative">
                        <Image
                          src={URL.createObjectURL(file) || "/placeholder.svg"}
                          alt={`Preview of ${file.name}`}
                          width={200}
                          height={200}
                          className="rounded-md object-cover w-full h-full"
                          onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)}
                        />
                        <motion.div 
                          className="absolute top-2 right-2"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Button
                            variant="destructive"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleDeleteFile(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete image</span>
                          </Button>
                        </motion.div>
                      </div>
                      <p className="text-sm text-muted-foreground truncate mb-1">Original: {file.name}</p>
                      <p className="text-sm font-mono truncate mb-2">New: {generateFileName(file, index)}</p>
                      <Button
                        onClick={() => handleSingleDownload(file, index)}
                        variant="outline"
                        size="sm"
                        className="w-full"
                      >
                        <DownloadIcon className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

