export const fullName = 'John Doe'
export const isAdmin = false
export const isLiked = true
export const likeCount = 10
export const commCount = 5
export const date = '2023-08-07'
// Определите все необходимые обработчики событий
export const handleProfile = () => {
  // Обработчик для нажатия на профиль пользователя
  console.log('Profile Pressed')
}

export const handleTranslate = () => {
  // Обработчик для перевода
  console.log('Translate Pressed')
}

export const handlePressWand = async () => {
  // Обработчик для перевода с помощью искусственного интеллекта
  console.log('Wand Pressed')
}

export const handleAdminMenu = () => {
  // Обработчик для меню администратора
  console.log('Admin Menu Pressed')
}

export const handleShareLink = () => {
  // Обработчик для поделиться ссылкой на пост
  console.log('Share Link Pressed')
}

export const handleLike = () => {
  // Обработчик для лайка поста
  console.log('Like Pressed')
}

export const handleComment = () => {
  // Обработчик для комментирования поста
  console.log('Comment Pressed')
}

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

export const post = {
  id: 1,
  text: 'This is the post text. This is the post text. This is the post text. This is the post text. This is the post text. This is the post text. This is the post text. This is the post text. This is the post text. This is the post text. This is the post text. This is the post text. This is the post text. This is the post text. This is the post text. This is the post text.',
  createTime: 1669990226,
  liked: ['user1', 'user2'],
  comments: [
    {
      id: 'comment1',
      text: 'This is the first comment.',
      createTime: 1669990227,
    },
    {
      id: 'comment2',
      text: 'This is the second comment.',
      createTime: 1669990228,
    },
  ],
  plan: 3,
  accept: true,
  ownerId: 'user123', // Добавьте значение для ownerId
  systemMessage: 'Some system message', // Добавьте значение для systemMessage
  planText: 'Plan text', // Добавьте значение для planText
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
    uri: 'https://bafkreiftrmfmimlvo26xaxfvt2ypnjjaavq5mgnkjljs6mczfekii4cmtq.ipfs.nftstorage.link/',
  },
]
export const avaUrl =
  'https://bafkreiftrmfmimlvo26xaxfvt2ypnjjaavq5mgnkjljs6mczfekii4cmtq.ipfs.nftstorage.link/'

export const MockedCommentData = {
  post,
  fullName: 'John Doe',
  avaUrl, // замоканный URL аватарки
  isAdmin: false,
  isLiked: false,
  likeCount: 10,
  commCount: 5,
  date: '2023-08-07',
  handleProfile: () => {
    // функция обработки навигации на профиль пользователя
  },
}
