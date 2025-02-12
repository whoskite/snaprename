"use server"

import { writeFile, readdir, mkdir } from "fs/promises"
import path from "path"

const uploadDir = path.join(process.cwd(), "public", "uploads")

async function ensureUploadDir() {
  try {
    await mkdir(uploadDir, { recursive: true })
  } catch (error) {
    console.error("Error creating upload directory:", error)
  }
}

export async function uploadAndRenameImages(formData: FormData) {
  await ensureUploadDir()

  const files = formData.getAll("files") as File[]
  const newNames = formData.getAll("newNames") as string[]

  if (files.length !== newNames.length) {
    throw new Error("Mismatch between files and new names")
  }

  const results = await Promise.all(
    files.map(async (file, index) => {
      const newName = newNames[index]
      if (!file || !newName) {
        throw new Error("File and new name are required")
      }

      const buffer = Buffer.from(await file.arrayBuffer())
      const extension = path.extname(file.name)
      const newFileName = `${newName}${extension}`

      await writeFile(path.join(uploadDir, newFileName), buffer)

      return { success: true, fileName: newFileName }
    }),
  )

  return results
}

export async function getRenamedFiles() {
  await ensureUploadDir()

  try {
    const files = await readdir(uploadDir)
    return files
  } catch (error) {
    console.error("Error reading renamed files:", error)
    return []
  }
}

