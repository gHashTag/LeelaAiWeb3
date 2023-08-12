export type RootStackParamList = {
  GAME_SCREEN: undefined
  PLAN_SCREEN: undefined
  REPORT_SCREEN: undefined
  REPORTS_SCREEN: undefined
  UI_KIT_SCREEN: undefined
}

export interface Player {
  id: number
  plan: number
  avatar: string
  previousPlan?: number
  isStart?: boolean
  isFinished?: boolean
  consecutiveSixes?: number
  positionBeforeThreeSixes?: number
  message?: string
}

export interface GameBoardProps {
  players: Player[]
}

export interface GemProps {
  player?: Player
  planNumber: number
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
  handleAdminMenu: () => void
  handleShareLink: () => void
  handleLike: () => void
  handleComment: () => void
}

export interface ReportCardProps extends UserActions {
  id: string
  post: Post
  avatar: string
  onPress?: () => void
  fullName: string
  isAdmin: boolean
  isLiked: boolean
  likeCount: number
  commCount: number
  date: string
}

export interface MessageAIT {
  systemMessage: string
  message: string
  planText: string
}

export interface HandleCommentAiParamsT {
  curItem: Post | undefined
  systemMessage: string
  message: string
  planText?: string
}
