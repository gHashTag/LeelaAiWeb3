import * as React from 'react'

export const navigationRef = React.createRef<any>()

export function navigate(name: string, params?: object) {
  navigationRef.current?.navigate(name, params)
}

export const isReadyRef = React.createRef<boolean>()
