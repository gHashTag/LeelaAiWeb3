import { faker } from '@faker-js/faker'

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

export const createMockedCommentData = () => {
  const id = faker.string.uuid()
  const fullName = faker.internet.userName()
  const isAdmin = false
  const isLiked = faker.datatype.boolean()
  const likeCount = faker.number.int({ max: 100 })
  const commCount = faker.number.int({ max: 100 })
  const date = faker.date.past().toISOString().substr(0, 10)

  const handleProfile = () => {
    console.log('Profile Pressed')
  }

  const handleTranslate = () => {
    console.log('Translate Pressed')
  }

  const handlePressWand = async () => {
    console.log('Wand Pressed')
  }

  const handleAdminMenu = () => {
    console.log('Admin Menu Pressed')
  }

  const handleShareLink = () => {
    console.log('Share Link Pressed')
  }

  const handleLike = () => {
    console.log('Like Pressed')
  }

  const handleComment = () => {
    console.log('Comment Pressed')
  }

  const post = {
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

  const avaUrl = faker.image.avatar()

  return {
    id,
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
