import React from 'react'

import { View } from 'react-native'

import { Text, Space } from 'components'
import { red } from 'cons'
import { FieldErrors } from 'react-hook-form'

interface ErrorMessagesProps {
  errors?: FieldErrors<FormData>
  customError?: string
}

const ErrorMessages: React.FC<ErrorMessagesProps> = ({
  errors,
  customError,
}) => {
  return (
    <View>
      {errors &&
        Object.entries(errors).map(([fieldName, error]) => {
          if (error && error.message) {
            return (
              <React.Fragment key={fieldName}>
                <Text h={'h4'} title={error.message} oneColor={red} />
                <Space height={5} />
              </React.Fragment>
            )
          }
          return null
        })}

      {customError && (
        <React.Fragment>
          <Text h={'h4'} title={customError} oneColor={red} />
          <Space height={5} />
        </React.Fragment>
      )}
    </View>
  )
}

export { ErrorMessages }
