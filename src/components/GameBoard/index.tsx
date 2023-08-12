import React, { useMemo } from 'react'
import { Image, View, useColorScheme } from 'react-native'
import { ScaledSheet, ms, mvs, s } from 'react-native-size-matters'

import { H, W } from 'cons'
import { Gem } from '../Gem'
import { GameBoardImage } from './images'
import { GameBoardProps } from 'types'
import { NeomorphView } from 'components/NeomorphView'
import { NeomorphFlexView } from 'components/NeomorphFlexView'

const marginTop = H - W > 350 ? 20 : 0

const imageHeight = s(248) + s(32)
const maxImageHeight = ms(248, 0.5) + s(32)

const imageTopMargin = Math.min(ms(27, 0.5), s(27))
const curImageHeight = Math.min(maxImageHeight, imageHeight) + imageTopMargin

const imageWidth = s(279) + s(18)
const maxImageWidth = ms(279, 0.5) + s(18)
const curImageWidth = imageWidth >= maxImageWidth ? maxImageWidth : imageWidth

const GameBoard: React.FC<GameBoardProps> = ({ players }) => {
  const scheme = useColorScheme()

  const imgObj = useMemo(() => {
    const image = GameBoardImage.find((x) => {
      return x.title === scheme
    })?.path
    if (image) {
      const { width, height } = Image.resolveAssetSource(image)
      const aspect = width / height
      return { image, aspect }
    } else {
      return { image: '', aspect: 1 }
    }
  }, [scheme])

  const rows = [
    [72, 71, 70, 69, 68, 67, 66, 65, 64],
    [55, 56, 57, 58, 59, 60, 61, 62, 63],
    [54, 53, 52, 51, 50, 49, 48, 47, 46],
    [37, 38, 39, 40, 41, 42, 43, 44, 45],
    [36, 35, 34, 33, 32, 31, 30, 29, 28],
    [19, 20, 21, 22, 23, 24, 25, 26, 27],
    [18, 17, 16, 15, 14, 13, 12, 11, 10],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
  ]
  const getPlayer = (b: number) => {
    const player = players.find((pl) => pl.plan === b)
    return player
      ? {
          id: player.id,
          plan: player.plan,
          avatar: player.avatar,
        }
      : undefined
  }

  return (
    // @ts-ignore
    <NeomorphFlexView viewStyle={styles.container}>
      <View
        style={[
          styles.imageContainer,
          { width: curImageHeight * imgObj.aspect },
        ]}
        testID="gem-container"
      >
        <Image
          source={imgObj.image}
          style={styles.bgImage}
          resizeMode="cover"
        />
        <View style={styles.gameBoardContainer}>
          <View style={styles.sub}>
            {rows.map((a, i) => (
              <View style={styles.row} key={i}>
                {a.map((b, index) => (
                  <View key={index} style={styles.box}>
                    <Gem player={getPlayer(b)} planNumber={b} />
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
      </View>
    </NeomorphFlexView>
  )
}

const styles = ScaledSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: s(20),
    paddingVertical: s(6),
    width: '90%',
  },
  sub: {
    marginTop: imageTopMargin,
  },
  imageContainer: {
    height: curImageHeight,
    alignSelf: 'center',
    alignItems: 'center',
    bottom: 30,
  },
  row: {
    flexDirection: 'row',
  },
  gameBoardContainer: {
    width: curImageWidth,
    height: curImageHeight,
    marginTop,
  },
  box: {
    width: s(31),
    height: s(31),
    maxHeight: ms(31, 0.5),
    maxWidth: ms(31, 0.5),
    marginVertical: s(2),
    marginHorizontal: s(1),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: s(31) / 2,
  },
  bgImage: {
    width: '90%',
    height: '100%',
    position: 'absolute',
    top: mvs(33, 1.6) - imageTopMargin,
  },
})

export { GameBoard }
