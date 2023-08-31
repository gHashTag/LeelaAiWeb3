import React from 'react'

import { secondary } from 'cons'
import { s } from 'react-native-size-matters'
import Spinner from 'react-native-spinkit'

interface SpinT {
  color?: string
  size?: 'xLarge' | 'large' | 'medium' | 'small'
}

const Loader: React.FC<SpinT> = ({ color = secondary, size = 'medium' }) => {
  let spinnerSize
  if (size === 'small') {
    spinnerSize = s(30)
  } else if (size === 'medium') {
    spinnerSize = s(50)
  } else if (size === 'large') {
    spinnerSize = s(80)
  } else if (size === 'xLarge') {
    spinnerSize = s(120)
  } else {
    spinnerSize = s(50)
  }
  return <Spinner size={spinnerSize} type="Pulse" color={color} />
}

export { Loader }
