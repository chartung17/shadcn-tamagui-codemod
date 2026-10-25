import { memo, type JSX } from 'react'
import { Svg, Line, type SvgProps } from 'react-native-svg'
import { themed, type IconProps } from '@tamagui/helpers-icon'

export const ItalicIcon: (props: IconProps) => JSX.Element = themed(
  memo(function ItalicIcon(props: IconProps) {
    const { color = 'black', size = 24, ...otherProps } = props as SvgProps & {
      color?: string
      size?: number
    }
    return (
      <Svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...otherProps}
      >
        <Line x1="19" x2="10" y1="4" y2="4" stroke={color} />
        <Line x1="14" x2="5" y1="20" y2="20" stroke={color} />
        <Line x1="15" x2="9" y1="4" y2="20" stroke={color} />
      </Svg>
    )
  })
)
