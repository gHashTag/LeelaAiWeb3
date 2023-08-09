export type RootStackParamList = {
  GAME_SCREEN: undefined
}

export interface OtherUsersT {
  email: string
  firstName: string
  lastName: string
  plan: number
  owner: string
  isOnline: boolean
  avatar?: string
  status?: statusT
}
export type statusT = 'ban' | 'Admin' | 'Free' | null
export interface HistoryT {
  plan: number
  count: number
  status: string
  createDate: number
}

export interface SelfT {
  player: number
  start: boolean
  finish: boolean
  plan: number
  planPrev: number
  rate?: boolean
  history: HistoryT[]
}

export interface FormPostT {
  text?: string
  plan?: number
  systemMessage: string
  planText: string
}

export interface MessageAIT {
  systemMessage: string
  message: string
  planText: string
}
// types.ts
export interface PostT {
  id: number
  text: string
  createTime: number
  liked: string[]
  comments: {
    id: string
    text: string
    createTime: number
  }[]
  plan: number
  accept: boolean
  ownerId: string
  systemMessage: string
  planText: string
}

export interface FormCommentT {
  text: string
  postId: string
  postOwner: string
  ownerId?: string
}

export interface HandleCommentAiParamsT {
  curItem: PostT | undefined
  systemMessage: string
  message: string
  planText?: string
}

export interface CommentT extends FormCommentT {
  firstName: string
  lastName: string
  ownerId: string
  createTime: number
  email: string
  reply: false
  id: string
}

export interface FormReplyCom {
  text: string
  commentId: string
  commentOwner: string
  postId: string
}

export interface ReplyComT extends FormReplyCom {
  firstName: string
  lastName: string
  ownerId: string
  createTime: number
  email: string
  id: string
  reply: true
}

export interface ButtonsModalT {
  onPress: () => void
  title: string
  icon: string
  key: string
  color?: string
}

export interface getTimeT {
  lastTime: number
  type?: '' | '-short'
}
