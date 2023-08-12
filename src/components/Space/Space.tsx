import React, { memo } from 'react'

import { View } from 'react-native'

import { s } from 'react-native-size-matters'

interface SpaceT {
  height?: number | string
  width?: number | string
}

const Space = memo<SpaceT>(({ height, width }) => (
  <View
    testID="space-component"
    style={{ height: s(Number(height)) || 0, width: s(Number(width)) || 0 }}
  />
))

export { Space }
