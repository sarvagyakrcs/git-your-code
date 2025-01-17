'use client'

import React, { useState, useRef, useCallback } from 'react'
import ReactCrop, { centerCrop, makeAspectCrop, Crop } from 'react-image-crop'
import { Button } from "@/components/ui/button"
import 'react-image-crop/dist/ReactCrop.css'
import Image from 'next/image'

interface ImageCropperProps {
  imageSrc: string
  onCropComplete: (croppedImageUrl: string) => void
  onCancel: () => void
}

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

export default function ImageCropper({ imageSrc, onCropComplete, onCancel }: ImageCropperProps) {
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<Crop>()
  const imgRef = useRef<HTMLImageElement>(null)

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget
    setCrop(centerAspectCrop(width, height, 1))
  }, [])

  const cropImage = useCallback(() => {
    if (completedCrop && imgRef.current) {
      const image = imgRef.current
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      if (!ctx) {
        throw new Error('No 2d context')
      }

      const scaleX = image.naturalWidth / image.width
      const scaleY = image.naturalHeight / image.height

      canvas.width = completedCrop.width
      canvas.height = completedCrop.height

      ctx.drawImage(
        image,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        completedCrop.width,
        completedCrop.height
      )

      canvas.toBlob((blob) => {
        if (!blob) {
          console.error('Canvas is empty')
          return
        }
        const croppedImageUrl = URL.createObjectURL(blob)
        onCropComplete(croppedImageUrl)
      }, 'image/jpeg')
    }
  }, [completedCrop, onCropComplete])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg max-w-md w-full">
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => setCompletedCrop(c)}
          aspect={1}
          circularCrop
        >
          <Image
            ref={imgRef}
            alt="Crop me"
            src={imageSrc}
            onLoad={onImageLoad}
            width={100}
            height={100}
            className="max-w-full h-auto"
          />
        </ReactCrop>
        <div className="flex justify-between mt-4">
          <Button onClick={onCancel} variant="outline">Cancel</Button>
          <Button onClick={cropImage}>Crop</Button>
        </div>
      </div>
    </div>
  )
}