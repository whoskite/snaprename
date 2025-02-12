import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export function ProfilePopover({ isVisible }: { isVisible: boolean }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute top-full mt-2 -right-8 z-50"
        >
          <motion.div
            className="bg-card rounded-lg p-1.5 shadow-lg border"
            layoutId="profile-card"
          >
            <Image
              src="/KITE PROFILE IMAGE.jpg"
              alt="Kite's Profile"
              width={80}
              height={80}
              className="rounded-lg w-20 h-20 object-cover"
              priority
            />
            <div className="mt-1 text-center">
              <p className="font-medium text-sm">@kite</p>
              <p className="text-xs text-muted-foreground">Farcaster</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 