import { Button } from "@/components/ui/button"
import { Coffee } from "lucide-react"
import { motion } from "framer-motion"

export function DonateButton() {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        as="a"
        href="https://www.buymeacoffee.com/yourusername" // Replace with your actual Buy Me a Coffee link
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#FFDD00] text-black hover:bg-[#FFDD00]/90"
      >
        <Coffee className="mr-2 h-4 w-4" />
        Buy me a coffee
      </Button>
    </motion.div>
  )
}

