import {View} from 'react-native'
import React from 'react'

// Замокаем компонент Animated и вернем простой компонент View
const Animated = (props: any) => <View {...props} />

export default Animated
