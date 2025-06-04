import { Twitter } from "lucide-react"

export function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <Twitter
      {...props}
      style={{ 
        ...props.style,
        fill: 'var(--icon-color)',
        color: 'var(--icon-color)'
      }}
    />
  )
} 