import { Dimensions, Linking, Platform, NativeModules } from 'react-native'

import { OPEN_AI_KEY } from '@env'
import { createNavigationContainerRef } from '@react-navigation/native'
import * as Sentry from '@sentry/react-native'
import axios from 'axios'
import Rate from 'react-native-rate'
import { MessageAIT, HandleCommentAiParamsT } from 'types'

export const primary = '#50E3C2'
export const secondary = '#ff06f4'
export const gray = '#808080'
export const white = '#ffffff'
export const black = '#303030'
export const dimGray = '#b4b3b3'
export const lightGray = '#F5F7F8'
export const classicRose = '#FDBEEA'
export const mustard = '#F3DE50'
export const fuchsia = '#FF06F4'
export const trueBlue = '#007ACD'
export const paleBlue = '#BEFCE5'
export const brightTurquoise = '#1EE4EC'
export const red = '#FC2847'
export const orange = '#FFB700'
export const blackOpacity = 'rgba(0, 0, 0, 0.8)'
export const grayBlackOpacity = 'rgba(139, 139, 139, 0.1)'

export const generateComment = async ({
  message,
  systemMessage,
  planText,
}: MessageAIT): Promise<string> => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4-0314',
        messages: [
          {
            role: 'system',
            content: systemMessage,
          },
          {
            role: 'user',
            content: message,
          },
          {
            role: 'assistant',
            content: planText,
          },
        ],
        max_tokens: 1000,
        temperature: 0.5,
      },
      {
        headers: {
          Authorization: `Bearer ${OPEN_AI_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    )

    return response?.data?.choices[0]?.message?.content ?? ''
  } catch (error) {
    captureException(error, 'generateComment')
    throw error
  }
}

export const onLeaveFeedback = (onAction: (success: any) => void) => {
  const options = {
    AppleAppID: '1296604457',
    GooglePackageName: 'com.leelagame',
    OtherAndroidURL:
      'https://play.google.com/store/apps/details?id=com.leelagame',
    preferInApp: true,
    openAppStoreIfInAppFails: true,
  }
  Rate.rate(options, onAction)
}

export const handleCommentAi = async ({
  curItem,
  systemMessage,
  message,
  planText = ' ',
}: HandleCommentAiParamsT): Promise<void> => {
  const aiComment: string = await generateComment({
    message,
    systemMessage,
    planText,
  })

  if (curItem && aiComment) {
    // await PostStore.createComment({
    //   text: aiComment,
    //   postId: curItem.id,
    //   postOwner: curItem.ownerId,
    //   ownerId: LEELA_ID,
    // })
  }
}

export const captureException = (error: any, target: string) => {
  if (!error) {
    console.log(
      '%c captureException called with messing or incorrect arguments',
      'background: #555; color: yellow',
    )
    return
  }
  console.error(`On:${target}/ My Error: ${error} `)
  if (!__DEV__) {
    Sentry.captureException(error)
  }
}

export const win = Dimensions.get('window')
export const W = win.width
export const H = win.height
export const imgH = Math.round((W * 9) / 16)
export const isIos = Platform.OS === 'ios'

export const openUrl = async (url: string) => {
  await Linking.openURL(url)
}

export const goBack = () => {
  if (navRef.isReady()) {
    navRef.goBack()
  }
}
//@ts-ignore
export const goHome = (navigation) => () => navigation.popToTop()()

export const ENTITLEMENT_ID = 'Pro'

export const getSystemLanguage = () => {
  let languageCode = 'en' // Default to English

  if (Platform.OS === 'android') {
    languageCode = NativeModules.I18nManager.localeIdentifier
  } else if (Platform.OS === 'ios') {
    languageCode = NativeModules.SettingsManager.settings.AppleLocale
  }

  return languageCode.slice(0, 2).toLowerCase()
}
