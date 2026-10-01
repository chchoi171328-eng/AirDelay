'use client'
import { Camera } from 'lucide-react'

interface ImagePlaceholderProps {
  label?: string
  className?: string
  aspectRatio?: string
}

export default function ImagePlaceholder({
  label = '이미지',
  className = '',
  aspectRatio = 'aspect-video',
}: ImagePlaceholderProps) {
  return (
    <div className={`img-placeholder ${aspectRatio} ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-navy/90 to-navy-dark/95" />
      <div className="relative z-10 flex flex-col items-center gap-3 text-white/60">
        <Camera className="w-10 h-10" strokeWidth={1.2} />
        <span className="text-sm font-medium tracking-wide">{label}</span>
      </div>
      {/* decorative grid */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  )
}
