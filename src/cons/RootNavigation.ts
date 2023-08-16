import * as React from 'react'

import { black, dimGray, lightGray, red, secondary, white } from 'cons'

export const navigationRef = React.createRef<any>()

export function navigate(name: string, params?: object) {
  navigationRef.current?.navigate(name, params)
}

export const goBack = () => {
  if (navigationRef.current) {
    navigationRef.current.goBack()
  }
}

export const isReadyRef = React.createRef<boolean>()

export const DarkTheme = {
  dark: true,
  colors: {
    primary: secondary,
    background: black,
    card: white,
    text: white,
    border: dimGray,
    notification: red,
  },
}

export const LightTheme = {
  dark: false,
  colors: {
    primary: secondary,
    background: lightGray,
    card: white,
    text: black,
    border: dimGray,
    notification: red,
  },
}
