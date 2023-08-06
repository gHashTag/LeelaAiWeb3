import { useFocusEffect } from '@react-navigation/native'
import { BackHandler } from 'react-native'

import { OpenExitModal } from '../cons'

export const useExitModal = () => {
  useFocusEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      function () {
        OpenExitModal()
        return true
      },
    )
    return () => backHandler.remove()
  })
}
