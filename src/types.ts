interface Member {
  totalMessages: number
  totalTexts: number
  totalStickers: number
  totalPhotos: number
}

interface Message {
  messages: number
}

interface DateMember {
  [key: string]: Message
}

export interface Members {
  [key: string]: Member
}

export interface DateMemberMessages {
  [key: string]: DateMember
}
