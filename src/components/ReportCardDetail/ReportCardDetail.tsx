import React from 'react'

import { View, StyleSheet } from 'react-native'

import { Avatar, Space, Text, NeomorphView } from 'components'
import { W, formatDate } from 'cons'
import { s, vs } from 'react-native-size-matters'
import { Report } from 'types'

const ReportCardDetail: React.FC<Report> = ({
  fullName,
  avatar,
  plan,
  timestamp,
  content,
  handleProfile,
}) => {
  return (
    <NeomorphView viewStyle={styles.card}>
      <View style={styles.container} testID="report-card">
        <Space height={vs(15)} />
        <Text
          h={'h3'}
          textStyle={styles.lightText}
          title={content}
          testID="report-card-postText"
        />

        <View style={styles.headerName}>
          <View style={styles.userInfoContainer}>
            <Text
              numberOfLines={1}
              h={'h2'}
              title={fullName}
              ellipsizeMode="tail"
              testID="report-card-fullName"
            />
            <Space height={vs(3)} />
            <Text
              h={'h3'}
              textStyle={styles.lightText}
              title={`${formatDate(timestamp)}`}
              testID="report-card-date"
            />
          </View>

          <View style={styles.avatarStyle}>
            <Avatar
              avatar={avatar}
              onPress={handleProfile}
              size={'medium'}
              plan={plan}
              isAccept={true}
              testID="report-card-avatar"
              isLoading={false}
            />
            <Space height={vs(15)} />
          </View>
        </View>
      </View>
    </NeomorphView>
  )
}

const styles = StyleSheet.create({
  avatarStyle: {
    top: 10,
  },
  card: {
    width: W - 50,
  },
  container: {
    alignItems: 'center',
    paddingHorizontal: s(15),
    paddingVertical: s(6),
  },
  headerName: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lightText: {
    textAlign: 'left',
  },
  userInfoContainer: {
    top: 25,
    width: W - 150,
  },
})

export { ReportCardDetail }
