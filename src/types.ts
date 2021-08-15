interface Member {
  totalMessages: number
  totalTexts: number
  totalStickers: number
  totalPhotos: number
}

export interface Members {
  [key: string]: Member
}