import { faker } from '@faker-js/faker'

export const avaUrl = faker.image.avatar()

export const diceProps = {
  count: 6,
  players: 4,
  disabled: false,
  canGo: true,
  isReported: false,
  updateStep: () => {
    // Implement the logic for updating steps here
  },
  random: () => {
    // Implement the logic for rolling the dice randomly here
  },
}

export const plansPlayers = [
  {
    id: 2,
    plan: 72,
    uri: 106,
  },
  {
    id: 4,
    plan: 34,
    uri: avaUrl,
  },
]

export const id = faker.string.uuid()
export const fullName = faker.internet.userName()
export const isAdmin = false
export const isLiked = faker.datatype.boolean()
export const likeCount = faker.number.int({ max: 100 })
export const commCount = faker.number.int({ max: 100 })
export const date = faker.date.past().toISOString().substring(0, 10)

export const handleProfile = () => {
  console.log('Profile Pressed')
}

export const handleTranslate = () => {
  console.log('Translate Pressed')
}

export const handlePressWand = async () => {
  console.log('Wand Pressed')
}

export const handleAdminMenu = () => {
  console.log('Admin Menu Pressed')
}

export const handleShareLink = () => {
  console.log('Share Link Pressed')
}

export const handleLike = () => {
  console.log('Like Pressed')
}

export const handleComment = () => {
  console.log('Comment Pressed')
}

export const post = {
  id: 1,
  text: faker.lorem.lines(5),
  createTime: faker.date.past().getTime() / 1000,
  liked: [faker.string.uuid(), faker.string.uuid()],
  comments: [
    {
      id: faker.string.uuid(),
      text: 'This is the first comment.',
      createTime: faker.date.past().getTime() / 1000,
    },
    {
      id: faker.string.uuid(),
      text: 'This is the second comment.',
      createTime: faker.date.past().getTime() / 1000,
    },
  ],
  plan: faker.number.int({ max: 72 }),
  accept: true,
  ownerId: faker.string.uuid(),
}

export const MockedCommentData = {
  id: faker.string.uuid(),
  post,
  fullName,
  avaUrl,
  isAdmin,
  isLiked,
  likeCount,
  commCount,
  date,
  handleProfile,
  handleTranslate,
  handlePressWand,
  handleAdminMenu,
  handleShareLink,
  handleLike,
  handleComment,
}

export const createMockedCommentData = () => {
  return {
    id: faker.string.uuid(),
    post,
    fullName,
    avaUrl,
    isAdmin,
    isLiked,
    likeCount,
    commCount,
    date,
    handleProfile,
    handleTranslate,
    handlePressWand,
    handleAdminMenu,
    handleShareLink,
    handleLike,
    handleComment,
  }
}

export const mockedCommentDataArray = Array.from(
  { length: 10 },
  createMockedCommentData,
)
