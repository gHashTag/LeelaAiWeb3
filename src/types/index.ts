export type RootStackParamList = {
  USER_SCREEN: undefined
  GAME_SCREEN: undefined
  PLANS_SCREEN: undefined
  PLAN_SCREEN: { key: string }
  REPORT_SCREEN: undefined
  REPORTS_SCREEN: undefined
  UI_KIT_SCREEN: undefined
  SEED_SCREEN: undefined
}

export interface Player {
  id: string
  fullName: string
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

export interface Comment {
  id: string
  text: string
  createTime: number
}

export interface UserActions {
  handleProfile: () => void
  handleAdminMenu: () => void
  handleShareLink: () => void
  handleLike: () => void
  handleComment: () => void
}

export interface Report extends UserActions {
  id: string
  player: Player
  text: string
  title: string
  comments: Comment[]
  onPress: () => void
  plan: number
  accept: boolean
  isAdmin: boolean
  isLikedByCurrentUser: boolean
  likes: Like[]
  commentCount: number
  likeCount?: number
  createdAt: string
}

export interface MessageAIT {
  systemMessage: string
  message: string
  planText: string
}

export interface HandleCommentAiParamsT {
  curItem: Report | undefined
  systemMessage: string
  message: string
  planText?: string
}

export interface Like {
  id: string
  report: Report
  player: Player
  createdAt: string
}
