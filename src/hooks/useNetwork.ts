import { useEffect } from 'react'

import NetInfo from '@react-native-community/netinfo'

import { OpenNetworkModal } from '../constants'

export const useNetwork = () => {
  useEffect(() => {
    const unsub = NetInfo.addEventListener((state) => {
      if (state.isConnected === false) {
        OpenNetworkModal()
      }
    })
    return unsub
  }, [])
}
