import React, { useMemo } from 'react'
import { Image, View, useColorScheme } from 'react-native'
import { ScaledSheet, ms, mvs, s } from 'react-native-size-matters'

import { H, W } from '../../cons'
import { Gem } from '../Gem'
import { ICONS } from './images'

interface Player {
  id: number
  plan: number
  uri: string | number
}

interface GameBoardProps {
  players: Player[]
}

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

  const playerPositions = useMemo(() => {
    const positions: { [key: number]: { id: number; uri: string | number } } =
      {}
    players.forEach((player) => {
      positions[player.plan] = { id: player.id, uri: player.uri }
    })
    return positions
  }, [players])

  const imgObj = useMemo(() => {
    const image = ICONS.find((x) => {
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

  return (
    <View
      style={[styles.imageContainer, { width: curImageHeight * imgObj.aspect }]}
      testID="gem-container"
    >
      <Image source={imgObj.image} style={styles.bgImage} resizeMode="cover" />
      <View style={styles.gameBoardContainer}>
        <View style={styles.container}>
          {rows.map((a, i) => (
            <View style={styles.row} key={i}>
              {a.map((b, index) => (
                <View key={index} style={styles.box}>
                  <Gem planNumber={b} player={playerPositions[b]} />
                </View>
              ))}
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}

const styles = ScaledSheet.create({
  container: {
    marginTop: imageTopMargin,
  },
  imageContainer: {
    height: curImageHeight,
    alignSelf: 'center',
    alignItems: 'center',
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
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: mvs(33, 1.6) - imageTopMargin,
  },
})

export { GameBoard }
