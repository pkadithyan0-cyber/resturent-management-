'use client'

import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Share2 } from 'lucide-react'
import { useState } from 'react'

type GalleryImage = { src: string; alt: string; label?: string }

export function ProductGallery({ images, productName }: { images: GalleryImage[]; productName: string }) {
  const [active, setActive] = useState(0)
  const [shared, setShared] = useState(false)
  const current = images[active]
  const move = (direction: number) => setActive(index => (index + direction + images.length) % images.length)

  async function shareProduct() {
    const data = { title: productName, url: window.location.href }
    try {
      if (navigator.share) await navigator.share(data)
      else if (navigator.clipboard) {
        await navigator.clipboard.writeText(data.url)
        setShared(true)
        window.setTimeout(() => setShared(false), 1800)
      }
    } catch { /* A dismissed share sheet needs no follow-up. */ }
  }

  return <div className={`product-gallery${images.length === 1 ? ' has-single-image' : ''}`} aria-label={`${productName} image gallery`}>
    {images.length > 1 && <div className="gallery-thumbnails" role="group" aria-label="Choose product image">
      {images.map((image, index) => <button
        key={`${image.src}-${index}`}
        type="button"
        aria-pressed={active === index}
        aria-label={`Show ${image.label || `image ${index + 1}`}`}
        className={`gallery-thumbnail${active === index ? ' is-active' : ''}`}
        onClick={() => setActive(index)}
      >
        <Image quality={90} src={image.src} alt="" fill sizes="(max-width: 700px) 19vw, 82px" />
      </button>)}
    </div>}
    <div className="gallery-stage">
      <AnimatePresence mode="wait">
        <motion.div key={`${current.src}-${active}`} className="gallery-stage-image" initial={{ opacity: .45 }} animate={{ opacity: 1 }} exit={{ opacity: .4 }} transition={{ duration: .24 }}>
          <Image quality={100} unoptimized src={current.src} alt={current.alt} fill priority sizes="(max-width: 700px) 100vw, (max-width: 1100px) 55vw, 60vw" />
        </motion.div>
      </AnimatePresence>
      <button type="button" className="gallery-share" aria-label="Share product" onClick={shareProduct}><Share2 size={16}/><span>{shared ? 'LINK COPIED' : 'SHARE'}</span></button>
      {images.length > 1 && <div className="gallery-mobile-controls">
        <button type="button" aria-label="Previous image" onClick={() => move(-1)}><ChevronLeft size={18}/></button>
        <span>{String(active + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span>
        <button type="button" aria-label="Next image" onClick={() => move(1)}><ChevronRight size={18}/></button>
      </div>}
      {current.label && <span className="gallery-caption">{current.label}</span>}
    </div>
  </div>
}
