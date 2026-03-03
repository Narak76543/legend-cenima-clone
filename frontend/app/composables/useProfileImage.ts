const PROFILE_IMAGE_SIZE = 512

export const useProfileImage = () => {
  const clamp = (value: number, min: number, max: number) =>
    Math.min(max, Math.max(min, value))

  const renderProfileImage = (
    image: HTMLImageElement,
    options?: {
      scale?: number
      offsetX?: number
      offsetY?: number
    },
  ) => {
    const width = image.naturalWidth || image.width
    const height = image.naturalHeight || image.height

    if (!width || !height) {
      throw new Error("Invalid image dimensions")
    }

    const scale = clamp(options?.scale ?? 1, 1, 3)
    const normalizedOffsetX = clamp(options?.offsetX ?? 0, -1, 1)
    const normalizedOffsetY = clamp(options?.offsetY ?? 0, -1, 1)
    const cropSize = Math.min(width, height) / scale
    const maxOffsetX = Math.max(0, (width - cropSize) / 2)
    const maxOffsetY = Math.max(0, (height - cropSize) / 2)
    const sourceX = (width - cropSize) / 2 + normalizedOffsetX * maxOffsetX
    const sourceY = (height - cropSize) / 2 + normalizedOffsetY * maxOffsetY

    const canvas = document.createElement("canvas")
    canvas.width = PROFILE_IMAGE_SIZE
    canvas.height = PROFILE_IMAGE_SIZE

    const context = canvas.getContext("2d")
    if (!context) {
      throw new Error("Unable to process image")
    }

    context.imageSmoothingEnabled = true
    context.imageSmoothingQuality = "high"
    context.drawImage(
      image,
      sourceX,
      sourceY,
      cropSize,
      cropSize,
      0,
      0,
      PROFILE_IMAGE_SIZE,
      PROFILE_IMAGE_SIZE,
    )

    return canvas.toDataURL("image/webp", 0.95)
  }

  const loadImage = (source: string) =>
    new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image()

      image.onload = () => resolve(image)
      image.onerror = () => reject(new Error("Unable to load image"))
      image.src = source
    })

  const prepareProfileImage = async (file: File) => {
    const objectUrl = URL.createObjectURL(file)

    try {
      const image = await loadImage(objectUrl)
      return renderProfileImage(image)
    } finally {
      URL.revokeObjectURL(objectUrl)
    }
  }

  const prepareCroppedProfileImage = async (
    source: string,
    options?: {
      scale?: number
      offsetX?: number
      offsetY?: number
    },
  ) => {
    const image = await loadImage(source)
    return renderProfileImage(image, options)
  }

  return {
    prepareCroppedProfileImage,
    prepareProfileImage,
  }
}
