export type RootStackParamList = {
  GAME_SCREEN: undefined
  PLAN_SCREEN: undefined
  REPORT_SCREEN: undefined
  REPORTS_SCREEN: undefined
}

export interface Player {
  id: number
  uri: string | number
  plan: number
  previousPlan: number
  isStart: boolean
  isFinished: boolean
  consecutiveSixes: number
  positionBeforeThreeSixes: number
  message?: string
  actionMessage?: string
}

export interface GameBoardProps {
  players: Player[]
  currentPlayerId: number
}

export interface GemProps {
  planNumber: number
  currentPlayerId: number
  player?: Player
  onPress?: () => void
}

export interface Comment {
  id: string
  text: string
  createTime: number
}

export interface Post {
  id: number
  text: string
  createTime: number
  liked: string[]
  comments: Comment[]
  plan: number
  accept: boolean
  ownerId: string
}

export interface UserActions {
  handleProfile: () => void
  handlePressWand: () => Promise<void>
  handleAdminMenu: () => void
  handleShareLink: () => void
  handleLike: () => void
  handleComment: () => void
}

export interface ReportCardProps extends UserActions {
  id: string
  post: Post
  onPress?: () => void
  fullName: string
  avaUrl: string
  isAdmin: boolean
  isLiked: boolean
  likeCount: number
  commCount: number
  date: string
}
