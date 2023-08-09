import { useFocusEffect } from '@react-navigation/native'
import { BackHandler } from 'react-native'

const useNoBackHandler = () => {
  useFocusEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => true)
    return sub.remove
  })
}

export { useNoBackHandler }
