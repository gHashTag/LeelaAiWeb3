import {render} from '@testing-library/react-native'
import {Text, hT, textStyles} from './' // Replace with your actual file path
import React from 'react'

describe('Text Component', () => {
  it('renders correctly with default props', () => {
    const {getByText} = render(<Text title="Test Title" />)
    expect(getByText('Test Title')).toBeTruthy()
  })
  it('applies the correct style based on the "h" prop', () => {
    const styles: hT[] = [
      'h0',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'h7',
      'h8',
      'h9',
      'h10',
      'h11',
      'h12',
    ]
    styles.forEach(style => {
      const {getByTestId} = render(<Text title="Test Title" h={style} />)
      const receivedStyle = getByTestId('text-component').props.style
      expect(receivedStyle).toEqual(expect.objectContaining(textStyles[style]))
    })
  })
})
